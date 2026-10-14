import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ProblemDetails } from '@/types/problem-details';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5075';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Tự động đính kèm JWT Bearer Token nếu có
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Xử lý lỗi theo chuẩn ProblemDetails và 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ProblemDetails>) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        if (typeof window !== 'undefined') {
          // Xóa token hết hạn và điều hướng về trang đăng nhập nếu cần
          localStorage.removeItem('access_token');
          sessionStorage.removeItem('access_token');
        }
      }

      if (status === 429) {
        console.warn('Rate limit exceeded (429): Quá nhiều yêu cầu, vui lòng thử lại sau giây lát.');
      }

      const problemDetail = data;
      const errorMessage = problemDetail?.detail || problemDetail?.title || error.message;
      return Promise.reject(new Error(errorMessage));
    }

    return Promise.reject(error);
  }
);

export default apiClient;
