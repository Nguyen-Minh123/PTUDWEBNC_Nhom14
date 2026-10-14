import React from 'react';

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans animate-pulse">
      {/* Header Skeleton */}
      <div className="h-16 bg-white border-b border-stone-200 px-6 flex items-center justify-between">
        <div className="h-7 w-36 bg-stone-200 rounded-lg"></div>
        <div className="h-9 w-24 bg-stone-200 rounded-lg"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* User Card Skeleton */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 flex items-center gap-4">
          <div className="h-16 w-16 bg-stone-200 rounded-full"></div>
          <div className="space-y-2 flex-1">
            <div className="h-6 w-48 bg-stone-200 rounded-md"></div>
            <div className="h-4 w-32 bg-stone-100 rounded-md"></div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="h-10 w-64 bg-stone-200 rounded-xl"></div>

        {/* Table / Cards Skeleton */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-stone-100 rounded-xl w-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
