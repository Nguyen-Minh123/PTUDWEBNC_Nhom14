'use client';

/**
 * Chức năng:
 * - Quản lý state tìm kiếm và lọc category.
 * - Debounce từ khóa nhập.
 * - Đồng bộ state lên query params (?q=...&category=...).
 * - Hỗ trợ reset nhanh khi cần.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/**
 * Kết quả hook useRecipeSearch.
 */
export interface UseRecipeSearchReturn {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  categoryId: string;
  setCategoryId: (value: string) => void;
  debouncedSearchTerm: string;
  hasActiveFilters: boolean;
  clearFilters: () => void;
  syncFromQuery: () => void;
}

/**
 * Hook debounce giá trị đầu vào.
 */
function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedValue(value), delayMs);
    return () => window.clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}

/**
 * useRecipeSearch
 * Gom toàn bộ logic tìm kiếm + lọc theo category + query params.
 */
export function useRecipeSearch(): UseRecipeSearchReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Khởi tạo state từ URL để refresh trang vẫn giữ bộ lọc.
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get('q') ?? '');
  const [categoryId, setCategoryId] = useState(() => searchParams.get('category') ?? '');

  // Từ khóa sau debounce để tránh gọi filter quá dày.
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 350);

  /**
   * Đồng bộ state nội bộ từ query params.
   * Dùng khi cần khôi phục lại bộ lọc theo URL hiện tại.
   */
  const syncFromQuery = useCallback(() => {
    setSearchTerm(searchParams.get('q') ?? '');
    setCategoryId(searchParams.get('category') ?? '');
  }, [searchParams]);

  /**
   * Xóa toàn bộ bộ lọc.
   */
  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setCategoryId('');
  }, []);

  /**
   * Đẩy state hiện tại lên URL để chia sẻ link được.
   * Chỉ dùng after debounce để tránh update quá nhiều.
   */
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const q = debouncedSearchTerm.trim();
    const c = categoryId.trim();

    if (q) params.set('q', q);
    else params.delete('q');

    if (c) params.set('category', c);
    else params.delete('category');

    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;
    const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

    // CHỈ replace khi URL thực sự thay đổi
    if (nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [categoryId, debouncedSearchTerm, pathname, router, searchParams]);

  /**
   * Trạng thái có filter hay không.
   */
  const hasActiveFilters = useMemo(() => {
    return searchTerm.trim().length > 0 || categoryId.trim().length > 0;
  }, [categoryId, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    categoryId,
    setCategoryId,
    debouncedSearchTerm,
    hasActiveFilters,
    clearFilters,
    syncFromQuery,
  };
}