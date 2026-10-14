import { RecipeIngredientDto } from './ingredient.dto';
import { RecipeStepDto } from './step.dto';
import { RecipeImageDto } from './image.dto';

export type RecipeDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';
export type RecipeStatus = 'Draft' | 'Published' | 'Archived';

/**
 * 6 chỉ số dinh dưỡng chính (FR-DVO-002)
 */
export interface RecipeNutritionDto {
  calories: number;
  proteinGrams: number;
  fatGrams: number;
  carbsGrams: number;
  fiberGrams?: number;
  sodiumMg?: number;
  // Bổ sung các trường tùy chọn cho tương thích ngược
  fat?: number | null;
  saturatedFat?: number | null;
  carbohydrates?: number | null;
  sugar?: number | null;
  fiber?: number | null;
  protein?: number | null;
  sodium?: number | null;
}

/**
 * DTO đại diện cho công thức tóm tắt dùng trên giao diện danh sách, tìm kiếm và phân trang
 * Đồng bộ 100% với RecipeSummaryDto tại Backend .NET (Mapster ProjectToType)
 */
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
  nutrition?: RecipeNutritionDto | null;
}

/**
 * DTO đại diện cho chi tiết toàn bộ công thức bao gồm nguyên liệu, các bước và hình ảnh
 */
export interface RecipeDetailDto extends RecipeSummaryDto {
  instructions?: string;
  ingredients: RecipeIngredientDto[];
  steps: RecipeStepDto[];
  images: RecipeImageDto[];
  rowVersion?: string;
}

export interface CreateRecipeRequest {
  title: string;
  description: string;
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  prepTime?: number;
  cookTime?: number;
  servings: number;
  difficulty: RecipeDifficulty | string;
  categoryId: string;
  instructions?: string;
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
  id?: string;
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

// Aliases
export type RecipeDto = RecipeDetailDto;
export type RecipeListDto = RecipeSummaryDto;
