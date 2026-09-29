/**
/// <summary>
/// Đại diện cho kết quả phân trang chuẩn API PagedResult<T>
/// </summary>
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
