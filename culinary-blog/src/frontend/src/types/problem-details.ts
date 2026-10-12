/**
 * RFC 7807 Problem Details for HTTP APIs
 * Chuẩn hóa cấu trúc thông báo lỗi trả về từ Backend .NET Core
 */
export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  traceId?: string;
  code?: string;
  [key: string]: unknown;
}

/**
 * RFC 7807 Validation Problem Details (HTTP 400 Bad Request)
 */
export interface ValidationProblemDetails extends ProblemDetails {
  errors?: Record<string, string[]>;
}
