export * from './problem-details';

export interface ApiErrorResponse {
  message: string;
  status?: number;
  problemDetails?: import('./problem-details').ProblemDetails | import('./problem-details').ValidationProblemDetails;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
