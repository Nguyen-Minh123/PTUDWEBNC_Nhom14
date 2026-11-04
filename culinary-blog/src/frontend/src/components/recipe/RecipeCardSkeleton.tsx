export function RecipeCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm animate-pulse"
    >
      <div className="h-48 bg-stone-200 w-full" />
      <div className="p-5 space-y-3">
        <div className="h-6 w-3/4 bg-stone-200 rounded-md" />
        <div className="h-4 w-full bg-stone-100 rounded-md" />
        <div className="h-4 w-2/3 bg-stone-100 rounded-md" />
        <div className="pt-3 border-t border-stone-100 flex justify-between">
          <div className="h-4 w-20 bg-stone-200 rounded-md" />
          <div className="h-4 w-16 bg-stone-200 rounded-md" />
        </div>
      </div>
    </div>
  );
}
