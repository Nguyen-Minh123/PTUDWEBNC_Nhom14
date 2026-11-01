import { apiClient } from '@/lib/api/axios';
import {
  AuthorSummaryDto,
  GetAuthorsQueryParams,
  GetUsersQueryParams,
  PagedResult,
  UpdateUserRoleRequestDto,
  UpdateUserStatusRequestDto,
  UserListItemDto,
  UserRoleType,
} from '@/types';

/**
 * Dữ liệu mẫu đồng bộ với RecipeDataSeeder ở Backend để đảm bảo hiển thị mượt mà
 * cả khi chạy độc lập Frontend hoặc khi kết nối trực tiếp Backend API.
 */
let fallbackUsersStore: UserListItemDto[] = [
  {
    id: 'admin-user-id',
    email: 'admin@culinary.com',
    displayName: 'Quản Trị Viên Hệ Thống',
    firstName: 'Admin',
    lastName: 'Culinary',
    bio: 'Quản trị viên hệ thống Culinary Blog - phụ trách kiểm duyệt nội dung và quản lý cộng đồng đầu bếp.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    primaryRole: 'Admin',
    roles: ['Admin', 'Author', 'User'],
    isActive: true,
    isLockedOut: false,
    lockoutEnd: null,
    recipeCount: 8,
    publishedRecipeCount: 7,
    createdAt: '2026-01-10T08:00:00Z',
    updatedAt: null,
  },
  {
    id: 'seeder-user-id',
    email: 'seeder@culinaryblog.local',
    displayName: 'Chef Nguyễn Nhất Minh',
    firstName: 'Minh',
    lastName: 'Nguyễn Nhất',
    bio: 'Đầu bếp trưởng với hơn 12 năm kinh nghiệm nghiên cứu ẩm thực truyền thống Việt Nam và Á Âu.',
    avatarUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80',
    primaryRole: 'Author',
    roles: ['Author', 'User'],
    isActive: true,
    isLockedOut: false,
    lockoutEnd: null,
    recipeCount: 25,
    publishedRecipeCount: 25,
    createdAt: '2026-01-15T09:30:00Z',
    updatedAt: null,
  },
  {
    id: 'chef-hieu-id',
    email: 'chef.hieu@culinary.com',
    displayName: 'Chef Bùi Trung Hiếu',
    firstName: 'Hiếu',
    lastName: 'Bùi Trung',
    bio: 'Chuyên gia các món nước và phở truyền thống Hà Nội, đam mê chia sẻ bí quyết nấu ăn gia đình.',
    avatarUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&auto=format&fit=crop&q=80',
    primaryRole: 'Author',
    roles: ['Author', 'User'],
    isActive: true,
    isLockedOut: false,
    lockoutEnd: null,
    recipeCount: 16,
    publishedRecipeCount: 14,
    createdAt: '2026-02-01T10:15:00Z',
    updatedAt: null,
  },
  {
    id: 'chef-khai-id',
    email: 'chef.khai@culinary.com',
    displayName: 'Chef Nguyễn Thế Khải',
    firstName: 'Khải',
    lastName: 'Nguyễn Thế',
    bio: 'Đầu bếp chuyên món chay thanh đạm và thực dưỡng hiện đại dành cho người bận rộn.',
    avatarUrl: 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=400&auto=format&fit=crop&q=80',
    primaryRole: 'Author',
    roles: ['Author', 'User'],
    isActive: true,
    isLockedOut: false,
    lockoutEnd: null,
    recipeCount: 12,
    publishedRecipeCount: 11,
    createdAt: '2026-02-12T14:20:00Z',
    updatedAt: null,
  },
  {
    id: 'chef-huy-id',
    email: 'chef.huy@culinary.com',
    displayName: 'Chef Phan Thanh Huy',
    firstName: 'Huy',
    lastName: 'Phan Thanh',
    bio: 'Đam mê nghệ thuật làm bánh ngọt Pháp và các món tráng miệng nhiệt đới sáng tạo.',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    primaryRole: 'Author',
    roles: ['Author', 'User'],
    isActive: true,
    isLockedOut: false,
    lockoutEnd: null,
    recipeCount: 9,
    publishedRecipeCount: 9,
    createdAt: '2026-02-20T11:00:00Z',
    updatedAt: null,
  },
  {
    id: 'member-lan-id',
    email: 'lan.tran@culinary.com',
    displayName: 'Trần Ngọc Lan',
    firstName: 'Lan',
    lastName: 'Trần Ngọc',
    bio: 'Thành viên yêu thích sưu tầm công thức bữa tối nhanh gọn cho gia đình nhỏ.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    primaryRole: 'User',
    roles: ['User'],
    isActive: true,
    isLockedOut: false,
    lockoutEnd: null,
    recipeCount: 0,
    publishedRecipeCount: 0,
    createdAt: '2026-03-05T16:45:00Z',
    updatedAt: null,
  },
  {
    id: 'locked-spammer-id',
    email: 'spam.account@culinary.com',
    displayName: 'Tài Khoản Vi Phạm',
    firstName: 'Spam',
    lastName: 'User',
    bio: 'Tài khoản đã bị khóa do đăng tải nội dung quảng cáo không phù hợp.',
    avatarUrl: null,
    primaryRole: 'User',
    roles: ['User'],
    isActive: false,
    isLockedOut: true,
    lockoutEnd: '2027-01-01T00:00:00Z',
    recipeCount: 1,
    publishedRecipeCount: 0,
    createdAt: '2026-03-18T07:10:00Z',
    updatedAt: '2026-04-01T09:00:00Z',
  },
];

