/**
 * DTOs đại diện cho Recipe đồng bộ 100% với Backend ASP.NET Core
 */
export type RecipeDifficulty = 'Easy' | 'Medium' | 'Hard';
export type RecipeStatus = 'Draft' | 'Published' | 'Archived';

export interface RecipeSummaryDto {
  id: string;
  title: string;
  slug: string;
  description: string;
  prepTime: number; // Thời gian chuẩn bị (phút)
  cookTime: number; // Thời gian nấu (phút)
  totalTime: number; // Tổng thời gian = prepTime + cookTime
  servings: number; // Khẩu phần ăn
  difficulty: RecipeDifficulty | string;
  status: RecipeStatus | string;
  categoryId: string;
  categoryName?: string;
  authorId: string;
  authorName?: string;
  coverImageUrl?: string;
  createdAt: string;
  averageRating: number;
  reviewCount: number;
}

export interface RecipeIngredientDto {
  id: string;
  recipeId?: string;
  name: string;
  quantity?: number | null;
  unit?: string | null;
  orderIndex: number;
}

export interface RecipeStepDto {
  id: string;
  recipeId?: string;
  stepNumber: number;
  instruction: string;
  imageUrl?: string | null;
}

export interface RecipeImageDto {
  id: string;
  recipeId?: string;
  originalUrl: string;
  mediumUrl?: string | null;
  thumbnailUrl?: string | null;
  altText?: string | null;
  isPrimary: boolean;
  orderIndex: number;
}

export interface RecipeNutritionDto {
  calories?: number | null;
  fat?: number | null;
  saturatedFat?: number | null;
  carbohydrates?: number | null;
  sugar?: number | null;
  fiber?: number | null;
  protein?: number | null;
  sodium?: number | null;
}

export interface RecipeDetailDto extends RecipeSummaryDto {
  instructions: string;
  nutrition?: RecipeNutritionDto | null;
  ingredients: RecipeIngredientDto[];
  steps: RecipeStepDto[];
  images: RecipeImageDto[];
  rowVersion?: string;
}

export interface RecipeSearchParams {
  keyword?: string;
  categoryId?: string;
  difficulty?: string;
  sort?: string; // Ví dụ: "-createdAt", "title", "-prepTime"
  page?: number;
  pageSize?: number;
}

export interface CreateRecipeRequest {
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: RecipeDifficulty | string;
  categoryId: string;
  instructions: string;
  ingredients?: Array<{
    name: string;
    quantity?: number | null;
    unit?: string | null;
    orderIndex: number;
  }>;
  steps?: Array<{
    stepNumber: number;
    instruction: string;
    imageUrl?: string | null;
  }>;
}

export interface UpdateRecipeRequest extends CreateRecipeRequest {
  rowVersion?: string;
}
