import { RecipeDetailDto, RecipeSummaryDto } from '../types';
import { INITIAL_RECIPES, CATEGORIES, saveUserRecipeDetailLocal } from './recipeService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5075';

export interface CreateRecipePayload {
  title: string;
  description: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  categoryId?: string;
  instructions?: string;
}

export interface CreateIngredientPayload {
  name: string;
  quantity: number;
  unit: string;
  notes?: string;
  orderIndex: number;
}

export interface CreateStepPayload {
  stepNumber: number;
  title: string;
  description: string;
  timerMinutes?: number;
  imageUrl?: string;
}

export interface FullRecipeSubmission {
  basics: CreateRecipePayload;
  ingredients: CreateIngredientPayload[];
  steps: CreateStepPayload[];
  imageUrl?: string;
  images?: File[];
  publishImmediately?: boolean;
}

export interface UpdateRecipeSubmission {
  id: string;
  title: string;
  slug?: string;
  description: string;
  instructions?: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  categoryId: string;
  nutrition?: {
    calories?: number | null;
    protein?: number | null;
    carbohydrates?: number | null;
    fat?: number | null;
    fiber?: number | null;
    sodium?: number | null;
  } | null;
  rowVersion?: number | string | null;
  ingredients?: CreateIngredientPayload[];
  steps?: CreateStepPayload[];
  images?: File[];
  existingImageUrls?: string[];
}

// Key lưu trữ cục bộ cho các công thức tạo mới (fallback)
const STORAGE_KEY = 'culinary_blog_user_recipes_v1';

