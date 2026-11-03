'use client';

import React, { useMemo, useState } from 'react';
import ImageUploader, { type ExistingImage } from '@/components/upload/ImageUploader';

/**
 * Dữ liệu đầu vào của bước "cơ bản" khi tạo/chỉnh sửa recipe.
 * Component này chỉ xử lý phần thông tin nền tảng và upload ảnh.
 */
export interface RecipeBasicFormValues {
  title: string;
  slug: string;
  description: string;
  categoryId: string;
  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Advanced';
  preparationMinutes: number;
  cookingMinutes: number;
  servings: number;
  imageFiles: File[];
  primaryImageId: string | null;
}

/**
 * Dữ liệu tùy chọn để prefill form khi edit recipe.
 * Các ảnh hiện có chỉ dùng để render preview, không phải file mới upload.
 */
export interface RecipeBasicFormInitialData {
  title?: string;
  slug?: string;
  description?: string;
  categoryId?: string;
  difficulty?: RecipeBasicFormValues['difficulty'];
  preparationMinutes?: number;
  cookingMinutes?: number;
  servings?: number;
  existingImages?: ExistingImage[];
  primaryImageId?: string | null;
}

export interface CategoryOption {
  id: string;
  name: string;
}

export interface CreateRecipeBasicsFormProps {
  /** Giá trị khởi tạo khi tạo mới hoặc chỉnh sửa. */
  initialData?: RecipeBasicFormInitialData;

  /** Danh sách danh mục để chọn. */
  categories: CategoryOption[];

  /** Callback bắn dữ liệu hiện tại ra ngoài để parent giữ state wizard. */
  onChange?: (values: RecipeBasicFormValues) => void;

  /** Khi người dùng bấm tiếp tục ở wizard. */
  onNext?: (values: RecipeBasicFormValues) => void;

  /** Khi người dùng bấm quay lại ở wizard. */
  onBack?: () => void;

  /** Có thể khóa form trong lúc đang submit. */
  disabled?: boolean;

  /** CSS class tùy biến bên ngoài. */
  className?: string;
}

/** Danh sách mức độ khó hiển thị trong UI. */
const DIFFICULTY_OPTIONS: RecipeBasicFormValues['difficulty'][] = [
  'Easy',
  'Normal',
  'Hard',
  'Advanced',
];

/** Sinh slug đơn giản từ tiêu đề để gợi ý URL thân thiện SEO. */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Ép chuỗi thành số an toàn.
 * Khi input rỗng, trả về 0 để form không bị NaN.
 */
