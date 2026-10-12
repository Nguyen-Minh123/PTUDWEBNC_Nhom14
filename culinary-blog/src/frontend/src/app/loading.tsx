export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-stone-600 font-medium">Đang tải dữ liệu...</p>
    </div>
  );
}