function getStoredRecipes(): RecipeSummaryDto[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredRecipes(recipes: RecipeSummaryDto[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  } catch {
    // ignore
  }
}

export const recipeManagementService = {
  /**
   * Tạo công thức hoàn chỉnh (FR-FTE-009 & FR-FTE-010 & FR-FTE-049)
   * Tạo Recipe -> Thêm Ingredients -> Thêm Steps -> Đặt ảnh -> Xuất bản (nếu chọn)
   */
  async submitFullRecipe(
    data: FullRecipeSubmission,
    token?: string
  ): Promise<{ success: boolean; recipeId: string; slug: string; message?: string }> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    // Kiểm tra quy tắc nghiệp vụ Domain: Phải có ít nhất 1 nguyên liệu và 1 bước nếu Publish
    if (data.publishImmediately) {
      if (!data.ingredients || data.ingredients.length === 0) {
        throw new Error('RECIPE_PUBLISH_INCOMPLETE: Công thức cần ít nhất 1 nguyên liệu để được phép xuất bản.');
      }
      if (!data.steps || data.steps.length === 0) {
        throw new Error('RECIPE_PUBLISH_INCOMPLETE: Công thức cần ít nhất 1 bước thực hiện để được phép xuất bản.');
      }
    }

    try {
      // 1. Tạo Recipe cơ bản
      const resCreate = await fetch(`${API_BASE_URL}/api/v1/recipes`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data.basics),
      });

      if (resCreate.ok) {
        const createdRecipe: RecipeDetailDto = await resCreate.json();
        const recipeId = createdRecipe.id;

        // 2. Thêm từng nguyên liệu
        for (const ing of data.ingredients) {
          await fetch(`${API_BASE_URL}/api/v1/recipes/${recipeId}/ingredients`, {
            method: 'POST',
            headers,
            body: JSON.stringify(ing),
          });
        }

        // 3. Thêm từng bước thực hiện
        for (const step of data.steps) {
          await fetch(`${API_BASE_URL}/api/v1/recipes/${recipeId}/steps`, {
            method: 'POST',
            headers,
            body: JSON.stringify(step),
          });
        }

        // 4. Tải lên hình ảnh thực tế nếu có
        if (data.images && data.images.length > 0) {
          for (let i = 0; i < data.images.length; i++) {
            await this.uploadRecipeImage(recipeId, data.images[i], i === 0, token);
          }
        }

        // 5. Xuất bản nếu được yêu cầu
        if (data.publishImmediately) {
          await fetch(`${API_BASE_URL}/api/v1/recipes/${recipeId}/publish`, {
            method: 'POST',
            headers,
          });
        }

        return {
          success: true,
          recipeId,
          slug: createdRecipe.slug,
          message: data.publishImmediately ? 'Đã xuất bản công thức thành công!' : 'Đã lưu bản nháp thành công!',
        };
      }
    } catch {
      // Nếu Backend chưa chạy, tiếp tục xử lý lưu cục bộ
    }

    // Fallback lưu trữ cục bộ khi Backend offline
    const fallbackId = 'recipe-' + Date.now();
    const fallbackSlug = data.basics.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const catObj = CATEGORIES.find((c) => c.id === data.basics.categoryId) || CATEGORIES[1];

    const newRecipeSummary: RecipeSummaryDto = {
      id: fallbackId,
      title: data.basics.title,
      slug: fallbackSlug,
      description: data.basics.description,
      prepTime: data.basics.prepTimeMinutes,
      cookTime: data.basics.cookTimeMinutes,
      totalTime: data.basics.prepTimeMinutes + data.basics.cookTimeMinutes,
      servings: data.basics.servings,
      difficulty: data.basics.difficulty,
      status: data.publishImmediately ? 'Published' : 'Draft',
      categoryId: catObj.id,
      categoryName: catObj.name,
      authorId: 'chef-hieu-id',
      authorName: 'Chef Bùi Trung Hiếu',
      coverImageUrl:
        data.imageUrl ||
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString(),
      averageRating: 5.0,
      reviewCount: 1,
    };

    const currentList = getStoredRecipes();
    saveStoredRecipes([newRecipeSummary, ...currentList]);

    saveUserRecipeDetailLocal({
      ...newRecipeSummary,
      instructions: data.steps.map((s) => `Bước ${s.stepNumber}: ${s.description}`).join('\n'),
      ingredients: data.ingredients.map((ing, i) => ({
        id: `${fallbackId}-ing-${i + 1}`,
        name: ing.name,
        quantity: ing.quantity,
        unit: ing.unit,
        notes: ing.notes,
        orderIndex: ing.orderIndex || i + 1,
      })),
      steps: data.steps.map((st, i) => ({
        id: `${fallbackId}-step-${i + 1}`,
        stepNumber: st.stepNumber || i + 1,
        title: st.title,
        description: st.description,
        timerMinutes: st.timerMinutes,
        imageUrl: st.imageUrl || newRecipeSummary.coverImageUrl,
      })),
      images: [
        {
          id: `${fallbackId}-img-1`,
          originalUrl: newRecipeSummary.coverImageUrl || '',
          mediumUrl: newRecipeSummary.coverImageUrl || '',
          thumbnailUrl: newRecipeSummary.coverImageUrl || '',
          altText: newRecipeSummary.title,
          isPrimary: true,
          orderIndex: 0,
        },
      ],
    });

    return {
      success: true,
      recipeId: fallbackId,
      slug: fallbackSlug,
      message: data.publishImmediately
        ? 'Đã xuất bản công thức (Đã lưu vào danh sách của bạn)!'
        : 'Đã lưu bản nháp thành công!',
    };
  },

  /**
   * Cập nhật Recipe kèm Concurrency Token (RowVersion) (FR-FTE-050)
   */
  async updateRecipe(
    id: string,
    data: UpdateRecipeSubmission,
    token?: string
  ): Promise<{ success: boolean; data?: RecipeDetailDto; isConflict?: boolean; message?: string }> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const rowVersionNumber =
      data.rowVersion !== null && data.rowVersion !== undefined
        ? Number(data.rowVersion)
        : undefined;

    const payload = {
      id,
      title: data.title,
      slug: data.slug || data.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, ''),
      description: data.description,
      instructions: data.instructions || '',
      prepTime: data.prepTime,
      cookTime: data.cookTime,
      servings: data.servings,
      difficulty: data.difficulty,
      categoryId: data.categoryId,
      nutrition: data.nutrition,
      rowVersion: rowVersionNumber,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/recipes/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload),
      });

      if (res.status === 409) {
        return {
          success: false,
          isConflict: true,
          message: 'Xung đột dữ liệu: Công thức đã được sửa đổi bởi người dùng hoặc phiên khác. Vui lòng tải lại dữ liệu mới nhất.',
        };
      }

      if (res.ok) {
        const updated = await res.json();

        // Tải lên thêm hình ảnh mới nếu có
        if (data.images && data.images.length > 0) {
          for (let i = 0; i < data.images.length; i++) {
            await this.uploadRecipeImage(id, data.images[i], false, token);
          }
        }

        return {
          success: true,
          data: updated,
          message: 'Cập nhật công thức thành công!',
        };
      }

      const errText = await res.text();
      return {
        success: false,
        message: errText || 'Cập nhật công thức thất bại.',
      };
    } catch (err: any) {
      console.warn('[updateRecipe] API offline, updating local cache:', err);
    }

    // Local fallback update
    const list = getStoredRecipes();
    const index = list.findIndex((r) => r.id === id);
    if (index !== -1) {
      const updatedItem: RecipeSummaryDto = {
        ...list[index],
        title: data.title,
        description: data.description,
        prepTime: data.prepTime,
        cookTime: data.cookTime,
        totalTime: data.prepTime + data.cookTime,
        servings: data.servings,
        difficulty: data.difficulty,
        categoryId: data.categoryId,
      };
      list[index] = updatedItem;
      saveStoredRecipes(list);
    }

    return {
      success: true,
      message: 'Đã lưu cập nhật công thức thành công (Bộ nhớ cục bộ)!',
    };
  },

  /**
   * Upload hình ảnh cho công thức (FR-INF-003 / FR-FTE-010 / FR-FTE-049)
   */
  async uploadRecipeImage(
    recipeId: string,
    file: File,
    isPrimary: boolean = true,
    token?: string
  ): Promise<{ imageUrl: string }> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('altText', file.name);
      formData.append('orderIndex', '1');
      if (isPrimary) {
        formData.append('isPrimary', 'true');
      }

      const res = await fetch(`${API_BASE_URL}/api/v1/recipes/${recipeId}/images`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        return { imageUrl: result.originalUrl || result.imageUrl };
      }
    } catch {
      // Fallback object URL
    }

    return { imageUrl: URL.createObjectURL(file) };
  },

  /**
   * Lấy danh sách công thức của người dùng hiện tại (FR-FTE-008)
   */
  async getUserRecipes(authorId?: string): Promise<RecipeSummaryDto[]> {
    const normalizedAuthorId =
      authorId === 'user-hieu-02' || authorId === 'chef-hieu-lab4'
        ? 'chef-hieu-id'
        : authorId === 'user-admin-01'
        ? 'admin-user-id'
        : authorId;

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/recipes?page=1&pageSize=100`);
      if (res.ok) {
        const data = await res.json();
        const serverItems: RecipeSummaryDto[] = data.items || [];
        const localItems = getStoredRecipes();
        const combined = [...localItems, ...serverItems];
        if (normalizedAuthorId) {
          const filtered = combined.filter((r) => r.authorId === normalizedAuthorId);
          if (filtered.length > 0) return filtered;
        }
        return combined;
      }
    } catch {
      // ignore
    }

    const localItems = getStoredRecipes();
    const fallbackItems = normalizedAuthorId
      ? INITIAL_RECIPES.filter((r) => r.authorId === normalizedAuthorId)
      : getInitialChefRecipes();
    const seen = new Set(localItems.map((r) => r.id));
    return [...localItems, ...fallbackItems.filter((r) => !seen.has(r.id))];
  },

  /**
   * Xuất bản công thức (Publish) (FR-FTE-051)
   */
  async publishRecipe(recipeId: string, token?: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/recipes/${recipeId}/publish`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) return true;
    } catch {
      // ignore
    }

    // Cập nhật trạng thái trong storage
    const list = getStoredRecipes();
    const updated = list.map((r) => (r.id === recipeId ? { ...r, status: 'Published' } : r));
    saveStoredRecipes(updated);
    return true;
  },

  /**
   * Lưu trữ công thức (Archive) (FR-FTE-051)
   */
  async archiveRecipe(recipeId: string, token?: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/recipes/${recipeId}/archive`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) return true;
    } catch {
      // ignore
    }

    const list = getStoredRecipes();
    const updated = list.map((r) => (r.id === recipeId ? { ...r, status: 'Archived' } : r));
    saveStoredRecipes(updated);
    return true;
  },

  /**
   * Xóa mềm công thức (Delete) (FR-FTE-051)
   */
  async deleteRecipe(recipeId: string, token?: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) return true;
    } catch {
      // ignore
    }

    const list = getStoredRecipes();
    const filtered = list.filter((r) => r.id !== recipeId);
    saveStoredRecipes(filtered);
    return true;
  },
};

function getInitialChefRecipes(): RecipeSummaryDto[] {
  return INITIAL_RECIPES.filter((r) => r.authorId === 'chef-hieu-id');
}
