/**
 * DTO đại diện cho danh mục công thức
 * Đồng bộ với CategoryDto tại Backend .NET
 */
export interface CategoryDto {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  orderIndex: number;
  recipeCount: number;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  orderIndex?: number;
}

export interface UpdateCategoryRequest {
  id: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  orderIndex?: number;
}
