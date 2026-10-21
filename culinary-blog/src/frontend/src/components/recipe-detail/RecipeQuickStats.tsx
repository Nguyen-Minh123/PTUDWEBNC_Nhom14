import * as React from 'react';
import { Clock, ChefHat, Users, Gauge, Flame, Sparkles } from 'lucide-react';
import { RecipeDetailDto } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

export function RecipeQuickStats({ recipe }: { recipe: RecipeDetailDto }) {
  const stats = [
    {
      label: 'Chuẩn bị',
      value: `${recipe.prepTime} phút`,
      icon: Clock,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      label: 'Nấu chín',
      value: `${recipe.cookTime} phút`,
      icon: Flame,
      color: 'text-orange-600 bg-orange-50',
    },
    {
      label: 'Tổng thời gian',
      value: `${recipe.totalTime || recipe.prepTime + recipe.cookTime} phút`,
      icon: Sparkles,
      color: 'text-rose-600 bg-rose-50',
    },
    {
      label: 'Khẩu phần',
      value: `${recipe.servings} người`,
      icon: Users,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'Mức độ',
      value: recipe.difficulty === 'Easy' ? 'Dễ làm' : recipe.difficulty === 'Hard' ? 'Kỳ công' : 'Trung bình',
      icon: Gauge,
      color: 'text-emerald-600 bg-emerald-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card key={idx} className="border-stone-200/80 shadow-xs dark:border-stone-800">
            <CardContent className="p-3.5 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-stone-500 uppercase tracking-wider truncate">
                  {stat.label}
                </p>
                <p className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
