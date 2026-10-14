/**
 * DTO đại diện cho các bước thực hiện món ăn (RecipeStep)
 * Tương ứng với RecipeStepDto trong Backend
 */
export interface RecipeStepDto {
  id: string;
  recipeId?: string;
  stepNumber: number;
  instruction: string;
  imageUrl?: string | null;
}

export interface CreateStepRequest {
  stepNumber: number;
  instruction: string;
  imageUrl?: string | null;
}

export interface UpdateStepRequest {
  id: string;
  stepNumber: number;
  instruction: string;
  imageUrl?: string | null;
}
