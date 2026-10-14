import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4 text-center font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-stone-200 space-y-5">
        <div className="text-6xl">🍲🔍</div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">404 - Không tìm thấy trang</h1>
          <p className="text-sm text-stone-500">
            Món ăn hoặc địa chỉ bạn tìm kiếm không tồn tại hoặc đã được chuyển sang đường dẫn khác.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
