'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  PlusCircle,
  User,
  ArrowLeft,
  Menu,
  X,
  ChefHat,
  Bookmark,
  Lock,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSession, signOut } from 'next-auth/react';
import { Avatar } from '@/components/ui/avatar';
import { useAuthStore } from '@/stores/auth-store';
import { authService } from '@/services/authService';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    title: 'Tổng Quan & Bài Viết',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Tạo Công Thức Mới',
    href: '/recipes/new',
    icon: PlusCircle,
  },
  {
    title: 'Công Thức Đã Lưu',
    href: '/dashboard?tab=bookmarks',
    icon: Bookmark,
  },
  {
    title: 'Hồ Sơ Cá Nhân',
    href: '/dashboard?tab=profile',
    icon: User,
  },
  {
    title: 'Đổi Mật Khẩu & Bảo Mật',
    href: '/dashboard?tab=security',
    icon: Lock,
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const authStoreUser = useAuthStore((state) => state.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentUser = session?.user || (authStoreUser ? {
    name: authStoreUser.displayName,
    email: authStoreUser.email,
    image: authStoreUser.avatarUrl,
  } : null);

  const handleLogout = async () => {
    try {
      const state = useAuthStore.getState();
      await authService.logout(state.refreshToken || undefined, state.accessToken || undefined);
    } catch {
      // Ignore network errors on logout
    } finally {
      useAuthStore.getState().clearSession();
      await signOut({ callbackUrl: '/login' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-100/60 dark:bg-stone-950 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between bg-white dark:bg-stone-900 border-b border-stone-200 px-4 py-3 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white">
            <ChefHat className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg text-stone-900 dark:text-stone-100">
            Culinary<span className="text-amber-600">Studio</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-stone-600 hover:text-stone-900"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-stone-900 border-r border-stone-200/80 dark:border-stone-800 flex flex-col transition-transform duration-300 ease-in-out md:static md:translate-x-0',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-stone-100 dark:border-stone-800">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white shadow-sm">
              <ChefHat className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-base text-stone-900 dark:text-stone-100 block leading-tight">
                Culinary<span className="text-amber-600">Studio</span>
              </span>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
                Bảng quản trị
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-stone-400 hover:text-stone-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-amber-50/60 border border-amber-100/80 flex items-center gap-3">
          <Avatar
            src={currentUser?.image || undefined}
            alt={currentUser?.name || 'Chef'}
            fallback={(currentUser?.name || 'C')[0].toUpperCase()}
            size="default"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-stone-900 truncate">
              {currentUser?.name || 'Đầu bếp Culinary'}
            </p>
            <p className="text-[11px] text-stone-500 truncate">
              {currentUser?.email || 'author@culinary.vn'}
            </p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-amber-600 text-white shadow-xs font-semibold'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800'
                )}
              >
                <Icon className={cn('h-4 w-4', isActive ? 'text-white' : 'text-stone-500')} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Return to Blog button & Logout */}
        <div className="p-4 border-t border-stone-100 dark:border-stone-800 space-y-2">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs text-stone-600 hover:text-amber-700 hover:border-amber-300"
            >
              <ArrowLeft className="h-3.5 w-3.5 mr-2" />
              Quay lại Trang chủ
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20"
          >
            <LogOut className="h-3.5 w-3.5 mr-2" />
            Đăng xuất (Logout)
          </Button>
        </div>
      </aside>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Dashboard Content Shell */}
      <main className="flex-1 min-w-0 flex flex-col p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
