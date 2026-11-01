'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCategories } from '@/hooks/queries/useCategories';

/**
 * Sidebar hiển thị danh sách Category.
 * Chức năng:
 * - Hiển thị tất cả danh mục.
 * - Đánh dấu Category đang được chọn.
 * - Điều hướng sang /categories?category={id}.
 */
export default function CategorySidebar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Lấy danh sách Category từ React Query
    const { data: categories = [], isLoading } = useCategories();

    // Category đang được chọn
    const selectedCategory = searchParams.get('category');

    return (
        <aside className="w-full lg:w-72 bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-stone-100 bg-gradient-to-r from-amber-500 to-orange-500">
                <h2 className="text-white font-bold text-lg">
                    📂 Danh mục
                </h2>

                <p className="text-amber-100 text-xs mt-1">
                    Khám phá công thức theo từng chủ đề.
                </p>
            </div>

            {/* Loading */}
            {isLoading ? (
                <div className="p-5 space-y-3">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-10 rounded-lg bg-stone-200 animate-pulse"
                        />
                    ))}
                </div>
            ) : (
                <nav className="p-3 space-y-1">

                    {/* Tất cả Category */}
                    <Link
                        href="/categories"
                        className={`flex items-center justify-between rounded-lg px-4 py-3 transition-all ${pathname === '/categories' && !selectedCategory
                                ? 'bg-amber-500 text-white font-semibold shadow'
                                : 'hover:bg-amber-50 text-gray-700'
                            }`}
                    >
                        <span>🍽️ Tất cả</span>

                        <span className="text-xs">
                            {categories.length}
                        </span>
                    </Link>

                    {/* Danh sách Category */}
                    {categories.map((category) => {
                        const active = selectedCategory === category.id;

                        return (
                            <Link
                                key={category.id}
                                href={`/categories?category=${category.id}`}
                                className={`flex items-center justify-between rounded-lg px-4 py-3 transition-all ${active
                                        ? 'bg-amber-500 text-white font-semibold shadow'
                                        : 'hover:bg-amber-50 text-gray-700'
                                    }`}
                            >
                                {/* Tên Category */}
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <span>📁</span>

                                    <span className="truncate">
                                        {category.name}
                                    </span>
                                </div>

                                {/* Badge số lượng (nếu backend trả về) */}
                                {'recipeCount' in category && (
                                    <span
                                        className={`text-xs rounded-full px-2 py-0.5 ${active
                                                ? 'bg-white/20'
                                                : 'bg-stone-100 text-gray-600'
                                            }`}
                                    >
                                        {category.recipeCount}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            )}

            {/* Footer */}
            <div className="border-t border-stone-100 px-5 py-4 bg-stone-50">
                <p className="text-xs text-gray-500">
                    Tổng cộng{' '}
                    <span className="font-semibold text-amber-600">
                        {categories.length}
                    </span>{' '}
                    danh mục.
                </p>
            </div>
        </aside>
    );
}