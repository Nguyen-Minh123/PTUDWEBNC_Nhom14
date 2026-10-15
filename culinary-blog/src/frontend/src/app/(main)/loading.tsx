import React from 'react';
import { RecipeCardSkeleton } from '@/components/recipe/RecipeCardSkeleton';

export default function MainLoading() {
  return (
    <div className="flex-1 bg-stone-50 flex flex-col font-sans animate-pulse">
      {/* Hero Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="h-9 w-3/4 bg-stone-200 rounded-xl mx-auto"></div>
          <div className="h-5 w-1/2 bg-stone-200 rounded-lg mx-auto"></div>
          <div className="h-12 w-full max-w-lg bg-stone-200 rounded-2xl mx-auto mt-6"></div>
        </div>

        {/* Filter Bar Skeleton */}
        <div className="h-14 bg-white rounded-2xl border border-stone-200 mb-8 p-3 flex gap-3">
          <div className="h-8 w-24 bg-stone-200 rounded-xl"></div>
          <div className="h-8 w-28 bg-stone-200 rounded-xl"></div>
          <div className="h-8 w-24 bg-stone-200 rounded-xl"></div>
        </div>

        {/* Recipe Cards Grid Skeleton */}
        <div
          role="status"
          aria-label="Đang tải danh sách công thức"
          aria-busy="true"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <RecipeCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
