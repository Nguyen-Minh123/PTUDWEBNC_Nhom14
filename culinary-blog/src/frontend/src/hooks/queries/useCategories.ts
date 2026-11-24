import { useQuery } from '@tanstack/react-query';
import { CategoryDto } from '@/types/category.dto';
import { REAL_CATEGORIES } from '@/services/recipeService';
import apiClient from '@/lib/axios';

export const CATEGORIES_QUERY_KEY = 'categories';

async function fetchCategories(): Promise<CategoryDto[]> {
  const response = await apiClient.get<CategoryDto[]>('/api/v1/categories');
  const items = Array.isArray(response.data) ? response.data : (response.data as any)?.items || [];
  return items.length > 0 ? items : REAL_CATEGORIES;
}

/**
 * Hook truy vấn 12 danh mục ẩm thực thực tế có cache dài hạn
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        return await fetchCategories();
      } catch {
        return REAL_CATEGORIES;
      }
    },
    initialData: REAL_CATEGORIES,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
