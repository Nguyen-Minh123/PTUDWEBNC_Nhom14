'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, ChefHat, Flame, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export function HeroSection() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/recipes?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/recipes');
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent py-14 sm:py-20 lg:py-24 border-b border-amber-100/60 dark:border-stone-800">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-12 right-12 w-64 h-64 bg-rose-400/15 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/80 text-amber-900 text-xs sm:text-sm font-semibold mb-6 shadow-xs animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Sparkles className="h-4 w-4 text-amber-600 fill-amber-600" />
          <span>Khám phá hơn 1.000+ công thức nấu ăn chuẩn vị</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.15] dark:text-stone-50">
          Đánh Thức Vị Giác Cùng <br />
          <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-rose-600 bg-clip-text text-transparent">
            Culinary Blog Việt Nam
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
          Nơi hội tụ bí quyết ẩm thực gia đình truyền thống và xu hướng ẩm thực quốc tế hiện đại. Học nấu ăn dễ dàng với hướng dẫn chi tiết từng bước.
        </p>

        {/* Hero Search Box */}
        <form
          onSubmit={handleSearchSubmit}
          className="mt-8 sm:mt-10 max-w-2xl mx-auto relative flex items-center shadow-lg rounded-2xl bg-white p-2 border border-amber-200/60 dark:bg-stone-900 dark:border-stone-800"
        >
          <div className="pl-3 text-stone-400">
            <Search className="h-5 w-5" />
          </div>
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm món ăn, nguyên liệu (ví dụ: Phở bò, Cơm tấm, Bún bò...)"
            className="border-0 shadow-none focus-visible:ring-0 text-sm sm:text-base px-3 bg-transparent h-12"
          />
          <Button
            type="submit"
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl h-12 px-6 shrink-0"
          >
            <span>Tìm Kiếm</span>
          </Button>
        </form>

        {/* Quick Suggestion Tags */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-stone-500">
          <span className="font-medium text-stone-600 dark:text-stone-400">Gợi ý tìm kiếm:</span>
          {['Phở Bò', 'Bún Bò Huế', 'Cơm Tấm', 'Canh Chua', 'Chè Sen'].map((tag) => (
            <Link
              key={tag}
              href={`/recipes?search=${encodeURIComponent(tag)}`}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-amber-100 hover:text-amber-800 transition-colors dark:bg-stone-800 dark:hover:bg-stone-700"
            >
              {tag}
            </Link>
          ))}
        </div>

        {/* Trust & Stats Bar */}
        <div className="mt-12 pt-8 border-t border-amber-100 dark:border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center max-w-3xl mx-auto">
          <div>
            <p className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-50">1,200+</p>
            <p className="text-xs text-stone-500 mt-0.5">Công thức chọn lọc</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-amber-600">50K+</p>
            <p className="text-xs text-stone-500 mt-0.5">Đầu bếp gia đình</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-50">4.9 / 5</p>
            <p className="text-xs text-stone-500 mt-0.5">Đánh giá chuẩn vị</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-600">100%</p>
            <p className="text-xs text-stone-500 mt-0.5">Miễn phí trọn đời</p>
          </div>
        </div>
      </div>
    </div>
  );
}
