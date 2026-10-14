import { useQuery } from '@tanstack/react-query';
import { CategoryDto } from '@/types/category.dto';
import apiClient from '@/lib/axios';

export const CATEGORIES_QUERY_KEY = 'categories';

const FALLBACK_CATEGORIES: CategoryDto[] = [
  { id: 'cat-1', name: 'Món Nước & Bún Phở', slug: 'mon-nuoc-bun-pho', orderIndex: 1, recipeCount: 12 },
  { id: 'cat-2', name: 'Món Chiên & Xào', slug: 'mon-chien-xao', orderIndex: 2, recipeCount: 8 },
  { id: 'cat-3', name: 'Món Kho & Hầm', slug: 'mon-kho-ham', orderIndex: 3, recipeCount: 15 },
  { id: 'cat-4', name: 'Món Nướng & BBQ', slug: 'mon-nuong-bbq', orderIndex: 4, recipeCount: 6 },
  { id: 'cat-5', name: 'Món Canh & Súp', slug: 'mon-canh-sup', orderIndex: 5, recipeCount: 9 },
  { id: 'cat-6', name: 'Món Cuốn & Gỏi', slug: 'mon-cuon-goi', orderIndex: 6, recipeCount: 7 },
  { id: 'cat-7', name: 'Tráng Miệng & Chè', slug: 'trang-mieng-che', orderIndex: 7, recipeCount: 10 },
];

/**
 * Hook truy vấn danh mục ẩm thực có cache dài hạn
 */
export function useCategories() {
  return useQuery<CategoryDto[], Error>({
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn: async () => {
      try {
        const response = await apiClient.get<CategoryDto[]>('/api/v1/categories');
        return response.data;
      } catch {
        return FALLBACK_CATEGORIES;
      }
    },
    staleTime: 10 * 60 * 1000, // Danh mục ít thay đổi, cache 10 phút
  });
}
