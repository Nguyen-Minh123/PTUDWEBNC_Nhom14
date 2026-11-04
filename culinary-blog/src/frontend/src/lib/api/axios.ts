import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth-store';
import { parseApiError } from './error-handler';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5075';

/**
 * Sinh UUID ngẫu nhiên làm Correlation ID cho mỗi HTTP request
 */
function generateCorrelationId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'corr-' + Math.random().toString(36).substring(2, 11) + '-' + Date.now();
}

/**
 * Trích xuất token từ Zustand store hoặc fallback từ localStorage
 */
function getStoredAccessToken(): string | null {
  if (typeof window === 'undefined') return null;

  // 1. Ưu tiên đọc trực tiếp từ useAuthStore state
  try {
    const storeToken = useAuthStore.getState().accessToken;
    if (storeToken) return storeToken;
  } catch {
    // SSR hoặc store chưa sẵn sàng
  }

  // 2. Fallback đọc từ persist key của auth-store
  try {
    const persisted = localStorage.getItem('culinary-blog-auth');
    if (persisted) {
      const parsed = JSON.parse(persisted);
      if (parsed?.state?.accessToken) {
        return parsed.state.accessToken;
      }
    }
  } catch {
    // Ignore JSON parse error
  }

  // 3. Fallback các key lưu trữ thông thường
  return (
    localStorage.getItem('culinary_access_token') ||
    localStorage.getItem('access_token') ||
    sessionStorage.getItem('access_token')
  );
}

/**
 * Trích xuất refresh token từ Zustand store hoặc fallback từ localStorage
 */
function getStoredRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const storeToken = useAuthStore.getState().refreshToken;
    if (storeToken) return storeToken;
  } catch {
    // Ignore
  }

  try {
    const persisted = localStorage.getItem('culinary-blog-auth');
    if (persisted) {
      const parsed = JSON.parse(persisted);
      if (parsed?.state?.refreshToken) {
        return parsed.state.refreshToken;
      }
    }
  } catch {
    // Ignore
  }

  return (
    localStorage.getItem('culinary_refresh_token') ||
    localStorage.getItem('refresh_token') ||
    sessionStorage.getItem('refresh_token')
  );
}

/**
 * FR-FTE-027: Axios Instance chuẩn cho toàn bộ ứng dụng
 * Tự động cấu hình baseURL, timeout, Content-Type, Accept, Correlation ID và Bearer Token
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Axios instance thuần không có interceptor retry (dùng riêng cho refresh token để tránh loop vô tận)
 */
export const rawApiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Biến quản lý hàng đợi cho Silent Token Refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

/**
 * Xử lý giải phóng hàng đợi các requests bị treo trong khi refresh token
 */
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * Request Interceptor (FR-FTE-027)
 * - Tự động gắn Bearer Token
 * - Tự động gắn Correlation ID (X-Correlation-ID)
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 1. Gắn X-Correlation-ID nếu chưa có
    if (!config.headers['X-Correlation-ID']) {
      config.headers['X-Correlation-ID'] = generateCorrelationId();
    }

    // 2. Gắn Bearer Token
    const token = getStoredAccessToken();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor (FR-FTE-028 & FR-FTE-029)
 * - Bắt lỗi 401 Unauthorized
 * - Tự động thực hiện Silent Token Refresh (xếp hàng các requests đồng thời, replay khi có token mới)
 * - Xóa sạch Auth state nếu refresh thất bại
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Không xử lý nếu không có config hoặc không có response
    if (!originalRequest || !error.response) {
      return Promise.reject(error);
    }

    const status = error.response.status;
    const requestUrl = originalRequest.url || '';

    // Bỏ qua Silent Refresh cho các endpoint thuộc luồng Auth chính (login, register, refresh-token, google-login)
    const isAuthEndpoint =
      requestUrl.includes('/auth/login') ||
      requestUrl.includes('/auth/register') ||
      requestUrl.includes('/auth/refresh-token') ||
      requestUrl.includes('/auth/google-login') ||
      requestUrl.includes('/auth/logout');

    if (status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      // Nếu đã có một tiến trình refresh đang chạy, đưa request hiện tại vào hàng đợi (FIFO Queue)
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (newToken: string) => {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(apiClient(originalRequest));
            },
            reject: (err: unknown) => {
              reject(err);
            },
          });
        });
      }

      // Đánh dấu bắt đầu tiến trình Refresh
      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getStoredRefreshToken();

      if (!refreshToken) {
        // Không có refresh token -> Hủy toàn bộ hàng đợi & xóa session
        processQueue(error, null);
        isRefreshing = false;
        if (typeof window !== 'undefined') {
          useAuthStore.getState().clearSession();
        }
        return Promise.reject(error);
      }

      try {
        // Gọi backend endpoint làm mới token (FR-SEC-002 & FR-SEC-004)
        const refreshResponse = await rawApiClient.post<{
          accessToken: string;
          refreshToken: string;
          user?: unknown;
        }>('/api/v1/auth/refresh-token', {
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken, user } = refreshResponse.data;

        // Cập nhật lại Auth Store với token mới
        if (typeof window !== 'undefined') {
          useAuthStore.getState().setSession({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            user: (user as any) || useAuthStore.getState().user,
          });

          // Đồng bộ các key dự phòng
          localStorage.setItem('culinary_access_token', newAccessToken);
          localStorage.setItem('culinary_refresh_token', newRefreshToken);
        }

        // Cập nhật header cho request ban đầu và replay
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Replay tất cả các request đang đợi trong hàng đợi
        processQueue(null, newAccessToken);

        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh thất bại (token hết hạn, token bị thu hồi hoặc phát hiện Token Theft)
        processQueue(refreshError, null);

        if (typeof window !== 'undefined') {
          useAuthStore.getState().clearSession();
          localStorage.removeItem('culinary_access_token');
          localStorage.removeItem('culinary_refresh_token');

          // Điều hướng về trang đăng nhập nếu người dùng đang ở trang yêu cầu xác thực
          const pathname = window.location.pathname;
          if (!pathname.startsWith('/login') && !pathname.startsWith('/register')) {
            window.location.href = `/login?session_expired=true&callbackUrl=${encodeURIComponent(pathname)}`;
          }
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Với các lỗi khác (400, 403, 404, 409, 422, 429, 500)
    return Promise.reject(error);
  }
);

export default apiClient;
