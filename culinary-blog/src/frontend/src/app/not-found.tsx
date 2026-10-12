import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-extrabold text-amber-600 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-stone-800 mb-2">Không tìm thấy trang</h2>
      <p className="text-stone-600 max-w-md mb-6">
        Trang hoặc công thức bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow transition-colors"
      >
        Quay lại trang chủ
      </Link>
    </div>
  );
}
