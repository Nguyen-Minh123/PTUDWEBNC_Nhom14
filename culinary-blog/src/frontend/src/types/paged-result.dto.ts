/**
 * Đại diện cho kết quả phân trang chuẩn API PagedResult<T>
 */
export interface PagedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// Alias
export type PaginatedResult<T> = PagedResult<T>;
