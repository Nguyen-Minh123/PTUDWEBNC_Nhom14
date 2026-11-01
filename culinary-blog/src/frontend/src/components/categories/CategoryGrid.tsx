'use client';

import React from 'react';
import { CategoryDto } from '@/types/category.dto';
import { CategoryCard } from './CategoryCard';

/**
 * ===================================================================
 * CategoryGrid
 * -------------------------------------------------------------------
 * Chức năng:
 * - Hiển thị toàn bộ Category dưới dạng Grid.
 * - Xử lý trạng thái Loading.
 * - Xử lý khi không có dữ liệu.
 * - Responsive trên Desktop/Tablet/Mobile.
 * ===================================================================
 */

interface CategoryGridProps {
    /** Danh sách Category */
    categories: CategoryDto[];

    /** Đang tải dữ liệu */
    loading?: boolean;

    /** Callback khi chọn Category */
    onSelectCategory?: (category: CategoryDto) => void;
}

export default function CategoryGrid({
    categories,
    loading = false,
    onSelectCategory,
}: CategoryGridProps) {
    /**
     * ===============================================================
     * Loading State
     * ===============================================================
     */
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        key={index}
                        className="animate-pulse rounded-2xl border border-gray-200 bg-white overflow-hidden"
                    >
                        <div className="h-40 bg-gray-200" />

                        <div className="p-5 space-y-3">
                            <div className="h-5 bg-gray-200 rounded" />
                            <div className="h-4 bg-gray-100 rounded w-3/4" />
                            <div className="h-4 bg-gray-100 rounded w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    /**
     * ===============================================================
     * Empty State
     * ===============================================================
     */
    if (categories.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">
                <div className="text-6xl mb-4">📂</div>

                <h2 className="text-xl font-bold text-gray-800">
                    Chưa có danh mục nào
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    Hiện chưa có Category để hiển thị.
                </p>
            </div>
        );
    }

    /**
     * ===============================================================
     * Grid Category
     * ===============================================================
     */
    return (
        <section>
            {/* Tổng số Category */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-900">
                    Danh mục món ăn
                </h2>

                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                    {categories.length} Categories
                </span>
            </div>

            {/* Grid Responsive */}
            <div
                className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        "
            >
                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        onClick={() => onSelectCategory?.(category)}
                    />
                ))}
            </div>
        </section>
    );
}