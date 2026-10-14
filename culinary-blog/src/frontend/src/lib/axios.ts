import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ProblemDetails, ValidationProblemDetails } from '@/types/api.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5075';

/**
 * Axios Instance chuẩn cho toàn bộ ứng dụng Frontend
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

/**
 * Request Interceptor: Tự động đính kèm JWT Bearer Token nếu có
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      // Ưu tiên token lưu trữ từ localStorage hoặc sessionStorage
      const token = localStorage.getItem('culinary_access_token') || sessionStorage.getItem('culinary_access_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Helper bóc tách thông tin lỗi từ ProblemDetails của Backend (.NET RFC 7807)
 */
export function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ProblemDetails | ValidationProblemDetails | undefined;
    if (data) {
      if ('errors' in data && data.errors && typeof data.errors === 'object') {
        const errorDict = data.errors as Record<string, string[]>;
        const firstErrorKey = Object.keys(errorDict)[0];
        if (firstErrorKey && errorDict[firstErrorKey]?.length > 0) {
          return `${firstErrorKey}: ${errorDict[firstErrorKey][0]}`;
        }
      }
      if (data.detail) return data.detail;
      if (data.title) return data.title;
    }
    if (error.message) return error.message;
  }
  if (error instanceof Error) return error.message;
  return 'Đã có lỗi không xác định xảy ra. Vui lòng thử lại sau.';
}

/**
 * Response Interceptor: Chuẩn hóa bắt lỗi HTTP status codes
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ProblemDetails | ValidationProblemDetails>) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Khi token hết hạn hoặc chưa đăng nhập
        if (typeof window !== 'undefined') {
          // Xóa token nếu bị 401 Unauthorized
          localStorage.removeItem('culinary_access_token');
          sessionStorage.removeItem('culinary_access_token');
        }
      } else if (status === 403) {
        console.warn('[API Client] Forbidden: Không có quyền truy cập tài nguyên này.');
      } else if (status === 404) {
        console.warn('[API Client] Resource not found:', error.config?.url);
      } else if (status >= 500) {
        console.error('[API Client] Internal Server Error:', error.response.data?.detail || error.message);
      }
    } else if (error.request) {
      console.error('[API Client] Network error / Server unreachable:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
