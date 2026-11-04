'use client';

import * as React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { RecipeSummaryDto } from '@/types';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { Button } from '@/components/ui/button';

interface FeaturedSectionProps {
  recipes: RecipeSummaryDto[];
  onOpenRecipe?: (recipe: RecipeSummaryDto) => void;
}

export function FeaturedSection({ recipes, onOpenRecipe }: FeaturedSectionProps) {
  // Lấy top 3-4 công thức nổi bật có rating cao nhất
  const topRecipes = React.useMemo(() => {
    return [...recipes]
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 3);
  }, [recipes]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold mb-2">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Thịnh Hành & Nổi Bật Nhất</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight dark:text-stone-50">
            Món Ngon Được Yêu Thích Tuần Này
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            Những công thức có lượt đánh giá và nấu thử cao nhất từ cộng đồng
          </p>
        </div>

        <Link href="/recipes?sort=-averageRating">
          <Button
            variant="ghost"
            size="sm"
            className="text-amber-700 hover:text-amber-800 hover:bg-amber-50 group font-semibold"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onQuickView={onOpenRecipe}
          />
        ))}
      </div>
    </div>
  );
}
