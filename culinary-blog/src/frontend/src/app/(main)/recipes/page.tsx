'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MainContainer } from '@/components/layout/MainContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { RecipeDetailModal } from '@/components/recipe/RecipeDetailModal';
import { searchRecipes, CATEGORIES, INITIAL_RECIPES } from '@/services/recipeService';
import { RecipeSummaryDto } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react';

export default function RecipesDiscoveryPage() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [keyword, setKeyword] = React.useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = React.useState(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('all');
  const [maxCookTime, setMaxCookTime] = React.useState<number | null>(null);
  const [selectedSort, setSelectedSort] = React.useState('-createdAt');
  const [page, setPage] = React.useState(1);
  const [selectedRecipe, setSelectedRecipe] = React.useState<RecipeSummaryDto | null>(null);

  // Đồng bộ search param nếu có thay đổi
  React.useEffect(() => {
    if (initialSearch) setKeyword(initialSearch);
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialSearch, initialCategory]);

  // Tìm kiếm và lọc
  const pagedResult = React.useMemo(() => {
    const res = searchRecipes({
      keyword,
      categoryId: selectedCategory,
      difficulty: selectedDifficulty,
      sort: selectedSort,
      page,
      pageSize: 9,
    });

    if (maxCookTime !== null) {
      const filteredItems = res.items.filter((r) => (r.totalTime || r.cookTime) <= maxCookTime);
      return {
        ...res,
        items: filteredItems,
        totalCount: filteredItems.length,
      };
    }

    return res;
  }, [keyword, selectedCategory, selectedDifficulty, selectedSort, page, maxCookTime]);

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setMaxCookTime(null);
    setSelectedSort('-createdAt');
    setPage(1);
  };

  const hasActiveFilters =
    keyword !== '' ||
    selectedCategory !== 'all' ||
    selectedDifficulty !== 'all' ||
    maxCookTime !== null;

  return (
    <div className="py-8 md:py-12 flex flex-col flex-1">
      <MainContainer size="default">
        {/* Page Header */}
        <PageHeader
          title="Khám Phá Công Thức Ẩm Thực"
          description="Tìm kiếm theo nguyên liệu, món ăn truyền thống, mức độ khó và thời gian chế biến với kho công thức đa dạng."
          breadcrumbs={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Công thức nấu ăn' },
          ]}
        />

        {/* Layout 2 Cột: Sidebar Filter bên trái và Recipe Grid bên phải */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* CỘT TRÁI: BỘ LỌC TÌM KIẾM (SIDEBAR) */}
          <aside className="lg:col-span-1 space-y-6 bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-xs sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2 font-bold text-stone-900 dark:text-stone-100 text-sm">
                <SlidersHorizontal className="h-4 w-4 text-amber-600" />
                <span>Bộ Lọc Nâng Cao</span>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-amber-600 hover:text-amber-800 font-medium flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Xóa lọc</span>
                </button>
              )}
            </div>

            {/* 1. Tìm theo từ khóa */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Từ khóa món ăn
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <Input
                  type="text"
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Ví dụ: Phở, cá kho..."
                  className="pl-9 h-9 text-xs"
                />
              </div>
            </div>

            {/* 2. Danh mục món ăn */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Chuyên mục
              </label>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setPage(1);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? 'bg-amber-100 text-amber-900 font-bold dark:bg-stone-800 dark:text-amber-300'
                        : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {selectedCategory === cat.id && (
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Độ khó thực hiện */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Độ khó
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'Easy', label: 'Dễ làm' },
                  { id: 'Medium', label: 'Trung bình' },
                  { id: 'Hard', label: 'Kỳ công' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedDifficulty(item.id);
                      setPage(1);
                    }}
                    className={`px-2 py-1.5 rounded-lg text-xs font-medium border text-center transition-all ${
                      selectedDifficulty === item.id
                        ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50 dark:border-stone-800 dark:text-stone-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Thời gian nấu */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Thời gian chế biến
              </label>
              <div className="grid grid-cols-1 gap-1.5 text-xs">
                {[
                  { time: null, label: 'Bất kỳ thời gian nào' },
                  { time: 30, label: 'Dưới 30 phút (Nhanh)' },
                  { time: 60, label: 'Dưới 60 phút' },
                  { time: 120, label: 'Dưới 120 phút' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setMaxCookTime(item.time);
                      setPage(1);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg border transition-colors ${
                      maxCookTime === item.time
                        ? 'border-amber-600 bg-amber-50 text-amber-900 font-semibold'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50 dark:border-stone-800 dark:text-stone-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* CỘT PHẢI: KẾT QUẢ & RECIPE GRID */}
          <main className="lg:col-span-3 space-y-6">
            {/* Thanh điều khiển kết quả (Sort selector & Counter) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200/80 dark:border-stone-800">
              <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                Hiển thị <strong className="text-stone-900 dark:text-stone-100 font-bold">{pagedResult.items.length}</strong> trong tổng số <strong className="text-stone-900 dark:text-stone-100 font-bold">{pagedResult.totalCount}</strong> công thức
              </div>

              {/* Sắp xếp */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 whitespace-nowrap">Sắp xếp theo:</span>
                <select
                  value={selectedSort}
                  onChange={(e) => {
                    setSelectedSort(e.target.value);
                    setPage(1);
                  }}
                  className="h-9 text-xs rounded-lg border border-stone-200 bg-stone-50 px-3 py-1 font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300"
                >
                  <option value="-createdAt">Mới nhất</option>
                  <option value="-averageRating">Đánh giá cao nhất</option>
                  <option value="-reviewCount">Nhiều đánh giá nhất</option>
                  <option value="prepTime">Thời gian nhanh nhất</option>
                  <option value="title">Tên món ăn (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Danh sách Active Filter Chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-stone-500">Đang lọc:</span>
                {keyword && (
                  <Badge variant="secondary" className="gap-1 text-xs">
                    Từ khóa: &quot;{keyword}&quot;
                    <button type="button" onClick={() => setKeyword('')} className="ml-1 hover:text-rose-600">×</button>
                  </Badge>
                )}
                {selectedCategory !== 'all' && (
                  <Badge variant="secondary" className="gap-1 text-xs">
                    Danh mục: {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                    <button type="button" onClick={() => setSelectedCategory('all')} className="ml-1 hover:text-rose-600">×</button>
                  </Badge>
                )}
                {selectedDifficulty !== 'all' && (
                  <Badge variant="secondary" className="gap-1 text-xs">
                    Độ khó: {selectedDifficulty}
                    <button type="button" onClick={() => setSelectedDifficulty('all')} className="ml-1 hover:text-rose-600">×</button>
                  </Badge>
                )}
                {maxCookTime !== null && (
                  <Badge variant="secondary" className="gap-1 text-xs">
                    Nấu dưới: {maxCookTime} phút
                    <button type="button" onClick={() => setMaxCookTime(null)} className="ml-1 hover:text-rose-600">×</button>
                  </Badge>
                )}
              </div>
            )}

            {/* Recipe Grid */}
            {pagedResult.items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {pagedResult.items.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onQuickView={(r) => setSelectedRecipe(r)}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16 px-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-2xl">
                  🍲
                </div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  Không tìm thấy công thức phù hợp
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
                  Hãy thử điều chỉnh lại từ khóa hoặc xóa bớt tiêu chí lọc để xem thêm nhiều món ăn phong phú khác.
                </p>
                <Button
                  onClick={handleResetFilters}
                  variant="outline"
                  size="sm"
                  className="gap-2 font-semibold"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Xóa tất cả bộ lọc</span>
                </Button>
              </div>
            )}

            {/* Pagination Controls */}
            {pagedResult.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagedResult.hasPreviousPage}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="gap-1 text-xs"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Trước</span>
                </Button>

                {Array.from({ length: pagedResult.totalPages }).map((_, i) => (
                  <Button
                    key={i}
                    variant={page === i + 1 ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPage(i + 1)}
                    className="h-8 w-8 p-0 text-xs font-semibold"
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagedResult.hasNextPage}
                  onClick={() => setPage((p) => p + 1)}
                  className="gap-1 text-xs"
                >
                  <span>Sau</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </main>
        </div>
      </MainContainer>

      {/* Quick View Modal */}
      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
