'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { SearchBar } from '../components/search/SearchBar';
import { FilterBar } from '../components/search/FilterBar';
import { RecipeCard } from '../components/search/RecipeCard';
import { RecipeDetailModal } from '../components/recipe/RecipeDetailModal';
import { Navbar } from '../components/layout/Navbar';
import { searchRecipes } from '../services/recipeService';
import { RecipeSummaryDto } from '../types';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedSort, setSelectedSort] = useState('-createdAt');
  const [page, setPage] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeSummaryDto | null>(null);

  // Tìm kiếm và lọc dữ liệu công thức
  const pagedResult = useMemo(() => {
    return searchRecipes({
      keyword,
      categoryId: selectedCategory,
      difficulty: selectedDifficulty,
      sort: selectedSort,
      page,
      pageSize: 6,
    });
  }, [keyword, selectedCategory, selectedDifficulty, selectedSort, page]);

  // Reset trang về 1 khi thay đổi điều kiện lọc
  const handleKeywordChange = (text: string) => {
    setKeyword(text);
    setPage(1);
  };

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setPage(1);
  };

  const handleDifficultyChange = (diff: string) => {
    setSelectedDifficulty(diff);
    setPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-gray-50 flex flex-col font-sans">
      {/* 1. Header Navigation Bar */}
      <Navbar />

      {/* 2. Hero Section */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full mb-4">
          ✨ Trải nghiệm ẩm thực tuyệt đỉnh cùng Culinary Blog
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
          Khám Phá Hương Vị Ẩm Thực <br />
          <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-rose-600 bg-clip-text text-transparent">
            Việt Nam & Thế Giới
          </span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Tìm kiếm công thức nấu ăn chuẩn vị, lưu giữ bí quyết ẩm thực gia đình và tham gia cộng đồng chia sẻ, đánh giá món ngon mỗi ngày.
        </p>

        {/* Thanh tìm kiếm chính */}
        <div id="search-section" className="mt-8">
          <SearchBar value={keyword} onChange={handleKeywordChange} />
        </div>
      </section>

      {/* 3. Main Content: Bộ lọc & Danh sách công thức */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        {/* Bộ lọc & Sắp xếp */}
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          selectedDifficulty={selectedDifficulty}
          onSelectDifficulty={handleDifficultyChange}
          selectedSort={selectedSort}
          onSelectSort={handleSortChange}
        />

        {/* Thông tin số lượng kết quả tìm kiếm */}
        <div className="flex items-center justify-between my-4 text-xs text-gray-500">
          <div>
            Tìm thấy <strong className="text-gray-900">{pagedResult.totalCount}</strong> công thức
            {keyword && (
              <span>
                {' '}cho từ khóa: &quot;<strong className="text-amber-600">{keyword}</strong>&quot;
              </span>
            )}
          </div>
          <div>
            Trang {pagedResult.pageNumber} / {pagedResult.totalPages || 1}
          </div>
        </div>

        {/* Grid thẻ công thức */}
        {pagedResult.items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200 p-8 my-6">
            <span className="text-4xl">🔍</span>
            <h3 className="text-base font-bold text-gray-800 mt-3">
              Không tìm thấy công thức nào phù hợp
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Hãy thử tìm kiếm với từ khóa khác hoặc đặt lại bộ lọc danh mục và độ khó.
            </p>
            <button
              type="button"
              onClick={() => {
                setKeyword('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
                setSelectedSort('-createdAt');
              }}
              className="mt-4 px-4 py-2 bg-amber-500 text-white font-medium text-xs rounded-full hover:bg-amber-600 transition-colors"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
            {pagedResult.items.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onOpenDetails={(r) => setSelectedRecipe(r)}
              />
            ))}
          </div>
        )}

        {/* Phân trang */}
        {pagedResult.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              type="button"
              disabled={!pagedResult.hasPreviousPage}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
            >
              ← Trang trước
            </button>

            <span className="text-xs font-medium text-gray-600 px-3">
              Trang {pagedResult.pageNumber} / {pagedResult.totalPages}
            </span>

            <button
              type="button"
              disabled={!pagedResult.hasNextPage}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
            >
              Trang sau →
            </button>
          </div>
        )}
      </main>

      {/* 4. Modal xem chi tiết món ăn & Bình luận */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />

      {/* 5. Footer */}
      <footer className="bg-white border-t border-gray-200/80 py-8 px-4 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍲</span>
            <span className="font-bold text-gray-800">Culinary Blog - Nhóm 14</span>
            <span className="text-gray-400">© 2026 PTUDWeb Nâng Cao</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-400">
            <span>FR-DOM-007 (UnsupportedSortFieldException)</span>
            <span>•</span>
            <span>FR-FTE-005 (Tìm kiếm & Comment)</span>
            <span>•</span>
            <span>FR-FTE-006 (Mapster ProjectToType DTOs)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}