'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export function Navbar() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-2xl transition-transform group-hover:scale-110">🍲</span>
          <div>
            <span className="text-lg font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Culinary Blog
            </span>
            <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-semibold bg-amber-100 text-amber-800 rounded-full">
              Nhóm 14 • Lab 4
            </span>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-gray-700">
          <Link
            href="/"
            className="hover:text-amber-600 transition-colors hidden md:inline-block"
          >
            Trang Chủ
          </Link>

          <Link
            href="/recipes/new"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-all shadow-xs shadow-amber-500/20"
          >
            <span>✍️</span>
            <span>Tạo Công Thức</span>
          </Link>

          {/* User Session Area */}
          {session?.user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-gray-100 transition-all border border-gray-200"
              >
                {session.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    className="w-7 h-7 rounded-full object-cover border border-amber-300"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                    {(session.user.name || 'U')[0].toUpperCase()}
                  </div>
                )}
                <span className="font-semibold text-xs text-gray-800 max-w-[100px] truncate hidden sm:inline">
                  {session.user.name || session.user.email}
                </span>
                <span className="text-[10px] text-gray-400">▼</span>
              </button>

              {/* User Dropdown */}
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 text-xs"
                  onClick={() => setDropdownOpen(false)}
                >
                  <div className="px-3.5 py-2.5 border-b border-gray-100 bg-amber-50/50">
                    <p className="font-bold text-gray-800 truncate">{session.user.name}</p>
                    <p className="text-[11px] text-gray-500 truncate">{session.user.email}</p>
                  </div>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-3.5 py-2 hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                  >
                    <span>📊</span>
                    <span>Dashboard & Quản lý</span>
                  </Link>

                  <Link
                    href="/dashboard?tab=profile"
                    className="flex items-center gap-2 px-3.5 py-2 hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                  >
                    <span>👤</span>
                    <span>Hồ sơ cá nhân</span>
                  </Link>

                  <div className="border-t border-gray-100 my-1" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-3.5 py-2 text-rose-600 hover:bg-rose-50 font-medium transition-colors"
                  >
                    <span>🚪</span>
                    <span>Đăng xuất (Logout)</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-3.5 py-1.5 rounded-lg border border-gray-300 hover:border-amber-500 hover:text-amber-600 text-gray-700 font-semibold transition-all"
            >
              Đăng Nhập
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
