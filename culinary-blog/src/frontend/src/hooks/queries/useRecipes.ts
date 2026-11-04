import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RecipeSearchParams, RecipeSummaryDto, RecipeDetailDto } from '@/types/recipe.dto';
import { PagedResult } from '@/types/paged-result.dto';
import { searchRecipes } from '@/services/recipeService';
import { recipeManagementService } from '@/services/recipeManagementService';
import apiClient, { extractErrorMessage } from '@/lib/axios';

export const RECIPES_QUERY_KEY = 'recipes';
export const RECIPE_DETAIL_QUERY_KEY = 'recipeDetail';

/**
 * Hook truy vấn danh sách công thức có hỗ trợ caching và phân trang
 */
export function useRecipes(params: RecipeSearchParams) {
  return useQuery<PagedResult<RecipeSummaryDto>, Error>({
    queryKey: [RECIPES_QUERY_KEY, params],
    queryFn: async () => {
      try {
        const query = new URLSearchParams();
        if (params.keyword) query.append('keyword', params.keyword);
        if (params.categoryId && params.categoryId !== 'all') query.append('categoryId', params.categoryId);
        if (params.difficulty && params.difficulty !== 'all') query.append('difficulty', params.difficulty);
        if (params.sort) query.append('sort', params.sort);
        if (params.page) query.append('page', params.page.toString());
        if (params.pageSize) query.append('pageSize', params.pageSize.toString());

        const response = await apiClient.get<PagedResult<RecipeSummaryDto>>(`/api/v1/recipes?${query.toString()}`);
        return response.data;
      } catch (err) {
        console.warn('[useRecipes] API fallback to local search:', extractErrorMessage(err));
        return searchRecipes(params);
      }
    },
    placeholderData: (previousData: PagedResult<RecipeSummaryDto> | undefined) => previousData,
  });
}

/**
 * Hook truy vấn chi tiết công thức theo ID hoặc Slug
 */
export function useRecipeDetail(idOrSlug: string) {
  return useQuery<RecipeDetailDto | null, Error>({
    queryKey: [RECIPE_DETAIL_QUERY_KEY, idOrSlug],
    queryFn: async () => {
      if (!idOrSlug) return null;
      try {
        const response = await apiClient.get<RecipeDetailDto>(`/api/v1/recipes/${idOrSlug}`);
        return response.data;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          return null;
        }

        throw err;
      }
    },
    enabled: Boolean(idOrSlug),
  });
}

/**
 * Hook xóa công thức với auto-invalidation cache
 */
export function useDeleteRecipeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recipeId: string) => {
      try {
        await apiClient.delete(`/api/v1/recipes/${recipeId}`);
      } catch {
        await recipeManagementService.deleteRecipe(recipeId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RECIPES_QUERY_KEY] });
    },
  });
}
