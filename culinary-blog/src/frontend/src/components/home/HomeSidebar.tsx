'use client';

import * as React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/services/recipeService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Flame,
  ChefHat,
  Lightbulb,
  Mail,
  ArrowRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, string> = {
  all: '🍽️',
  'cat-1': '🍜',
  'cat-2': '🍚',
  'cat-3': '🍲',
  'cat-4': '🥗',
  'cat-5': '🥣',
  'cat-6': '🍧',
};

// Dữ liệu bếp trưởng nổi bật
const TOP_CHEFS = [
  {
    id: 'chef-01',
    name: 'Đầu Bếp Hoàng Tuấn',
    role: 'Chuyên gia Món Bắc',
    recipesCount: 12,
    avatar: null,
    rating: 4.9,
  },
  {
    id: 'chef-02',
    name: 'Mẹ Hạnh Cố Đô',
    role: 'Nghệ nhân Món Huế',
    recipesCount: 9,
    avatar: null,
    rating: 4.8,
  },
  {
    id: 'chef-03',
    name: 'Bếp Nhà Sài Gòn',
    role: 'Ẩm thực Nam Bộ',
    recipesCount: 15,
    avatar: null,
    rating: 4.9,
  },
];

// Danh sách các mẹo vặt nhà bếp xoay vòng
const KITCHEN_TIPS = [
  {
    title: 'Nước dùng phở trong vắt',
    tip: 'Nướng sơ gừng, hành tím và luộc xả sạch bọt xương bò trước khi hầm nhỏ lửa không đậy nắp.',
  },
  {
    title: 'Sườn nướng mềm mọng',
    tip: 'Ướp sườn cùng một ít nước cốt dứa hoặc sữa đặc giúp thớ thịt mềm ngọt tự nhiên mà không bị khô.',
  },
  {
    title: 'Khử tanh cá lóc nấu canh',
    tip: 'Rửa cá với nước vo gạo đặc hoặc một chút muối hạt và gừng đập dập trước khi nấu.',
  },
];

export interface HomeSidebarProps {
  /** Danh mục hiện đang được chọn */
  selectedCategory: string;
  /** Hàm callback khi chọn danh mục */
  onSelectCategory: (id: string) => void;
  /** Độ khó hiện đang được chọn */
  selectedDifficulty: string;
  /** Hàm callback khi chọn độ khó */
  onSelectDifficulty: (difficulty: string) => void;
  /** Thống kê số lượng bài viết theo categoryId */
  categoryCounts?: Record<string, number>;
  /** Tùy biến class container */
  className?: string;
}