function buildAuthHeaders(accessToken?: string): Record<string, string> | undefined {
  if (!accessToken) return undefined;
  return { Authorization: `Bearer ${accessToken}` };
}

export const userService = {
  /**
   * Lấy danh sách người dùng có phân trang, tìm kiếm và lọc cho Admin (GET /api/v1/users - FR-BKE-016)
   */
  async getUsers(
    params: GetUsersQueryParams = {},
    accessToken?: string
  ): Promise<PagedResult<UserListItemDto>> {
    try {
      const response = await apiClient.get<PagedResult<UserListItemDto>>('/v1/users', {
        params: {
          searchTerm: params.searchTerm || undefined,
          role: params.role || undefined,
          isActive: params.isActive,
          pageNumber: params.pageNumber ?? 1,
          pageSize: params.pageSize ?? 10,
          sort: params.sort ?? '-createdAt',
        },
        headers: buildAuthHeaders(accessToken),
      });
      return response.data;
    } catch {
      // Fallback sang dữ liệu mô phỏng nếu Backend offline hoặc dùng tài khoản demo client
      let list = [...fallbackUsersStore];

      if (params.searchTerm?.trim()) {
        const kw = params.searchTerm.trim().toLowerCase();
        list = list.filter(
          (u) =>
            u.displayName.toLowerCase().includes(kw) ||
            u.email.toLowerCase().includes(kw) ||
            u.firstName.toLowerCase().includes(kw) ||
            u.lastName.toLowerCase().includes(kw)
        );
      }

      if (params.role && params.role !== 'all') {
        list = list.filter(
          (u) =>
            u.primaryRole.toLowerCase() === params.role!.toLowerCase() ||
            u.roles.some((r) => r.toLowerCase() === params.role!.toLowerCase())
        );
      }

      if (typeof params.isActive === 'boolean') {
        list = list.filter((u) => u.isActive === params.isActive);
      }

      const sort = (params.sort || '-createdAt').toLowerCase();
      list.sort((a, b) => {
        if (sort === 'displayname') return a.displayName.localeCompare(b.displayName, 'vi');
        if (sort === '-displayname') return b.displayName.localeCompare(a.displayName, 'vi');
        if (sort === '-recipecount') return b.recipeCount - a.recipeCount;
        if (sort === 'recipecount') return a.recipeCount - b.recipeCount;
        if (sort === 'createdat') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      const pageNumber = Math.max(1, params.pageNumber ?? 1);
      const pageSize = Math.max(1, params.pageSize ?? 10);
      const totalCount = list.length;
      const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
      const items = list.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

      return {
        items,
        pageNumber,
        pageSize,
        totalCount,
        totalPages,
        hasPreviousPage: pageNumber > 1,
        hasNextPage: pageNumber < totalPages,
      };
    }
  },

  /**
   * Lấy danh sách tác giả / đầu bếp công khai (GET /api/v1/users/authors - FR-BKE-016, FR-FTE-045)
   */
  async getAuthors(params: GetAuthorsQueryParams = {}): Promise<PagedResult<AuthorSummaryDto>> {
    try {
      const response = await apiClient.get<PagedResult<AuthorSummaryDto>>('/v1/users/authors', {
        params: {
          searchTerm: params.searchTerm || undefined,
          pageNumber: params.pageNumber ?? 1,
          pageSize: params.pageSize ?? 12,
          sort: params.sort ?? '-publishedRecipeCount',
        },
      });
      return response.data;
    } catch {
      let authors: AuthorSummaryDto[] = fallbackUsersStore
        .filter(
          (u) =>
            u.isActive &&
            (u.primaryRole === 'Author' || u.primaryRole === 'Admin' || u.publishedRecipeCount > 0)
        )
        .map((u) => ({
          id: u.id,
          displayName: u.displayName,
          email: u.email,
          bio: u.bio,
          avatarUrl: u.avatarUrl,
          primaryRole: u.primaryRole,
          publishedRecipeCount: u.publishedRecipeCount,
          totalRecipeCount: u.recipeCount,
          joinedAt: u.createdAt,
        }));

      if (params.searchTerm?.trim()) {
        const kw = params.searchTerm.trim().toLowerCase();
        authors = authors.filter(
          (a) =>
            a.displayName.toLowerCase().includes(kw) ||
            (a.bio && a.bio.toLowerCase().includes(kw)) ||
            a.email.toLowerCase().includes(kw)
        );
      }

      const sort = (params.sort || '-publishedRecipeCount').toLowerCase();
      authors.sort((a, b) => {
        if (sort === 'displayname') return a.displayName.localeCompare(b.displayName, 'vi');
        if (sort === '-displayname') return b.displayName.localeCompare(a.displayName, 'vi');
        if (sort === '-joinedat') return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
        if (sort === 'joinedat') return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
        return b.publishedRecipeCount - a.publishedRecipeCount;
      });

      const pageNumber = Math.max(1, params.pageNumber ?? 1);
      const pageSize = Math.max(1, params.pageSize ?? 12);
      const totalCount = authors.length;
      const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
      const items = authors.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

      return {
        items,
        pageNumber,
        pageSize,
        totalCount,
        totalPages,
        hasPreviousPage: pageNumber > 1,
        hasNextPage: pageNumber < totalPages,
      };
    }
  },

  /**
   * Lấy thông tin chi tiết một người dùng theo ID (GET /api/v1/users/{id})
   */
  async getUserById(id: string): Promise<UserListItemDto | null> {
    try {
      const response = await apiClient.get<UserListItemDto>(`/v1/users/${id}`);
      return response.data;
    } catch {
      return fallbackUsersStore.find((u) => u.id === id) || null;
    }
  },

  /**
   * Thay đổi vai trò (RBAC: Admin, Author, User) của người dùng (PUT /api/v1/users/{id}/role - FR-BKE-017)
   */
  async updateUserRole(
    id: string,
    payload: UpdateUserRoleRequestDto,
    accessToken?: string
  ): Promise<UserListItemDto> {
    try {
      const response = await apiClient.put<UserListItemDto>(`/v1/users/${id}/role`, payload, {
        headers: buildAuthHeaders(accessToken),
      });
      return response.data;
    } catch (error: any) {
      // Nếu lỗi nghiệp vụ từ Backend (400/403/404), ném lỗi để UI hiển thị đúng thông báo
      if (error?.response?.status && [400, 403, 404].includes(error.response.status)) {
        throw error;
      }

      const target = fallbackUsersStore.find((u) => u.id === id);
      if (!target) {
        throw new Error('Không tìm thấy người dùng.');
      }

      const newRole: UserRoleType = payload.role;
      const roles =
        newRole === 'Admin'
          ? ['Admin', 'Author', 'User']
          : newRole === 'Author'
          ? ['Author', 'User']
          : ['User'];

      const updated: UserListItemDto = {
        ...target,
        primaryRole: newRole,
        roles,
        updatedAt: new Date().toISOString(),
      };
      fallbackUsersStore = fallbackUsersStore.map((u) => (u.id === id ? updated : u));
      return updated;
    }
  },

  /**
   * Kích hoạt hoặc khóa tài khoản người dùng & thu hồi RefreshTokens (PUT /api/v1/users/{id}/status - FR-BKE-017)
   */
  async updateUserStatus(
    id: string,
    payload: UpdateUserStatusRequestDto,
    accessToken?: string
  ): Promise<UserListItemDto> {
    try {
      const response = await apiClient.put<UserListItemDto>(`/v1/users/${id}/status`, payload, {
        headers: buildAuthHeaders(accessToken),
      });
      return response.data;
    } catch (error: any) {
      if (error?.response?.status && [400, 403, 404].includes(error.response.status)) {
        throw error;
      }

      const target = fallbackUsersStore.find((u) => u.id === id);
      if (!target) {
        throw new Error('Không tìm thấy người dùng.');
      }

      const lockoutEnd = !payload.isActive
        ? new Date(
            Date.now() + (payload.lockoutDays ? payload.lockoutDays * 86400000 : 36500 * 86400000)
          ).toISOString()
        : null;

      const updated: UserListItemDto = {
        ...target,
        isActive: payload.isActive,
        isLockedOut: !payload.isActive,
        lockoutEnd,
        updatedAt: new Date().toISOString(),
      };
      fallbackUsersStore = fallbackUsersStore.map((u) => (u.id === id ? updated : u));
      return updated;
    }
  },
};
