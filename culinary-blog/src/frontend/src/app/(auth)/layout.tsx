import React from 'react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-stone-50 to-stone-100 flex flex-col justify-between">
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🍲</span>
          <span className="font-bold text-xl tracking-tight text-stone-900 group-hover:text-amber-600 transition-colors">
            Culinary<span className="text-amber-600">Blog</span>
          </span>
        </Link>
        <Link
          href="/"
          className="text-xs font-semibold text-stone-600 hover:text-amber-700 transition-colors flex items-center gap-1"
        >
          <span>←</span> Quay lại trang chủ
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      <footer className="w-full text-center py-6 text-xs text-stone-400">
        © 2026 CulinaryBlog • PTUD Web Nâng Cao Nhóm 14
      </footer>
    </div>
  );
}
