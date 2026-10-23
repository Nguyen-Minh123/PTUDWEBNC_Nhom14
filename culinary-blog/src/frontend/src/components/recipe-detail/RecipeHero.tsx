'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Star,
  Bookmark,
  Share2,
  Printer,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { RecipeDetailDto } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export function RecipeHero({ recipe }: { recipe: RecipeDetailDto }) {
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);

  const galleryImages = React.useMemo(() => {
    const images = [...(recipe.images ?? [])]
      .filter((image) => image.originalUrl)
      .sort(
        (first, second) =>
          Number(second.isPrimary) - Number(first.isPrimary) ||
          (first.orderIndex ?? 0) - (second.orderIndex ?? 0)
      )
      .map((image) => ({
        id: image.id,
        src: image.originalUrl,
        previewSrc: image.mediumUrl || image.thumbnailUrl || image.originalUrl,
        alt: image.altText || recipe.title,
      }));

    if (recipe.coverImageUrl && !images.some((image) => image.src === recipe.coverImageUrl)) {
      images.push({
        id: 'recipe-cover',
        src: recipe.coverImageUrl,
        previewSrc: recipe.coverImageUrl,
        alt: recipe.title,
      });
    }

    if (images.length === 0) {
      images.push({
        id: 'default-cover',
        src: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=1200&auto=format&fit=crop&q=80',
        previewSrc: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=1200&auto=format&fit=crop&q=80',
        alt: recipe.title,
      });
    }

    return images;
  }, [recipe.coverImageUrl, recipe.images, recipe.title]);

  const activeImage = galleryImages[activeImageIndex] ?? galleryImages[0];

  React.useEffect(() => {
    if (!isLightboxOpen || galleryImages.length < 2) return;

    const handleGalleryKeys = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setActiveImageIndex((index) => (index + 1) % galleryImages.length);
      }
      if (event.key === 'ArrowLeft') {
        setActiveImageIndex((index) => (index - 1 + galleryImages.length) % galleryImages.length);
      }
    };

    window.addEventListener('keydown', handleGalleryKeys);
    return () => window.removeEventListener('keydown', handleGalleryKeys);
  }, [galleryImages.length, isLightboxOpen]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const showAdjacentImage = (direction: -1 | 1) => {
    setActiveImageIndex((index) => (index + direction + galleryImages.length) % galleryImages.length);
  };

  return (
    <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
      <div className="space-y-6">
      {/* Category & Status */}
      <div className="flex flex-wrap items-center gap-2">
        {recipe.categoryName && (
          <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold bg-amber-100 text-amber-900 border-amber-200">
            {recipe.categoryName}
          </Badge>
        )}
        <Badge variant={recipe.difficulty === 'Easy' ? 'success' : recipe.difficulty === 'Hard' ? 'destructive' : 'secondary'}>
          Độ khó: {recipe.difficulty === 'Easy' ? 'Dễ làm' : recipe.difficulty === 'Hard' ? 'Kỳ công' : 'Trung bình'}
        </Badge>
        <span className="text-xs text-stone-400">•</span>
        <div className="flex items-center gap-1 text-xs text-stone-500">
          <Calendar className="h-3.5 w-3.5" />
          <span>{new Date(recipe.createdAt).toLocaleDateString('vi-VN')}</span>
        </div>
      </div>

      {/* Main Recipe Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight dark:text-stone-50">
        {recipe.title}
      </h1>

      {/* Recipe Description */}
      <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-4xl">
        {recipe.description}
      </p>

      {/* Author Bar & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-stone-200/80 dark:border-stone-800">
        {/* Author info */}
        <div className="flex items-center gap-3">
          <Avatar
            src={null}
            fallback={(recipe.authorName || 'Đ')[0]}
            size="lg"
            className="border-2 border-amber-500"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base">
                {recipe.authorName || 'Bếp Trưởng'}
              </span>
              <button
                type="button"
                onClick={() => setIsFollowing(!isFollowing)}
                className={cn(
                  'text-xs font-semibold px-2 py-0.5 rounded-full transition-colors',
                  isFollowing
                    ? 'bg-stone-200 text-stone-700 dark:bg-stone-800'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                )}
              >
                {isFollowing ? 'Đang theo dõi' : '+ Theo dõi'}
              </button>
            </div>
            <p className="text-xs text-stone-500">Người sáng tạo công thức • 42 món ăn</p>
          </div>
        </div>

        {/* Action Buttons: Bookmark, Share, Print */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={cn('gap-1.5 text-xs', isBookmarked && 'bg-amber-50 text-amber-800 border-amber-300')}
          >
            <Bookmark className={cn('h-4 w-4', isBookmarked && 'fill-amber-600 text-amber-600')} />
            <span>{isBookmarked ? 'Đã lưu' : 'Lưu công thức'}</span>
          </Button>

          <Button variant="outline" size="sm" onClick={handleShare} className="gap-1.5 text-xs">
            {isCopied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
            <span>{isCopied ? 'Đã sao chép' : 'Chia sẻ'}</span>
          </Button>

          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-1.5 text-xs hidden sm:inline-flex">
            <Printer className="h-4 w-4" />
            <span>In</span>
          </Button>
        </div>
      </div>

      {/* Hero Cover Image */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg border border-stone-200/80 dark:border-stone-800 bg-stone-100">
        <Image
          src={activeImage.previewSrc}
          alt={activeImage.alt}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
        />
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          aria-label={`Phóng to ảnh ${activeImage.alt}`}
          className="absolute inset-0 z-[1] cursor-zoom-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Floating rating badge */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span>{recipe.averageRating?.toFixed(1) || '4.9'}</span>
          <span className="text-stone-300 font-normal">({recipe.reviewCount || 0} nhận xét)</span>
        </div>
        {galleryImages.length > 1 && (
          <span className="absolute bottom-4 right-4 z-10 rounded-md bg-black/60 px-2.5 py-1.5 text-xs font-medium text-white">
            {activeImageIndex + 1} / {galleryImages.length}
          </span>
        )}
      </div>
      </div>

      <DialogContent
        role="dialog"
        aria-modal="true"
        aria-label={`Ảnh công thức: ${activeImage.alt}`}
        className="max-w-6xl border-stone-700 bg-stone-950 p-3 text-white"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{activeImage.alt}</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-black sm:aspect-video">
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain"
          />
          {galleryImages.length > 1 && (
            <>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                aria-label="Ảnh trước"
                onClick={() => showAdjacentImage(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                aria-label="Ảnh tiếp theo"
                onClick={() => showAdjacentImage(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
        {galleryImages.length > 1 && (
          <p className="text-center text-xs text-stone-300" aria-live="polite">
            Ảnh {activeImageIndex + 1} / {galleryImages.length}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
