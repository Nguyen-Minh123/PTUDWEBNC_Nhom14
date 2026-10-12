import React from 'react';

export default function MainLoading() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans animate-pulse">
      {/* Navbar Skeleton */}
      <div className="h-16 bg-white/80 border-b border-stone-200 px-6 flex items-center justify-between">
        <div className="h-7 w-36 bg-stone-200 rounded-lg"></div>
        <div className="h-9 w-28 bg-stone-200 rounded-lg"></div>
      </div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="h-48 bg-stone-200 w-full"></div>
              <div className="p-5 space-y-3">
                <div className="h-6 w-3/4 bg-stone-200 rounded-md"></div>
                <div className="h-4 w-full bg-stone-100 rounded-md"></div>
                <div className="h-4 w-2/3 bg-stone-100 rounded-md"></div>
                <div className="pt-3 border-t border-stone-100 flex justify-between items-center">
                  <div className="h-4 w-20 bg-stone-200 rounded-md"></div>
                  <div className="h-4 w-16 bg-stone-200 rounded-md"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
