/**
 * DTO đại diện cho hình ảnh công thức (RecipeImage)
 * Tương ứng với RecipeImageDto trong Backend
 */
export interface RecipeImageDto {
  id: string;
  recipeId?: string;
  originalUrl: string;
  mediumUrl?: string | null;
  thumbnailUrl?: string | null;
  altText?: string | null;
  isPrimary: boolean;
  orderIndex?: number;
}

export interface UploadImageResponse {
  id: string;
  originalUrl: string;
  mediumUrl?: string | null;
  thumbnailUrl?: string | null;
  altText?: string | null;
  isPrimary: boolean;
}
