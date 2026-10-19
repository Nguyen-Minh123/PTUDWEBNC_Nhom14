"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * Tên key lưu trong localStorage.
 * Đổi key này nếu bạn muốn reset toàn bộ auth state cũ.
 */
export const AUTH_STORAGE_KEY = "culinary-blog-auth";

/**
 * Theo SRS:
 * - Access token TTL = 15 phút
 * - Refresh token TTL = 7 ngày
 * Dùng các hằng số này để tính thời điểm hết hạn hiển thị trên UI.
 */
export const ACCESS_TOKEN_TTL_MINUTES = 15;
export const REFRESH_TOKEN_TTL_DAYS = 7;

/**
 * Mô tả người dùng đã đăng nhập.
 * Tùy backend, bạn có thể bổ sung thêm field nếu API trả về nhiều thông tin hơn.
 */
export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string | null;
  bio?: string | null;
  roles: string[];
}

/**
 * Dữ liệu tạo session auth.
 * Có thể dùng cho:
 * - đăng nhập
 * - đăng ký
 * - refresh token
 * - lấy profile hiện tại
 */
export interface AuthSessionPayload {
  user?: AuthUser | null;
  accessToken: string;
  refreshToken?: string | null;
  expiresAt?: string | null;
  expiresInSeconds?: number | null;
}

/**
 * Trạng thái auth mà UI sẽ đọc.
 */
export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  error: string | null;
}

/**
 * Các hàm mà store cung cấp cho UI / service layer.
 */
export interface AuthActions {
  /**
   * Đánh dấu store đã hydrate xong từ localStorage.
   * Dùng để tránh render nhầm trạng thái khi Next.js vừa load trang.
   */
  setHydrated: (value: boolean) => void;

  /**
   * Bật/tắt trạng thái loading cho các thao tác auth.
   */
  setLoading: (value: boolean) => void;

  /**
   * Lưu thông báo lỗi hiện tại vào store.
   * Dùng để hiển thị lên UI đăng nhập/đăng ký.
   */
  setError: (message: string | null) => void;

  /**
   * Gán user hiện tại.
   * Thường dùng sau khi gọi /auth/me hoặc sau khi login/register thành công.
   */
  setUser: (user: AuthUser | null) => void;

  /**
   * Cập nhật từng phần thông tin user mà không thay thế toàn bộ object.
   * Hợp với form cập nhật profile.
   */
  updateUser: (patch: Partial<AuthUser>) => void;

  /**
   * Gán lại token mà không đụng tới user.
   * Hợp với bước refresh token.
   */
  setTokens: (payload: {
    accessToken?: string | null;
    refreshToken?: string | null;
    expiresAt?: string | null;
    expiresInSeconds?: number | null;
  }) => void;

  /**
   * Ghi toàn bộ session vào store.
   * Đây là hàm chính nên được gọi sau login/register/refresh.
   */
  setSession: (payload: AuthSessionPayload) => void;

  /**
   * Xóa toàn bộ session auth khỏi store.
   * Dùng cho logout hoặc khi token hết hạn không phục hồi được.
   */
  clearSession: () => void;

  /**
   * Kiểm tra user hiện tại có role cần thiết hay không.
   * Ví dụ: hasRole("Admin"), hasRole("Author")
   */
  hasRole: (role: string) => boolean;

  /**
   * Kiểm tra access token đã hết hạn chưa.
   * bufferSeconds cho phép báo hết hạn sớm hơn một chút để chủ động refresh.
   */
  isAccessTokenExpired: (bufferSeconds?: number) => boolean;

  /**
   * Kiểm tra token sắp hết hạn hay chưa.
   * Dùng để refresh sớm khi người dùng đang tương tác.
   */
  willExpireSoon: (bufferSeconds?: number) => boolean;
}

/**
 * Tổng hợp toàn bộ state + actions.
 */
export type AuthStore = AuthState & AuthActions;

/**
 * Storage “rỗng” cho môi trường SSR.
 * Persist của Zustand cần một storage an toàn khi file bị import trong lúc render server.
 */
const noopStorage = {
  getItem: (_name: string) => null,
  setItem: (_name: string, _value: string) => undefined,
  removeItem: (_name: string) => undefined,
};

/**
 * Tính expiresAt từ expiresInSeconds.
 * Nếu backend không trả expiresInSeconds thì dùng mặc định 15 phút theo SRS.
 */
function resolveExpiresAt(expiresInSeconds?: number | null): string {
  const ttlMs =
    typeof expiresInSeconds === "number" && expiresInSeconds > 0
      ? expiresInSeconds * 1000
      : ACCESS_TOKEN_TTL_MINUTES * 60 * 1000;

  return new Date(Date.now() + ttlMs).toISOString();
}

/**
 * Trạng thái mặc định khi chưa đăng nhập.
 * Lưu ý: isHydrated sẽ được giữ lại khi logout, để UI không nhảy trạng thái.
 */
