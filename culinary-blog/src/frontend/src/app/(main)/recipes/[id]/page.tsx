'use client';

import * as React from 'react';
import Link from 'next/link';
import { MainContainer } from '@/components/layout/MainContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { RecipeHero } from '@/components/recipe-detail/RecipeHero';
import { RecipeQuickStats } from '@/components/recipe-detail/RecipeQuickStats';
import { RecipeNutrition } from '@/components/recipe-detail/RecipeNutrition';
import { RecipeIngredients } from '@/components/recipe-detail/RecipeIngredients';
import { RecipeSteps } from '@/components/recipe-detail/RecipeSteps';
import { RecipeReviews } from '@/components/recipe-detail/RecipeReviews';
import { RecipeDetailSkeleton } from '@/components/recipe/RecipeDetailSkeleton';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { INITIAL_RECIPES } from '@/services/recipeService';
import { useRecipeDetail } from '@/hooks/queries/useRecipes';
import { extractErrorMessage } from '@/lib/axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

interface RecipeDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const unwrappedParams = React.use(params);
  const { id } = unwrappedParams;
  const {
    data: fullRecipe,
    isLoading,
    isError,
    error,
    refetch,
  } = useRecipeDetail(id);

  if (isLoading) {
    return (
      <div className="py-8 md:py-12">
        <MainContainer size="default">
          <RecipeDetailSkeleton />
        </MainContainer>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-8 md:py-12">
        <MainContainer size="narrow">
          <Card>
            <CardHeader>
              <CardTitle>Không thể tải công thức</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p role="alert" className="text-sm text-stone-600 dark:text-stone-300">
                {extractErrorMessage(error)}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => void refetch()}>Thử lại</Button>
                <Link href="/recipes">
                  <Button variant="outline">Quay lại danh sách</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </MainContainer>
      </div>
    );
  }

  if (!fullRecipe) {
    return (
      <div className="py-8 md:py-12">
        <MainContainer size="narrow">
          <Card>
            <CardHeader>
              <CardTitle>Không tìm thấy công thức</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-stone-600 dark:text-stone-300">
                Công thức có thể đã bị xóa hoặc đường dẫn không chính xác.
              </p>
              <Link href="/recipes">
                <Button variant="outline">Quay lại danh sách</Button>
              </Link>
            </CardContent>
          </Card>
        </MainContainer>
      </div>
    );
  }

  const relatedRecipes = INITIAL_RECIPES.filter((recipe) => recipe.id !== fullRecipe.id).slice(0, 3);

  return (
    <div className="py-8 md:py-12">
      <MainContainer size="default">
        {/* Breadcrumb Navigation */}
        <PageHeader
          title=""
          breadcrumbs={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Công thức nấu ăn', href: '/recipes' },
            { label: fullRecipe.title },
          ]}
        />

        {/* 1. Recipe Hero Section */}
        <RecipeHero recipe={fullRecipe} />

        {/* 2. Quick Stats Grid */}
        <div className="my-8">
          <RecipeQuickStats recipe={fullRecipe} />
        </div>

        {/* 3. Main Content: 2 Cột (Nội dung chính và Sidebar mẹo vặt) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start my-8">
          {/* CỘT CHÍNH (2/3): Nguyên liệu & Các bước làm */}
          <div className="lg:col-span-2 space-y-8">
            {/* Danh sách nguyên liệu tương tác */}
            <RecipeIngredients
              initialServings={fullRecipe.servings}
              ingredients={fullRecipe.ingredients}
            />

            {/* Các bước nấu dạng timeline */}
            <RecipeSteps steps={fullRecipe.steps} />

            {/* Bảng phân tích dinh dưỡng */}
            <RecipeNutrition nutrition={fullRecipe.nutrition} />

            {/* Đánh giá và nhận xét */}
            <RecipeReviews recipeId={fullRecipe.id} />
          </div>

          {/* CỘT PHỤ (1/3): Mẹo nấu ăn & Thông tin bổ sung */}
          <div className="space-y-6 sticky top-20">
            {/* Chef's Cooking Tip Card */}
            <Card className="border-amber-200/80 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 shadow-xs dark:bg-stone-900 dark:border-stone-800">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400">
                  <Lightbulb className="h-5 w-5 text-amber-600 fill-amber-600" />
                  <CardTitle className="text-base font-bold">Bí Quyết Từ Đầu Bếp</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 space-y-2 leading-relaxed">
                <p>
                  • Luôn nướng sơ gừng và hành tím trước khi cho vào hầm để nước dùng có màu vàng óng tự nhiên và thơm dịu.
                </p>
                <p>
                  • Khi hầm xương, mở hé vung và tuyệt đối không để nước sôi sùng sục trào bọt, tránh làm đục nước dùng.
                </p>
              </CardContent>
            </Card>

            {/* Author Profile Highlights */}
            <Card className="border-stone-200/80 shadow-xs dark:border-stone-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold">Về Tác Giả</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-stone-600 dark:text-stone-400 space-y-3">
                <p>
                  <strong className="text-stone-900 dark:text-stone-100">{fullRecipe.authorName}</strong> là chuyên gia ẩm thực truyền thống với hơn 10 năm kinh nghiệm nghiên cứu các món ngon 3 miền.
                </p>
                <Link href={`/recipes?author=${fullRecipe.authorId}`} className="block">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Xem thêm công thức của tác giả
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 4. Related Recipes Section */}
        <div className="mt-16 pt-12 border-t border-stone-200 dark:border-stone-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black text-stone-900 tracking-tight dark:text-stone-50">
                Công Thức Liên Quan
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Gợi ý các món ăn tương tự có thể bạn sẽ thích
              </p>
            </div>
            <Link href="/recipes">
              <Button variant="ghost" size="sm" className="text-amber-700 font-semibold text-xs">
                Xem tất cả món ăn →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedRecipes.map((item) => (
              <RecipeCard key={item.id} recipe={item} />
            ))}
          </div>
        </div>
      </MainContainer>
    </div>
  );
}
