'use client';

import React, { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Application ErrorBoundary Caught]:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4 text-center font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-rose-100 space-y-5">
        <div className="text-5xl">⚠️</div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">Đã có lỗi xảy ra</h2>
          <p className="text-sm text-stone-500">
            {error.message || 'Hệ thống gặp sự cố trong quá trình kết xuất dữ liệu.'}
          </p>
        </div>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            Thử lại
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-semibold rounded-xl transition-all cursor-pointer"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}
