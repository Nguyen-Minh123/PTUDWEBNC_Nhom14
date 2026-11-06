/**
 * DTOs cho tính năng Quản trị Người dùng & Danh sách Tác giả ẩm thực (FR-BKE-016, FR-BKE-017, FR-FTE-044, FR-FTE-045).
 */

export type UserRoleType = 'Admin' | 'Author' | 'User';

export interface UserListItemDto {
  id: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  bio?: string | null;
  avatarUrl?: string | null;
  primaryRole: UserRoleType;
  roles: string[];
  isActive: boolean;
  isLockedOut: boolean;
  lockoutEnd?: string | null;
  recipeCount: number;
  publishedRecipeCount: number;
  createdAt: string;
  updatedAt?: string | null;
}

export interface AuthorSummaryDto {
  id: string;
  displayName: string;
  email: string;
  bio?: string | null;
  avatarUrl?: string | null;
  primaryRole: string;
  publishedRecipeCount: number;
  totalRecipeCount: number;
  joinedAt: string;
}

export interface GetUsersQueryParams {
  searchTerm?: string;
  role?: string;
  isActive?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
}

export interface GetAuthorsQueryParams {
  searchTerm?: string;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
}

export interface UpdateUserRoleRequestDto {
  role: UserRoleType;
}

export interface UpdateUserStatusRequestDto {
  isActive: boolean;
  lockoutDays?: number | null;
  reason?: string | null;
}
