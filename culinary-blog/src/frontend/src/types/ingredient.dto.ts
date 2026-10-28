/**
 * DTO đại diện cho nguyên liệu món ăn (RecipeIngredient)
 * Tương ứng với RecipeIngredientDto trong Backend
 */
export interface RecipeIngredientDto {
  id: string;
  recipeId?: string;
  name: string;
  quantity?: number | null;
  unit?: string | null;
  notes?: string | null;
  orderIndex: number;
}

export interface CreateIngredientRequest {
  name: string;
  quantity?: number | null;
  unit?: string | null;
  orderIndex?: number;
}

export interface UpdateIngredientRequest {
  id: string;
  name: string;
  quantity?: number | null;
  unit?: string | null;
  orderIndex?: number;
}
