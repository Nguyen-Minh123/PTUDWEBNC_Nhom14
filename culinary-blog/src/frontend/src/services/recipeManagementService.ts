import { RecipeDetailDto, RecipeSummaryDto } from '../types';

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
  publishImmediately?: boolean;
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
   * Tạo công thức hoàn chỉnh (FR-FTE-009 & FR-FTE-010)
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

        // 4. Xuất bản nếu được yêu cầu
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
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

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
      categoryId: data.basics.categoryId || 'cat-1',
      categoryName: 'Món Tự Nấu',
      authorId: 'chef-hieu-lab4',
      authorName: 'Bùi Trung Hiếu',
      coverImageUrl:
        data.imageUrl ||
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString(),
      averageRating: 5.0,
      reviewCount: 0,
    };

    const currentList = getStoredRecipes();
    saveStoredRecipes([newRecipeSummary, ...currentList]);

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
   * Upload hình ảnh cho công thức (FR-INF-003 / FR-FTE-010)
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
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/recipes?page=1&pageSize=50`);
      if (res.ok) {
        const data = await res.json();
        const serverItems: RecipeSummaryDto[] = data.items || [];
        const localItems = getStoredRecipes();
        return [...localItems, ...serverItems];
      }
    } catch {
      // ignore
    }

    const localItems = getStoredRecipes();
    return localItems.length > 0 ? localItems : getInitialChefRecipes();
  },

  /**
   * Xuất bản công thức (Publish)
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
   * Lưu trữ công thức (Archive)
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
   * Xóa mềm công thức (Delete)
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
  return [
    {
      id: 'demo-recipe-01',
      title: 'Phở Cuốn Ngũ Sắc Hà Thành',
      slug: 'pho-cuon-ngu-sac-ha-thanh',
      description: 'Món ăn thanh mát cho mùa hè với bánh phở dẻo mềm, thịt bò xào lăn thơm phức và các loại rau gia vị xanh tươi.',
      prepTime: 20,
      cookTime: 15,
      totalTime: 35,
      servings: 4,
      difficulty: 'Easy',
      status: 'Published',
      categoryId: 'cat-5',
      categoryName: 'Món Khai Vị & Ăn Vặt',
      authorId: 'chef-hieu-lab4',
      authorName: 'Bùi Trung Hiếu',
      coverImageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
      createdAt: '2026-03-29T10:00:00Z',
      averageRating: 5.0,
      reviewCount: 12,
    },
    {
      id: 'demo-recipe-02',
      title: 'Chả Cá Lã Vọng Thì Là Giòn Rụm',
      slug: 'cha-ca-la-vong-thi-la',
      description: 'Cá lăng tẩm ướp riềng, mẻ, nghệ thơm nức mũi nướng than hoa rồi xào chảo mỡ cùng hành hoa và thì là xanh ngát.',
      prepTime: 30,
      cookTime: 25,
      totalTime: 55,
      servings: 3,
      difficulty: 'Medium',
      status: 'Draft',
      categoryId: 'cat-3',
      categoryName: 'Món Kho & Rim',
      authorId: 'chef-hieu-lab4',
      authorName: 'Bùi Trung Hiếu',
      coverImageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80',
      createdAt: '2026-04-01T08:30:00Z',
      averageRating: 4.8,
      reviewCount: 5,
    },
  ];
}