function toSafeNumber(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

/**
 * Component bước đầu tiên của Create Recipe Wizard.
 * Chức năng:
 * - nhập tiêu đề, mô tả, danh mục
 * - chọn độ khó, thời gian, khẩu phần
 * - upload ảnh qua ImageUploader
 */
export default function CreateRecipeBasicsForm({
  initialData,
  categories,
  onChange,
  onNext,
  onBack,
  disabled = false,
  className = '',
}: CreateRecipeBasicsFormProps) {
  // State cho từng field để form hoạt động độc lập trong wizard.
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [categoryId, setCategoryId] = useState(initialData?.categoryId ?? '');
  const [difficulty, setDifficulty] = useState<RecipeBasicFormValues['difficulty']>(
    initialData?.difficulty ?? 'Normal',
  );
  const [preparationMinutes, setPreparationMinutes] = useState(
    initialData?.preparationMinutes ?? 15,
  );
  const [cookingMinutes, setCookingMinutes] = useState(
    initialData?.cookingMinutes ?? 30,
  );
  const [servings, setServings] = useState(initialData?.servings ?? 2);

  // Ảnh hiện có từ server khi đang edit recipe.
  const [existingImages] = useState<ExistingImage[]>(
    initialData?.existingImages ?? [],
  );

  // Ảnh local mới chọn từ ImageUploader.
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  // Ảnh chính đang được chọn.
  const [primaryImageId, setPrimaryImageId] = useState<string | null>(
    initialData?.primaryImageId ?? null,
  );

  // Gợi ý slug tự sinh từ title để người dùng có thể chỉnh lại thủ công.
  const suggestedSlug = useMemo(() => slugify(title), [title]);

  /**
   * Tổng hợp state hiện tại thành object chuẩn để parent submit hoặc lưu wizard state.
   * Hàm này giúp tránh lặp logic ở nhiều chỗ.
   */
  const buildValues = (): RecipeBasicFormValues => ({
    title: title.trim(),
    slug: slug.trim() || suggestedSlug,
    description: description.trim(),
    categoryId,
    difficulty,
    preparationMinutes,
    cookingMinutes,
    servings,
    imageFiles,
    primaryImageId,
  });

  /**
   * Đồng bộ dữ liệu ra ngoài mỗi khi form thay đổi.
   * Parent có thể dùng callback này để lưu state tạm vào store/wizard context.
   */
  const syncChange = () => {
    onChange?.(buildValues());
  };

  /** Xử lý khi title thay đổi: cập nhật slug gợi ý nếu slug đang trống hoặc bám sát slug tự sinh. */
  const handleTitleChange = (value: string) => {
    setTitle(value);

    // Nếu slug đang trống hoặc trước đó giống gợi ý cũ, đồng bộ theo title mới.
    setSlug((current) => {
      if (!current || current === slugify(title)) {
        return slugify(value);
      }

      return current;
    });
  };

  /** Xử lý thay đổi thời gian chuẩn bị. */
  const handlePreparationChange = (value: string) => {
    setPreparationMinutes(toSafeNumber(value));
  };

  /** Xử lý thay đổi thời gian nấu. */
  const handleCookingChange = (value: string) => {
    setCookingMinutes(toSafeNumber(value));
  };

  /** Xử lý thay đổi khẩu phần. */
  const handleServingsChange = (value: string) => {
    setServings(toSafeNumber(value));
  };

  /** Xử lý khi người dùng chọn ảnh mới từ ImageUploader. */
  const handleFilesChange = (files: File[]) => {
    setImageFiles(files);
  };

  /** Đặt ảnh chính cho recipe. */
  const handleSetPrimaryImage = (imageId: string | null) => {
    setPrimaryImageId(imageId);
  };

  /** Xóa ảnh server đang tồn tại. Thực tế parent sẽ gọi API delete. */
  const handleRemoveExistingImage = (imageId: string) => {
    const next = existingImages.filter((img) => img.id !== imageId);
    setPrimaryImageId((current) => (current === imageId ? null : current));

    // Do existingImages là prop state hoá đơn giản ở local, việc xóa thật
    // nên được xử lý bởi parent bằng API. Ở đây ta chỉ sync dữ liệu ra ngoài.
    if (onChange) {
      onChange({
        ...buildValues(),
        primaryImageId: currentPrimaryImageId(next, primaryImageId),
      });
    }
  };

  /**
   * Tính ảnh chính mới sau khi một ảnh server bị xóa.
   * Nếu ảnh chính bị xóa thì quay về null để parent quyết định ảnh tiếp theo.
   */
  function currentPrimaryImageId(
    remainingImages: ExistingImage[],
    current: string | null,
  ): string | null {
    if (!current) return null;

    const stillExists = remainingImages.some((img) => img.id === current);
    return stillExists ? current : null;
  }

  /**
   * Khi người dùng bấm "Tiếp tục", chặn submit mặc định và đẩy dữ liệu ra parent.
   */
  const handleNext = (event: React.FormEvent) => {
    event.preventDefault();

    const values = buildValues();
    onNext?.(values);
  };

  /**
   * Đồng bộ dữ liệu ra parent mỗi khi bất kỳ field chính nào thay đổi.
   * Cách này phù hợp wizard form, vì parent luôn giữ state mới nhất.
   */
  React.useEffect(() => {
    syncChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, slug, description, categoryId, difficulty, preparationMinutes, cookingMinutes, servings, imageFiles, primaryImageId]);

  return (
    <form onSubmit={handleNext} className={`space-y-6 ${className}`}>
      {/* Tiêu đề section */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Thông tin cơ bản
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Nhập dữ liệu nền tảng để tạo công thức nấu ăn.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Tên công thức */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Tên công thức
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              disabled={disabled}
              placeholder="Ví dụ: Gà nướng mật ong"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              required
            />
          </div>

          {/* Slug SEO */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Slug SEO
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              disabled={disabled}
              placeholder={suggestedSlug}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Gợi ý: {suggestedSlug || 'slug-seo'}
            </p>
          </div>

          {/* Danh mục */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Danh mục
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              disabled={disabled}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              required
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Độ khó */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Độ khó
            </label>
            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value as RecipeBasicFormValues['difficulty'])
              }
              disabled={disabled}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              {DIFFICULTY_OPTIONS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Thời gian chuẩn bị */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Thời gian chuẩn bị (phút)
            </label>
            <input
              type="number"
              min={0}
              step={1}
              value={preparationMinutes}
              onChange={(e) => handlePreparationChange(e.target.value)}
              disabled={disabled}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          {/* Thời gian nấu */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Thời gian nấu (phút)
            </label>
            <input
              type="number"
              min={0}
              step={1}
              value={cookingMinutes}
              onChange={(e) => handleCookingChange(e.target.value)}
              disabled={disabled}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          {/* Khẩu phần */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Khẩu phần
            </label>
            <input
              type="number"
              min={1}
              step={1}
              value={servings}
              onChange={(e) => handleServingsChange(e.target.value)}
              disabled={disabled}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          {/* Mô tả ngắn */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Mô tả ngắn
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={disabled}
              rows={5}
              placeholder="Mô tả ngắn về hương vị, cách chế biến hoặc điểm nổi bật của món ăn."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              required
            />
          </div>
        </div>
      </section>

      {/* Khu vực upload ảnh */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Ảnh công thức
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Dùng component đa năng ImageUploader để chọn, xem trước và quản lý ảnh.
          </p>
        </div>

        <ImageUploader
          label="Tải ảnh công thức"
          description="Có thể chọn nhiều ảnh, kéo thả hoặc xóa ảnh đã chọn."
          helperText="Ảnh tối đa 5MB / file. Nên chọn ảnh rõ món ăn để tăng chất lượng hiển thị."
          multiple
          maxFiles={10}
          maxSizeMB={5}
          existingImages={existingImages}
          primaryImageId={primaryImageId ?? undefined}
          onFilesChange={handleFilesChange}
          onSetPrimaryImage={handleSetPrimaryImage}
          onRemoveExistingImage={handleRemoveExistingImage}
          onClearAll={() => setImageFiles([])}
          disabled={disabled}
        />

        {/* Gợi ý kiểm tra dữ liệu */}
        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-300">
          <p className="font-medium text-slate-800 dark:text-slate-100">
            Lưu ý khi upload ảnh:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Ảnh mới sẽ được parent chuyển thành FormData để gọi API upload.</li>
            <li>Nếu đang edit recipe, ảnh cũ có thể được xóa qua API riêng.</li>
            <li>Ảnh chính nên được chọn trước khi sang bước tiếp theo.</li>
          </ul>
        </div>
      </section>

      {/* Điều hướng wizard */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={disabled}
          className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Quay lại
        </button>

        <button
          type="submit"
          disabled={disabled}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Tiếp tục
        </button>
      </div>
    </form>
  );
}
