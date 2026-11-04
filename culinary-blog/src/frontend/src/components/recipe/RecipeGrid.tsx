'use client';

import * as React from 'react';
import { RecipeSummaryDto } from '@/types';
import { RecipeCard } from './RecipeCard';
import { RecipeCardSkeleton } from './RecipeCardSkeleton';
import { EmptyState } from '@/components/feedback/EmptyState';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  UtensilsCrossed,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export interface RecipeGridProps {
  /** Danh sách tóm tắt các công thức nấu ăn cần hiển thị */
  recipes: RecipeSummaryDto[];
  /** Trạng thái đang tải dữ liệu (sẽ hiển thị danh sách skeleton cards) */
  isLoading?: boolean;
  /** Số trang hiện tại (1-indexed) */
  pageNumber?: number;
  /** Số công thức trên một trang */
  pageSize?: number;
  /** Tổng số công thức tìm thấy */
  totalCount?: number;
  /** Tổng số trang */
  totalPages?: number;
  /** Có trang trước đó hay không */
  hasPreviousPage?: boolean;
  /** Có trang kế tiếp hay không */
  hasNextPage?: boolean;
  /** Hàm callback khi người dùng chọn chuyển trang */
  onPageChange?: (pageNumber: number) => void;
  /** Hàm callback kích hoạt modal xem nhanh chi tiết công thức */
  onQuickView?: (recipe: RecipeSummaryDto) => void;
  /** Số cột hiển thị trên màn hình lớn (2, 3 hoặc 4 cột, mặc định 3) */
  columns?: 2 | 3 | 4;
  /** Số lượng skeleton hiển thị trong trạng thái loading */
  skeletonCount?: number;
  /** Tiêu đề hiển thị khi danh sách trống */
  emptyTitle?: string;
  /** Mô tả chi tiết khi không có dữ liệu */
  emptyDescription?: string;
  /** Hàm callback khi bấm đặt lại bộ lọc ở trạng thái trống */
  onResetFilter?: () => void;
  /** Tùy biến class container */
  className?: string;
  /** ID của vùng grid để tự động cuộn lên khi chuyển trang */
  scrollTargetId?: string;
}

/**
 * Component RecipeGrid chuẩn hóa hiển thị danh sách công thức nấu ăn:
 * - Hỗ trợ bố cục lưới responsive linh hoạt (2, 3, 4 cột)
 * - Tích hợp trạng thái Loading (Skeleton cards)
 * - Tích hợp trạng thái Trống (EmptyState kèm nút Đặt lại bộ lọc)
 * - Tích hợp bộ điều khiển phân trang (Pagination) thông minh dạng số trang & nút tiến/lùi
 */
