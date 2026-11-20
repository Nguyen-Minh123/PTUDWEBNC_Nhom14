'use client';

/**
 * File:
 * src/components/categories/CategoriesPageClient.tsx
 *
 * Chức năng:
 * - Render nội dung chính của trang /categories với đầy đủ 12 chuyên mục ẩm thực Việt Nam.
 * - Hiển thị SearchCategoryBar.
 * - Lọc Category theo từ khóa + danh mục.
 * - Render CategoryGrid với dữ liệu đã lọc.
 */

import { useMemo } from 'react';
import SearchCategoryBar from '@/components/search/SearchCategoryBar';
import CategoryGrid from '@/components/categories/CategoryGrid';
import { useRecipeSearch } from '@/hooks/search/useRecipeSearch';
import { useCategories } from '@/hooks/queries/useCategories';
import { REAL_CATEGORIES } from '@/services/recipeService';

export default function CategoriesPageClient() {
  const { data: categories = REAL_CATEGORIES } = useCategories();
  const search = useRecipeSearch();

  const filteredCategories = useMemo(() => {
    const keyword = search.debouncedSearchTerm.trim().toLowerCase();

    return categories.filter((category) => {
      const matchKeyword =
        keyword.length === 0 ||
        category.name.toLowerCase().includes(keyword) ||
        (category.description ?? '').toLowerCase().includes(keyword);

      const matchCategory =
        !search.categoryId ||
        category.id === search.categoryId ||
        category.slug === search.categoryId;

      return matchKeyword && matchCategory;
    });
  }, [categories, search.categoryId, search.debouncedSearchTerm]);

  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
          Chuyên Mục Ẩm Thực
        </p>
        <h1 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
          Khám Phá {categories.length} Chuyên Mục Món Ngon Việt Nam
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Tổng hợp đầy đủ 12 nhóm món ăn gia đình truyền thống và hiện đại với hơn 55 công thức nấu ăn
          được biên soạn chi tiết từng bước, định lượng nguyên liệu, chỉ số dinh dưỡng và hình ảnh trực quan.
        </p>
      </div>

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

      <CategoryGrid categories={filteredCategories} />
    </section>
  );
}
