import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="bg-white rounded-2xl border border-stone-200/80 p-4 shadow-xs space-y-1 sticky top-24">
            <div className="px-3 py-2 mb-2 border-b border-stone-100">
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Bảng Điều Khiển
              </h2>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-stone-700 rounded-xl hover:bg-amber-50 hover:text-amber-700 transition-colors"
            >
              <span>📊</span>
              <span>Tổng Quan & Công Thức</span>
            </Link>
            <Link
              href="/recipes/new"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-stone-700 rounded-xl hover:bg-amber-50 hover:text-amber-700 transition-colors"
            >
              <span>✨</span>
              <span>Đăng Công Thức Mới</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-stone-700 rounded-xl hover:bg-amber-50 hover:text-amber-700 transition-colors"
            >
              <span>👤</span>
              <span>Hồ Sơ Cá Nhân</span>
            </Link>
            <Link
              href="/dashboard?tab=security"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-stone-700 rounded-xl hover:bg-amber-50 hover:text-amber-700 transition-colors"
            >
              <span>🔒</span>
              <span>Đổi Mật Khẩu</span>
            </Link>
            <div className="pt-3 mt-3 border-t border-stone-100">
              <p className="px-4 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Quản trị viên (Admin)
              </p>
              <Link
                href="/dashboard/users"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-stone-700 rounded-xl hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                <span>👥</span>
                <span>Quản Lý Người Dùng</span>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
