'use client';

/**
 * Component Header dùng chung cho toàn bộ ứng dụng.
 * Tự động đồng bộ trạng thái xác thực từ NextAuth (useSession) và Zustand (useAuthStore).
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { ChefHat, LogOut, User, LayoutDashboard, KeyRound, PlusCircle, Shield } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { authService } from '@/services/authService';
import { useUIStore } from '@/stores/useUIStore';

export interface HeaderProps {
  variant?: 'default' | 'auth' | 'minimal';
}

export function Header({ variant = 'default' }: HeaderProps = {}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const authStoreUser = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);
  const addToast = useUIStore((state) => state.addToast);
  const [loggingOut, setLoggingOut] = useState(false);

  const currentUser = session?.user
    ? {
        id: session.user.id,
        displayName: session.user.name || session.user.email?.split('@')[0] || 'Đầu bếp',
        email: session.user.email || '',
        avatarUrl: session.user.image || undefined,
      }
    : authStoreUser;

  const isAuthenticated = status === 'authenticated' || !!authStoreUser;

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const refreshToken =
        (session?.user as any)?.refreshToken || useAuthStore.getState().refreshToken;
      const accessToken =
        (session?.user as any)?.accessToken || useAuthStore.getState().accessToken;

      if (refreshToken) {
        await authService.logout(refreshToken, accessToken || undefined);
      }

      clearSession();
      await signOut({ redirect: false });
      addToast('success', 'Đã đăng xuất khỏi hệ thống an toàn.');
      router.push('/login');
      router.refresh();
    } catch {
      clearSession();
      await signOut({ redirect: false });
      router.push('/login');
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/85 border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand Name */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-sm group-hover:bg-amber-600 transition-colors">
              <ChefHat className="w-5 h-5" />
            </span>
            <span className="text-xl font-bold tracking-tight text-stone-900">
              Culinary<span className="text-amber-600">Blog</span>
            </span>
          </Link>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === '/' ? 'text-amber-600 font-semibold' : 'text-stone-600 hover:text-amber-600'
            }`}
          >
            Trang Chủ
          </Link>
          <Link
            href="/recipes/search"
            className={`text-sm font-medium transition-colors ${
              pathname?.startsWith('/recipes/search')
                ? 'text-amber-600 font-semibold'
                : 'text-stone-600 hover:text-amber-600'
            }`}
          >
            Khám Phá Công Thức
          </Link>
          <Link
            href="/categories"
            className={`text-sm font-medium transition-colors ${
              pathname?.startsWith('/categories')
                ? 'text-amber-600 font-semibold'
                : 'text-stone-600 hover:text-amber-600'
            }`}
          >
            Danh Mục
          </Link>
          <Link
            href="/authors"
            className={`text-sm font-medium transition-colors ${
              pathname?.startsWith('/authors')
                ? 'text-amber-600 font-semibold'
                : 'text-stone-600 hover:text-amber-600'
            }`}
          >
            Đầu Bếp & Tác Giả
          </Link>
          {isAuthenticated && (
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors ${
                pathname?.startsWith('/dashboard')
                  ? 'text-amber-600 font-semibold'
                  : 'text-stone-600 hover:text-amber-600'
              }`}
            >
              Bảng Điều Khiển
            </Link>
          )}
        </nav>

        {/* Actions Area */}
        <div className="flex items-center gap-3">
          {isAuthenticated && currentUser ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/recipes/new"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Đăng món mới</span>
              </Link>

              {/* User Menu Dropdown via Group Hover */}
              <div className="relative group">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-stone-200 bg-stone-50/80 hover:bg-stone-100 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold overflow-hidden shrink-0">
                    {currentUser.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={currentUser.avatarUrl}
                        alt={currentUser.displayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      (currentUser.displayName || 'U')[0].toUpperCase()
                    )}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold text-stone-800 max-w-[120px] truncate">
                    {currentUser.displayName}
                  </span>
                </Link>

                {/* Dropdown Panel */}
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-stone-200 shadow-xl py-2 z-50">
                  <div className="px-4 py-2.5 border-b border-stone-100">
                    <p className="text-xs font-bold text-stone-900 truncate">
                      {currentUser.displayName}
                    </p>
                    <p className="text-[11px] text-stone-500 truncate">{currentUser.email}</p>
                  </div>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-700"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Bảng điều khiển</span>
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-700"
                  >
                    <User className="w-4 h-4" />
                    <span>Hồ sơ cá nhân</span>
                  </Link>
                  <Link
                    href="/dashboard/users"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-700"
                  >
                    <Shield className="w-4 h-4 text-amber-600" />
                    <span>Quản trị người dùng</span>
                  </Link>
                  <Link
                    href="/dashboard?tab=security"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-700"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Đổi mật khẩu</span>
                  </Link>

                  <div className="my-1 border-t border-stone-100" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{loggingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-stone-700 hover:text-amber-600 px-3 py-2 rounded-lg transition-colors"
              >
                Đăng Nhập
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium px-4 py-2 rounded-full bg-amber-500 text-white hover:bg-amber-600 shadow-xs transition-all"
              >
                Đăng Ký
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