export function HomeSidebar({
  selectedCategory,
  onSelectCategory,
  selectedDifficulty,
  onSelectDifficulty,
  categoryCounts = {},
  className,
}: HomeSidebarProps) {
  const [emailInput, setEmailInput] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [randomTipIndex, setRandomTipIndex] = React.useState(0);

  // Đổi ngẫu nhiên mẹo khi mount
  React.useEffect(() => {
    setRandomTipIndex(Math.floor(Math.random() * KITCHEN_TIPS.length));
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setIsSubscribed(true);
    setEmailInput('');
  };

  const currentTip = KITCHEN_TIPS[randomTipIndex] || KITCHEN_TIPS[0];

  return (
    <aside className={cn('space-y-6 w-full', className)}>
      {/* 1. Widget: Chuyên mục tuyển chọn */}
      <Card className="rounded-2xl border-stone-200/80 bg-white dark:bg-stone-900 shadow-xs overflow-hidden">
        <CardHeader className="pb-3 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-600" />
              <span>Chuyên Mục Nấu Ăn</span>
            </CardTitle>
            <Link
              href="/recipes"
              className="text-[11px] font-semibold text-amber-600 hover:text-amber-700 hover:underline"
            >
              Xem tất cả
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-3 p-3">
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => onSelectCategory('all')}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left',
                selectedCategory === 'all'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              )}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{CATEGORY_ICONS.all}</span>
                <span>Tất cả chuyên mục</span>
              </div>
              <span
                className={cn(
                  'text-[10px] px-2 py-0.5 rounded-full font-bold',
                  selectedCategory === 'all'
                    ? 'bg-white/20 text-white'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                )}
              >
                {categoryCounts.all ?? 8}
              </span>
            </button>

            {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] ?? 2;
              const emoji = CATEGORY_ICONS[cat.id] || '🍳';

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left',
                    isSelected
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{emoji}</span>
                    <span className="truncate">{cat.name}</span>
                  </div>
                  <span
                    className={cn(
                      'text-[10px] px-2 py-0.5 rounded-full font-bold',
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 2. Widget: Bộ lọc độ khó */}
      <Card className="rounded-2xl border-stone-200/80 bg-white dark:bg-stone-900 shadow-xs">
        <CardHeader className="pb-3 border-b border-stone-100 dark:border-stone-800">
          <CardTitle className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <span>Mức Độ Chế Biến</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'Easy', label: 'Dễ làm' },
              { id: 'Medium', label: 'Vừa phải' },
              { id: 'Hard', label: 'Nâng cao' },
            ].map((diff) => {
              const isSelected = selectedDifficulty.toLowerCase() === diff.id.toLowerCase();
              return (
                <button
                  key={diff.id}
                  type="button"
                  onClick={() => onSelectDifficulty(diff.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border',
                    isSelected
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-stone-50 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 border-stone-200/70 dark:border-stone-700 hover:border-amber-400'
                  )}
                >
                  {diff.label}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 3. Widget: Mẹo Nấu Ăn Hôm Nay */}
      <Card className="rounded-2xl border-amber-200/80 bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-stone-900 dark:to-stone-900/80 border shadow-xs">
        <CardContent className="p-4 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400">
            <div className="h-7 w-7 rounded-lg bg-amber-200/80 dark:bg-amber-900/60 flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-amber-800 dark:text-amber-300" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">
              Mẹo Bếp Hôm Nay
            </span>
          </div>
          <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
            {currentTip.title}
          </h4>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            {currentTip.tip}
          </p>
        </CardContent>
      </Card>

      {/* 4. Widget: Bếp Trưởng Nổi Bật */}
      <Card className="rounded-2xl border-stone-200/80 bg-white dark:bg-stone-900 shadow-xs">
        <CardHeader className="pb-3 border-b border-stone-100 dark:border-stone-800">
          <CardTitle className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <ChefHat className="h-4 w-4 text-amber-600" />
            <span>Bếp Trưởng Nổi Bật</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3 p-3">
          <div className="space-y-3">
            {TOP_CHEFS.map((chef) => (
              <div
                key={chef.id}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Avatar
                    src={chef.avatar}
                    fallback={chef.name[0]}
                    size="sm"
                    className="h-8 w-8 text-xs font-bold bg-amber-100 text-amber-900"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-stone-900 dark:text-stone-100 leading-tight">
                      {chef.name}
                    </h5>
                    <p className="text-[11px] text-stone-500">{chef.role}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] h-5 px-1.5 font-semibold">
                  {chef.recipesCount} món
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 5. Widget: Đăng Ký Bản Tin Ẩm Thực */}
      <Card className="rounded-2xl border-stone-200/80 bg-stone-900 text-white shadow-md">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-amber-400">
            <Mail className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Bản Tin Món Ngon
            </span>
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            Nhận công thức nấu ăn mới nhất và mẹo vặt dinh dưỡng gửi thẳng tới hòm thư mỗi tuần.
          </p>

          {isSubscribed ? (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Đăng ký thành công! Cảm ơn bạn.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Nhập email của bạn..."
                className="h-9 text-xs bg-stone-800 border-stone-700 text-white placeholder:text-stone-400 focus-visible:ring-amber-500 rounded-xl"
              />
              <Button
                type="submit"
                size="sm"
                className="w-full h-9 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                <span>Đăng ký ngay</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </aside>
  );
}
