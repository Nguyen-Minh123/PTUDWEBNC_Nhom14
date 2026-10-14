'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, Star, Flame, Heart, Bookmark } from 'lucide-react';
import { RecipeSummaryDto } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export interface RecipeCardProps {
  recipe: RecipeSummaryDto;
  onQuickView?: (recipe: RecipeSummaryDto) => void;
  className?: string;
  variant?: 'default' | 'compact' | 'horizontal';
}

export function RecipeCard({
  recipe,
  onQuickView,
  className,
  variant = 'default',
}: RecipeCardProps) {
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return <Badge variant="success">Dễ</Badge>;
      case 'medium':
        return <Badge variant="secondary">Trung bình</Badge>;
      case 'hard':
      case 'expert':
        return <Badge variant="destructive">Nâng cao</Badge>;
      default:
        return <Badge variant="outline">{difficulty}</Badge>;
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Card
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-stone-800 dark:bg-stone-900 flex flex-col justify-between',
        className
      )}
    >
      <div>
        {/* Cover Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
          <Image
            src={
              recipe.coverImageUrl ||
              'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80'
            }
            alt={recipe.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

          {/* Difficulty Badge (Top Left) */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
            {getDifficultyBadge(recipe.difficulty)}
          </div>

          {/* Bookmark Button (Top Right) */}
          <button
            type="button"
            onClick={handleBookmarkClick}
            aria-label="Lưu công thức"
            className={cn(
              'absolute top-3 right-3 z-10 h-8 w-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all',
              isBookmarked
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-black/30 text-white hover:bg-white hover:text-stone-900'
            )}
          >
            <Bookmark className={cn('h-4 w-4', isBookmarked && 'fill-white')} />
          </button>

          {/* Category Pill (Bottom Left) */}
          {recipe.categoryName && (
            <div className="absolute bottom-3 left-3 z-10">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-md">
                {recipe.categoryName}
              </span>
            </div>
          )}

          {/* Total Time Pill (Bottom Right) */}
          <div className="absolute bottom-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-md">
              <Clock className="h-3 w-3" />
              {recipe.totalTime || recipe.prepTime + recipe.cookTime} phút
            </span>
          </div>
        </div>

        {/* Card Content */}
        <CardContent className="p-4 sm:p-5 flex flex-col space-y-2.5">
          {/* Rating and Reviews */}
          <div className="flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-1 font-semibold text-amber-600">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>{recipe.averageRating?.toFixed(1) || '5.0'}</span>
              <span className="text-stone-400 font-normal">
                ({recipe.reviewCount || 0} đánh giá)
              </span>
            </div>

            {recipe.nutrition?.calories && (
              <div className="flex items-center gap-1 text-stone-500">
                <Flame className="h-3.5 w-3.5 text-orange-500" />
                <span>{recipe.nutrition.calories} kcal</span>
              </div>
            )}
          </div>

          {/* Title with link */}
          <Link href={`/recipes/${recipe.id}`} className="block">
            <h3 className="font-bold text-stone-900 text-base sm:text-lg leading-snug tracking-tight group-hover:text-amber-600 transition-colors line-clamp-1">
              {recipe.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        </CardContent>
      </div>

      {/* Card Footer: Author info & Servings */}
      <div className="px-4 sm:px-5 pb-4 pt-1 flex items-center justify-between border-t border-stone-100 dark:border-stone-800/80 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <Avatar
            src={null}
            fallback={(recipe.authorName || 'Đ')[0]}
            size="sm"
            className="h-6 w-6 text-[10px]"
          />
          <span className="font-medium text-stone-700 dark:text-stone-300 truncate max-w-[120px]">
            {recipe.authorName || 'Đầu bếp'}
          </span>
        </div>

        <div className="flex items-center gap-1 text-stone-500">
          <Users className="h-3.5 w-3.5 text-stone-400" />
          <span>{recipe.servings} người</span>
        </div>
      </div>
    </Card>
  );
}
