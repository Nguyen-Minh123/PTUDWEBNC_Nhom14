export function RecipeDetailSkeleton() {
  return (
    <div
      role="status"
      aria-label="Đang tải chi tiết công thức"
      aria-busy="true"
      className="overflow-y-auto p-6 sm:p-8 space-y-6 animate-pulse"
    >
      <div aria-hidden="true" className="relative rounded-2xl aspect-video w-full max-h-80 bg-gray-200">
        <div className="absolute bottom-6 left-6 right-6 space-y-3">
          <div className="h-6 w-24 bg-gray-300 rounded-full" />
          <div className="h-9 w-2/3 bg-gray-300 rounded-lg" />
          <div className="h-4 w-1/2 bg-gray-300 rounded-md" />
        </div>
      </div>

      <div aria-hidden="true" className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-amber-50/50 border border-amber-100/80">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="space-y-2">
            <div className="h-3 w-16 bg-gray-200 rounded mx-auto" />
            <div className="h-5 w-20 bg-gray-200 rounded mx-auto" />
          </div>
        ))}
      </div>

      <div aria-hidden="true" className="space-y-3">
        <div className="h-5 w-40 bg-gray-200 rounded" />
        <div className="h-20 w-full bg-gray-100 rounded-xl" />
      </div>

      <div aria-hidden="true" className="space-y-3">
        <div className="h-6 w-56 bg-gray-200 rounded" />
        <div className="h-32 w-full bg-gray-100 rounded-2xl" />
      </div>

      <span className="sr-only">Đang tải nội dung công thức</span>
    </div>
  );
}
