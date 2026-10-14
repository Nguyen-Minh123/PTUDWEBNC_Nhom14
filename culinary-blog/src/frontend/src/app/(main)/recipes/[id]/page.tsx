'use client';

import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MainContainer } from '@/components/layout/MainContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { RecipeHero } from '@/components/recipe-detail/RecipeHero';
import { RecipeQuickStats } from '@/components/recipe-detail/RecipeQuickStats';
import { RecipeNutrition } from '@/components/recipe-detail/RecipeNutrition';
import { RecipeIngredients } from '@/components/recipe-detail/RecipeIngredients';
import { RecipeSteps } from '@/components/recipe-detail/RecipeSteps';
import { RecipeReviews } from '@/components/recipe-detail/RecipeReviews';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { INITIAL_RECIPES } from '@/services/recipeService';
import { RecipeDetailDto, RecipeIngredientDto, RecipeStepDto } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChefHat, Lightbulb, ArrowLeft, Share2, Bookmark } from 'lucide-react';

interface RecipeDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const unwrappedParams = React.use(params);
  const { id } = unwrappedParams;

  // Tìm kiếm recipe trong INITIAL_RECIPES
  const baseRecipe = INITIAL_RECIPES.find((r) => r.id === id) || INITIAL_RECIPES[0];

  // Chi tiết nguyên liệu mẫu đầy đủ
  const mockIngredients: RecipeIngredientDto[] = [
    { id: '1', recipeId: id, name: 'Thịt bò (thăn / gầu / nạm)', quantity: 500, unit: 'g', orderIndex: 1 },
    { id: '2', recipeId: id, name: 'Bánh phở tươi sợi nhỏ', quantity: 800, unit: 'g', orderIndex: 2 },
    { id: '3', recipeId: id, name: 'Xương ống bò hầm nước dùng', quantity: 1.5, unit: 'kg', orderIndex: 3 },
    { id: '4', recipeId: id, name: 'Gừng già nướng thơm', quantity: 2, unit: 'củ', orderIndex: 4 },
    { id: '5', recipeId: id, name: 'Hành tím nướng vàng', quantity: 5, unit: 'củ', orderIndex: 5 },
    { id: '6', recipeId: id, name: 'Gói gia vị thảo mộc (quế, hồi, thảo quả, hạt mùi)', quantity: 1, unit: 'gói', orderIndex: 6 },
    { id: '7', recipeId: id, name: 'Hành hoa, ngò gai (mùi tàu)', quantity: 100, unit: 'g', orderIndex: 7 },
    { id: '8', recipeId: id, name: 'Gia vị: Nước mắm cốt nhĩ, muối hạt, đường phèn', quantity: 3, unit: 'thìa', orderIndex: 8 },
  ];

  // Chi tiết các bước làm chuẩn
  const mockSteps: RecipeStepDto[] = [
    {
      id: 's1',
      stepNumber: 1,
      instruction:
        'Sơ chế và khử mùi xương bò: Ngâm xương trong nước muối loãng 30 phút, chần qua nước sôi cùng gừng giã nhuyễn trong 5 phút rồi rửa lại thật sạch dưới vòi nước lạnh.',
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 's2',
      stepNumber: 2,
      instruction:
        'Hầm nước dùng: Cho xương vào nồi lớn với 4 lít nước. Đun sôi rồi hạ nhỏ lửa, liên tục hớt bọt để nước dùng trong vắt. Hầm liu riu trong ít nhất 3 đến 4 tiếng.',
      imageUrl: 'https://images.unsplash.com/photo-1547496502-affa22d38842?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 's3',
      stepNumber: 3,
      instruction:
        'Thêm hương vị thảo mộc: Quế, hồi, thảo quả và hạt mùi đem rang nhỏ lửa cho dậy mùi thơm nức, cho vào túi lọc rồi thả vào nồi nước dùng hầm tiếp 45 phút. Nêm nếm nước mắm ngon và chút đường phèn cho ngọt thanh.',
    },
    {
      id: 's4',
      stepNumber: 4,
      instruction:
        'Thái thịt bò mỏng tang ngang thớ. Chần bánh phở qua nước sôi xếp vào tô, đặt thịt bò tái/chín lên trên, rắc hành hoa, ngò gai thái nhỏ rồi chan nước dùng đang sôi sùng sục vào ngập tô. Thưởng thức kèm chanh, ớt tươi.',
      imageUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&auto=format&fit=crop&q=80',
    },
  ];

  const fullRecipe: RecipeDetailDto = {
    ...baseRecipe,
    ingredients: mockIngredients,
    steps: mockSteps,
    images: [],
  };

  // Món ăn liên quan (lấy các món khác món hiện tại)
  const relatedRecipes = INITIAL_RECIPES.filter((r) => r.id !== baseRecipe.id).slice(0, 3);

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
