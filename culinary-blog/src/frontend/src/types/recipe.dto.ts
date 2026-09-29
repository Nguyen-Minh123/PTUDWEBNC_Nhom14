/**
/// <summary>
/// DTO đại diện cho công thức tóm tắt dùng trên giao diện danh sách, tìm kiếm và phân trang
/// Đồng bộ 100% với RecipeSummaryDto tại Backend .NET (sử dụng Mapster ProjectToType)
/// </summary>
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
  name: string;
  quantity?: number | null;
  unit?: string | null;
  orderIndex: number;
}

export interface RecipeStepDto {
  id: string;
  stepNumber: number;
  instruction: string;
  imageUrl?: string | null;
}

export interface RecipeDetailDto extends RecipeSummaryDto {
  instructions: string;
  ingredients: RecipeIngredientDto[];
  steps: RecipeStepDto[];
  images: Array<{
    id: string;
    originalUrl: string;
    mediumUrl?: string | null;
    thumbnailUrl?: string | null;
    altText?: string | null;
    isPrimary: boolean;
  }>;
}

export interface RecipeSearchParams {
  keyword?: string;
  categoryId?: string;
  difficulty?: string;
  sort?: string; // Ví dụ: "-createdAt", "title", "-prepTime"
  page?: number;
  pageSize?: number;
}
