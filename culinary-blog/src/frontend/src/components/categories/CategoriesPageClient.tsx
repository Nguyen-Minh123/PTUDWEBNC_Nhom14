'use client';

/**
 * File:
 * src/components/categories/CategoriesPageClient.tsx
 *
 * Chức năng:
 * - Render nội dung chính của trang /categories.
 * - Hiển thị SearchBar.
 * - Lọc Category theo từ khóa + danh mục.
 * - Render CategoryGrid với dữ liệu đã lọc.
 * - Giữ hook chỉ chạy ở Client Component.
 */

import { useMemo } from 'react';
import SearchCategoryBar from '@/components/search/SearchCategoryBar';
import CategoryGrid from '@/components/categories/CategoryGrid';
import { useRecipeSearch } from '@/hooks/search/useRecipeSearch';
import type { CategoryDto } from '@/types/category.dto';

/**
 * Dữ liệu mẫu cho giao diện tĩnh.
 * Có thể thay bằng API sau khi backend ổn định.
 */
const categories: CategoryDto[] = [
    {
        id: 'mon-viet',
        name: 'Món Việt',
        slug: 'mon-viet',
        description: 'Nhóm món ăn truyền thống, gần gũi và phù hợp khẩu vị hàng ngày.',
        orderIndex: 1,
        recipeCount: 42,
    },
    {
        id: 'mon-a',
        name: 'Món Á',
        slug: 'mon-a',
        description: 'Các công thức châu Á với hương vị đậm đà, đa dạng nguyên liệu.',
        orderIndex: 2,
        recipeCount: 31,
    },
    {
        id: 'mon-au',
        name: 'Món Âu',
        slug: 'mon-au',
        description: 'Những món Âu tinh giản, đẹp mắt và phù hợp bữa tối hiện đại.',
        orderIndex: 3,
        recipeCount: 24,
    },
    {
        id: 'mon-chay',
        name: 'Món Chay',
        slug: 'mon-chay',
        description: 'Lựa chọn lành mạnh, nhẹ nhàng, phù hợp chế độ ăn cân bằng.',
        orderIndex: 4,
        recipeCount: 18,
    },
    {
        id: 'trang-mieng',
        name: 'Tráng miệng',
        slug: 'trang-mieng',
        description: 'Những món ngọt để kết thúc bữa ăn bằng một trải nghiệm mềm mại.',
        orderIndex: 5,
        recipeCount: 16,
    },
    {
        id: 'do-uong',
        name: 'Đồ uống',
        slug: 'do-uong',
        description: 'Công thức nước ép, trà, cà phê và đồ uống giải nhiệt.',
        orderIndex: 6,
        recipeCount: 20,
    },
];

export default function CategoriesPageClient() {
    // Hook tìm kiếm + query params.
    const search = useRecipeSearch();

    // Lọc danh mục theo từ khóa và category đã chọn.
    const filteredCategories = useMemo(() => {
        const keyword = search.debouncedSearchTerm.trim().toLowerCase();

        return categories.filter((category) => {
            const matchKeyword =
                keyword.length === 0 ||
                category.name.toLowerCase().includes(keyword) ||
                (category.description ?? '').toLowerCase().includes(keyword);

            const matchCategory =
                !search.categoryId || category.id === search.categoryId || category.slug === search.categoryId;

            return matchKeyword && matchCategory;
        });
    }, [search.categoryId, search.debouncedSearchTerm]);

    return (
        <section>
            {/* Tiêu đề trang */}
            <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Browse Categories
                </p>
                <h1 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
                    Danh sách tất cả Category
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                    Trang tổng hợp các danh mục công thức theo nhóm món ăn, trình bày dạng lưới để người dùng
                    truy cập nhanh vào từng chủ đề nấu ăn.
                </p>
            </div>

            {/* Thanh tìm kiếm */}
            <div className="mb-6">
                <SearchCategoryBar
                    searchTerm={search.searchTerm}
                    categoryId={search.categoryId}
                    categories={categories}
                    onSearchTermChange={search.setSearchTerm}
                    onCategoryChange={search.setCategoryId}
                    onClear={search.clearFilters}
                />
            </div>

            {/* Grid danh mục */}
            <CategoryGrid categories={filteredCategories} />
        </section>
    );
}