/**
 * RFC 7807 / RFC 9457 Problem Details for HTTP APIs
 * Chuẩn định dạng lỗi trả về từ ASP.NET Core ProblemDetails
 */
export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  traceId?: string;
  [key: string]: unknown;
}

export interface ValidationProblemDetails extends ProblemDetails {
  errors?: Record<string, string[]>;
}

export interface ApiErrorResponse {
  message: string;
  status?: number;
  problemDetails?: ProblemDetails | ValidationProblemDetails;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
