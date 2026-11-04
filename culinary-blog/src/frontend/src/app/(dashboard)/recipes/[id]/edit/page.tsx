'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useRecipeDetail } from '@/hooks/queries/useRecipes';
import { CATEGORIES } from '@/services/recipeService';
import {
  recipeManagementService,
  UpdateRecipeSubmission,
  CreateIngredientPayload,
  CreateStepPayload,
} from '@/services/recipeManagementService';
import ImageUploader, { ExistingImage } from '@/components/upload/ImageUploader';
import {
  AlertTriangle,
  RefreshCw,
  Save,
  Trash2,
  Archive,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';

interface EditRecipePageProps {
  params: Promise<{ id: string }>;
}

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all';

export default function EditRecipePage({ params }: EditRecipePageProps) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const router = useRouter();
  const { data: session } = useSession();

  const {
    data: recipe,
    isLoading,
    isError,
    error,
    refetch,
  } = useRecipeDetail(id);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [categoryId, setCategoryId] = useState('cat-1');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | 'Expert'>('Medium');
  const [prepTime, setPrepTime] = useState(15);
  const [cookTime, setCookTime] = useState(30);
  const [servings, setServings] = useState(4);
  const [status, setStatus] = useState<'Draft' | 'Published' | 'Archived'>('Draft');

  // Nutrition state
  const [calories, setCalories] = useState<number | null>(null);
  const [protein, setProtein] = useState<number | null>(null);
  const [carbs, setCarbs] = useState<number | null>(null);
  const [fat, setFat] = useState<number | null>(null);
  const [fiber, setFiber] = useState<number | null>(null);
  const [sodium, setSodium] = useState<number | null>(null);

  // Ingredients & Steps
  const [ingredients, setIngredients] = useState<CreateIngredientPayload[]>([]);
  const [steps, setSteps] = useState<CreateStepPayload[]>([]);

  // Images & Concurrency
  const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [primaryImageId, setPrimaryImageId] = useState<string | null>(null);
  const [rowVersion, setRowVersion] = useState<number | string | null>(null);

  // UI status
  const [saving, setSaving] = useState(false);
  const [concurrencyConflict, setConcurrencyConflict] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Đồng bộ dữ liệu khi recipe được tải về
  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title || '');
      setSlug(recipe.slug || '');
      setDescription(recipe.description || '');
      setInstructions(recipe.instructions || '');
      setCategoryId(recipe.categoryId || 'cat-1');
      setDifficulty((recipe.difficulty as any) || 'Medium');
      setPrepTime(recipe.prepTime || 15);
      setCookTime(recipe.cookTime || 30);
      setServings(recipe.servings || 4);
      setStatus((recipe.status as any) || 'Draft');

      if (recipe.nutrition) {
        setCalories(recipe.nutrition.calories ?? null);
        setProtein(recipe.nutrition.protein ?? null);
        setCarbs(recipe.nutrition.carbohydrates ?? null);
        setFat(recipe.nutrition.fat ?? null);
        setFiber(recipe.nutrition.fiber ?? null);
        setSodium(recipe.nutrition.sodium ?? null);
      }

      if (recipe.ingredients && recipe.ingredients.length > 0) {
        setIngredients(
          recipe.ingredients.map((ing, idx) => ({
            name: ing.name,
            quantity: ing.quantity ?? 1,
            unit: ing.unit ?? 'g',
            notes: ing.notes ?? '',
            orderIndex: ing.orderIndex ?? idx + 1,
          }))
        );
      } else {
        setIngredients([
          { name: 'Nguyên liệu mẫu', quantity: 100, unit: 'g', notes: '', orderIndex: 1 },
        ]);
      }

      if (recipe.steps && recipe.steps.length > 0) {
        setSteps(
          recipe.steps.map((st, idx) => ({
            stepNumber: st.stepNumber ?? idx + 1,
            title: st.title || `Bước ${idx + 1}`,
            description: st.description || '',
            timerMinutes: st.timerMinutes ?? undefined,
            imageUrl: st.imageUrl ?? undefined,
          }))
        );
      } else {
        setSteps([
          { stepNumber: 1, title: 'Bước 1', description: 'Chuẩn bị và sơ chế.', timerMinutes: 5 },
        ]);
      }

      if (recipe.images && recipe.images.length > 0) {
        setExistingImages(
          recipe.images.map((img) => ({
            id: img.id,
            url: img.originalUrl || img.mediumUrl || '',
            name: img.altText || 'Ảnh món ăn',
            isPrimary: img.isPrimary,
          }))
        );
        const primary = recipe.images.find((img) => img.isPrimary);
        if (primary) {
          setPrimaryImageId(primary.id);
        }
      } else if (recipe.coverImageUrl) {
        setExistingImages([
          {
            id: 'cover-1',
            url: recipe.coverImageUrl,
            name: 'Ảnh đại diện',
            isPrimary: true,
          },
        ]);
        setPrimaryImageId('cover-1');
      }

      // Lưu trữ RowVersion để đối soát Concurrency Token
      setRowVersion(recipe.rowVersion ?? null);
      setConcurrencyConflict(false);
    }
  }, [recipe]);

  // Xử lý nạp lại dữ liệu khi xảy ra Concurrency Conflict
  const handleReloadLatest = async () => {
    setSaving(true);
    setConcurrencyConflict(false);
    setErrorMessage(null);
    try {
      await refetch();
      setSuccessMessage('Đã đồng bộ dữ liệu mới nhất từ máy chủ!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch {
      setErrorMessage('Không thể tải lại dữ liệu mới nhất.');
    } finally {
      setSaving(false);
    }
  };

  // Lưu cập nhật
  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Tiêu đề công thức không được để trống.');
      return;
    }

    setSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    setConcurrencyConflict(false);

    const submission: UpdateRecipeSubmission = {
      id,
      title: title.trim(),
      slug: slug.trim() || undefined,
      description: description.trim(),
      instructions: instructions.trim(),
      prepTime,
      cookTime,
      servings,
      difficulty,
      categoryId,
      nutrition: {
        calories,
        protein,
        carbohydrates: carbs,
        fat,
        fiber,
        sodium,
      },
      rowVersion,
      ingredients,
      steps,
      images: newImageFiles,
    };

    const token = (session?.user as any)?.accessToken;
    const result = await recipeManagementService.updateRecipe(id, submission, token);

    if (result.isConflict) {
      setConcurrencyConflict(true);
      setErrorMessage(result.message || 'Xung đột phiên làm việc!');
    } else if (result.success) {
      setSuccessMessage(result.message || 'Cập nhật công thức thành công!');
      if (result.data?.rowVersion) {
        setRowVersion(result.data.rowVersion);
      }
      setTimeout(() => {
        router.refresh();
      }, 1000);
    } else {
      setErrorMessage(result.message || 'Đã có lỗi xảy ra.');
    }

    setSaving(false);
  };

  // Luồng chuyển đổi trạng thái (FR-FTE-051)
  const handlePublish = async () => {
    if (ingredients.length === 0 || steps.length === 0) {
      setErrorMessage('Công thức cần ít nhất 1 nguyên liệu và 1 bước để được xuất bản.');
      return;
    }
    setSaving(true);
    const token = (session?.user as any)?.accessToken;
    const ok = await recipeManagementService.publishRecipe(id, token);
    if (ok) {
      setStatus('Published');
      setSuccessMessage('Đã xuất bản công thức thành công!');
    } else {
      setErrorMessage('Không thể xuất bản công thức.');
    }
    setSaving(false);
  };

  const handleArchive = async () => {
    setSaving(true);
    const token = (session?.user as any)?.accessToken;
    const ok = await recipeManagementService.archiveRecipe(id, token);
    if (ok) {
      setStatus('Archived');
      setSuccessMessage('Đã lưu trữ công thức.');
    } else {
      setErrorMessage('Không thể lưu trữ công thức.');
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    setSaving(true);
    setShowDeleteModal(false);
    const token = (session?.user as any)?.accessToken;
    const ok = await recipeManagementService.deleteRecipe(id, token);
    if (ok) {
      router.push('/dashboard?tab=recipes');
    } else {
      setErrorMessage('Không thể xóa công thức.');
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-8 w-8 text-amber-600 animate-spin" />
          <p className="text-sm font-semibold text-stone-600">Đang tải dữ liệu công thức...</p>
        </div>
      </div>
    );
  }

  if (isError || !recipe) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="p-6 rounded-2xl bg-white border border-red-200 text-center space-y-4">
          <AlertTriangle className="h-10 w-10 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold text-gray-900">Không tìm thấy công thức cần chỉnh sửa</h2>
          <p className="text-sm text-gray-600">
            {error ? String(error) : 'Công thức không tồn tại hoặc bạn không có quyền chỉnh sửa.'}
          </p>
          <Link
            href="/dashboard?tab=recipes"
            className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800 text-white rounded-lg text-xs font-semibold hover:bg-stone-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Quay lại Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-stone-50 py-10 font-sans">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href={`/recipes/${id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Xem chi tiết công thức
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-100 text-amber-800 rounded-full">
              Lab 8 • FR-FTE-050
            </span>
            {rowVersion !== null && rowVersion !== undefined && (
              <span
                className="px-2 py-0.5 text-[10px] font-mono bg-stone-100 text-stone-600 rounded border border-stone-200"
                title="Khóa kiểm tra Concurrency Token"
              >
                RowVersion: {String(rowVersion)}
              </span>
            )}
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Chỉnh Sửa Công Thức
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              Cập nhật nội dung, thời gian, nguyên liệu và kiểm soát xung đột dữ liệu phiên làm việc.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                status === 'Published'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : status === 'Draft'
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-stone-200 text-stone-700 border border-stone-300'
              }`}
            >
              Trạng thái: {status === 'Published' ? 'Đã Xuất Bản' : status === 'Draft' ? 'Bản Nháp' : 'Lưu Trữ'}
            </span>
          </div>
        </div>

        {/* Concurrency Conflict Alert Box (FR-FTE-050) */}
        {concurrencyConflict && (
          <div className="mb-8 p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 shadow-md text-rose-900 animate-bounceOnce">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-2 flex-1">
                <h3 className="text-sm font-bold text-rose-950">
                  ⚠️ Phát Hiện Xung Đột Dữ Liệu (Concurrency Conflict - Mã 409)
                </h3>
                <p className="text-xs text-rose-800 leading-relaxed">
                  Công thức này đã được chỉnh sửa bởi một phiên làm việc khác hoặc người dùng khác trong khi bạn đang mở trang này.
                  Để tránh ghi đè làm mất mát các thay đổi mới nhất, hãy tải lại dữ liệu trước khi tiếp tục chỉnh sửa.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleReloadLatest}
                    disabled={saving}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-semibold transition-all shadow-xs"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${saving ? 'animate-spin' : ''}`} />
                    Tải lại dữ liệu mới nhất (Reload)
                  </button>
                  <button
                    type="button"
                    onClick={() => setConcurrencyConflict(false)}
                    className="text-xs text-rose-700 underline hover:text-rose-900 font-medium"
                  >
                    Bỏ qua cảnh báo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error / Success Notifications */}
        {errorMessage && !concurrencyConflict && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-8">
          {/* Card 1: Thông tin cơ bản */}
          <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <Sparkles className="h-5 w-5 text-amber-600" />
              <h2 className="text-base font-bold text-gray-900">1. Thông tin tổng quan công thức</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Tiêu đề công thức <span className="text-red-500">*</span>
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClass}
                  placeholder="Tiêu đề món ăn"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Đường dẫn tĩnh (Slug)
                </label>
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className={inputClass}
                  placeholder="pho-bo-tai-lan-ha-noi"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Để trống nếu bạn muốn hệ thống tự động sinh slug từ tiêu đề.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Mô tả ngắn món ăn
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={inputClass}
                  placeholder="Mô tả hương vị hoặc bí quyết món ăn..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Danh mục món ăn
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className={inputClass}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Độ khó thực hiện
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className={inputClass}
                  >
                    <option value="Easy">Dễ làm (Easy)</option>
                    <option value="Medium">Trung bình (Medium)</option>
                    <option value="Hard">Kỳ công (Hard)</option>
                    <option value="Expert">Chuyên nghiệp (Expert)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Chuẩn bị (phút)
                  </label>
                  <input
                    type="number"
                    value={prepTime}
                    onChange={(e) => setPrepTime(Number(e.target.value) || 0)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Nấu nướng (phút)
                  </label>
                  <input
                    type="number"
                    value={cookTime}
                    onChange={(e) => setCookTime(Number(e.target.value) || 0)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Khẩu phần (người)
                  </label>
                  <input
                    type="number"
                    value={servings}
                    onChange={(e) => setServings(Number(e.target.value) || 1)}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Chỉ số dinh dưỡng (FR-DVO-002) */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <span className="text-xs font-bold text-stone-700 block">
                  🥗 Chỉ số dinh dưỡng mỗi khẩu phần
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-stone-600 block mb-1">Calories (kcal)</label>
                    <input
                      type="number"
                      value={calories ?? ''}
                      onChange={(e) => setCalories(e.target.value ? Number(e.target.value) : null)}
                      className={inputClass}
                      placeholder="vd: 350"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-600 block mb-1">Chất đạm / Protein (g)</label>
                    <input
                      type="number"
                      value={protein ?? ''}
                      onChange={(e) => setProtein(e.target.value ? Number(e.target.value) : null)}
                      className={inputClass}
                      placeholder="vd: 25"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-600 block mb-1">Tinh bột / Carbs (g)</label>
                    <input
                      type="number"
                      value={carbs ?? ''}
                      onChange={(e) => setCarbs(e.target.value ? Number(e.target.value) : null)}
                      className={inputClass}
                      placeholder="vd: 30"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-600 block mb-1">Chất béo / Fat (g)</label>
                    <input
                      type="number"
                      value={fat ?? ''}
                      onChange={(e) => setFat(e.target.value ? Number(e.target.value) : null)}
                      className={inputClass}
                      placeholder="vd: 12"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-600 block mb-1">Chất xơ / Fiber (g)</label>
                    <input
                      type="number"
                      value={fiber ?? ''}
                      onChange={(e) => setFiber(e.target.value ? Number(e.target.value) : null)}
                      className={inputClass}
                      placeholder="vd: 4"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-600 block mb-1">Natri / Sodium (mg)</label>
                    <input
                      type="number"
                      value={sodium ?? ''}
                      onChange={(e) => setSodium(e.target.value ? Number(e.target.value) : null)}
                      className={inputClass}
                      placeholder="vd: 480"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Danh sách nguyên liệu */}
          <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-amber-600" />
                <h2 className="text-base font-bold text-gray-900">2. Nguyên liệu món ăn ({ingredients.length})</h2>
              </div>
              <button
                type="button"
                onClick={() =>
                  setIngredients((prev) => [
                    ...prev,
                    { name: '', quantity: 100, unit: 'g', notes: '', orderIndex: prev.length + 1 },
                  ])
                }
                className="px-3 py-1.5 text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 rounded-lg hover:bg-amber-100 transition-all"
              >
                + Thêm nguyên liệu
              </button>
            </div>

            <div className="space-y-3">
              {ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row items-center gap-2"
                >
                  <span className="text-xs font-bold text-stone-400 w-6 text-center">#{idx + 1}</span>
                  <input
                    value={ing.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setIngredients((prev) =>
                        prev.map((item, i) => (i === idx ? { ...item, name: val } : item))
                      );
                    }}
                    placeholder="Tên nguyên liệu"
                    className={`flex-1 ${inputClass}`}
                  />
                  <input
                    type="number"
                    step="0.1"
                    value={ing.quantity ?? ''}
                    onChange={(e) => {
                      const val = Number(e.target.value) || 0;
                      setIngredients((prev) =>
                        prev.map((item, i) => (i === idx ? { ...item, quantity: val } : item))
                      );
                    }}
                    placeholder="Số lượng"
                    className={`w-24 ${inputClass}`}
                  />
                  <input
                    value={ing.unit ?? ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setIngredients((prev) =>
                        prev.map((item, i) => (i === idx ? { ...item, unit: val } : item))
                      );
                    }}
                    placeholder="Đơn vị"
                    className={`w-24 ${inputClass}`}
                  />
                  <input
                    value={ing.notes ?? ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setIngredients((prev) =>
                        prev.map((item, i) => (i === idx ? { ...item, notes: val } : item))
                      );
                    }}
                    placeholder="Ghi chú"
                    className={`flex-1 ${inputClass}`}
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setIngredients((prev) => prev.filter((_, i) => i !== idx))}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg text-xs"
                      title="Xóa nguyên liệu"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Các bước thực hiện */}
          <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <h2 className="text-base font-bold text-gray-900">3. Các bước nấu nướng ({steps.length})</h2>
              </div>
              <button
                type="button"
                onClick={() =>
                  setSteps((prev) => [
                    ...prev,
                    {
                      stepNumber: prev.length + 1,
                      title: `Bước ${prev.length + 1}`,
                      description: '',
                      timerMinutes: 5,
                    },
                  ])
                }
                className="px-3 py-1.5 text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 rounded-lg hover:bg-amber-100 transition-all"
              >
                + Thêm bước nấu
              </button>
            </div>

            <div className="space-y-4">
              {steps.map((st, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-700">Bước {idx + 1}</span>
                    {steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setSteps((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-red-500 text-xs hover:underline"
                      >
                        Xóa bước này
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      value={st.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSteps((prev) =>
                          prev.map((item, i) => (i === idx ? { ...item, title: val } : item))
                        );
                      }}
                      placeholder={`Tiêu đề bước ${idx + 1}`}
                      className={`sm:col-span-2 ${inputClass}`}
                    />
                    <input
                      type="number"
                      value={st.timerMinutes ?? ''}
                      onChange={(e) => {
                        const val = e.target.value ? Number(e.target.value) : undefined;
                        setSteps((prev) =>
                          prev.map((item, i) => (i === idx ? { ...item, timerMinutes: val } : item))
                        );
                      }}
                      placeholder="Hẹn giờ (phút)"
                      className={inputClass}
                    />
                  </div>

                  <textarea
                    rows={2}
                    value={st.description}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSteps((prev) =>
                        prev.map((item, i) => (i === idx ? { ...item, description: val } : item))
                      );
                    }}
                    placeholder="Hướng dẫn chi tiết bước này..."
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Quản lý Hình ảnh thực tế (FR-INF-003 & FR-FTE-046 & FR-FTE-049) */}
          <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b border-stone-100 pb-3">
              4. Quản lý Hình ảnh công thức
            </h2>
            <ImageUploader
              label="Tải thêm ảnh cho công thức"
              description="Kéo thả hoặc duyệt ảnh để bổ sung vào bộ sưu tập món ăn."
              multiple={true}
              maxFiles={10}
              maxSizeMB={5}
              existingImages={existingImages}
              primaryImageId={primaryImageId || undefined}
              onSetPrimaryImage={(imgId) => setPrimaryImageId(imgId)}
              onRemoveExistingImage={(imgId) => {
                setExistingImages((prev) => prev.filter((item) => item.id !== imgId));
              }}
              onFilesChange={(files) => setNewImageFiles(files)}
            />
          </div>

          {/* Action Bar Footer (FR-FTE-051) */}
          <div className="sticky bottom-6 z-20 bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-stone-200 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="h-4 w-4" /> Xóa công thức
              </button>

              {status === 'Published' ? (
                <button
                  type="button"
                  onClick={handleArchive}
                  disabled={saving}
                  className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Archive className="h-4 w-4" /> Lưu trữ công thức
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={saving}
                  className="px-3.5 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="h-4 w-4" /> Xuất bản ngay
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <Link
                href={`/recipes/${id}`}
                className="px-4 py-2.5 rounded-lg border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
              >
                Hủy bỏ
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-md shadow-amber-600/20 flex items-center gap-1.5 disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {saving ? 'Đang lưu thay đổi...' : 'Lưu Thay Đổi (Save)'}
              </button>
            </div>
          </div>
        </form>

        {/* Modal Xác nhận Xóa mềm (FR-FTE-051) */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-scaleIn">
              <div className="flex items-center gap-3 text-rose-600">
                <AlertTriangle className="h-6 w-6" />
                <h3 className="text-base font-bold text-gray-900">Xác nhận xóa công thức?</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Hành động này sẽ xóa mềm công thức <strong>{title}</strong> khỏi danh sách hiển thị và chuyển vào thùng rác hệ thống. Bạn có chắc chắn muốn xóa?
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-lg border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                >
                  Không, giữ lại
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
                >
                  Xác nhận xóa
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

