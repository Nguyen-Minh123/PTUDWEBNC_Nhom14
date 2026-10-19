'use client';

import * as React from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryChips } from '@/components/home/CategoryChips';
import { FeaturedSection } from '@/components/home/FeaturedSection';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { RecipeDetailModal } from '@/components/recipe/RecipeDetailModal';
import { MainContainer } from '@/components/layout/MainContainer';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { searchRecipes } from '@/services/recipeService';
import { RecipeSummaryDto } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, ChefHat, PlusCircle, Filter } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('all');
  const [selectedSort, setSelectedSort] = React.useState('-createdAt');
  const [selectedRecipe, setSelectedRecipe] = React.useState<RecipeSummaryDto | null>(null);

  // Lấy dữ liệu công thức
  const pagedResult = React.useMemo(() => {
    return searchRecipes({
      keyword: '',
      categoryId: selectedCategory,
      difficulty: selectedDifficulty,
      sort: selectedSort,
      page: 1,
      pageSize: 6,
    });
  }, [selectedCategory, selectedDifficulty, selectedSort]);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section Banner */}
      <HeroSection />

      {/* 2. Top Category Pills */}
      <SectionContainer spacing="sm" background="muted" className="border-b border-stone-200/60 dark:border-stone-800">
        <MainContainer size="default">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Chuyên Mục Nổi Bật
            </span>
            <Link
              href="/recipes"
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 hover:underline flex items-center gap-1"
            >
              <span>Xem toàn bộ danh mục</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <CategoryChips
            activeCategory={selectedCategory}
            onSelectCategory={(id) => setSelectedCategory(id)}
          />
        </MainContainer>
      </SectionContainer>

      {/* 3. Featured Recipes Carousel/Grid */}
      <SectionContainer spacing="default" background="transparent">
        <MainContainer size="default">
          <FeaturedSection
            recipes={pagedResult.items}
            onOpenRecipe={(recipe) => setSelectedRecipe(recipe)}
          />
        </MainContainer>
      </SectionContainer>

      {/* 4. Latest Recipes Grid with Quick Controls */}
      <SectionContainer spacing="default" background="muted" className="border-t border-stone-200/60 dark:border-stone-800">
        <MainContainer size="default">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Mới Cập Nhật</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight dark:text-stone-50">
                Khám Phá Công Thức Nấu Ăn
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                Tìm thấy {pagedResult.totalCount} công thức hấp dẫn phù hợp với sở thích của bạn
              </p>
            </div>

            {/* Quick Sort / Filter Options */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex p-1 bg-stone-200/70 rounded-xl text-xs font-medium dark:bg-stone-800">
                <button
                  type="button"
                  onClick={() => setSelectedSort('-createdAt')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedSort === '-createdAt'
                      ? 'bg-white text-stone-900 font-semibold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Mới nhất
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSort('-averageRating')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedSort === '-averageRating'
                      ? 'bg-white text-stone-900 font-semibold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Đánh giá cao
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSort('prepTime')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedSort === 'prepTime'
                      ? 'bg-white text-stone-900 font-semibold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Nhanh gọn
                </button>
              </div>

              <Link href="/recipes">
                <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs font-semibold">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Bộ lọc nâng cao</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pagedResult.items.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onQuickView={(r) => setSelectedRecipe(r)}
              />
            ))}
          </div>

          {/* View More Link */}
          <div className="mt-12 text-center">
            <Link href="/recipes">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 rounded-xl shadow-md">
                <span>Xem Thêm Tất Cả Công Thức</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </MainContainer>
      </SectionContainer>

      {/* 5. Community Callout Banner */}
      <SectionContainer spacing="lg" background="gradient">
        <MainContainer size="default">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white p-8 sm:p-12 shadow-2xl">
            <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
                <ChefHat className="h-4 w-4" />
                <span>Dành cho những người yêu ẩm thực</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Bạn Có Bí Quyết Nấu Món Ngon Gia Truyền?
              </h3>
              <p className="text-amber-100 text-sm sm:text-base leading-relaxed">
                Hãy cùng tham gia cộng đồng Culinary Blog để chia sẻ các công thức tâm đắc, lưu giữ hương vị quê hương và truyền cảm hứng cho hàng ngàn đầu bếp gia đình.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link href="/recipes/new">
                  <Button size="lg" className="bg-white text-amber-900 hover:bg-amber-50 font-bold rounded-xl shadow-lg">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Đăng Tải Công Thức Của Bạn
                  </Button>
                </Link>
                <Link href="/recipes">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/40 bg-white/10 text-white hover:bg-white/20 font-semibold rounded-xl"
                  >
                    Khám phá thêm món mới
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </MainContainer>
      </SectionContainer>

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