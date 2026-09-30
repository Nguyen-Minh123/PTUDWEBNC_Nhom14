'use client';

import React from 'react';
import { RecipeSummaryDto } from '../../types';

interface RecipeCardProps {
  recipe: RecipeSummaryDto;
  onOpenDetails: (recipe: RecipeSummaryDto) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onOpenDetails }) => {
  // Màu sắc badge theo độ khó
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'hard':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'Dễ';
      case 'medium':
        return 'Vừa';
      case 'hard':
        return 'Khó';
      default:
        return difficulty;
    }
  };

  return (
    <div
      onClick={() => onOpenDetails(recipe)}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Cover Image & Badges */}
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
          <img
            src={recipe.coverImageUrl || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80'}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Difficulty Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`text-xs px-2.5 py-1 font-semibold rounded-full border shadow-sm backdrop-blur-md ${getDifficultyBadge(
                recipe.difficulty
              )}`}
            >
              {getDifficultyLabel(recipe.difficulty)}
            </span>
          </div>

          {/* Category Pill */}
          {recipe.categoryName && (
            <div className="absolute bottom-3 left-3">
              <span className="text-xs px-2.5 py-1 font-medium bg-black/60 text-white rounded-full backdrop-blur-md">
                {recipe.categoryName}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold mb-2">
            <span className="flex items-center">
              ⭐ {recipe.averageRating.toFixed(1)}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500 font-normal">
              {recipe.reviewCount} đánh giá
            </span>
          </div>

          <h3 className="font-bold text-gray-900 text-lg group-hover:text-amber-600 transition-colors line-clamp-1">
            {recipe.title}
          </h3>

          <p className="text-gray-600 text-xs mt-2 line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>
      </div>

      {/* Meta Footer */}
      <div className="px-5 py-3.5 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1 font-medium">
          <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{recipe.totalTime} phút</span>
        </div>

        <div className="flex items-center gap-1 font-medium">
          <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>{recipe.servings} người</span>
        </div>

        <span className="text-amber-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
          Xem & Bình luận →
        </span>
      </div>
    </div>
  );
};
