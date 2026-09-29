/**
/// <summary>
/// DTO đại diện cho danh mục công thức
/// Đồng bộ với CategoryDto tại Backend .NET
/// </summary>
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