export function RecipeGrid({
  recipes,
  isLoading = false,
  pageNumber = 1,
  pageSize = 6,
  totalCount,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
  onQuickView,
  columns = 3,
  skeletonCount = 6,
  emptyTitle = 'Chưa tìm thấy công thức nào',
  emptyDescription = 'Hãy thử điều chỉnh bộ lọc, chọn danh mục khác hoặc xóa từ khóa tìm kiếm để khám phá nhiều món ngon hơn.',
  onResetFilter,
  className,
  scrollTargetId,
}: RecipeGridProps) {
  // Tính toán tổng số trang nếu chưa truyền từ ngoài
  const computedTotalPages = React.useMemo(() => {
    if (typeof totalPages === 'number') return totalPages;
    if (typeof totalCount === 'number' && pageSize > 0) {
      return Math.ceil(totalCount / pageSize);
    }
    return 1;
  }, [totalPages, totalCount, pageSize]);

  const canGoPrevious = hasPreviousPage ?? pageNumber > 1;
  const canGoNext = hasNextPage ?? pageNumber < computedTotalPages;

  // Xử lý chuyển trang và cuộn mượt lên đầu danh sách
  const handlePageSelect = (page: number) => {
    if (page < 1 || page > computedTotalPages || page === pageNumber) return;
    onPageChange?.(page);

    if (scrollTargetId) {
      const el = document.getElementById(scrollTargetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
  };

  // Tạo dải số phân trang thông minh (vd: [1, 2, 3, '...', 10])
  const paginationRange = React.useMemo(() => {
    const total = computedTotalPages;
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const range: (number | string)[] = [];
    if (pageNumber <= 3) {
      range.push(1, 2, 3, 4, '...', total);
    } else if (pageNumber >= total - 2) {
      range.push(1, '...', total - 3, total - 2, total - 1, total);
    } else {
      range.push(1, '...', pageNumber - 1, pageNumber, pageNumber + 1, '...', total);
    }
    return range;
  }, [computedTotalPages, pageNumber]);

  // Cấu hình số cột dạng responsive
  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns];

  // 1. Trạng thái Loading
  if (isLoading) {
    return (
      <div className={cn('w-full space-y-6', className)}>
        <div className={cn('grid gap-6', columnClasses)}>
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <RecipeCardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </div>
    );
  }

  // 2. Trạng thái Trống (Empty State)
  if (!recipes || recipes.length === 0) {
    return (
      <div className={cn('w-full py-12 px-4 rounded-3xl border border-dashed border-stone-300 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40', className)}>
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          icon={
            <div className="h-16 w-16 mx-auto rounded-2xl bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <UtensilsCrossed className="h-8 w-8" />
            </div>
          }
        >
          {onResetFilter && (
            <div className="mt-6 flex justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={onResetFilter}
                className="gap-2 border-amber-300 hover:bg-amber-50 hover:text-amber-800 dark:border-amber-900"
              >
                <RotateCcw className="h-4 w-4 text-amber-600" />
                <span>Đặt lại bộ lọc tìm kiếm</span>
              </Button>
            </div>
          )}
        </EmptyState>
      </div>
    );
  }

  // 3. Trạng thái Hiển thị danh sách công thức + Phân trang
  return (
    <div className={cn('w-full space-y-8', className)}>
      {/* Grid danh sách thẻ RecipeCard */}
      <div className={cn('grid gap-6', columnClasses)}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onQuickView={onQuickView}
          />
        ))}
      </div>

      {/* Bộ điều khiển Phân trang (Pagination Bar) */}
      {computedTotalPages > 1 && (
        <nav
          aria-label="Điều hướng phân trang công thức"
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-stone-200/80 dark:border-stone-800"
        >
          {/* Thông số vị trí trang */}
          <p className="text-xs text-stone-500 dark:text-stone-400 order-2 sm:order-1 font-medium">
            {totalCount ? (
              <>
                Hiển thị{' '}
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  {Math.min((pageNumber - 1) * pageSize + 1, totalCount)}
                </span>{' '}
                -{' '}
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  {Math.min(pageNumber * pageSize, totalCount)}
                </span>{' '}
                trong tổng số{' '}
                <span className="font-semibold text-amber-700 dark:text-amber-400">
                  {totalCount}
                </span>{' '}
                công thức
              </>
            ) : (
              <>
                Trang <span className="font-semibold text-stone-800">{pageNumber}</span> /{' '}
                <span className="font-semibold text-stone-800">{computedTotalPages}</span>
              </>
            )}
          </p>

          {/* Các nút bấm phân trang */}
          <div className="flex items-center gap-1.5 order-1 sm:order-2">
            {/* Nút lùi về trang trước */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!canGoPrevious}
              onClick={() => handlePageSelect(pageNumber - 1)}
              aria-label="Trang trước"
              className="h-9 px-3 gap-1 text-xs font-semibold rounded-xl border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Trước</span>
            </Button>

            {/* Dãy số trang */}
            <div className="flex items-center gap-1">
              {paginationRange.map((item, idx) => {
                if (typeof item === 'string') {
                  return (
                    <span
                      key={`ellipsis-${idx}`}
                      className="px-2 py-1 text-xs font-bold text-stone-400"
                    >
                      ...
                    </span>
                  );
                }

                const isCurrent = item === pageNumber;
                return (
                  <Button
                    key={`page-${item}`}
                    type="button"
                    variant={isCurrent ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handlePageSelect(item)}
                    aria-current={isCurrent ? 'page' : undefined}
                    aria-label={`Đi tới trang ${item}`}
                    className={cn(
                      'h-9 w-9 p-0 text-xs font-bold rounded-xl transition-all',
                      isCurrent
                        ? 'bg-amber-600 text-white shadow-sm hover:bg-amber-700 pointer-events-none'
                        : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800'
                    )}
                  >
                    {item}
                  </Button>
                );
              })}
            </div>

            {/* Nút tiến tới trang kế tiếp */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!canGoNext}
              onClick={() => handlePageSelect(pageNumber + 1)}
              aria-label="Trang kế tiếp"
              className="h-9 px-3 gap-1 text-xs font-semibold rounded-xl border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40"
            >
              <span className="hidden sm:inline">Sau</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </nav>
      )}
    </div>
  );
}
