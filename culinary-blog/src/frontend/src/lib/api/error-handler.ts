import axios, { AxiosError } from 'axios';
import { ProblemDetails, ValidationProblemDetails } from '@/types/problem-details';

/**
 * Cấu trúc lỗi API đã được chuẩn hóa thân thiện cho ứng dụng
 */
export interface ParsedApiError {
  statusCode: number;
  title: string;
  detail: string;
  message: string;
  errors?: Record<string, string[]>;
  fieldErrors?: Record<string, string>;
  raw?: unknown;
  isNetworkError: boolean;
  isRateLimited: boolean;
  retryAfterSeconds?: number;
}

/**
 * Kiểm tra xem object có tuân thủ cấu trúc RFC 7807 ProblemDetails hay không
 */
export function isProblemDetails(data: unknown): data is ProblemDetails {
  if (!data || typeof data !== 'object') return false;
  const candidate = data as Record<string, unknown>;
  return 'title' in candidate || 'status' in candidate || 'detail' in candidate || 'type' in candidate;
}

/**
 * Bóc tách lỗi từ bất kỳ response hoặc exception nào của Axios/Fetch thành cấu trúc chuẩn
 */
export function parseApiError(error: unknown): ParsedApiError {
  // 1. Trường hợp lỗi Axios
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ProblemDetails | ValidationProblemDetails>;
    const response = axiosError.response;

    // Không nhận được response -> Lỗi mạng hoặc Server chưa bật
    if (!response) {
      return {
        statusCode: 0,
        title: 'Lỗi kết nối mạng',
        detail: axiosError.message || 'Không thể kết nối đến máy chủ.',
        message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau.',
        isNetworkError: true,
        isRateLimited: false,
        raw: error,
      };
    }

    const statusCode = response.status;
    const data = response.data;
    const headers = response.headers;

    // Bóc tách field errors nếu có (HTTP 400 Validation Problem Details)
    const errorsDict = (data && 'errors' in data && data.errors && typeof data.errors === 'object')
      ? (data.errors as Record<string, string[]>)
      : undefined;

    const fieldErrors: Record<string, string> = {};
    if (errorsDict) {
      for (const [key, messages] of Object.entries(errorsDict)) {
        if (messages && messages.length > 0) {
          fieldErrors[key] = messages[0];
        }
      }
    }

    // Xử lý Rate Limiting (HTTP 429)
    const isRateLimited = statusCode === 429;
    let retryAfterSeconds: number | undefined;
    if (isRateLimited) {
      const retryHeader = headers?.['retry-after'];
      if (retryHeader) {
        const parsed = parseInt(String(retryHeader), 10);
        if (!isNaN(parsed)) retryAfterSeconds = parsed;
      }
    }

    // Xác định thông điệp thân thiện theo HTTP Status Code
    let friendlyMessage = data?.detail || data?.title;

    if (!friendlyMessage) {
      switch (statusCode) {
        case 400:
          friendlyMessage = Object.values(fieldErrors)[0] || 'Dữ liệu gửi lên không hợp lệ. Vui lòng kiểm tra lại.';
          break;
        case 401:
          friendlyMessage = 'Phiên đăng nhập đã hết hạn hoặc thông tin xác thực không đúng. Vui lòng đăng nhập lại.';
          break;
        case 403:
          friendlyMessage = 'Bạn không có quyền thực hiện thao tác hoặc truy cập vào tài nguyên này.';
          break;
        case 404:
          friendlyMessage = 'Tài nguyên được yêu cầu không tồn tại hoặc đã bị xóa.';
          break;
        case 409:
          friendlyMessage = 'Dữ liệu đang bị xung đột hoặc đã tồn tại trên hệ thống.';
          break;
        case 422:
          friendlyMessage = 'Dữ liệu không đáp ứng các ràng buộc nghiệp vụ của công thức.';
          break;
        case 429:
          friendlyMessage = retryAfterSeconds
            ? `Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ${retryAfterSeconds} giây.`
            : 'Bạn đã gửi quá nhiều yêu cầu trong thời gian ngắn. Vui lòng thử lại sau 60 giây.';
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          friendlyMessage = 'Máy chủ đang gặp sự cố nội bộ. Vui lòng thử lại sau ít phút.';
          break;
        default:
          friendlyMessage = axiosError.message || `Lỗi hệ thống (${statusCode}). Vui lòng thử lại.`;
      }
    }

    return {
      statusCode,
      title: data?.title || `HTTP Error ${statusCode}`,
      detail: data?.detail || friendlyMessage,
      message: friendlyMessage,
      errors: errorsDict,
      fieldErrors: Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined,
      isNetworkError: false,
      isRateLimited,
      retryAfterSeconds,
      raw: data,
    };
  }

  // 2. Trường hợp Error chuẩn của JavaScript
  if (error instanceof Error) {
    return {
      statusCode: 500,
      title: 'Lỗi ứng dụng',
      detail: error.message,
      message: error.message || 'Đã có lỗi không mong muốn xảy ra.',
      isNetworkError: false,
      isRateLimited: false,
      raw: error,
    };
  }

  // 3. Fallback cho các kiểu dữ liệu khác
  return {
    statusCode: 500,
    title: 'Lỗi không xác định',
    detail: String(error),
    message: 'Đã có lỗi không mong muốn xảy ra. Vui lòng tải lại trang.',
    isNetworkError: false,
    isRateLimited: false,
    raw: error,
  };
}

/**
 * Trích xuất chuỗi thông báo lỗi duy nhất, thích hợp hiển thị Toast hoặc Alert
 */
export function extractErrorMessage(error: unknown): string {
  const parsed = parseApiError(error);
  return parsed.message;
}

/**
 * Trích xuất danh sách lỗi theo từng field (thuận tiện gắn vào form validation)
 */
export function extractFieldErrors(error: unknown): Record<string, string> {
  const parsed = parseApiError(error);
  return parsed.fieldErrors || {};
}
