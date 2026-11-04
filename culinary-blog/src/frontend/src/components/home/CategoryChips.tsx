'use client';

import * as React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/services/recipeService';
import { cn } from '@/lib/utils';
import { Utensils, Soup, Flame, Salad, Cake, Coffee, Sparkles } from 'lucide-react';

const categoryIcons: Record<string, string> = {
  all: '✨',
  'cat-1': '🍜',
  'cat-2': '🍚',
  'cat-3': '🍲',
  'cat-4': '🥣',
  'cat-5': '🥗',
  'cat-6': '🍧',
};

interface CategoryChipsProps {
  activeCategory?: string;
  onSelectCategory?: (id: string) => void;
  asLinks?: boolean;
}

export function CategoryChips({
  activeCategory = 'all',
  onSelectCategory,
  asLinks = false,
}: CategoryChipsProps) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2 sm:gap-3 min-w-max px-1">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const emoji = categoryIcons[cat.id] || '🍽️';

          if (asLinks) {
            return (
              <Link
                key={cat.id}
                href={cat.id === 'all' ? '/recipes' : `/recipes?category=${cat.id}`}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border',
                  isActive
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-white text-stone-700 border-stone-200/80 hover:border-amber-400 hover:bg-amber-50/50 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300'
                )}
              >
                <span className="text-base">{emoji}</span>
                <span>{cat.name}</span>
              </Link>
            );
          }

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory?.(cat.id)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border cursor-pointer',
                isActive
                  ? 'bg-amber-600 text-white border-amber-600 shadow-sm scale-[1.02]'
                  : 'bg-white text-stone-700 border-stone-200/80 hover:border-amber-400 hover:bg-amber-50/50 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300'
              )}
            >
              <span className="text-base">{emoji}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
