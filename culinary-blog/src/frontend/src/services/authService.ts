import {
  AuthResponseDto,
  UserProfileDto,
  UpdateUserProfileRequestDto,
} from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5075';

// Mock user dùng cho fallback khi backend không hoạt động
const MOCK_USERS: Record<string, UserProfileDto> = {
  'admin@culinary.com': {
    id: 'user-admin-01',
    email: 'admin@culinary.com',
    displayName: 'Quản trị viên (Admin)',
    firstName: 'Quản trị',
    lastName: 'Viên',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    bio: 'Quản trị hệ thống Culinary Blog',
    roles: ['Admin', 'User'],
    createdAt: '2026-01-01T00:00:00Z',
  },
  'chef.hieu@culinary.com': {
    id: 'user-hieu-02',
    email: 'chef.hieu@culinary.com',
    displayName: 'Bùi Trung Hiếu',
    firstName: 'Hiếu',
    lastName: 'Bùi Trung',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    bio: 'Đam mê ẩm thực Việt Nam truyền thống và sáng tạo món mới.',
    roles: ['Author', 'User'],
    createdAt: '2026-02-15T00:00:00Z',
  },
  'user@culinary.com': {
    id: 'user-member-03',
    email: 'user@culinary.com',
    displayName: 'Nguyễn Thành Viên',
    firstName: 'Thành Viên',
    lastName: 'Nguyễn',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    bio: 'Người yêu ẩm thực gia đình.',
    roles: ['User'],
    createdAt: '2026-03-01T00:00:00Z',
  },
};

let currentLocalUser: UserProfileDto | null = MOCK_USERS['chef.hieu@culinary.com'];

export const authService = {
  /**
   * Đăng nhập với Email và Mật khẩu
   */
  async login(email: string, password?: string): Promise<AuthResponseDto> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data: AuthResponseDto = await response.json();
        currentLocalUser = data.user;
        return data;
      }
    } catch {
      // Backend không phản hồi, fallback mock dữ liệu
    }

    const matched = MOCK_USERS[email.toLowerCase()] || {
      id: 'user-' + Date.now(),
      email,
      displayName: email.split('@')[0],
      roles: ['User'],
      createdAt: new Date().toISOString(),
    };

    currentLocalUser = matched;

    return {
      accessToken: 'mock_jwt_access_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now(),
      user: matched,
    };
  },

  /**
   * Đăng ký tài khoản mới
   */
  async register(email: string, password: string, displayName: string): Promise<AuthResponseDto> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, displayName }),
      });

      if (response.ok) {
        const data: AuthResponseDto = await response.json();
        currentLocalUser = data.user;
        return data;
      }
    } catch {
      // Fallback
    }

    const newUser: UserProfileDto = {
      id: 'user-' + Date.now(),
      email,
      displayName,
      roles: ['User'],
      createdAt: new Date().toISOString(),
    };

    currentLocalUser = newUser;

    return {
      accessToken: 'mock_jwt_access_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now(),
      user: newUser,
    };
  },

  /**
   * Đăng xuất (Revoke Refresh Token)
   */
  async logout(refreshToken?: string): Promise<void> {
    try {
      if (refreshToken) {
        await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch {
      // Bỏ qua lỗi kết nối
    }
  },

  /**
   * Đăng nhập qua Google OAuth
   */
  async loginWithGoogle(idToken: string): Promise<AuthResponseDto> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/google-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (response.ok) {
        const data: AuthResponseDto = await response.json();
        currentLocalUser = data.user;
        return data;
      }
    } catch {
      // Fallback
    }

    const googleUser: UserProfileDto = {
      id: 'google-user-' + Date.now(),
      email: 'google.user@gmail.com',
      displayName: 'Google User',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      roles: ['User'],
      createdAt: new Date().toISOString(),
    };

    currentLocalUser = googleUser;

    return {
      accessToken: 'mock_google_jwt_' + Date.now(),
      refreshToken: 'mock_google_refresh_' + Date.now(),
      user: googleUser,
    };
  },

  /**
   * Lấy hồ sơ người dùng hiện tại
   */
  async getProfile(token?: string): Promise<UserProfileDto> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (response.ok) {
        const data: UserProfileDto = await response.json();
        currentLocalUser = data;
        return data;
      }
    } catch {
      // Fallback
    }

    return currentLocalUser || MOCK_USERS['chef.hieu@culinary.com'];
  },

  /**
   * Cập nhật hồ sơ người dùng hiện tại
   */
  async updateProfile(data: UpdateUserProfileRequestDto, token?: string): Promise<UserProfileDto> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updated: UserProfileDto = await response.json();
        currentLocalUser = updated;
        return updated;
      }
    } catch {
      // Fallback
    }

    if (currentLocalUser) {
      currentLocalUser = {
        ...currentLocalUser,
        displayName: data.displayName,
        bio: data.bio ?? currentLocalUser.bio,
        avatarUrl: data.avatarUrl ?? currentLocalUser.avatarUrl,
      };
      return currentLocalUser;
    }

    return {
      id: 'user-hieu-02',
      email: 'chef.hieu@culinary.com',
      displayName: data.displayName,
      bio: data.bio,
      avatarUrl: data.avatarUrl,
      roles: ['Author', 'User'],
      createdAt: new Date().toISOString(),
    };
  },
};
