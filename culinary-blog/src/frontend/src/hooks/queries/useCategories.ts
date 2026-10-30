import { useQuery } from '@tanstack/react-query';
import { CategoryDto } from '@/types/category.dto';
import apiClient from '@/lib/axios';

export const CATEGORIES_QUERY_KEY = 'categories';

const FALLBACK_CATEGORIES: CategoryDto[] = [
  {
    id: 'mon-viet',
    name: 'Món Việt',
    slug: 'mon-viet',
    description: 'Nhóm món ăn truyền thống, gần gũi và phù hợp khẩu vị hàng ngày.',
    orderIndex: 1,
    recipeCount: 42,
  },
  {
    id: 'mon-a',
    name: 'Món Á',
    slug: 'mon-a',
    description: 'Các công thức châu Á với hương vị đậm đà, đa dạng nguyên liệu.',
    orderIndex: 2,
    recipeCount: 31,
  },
  {
    id: 'mon-au',
    name: 'Món Âu',
    slug: 'mon-au',
    description: 'Những món Âu tinh giản, đẹp mắt và phù hợp bữa tối hiện đại.',
    orderIndex: 3,
    recipeCount: 24,
  },
];

async function fetchCategories(): Promise<CategoryDto[]> {
  const response = await apiClient.get<CategoryDto[]>('/categories');
  return response.data;
}

/**
 * Hook truy vấn danh mục ẩm thực có cache dài hạn
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        return await fetchCategories();
      } catch (error) {
        console.warn('[useCategories] API unreachable, using fallback categories.');
        return FALLBACK_CATEGORIES;
      }
    },
    staleTime: 5 * 60 * 1000, // Danh mục ít thay đổi, cache 10 phút
    refetchOnWindowFocus: false,
    retry: false,
  });
}