const defaultAuthState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  isAuthenticated: false,
  isLoading: false,
  isHydrated: false,
  error: null,
};

/**
 * Zustand store quản lý auth state.
 * Nên dùng trong client component hoặc hook chạy phía client.
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...defaultAuthState,

      /**
       * Đánh dấu đã hydrate xong.
       * Thường được gọi tự động trong onRehydrateStorage.
       */
      setHydrated: (value) => {
        set({ isHydrated: value });
      },

      /**
       * Bật/tắt loading.
       * Dùng cho UI nút login/register/logout/refresh.
       */
      setLoading: (value) => {
        set({ isLoading: value });
      },

      /**
       * Lưu lỗi hiện tại.
       * Khi request thành công, nên set lại null.
       */
      setError: (message) => {
        set({ error: message });
      },

      /**
       * Gán user hiện tại.
       * Nếu đã có accessToken thì user này được xem là đã xác thực.
       */
      setUser: (user) => {
        set((state) => ({
          user,
          isAuthenticated: Boolean(user && state.accessToken),
          error: null,
        }));
      },

      /**
       * Cập nhật một phần thông tin user.
       * Không phá vỡ các field khác của user.
       */
      updateUser: (patch) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...patch } : state.user,
          error: null,
        }));
      },

      /**
       * Cập nhật token mà không đổi user.
       * Thích hợp cho refresh token response.
       */
      setTokens: ({ accessToken, refreshToken, expiresAt, expiresInSeconds }) => {
        set((state) => ({
          accessToken: accessToken ?? state.accessToken,
          refreshToken: refreshToken ?? state.refreshToken,
          expiresAt: expiresAt ?? resolveExpiresAt(expiresInSeconds),
          isAuthenticated: Boolean(accessToken ?? state.accessToken),
          error: null,
        }));
      },

      /**
       * Ghi toàn bộ session vào store.
       * Dùng sau login/register/refresh.
       */
      setSession: (payload) => {
        set((state) => {
          const nextUser = payload.user ?? state.user;
          const nextAccessToken = payload.accessToken ?? state.accessToken;
          const nextRefreshToken = payload.refreshToken ?? state.refreshToken;
          const nextExpiresAt =
            payload.expiresAt ?? resolveExpiresAt(payload.expiresInSeconds);

          return {
            user: nextUser,
            accessToken: nextAccessToken,
            refreshToken: nextRefreshToken,
            expiresAt: nextExpiresAt,
            isAuthenticated: Boolean(nextAccessToken),
            error: null,
          };
        });
      },

      /**
       * Xóa session.
       * Dùng khi logout hoặc token bị revoke.
       */
      clearSession: () => {
        set((state) => ({
          ...defaultAuthState,
          isHydrated: state.isHydrated,
        }));
      },

      /**
       * Kiểm tra role hiện tại.
       * Trả về false nếu chưa có user hoặc user chưa có roles.
       */
      hasRole: (role) => {
        const roles = get().user?.roles ?? [];
        return roles.includes(role);
      },

      /**
       * Kiểm tra access token đã hết hạn chưa.
       * bufferSeconds giúp UI chủ động refresh trước khi token chết hẳn.
       */
      isAccessTokenExpired: (bufferSeconds = 0) => {
        const expiresAt = get().expiresAt;
        if (!expiresAt) return true;

        const expiresAtMs = new Date(expiresAt).getTime();
        const nowMs = Date.now();
        return nowMs + bufferSeconds * 1000 >= expiresAtMs;
      },

      /**
       * Kiểm tra token sắp hết hạn trong khoảng bufferSeconds.
       * Hữu ích nếu bạn muốn auto refresh khi còn rất ít thời gian sống.
       */
      willExpireSoon: (bufferSeconds = 60) => {
        const expiresAt = get().expiresAt;
        if (!expiresAt) return true;

        const expiresAtMs = new Date(expiresAt).getTime();
        const nowMs = Date.now();
        return expiresAtMs - nowMs <= bufferSeconds * 1000;
      },
    }),
    {
      name: AUTH_STORAGE_KEY,

      /**
       * Persist chỉ trong client.
       * Nếu chạy server-side, Zustand sẽ dùng storage rỗng.
       */
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? noopStorage : localStorage
      ),

      /**
       * Chỉ lưu những field cần cho phiên đăng nhập.
       * Không persist loading/error để tránh trạng thái UI cũ.
       */
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        expiresAt: state.expiresAt,
        isAuthenticated: state.isAuthenticated,
      }),

      /**
       * Khi đọc xong từ localStorage, đánh dấu hydrated = true.
       * Nếu có lỗi đọc storage thì vẫn cho app chạy tiếp.
       */
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          state?.setError("Không thể khôi phục trạng thái đăng nhập.");
        }
        state?.setHydrated(true);
      },
    }
  )
);