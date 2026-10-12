'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
        !
      </div>
      <h2 className="text-2xl font-bold text-stone-800 mb-2">Đã xảy ra lỗi</h2>
      <p className="text-stone-600 max-w-md mb-6">
        {error.message || 'Không thể tải được nội dung trang này. Vui lòng thử lại.'}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow transition-colors"
        >
          Thử lại
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium rounded-lg transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
