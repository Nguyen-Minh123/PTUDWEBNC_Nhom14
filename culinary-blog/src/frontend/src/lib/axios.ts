import { apiClient, rawApiClient } from './api/axios';
import {
  parseApiError,
  extractErrorMessage,
  extractFieldErrors,
  isProblemDetails,
  type ParsedApiError,
} from './api/error-handler';

export {
  apiClient,
  rawApiClient,
  parseApiError,
  extractErrorMessage,
  extractFieldErrors,
  isProblemDetails,
};

export type { ParsedApiError };

export default apiClient;
