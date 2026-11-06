'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSession } from 'next-auth/react';
import { CATEGORIES } from '@/services/recipeService';
import {
  recipeManagementService,
  FullRecipeSubmission,
} from '@/services/recipeManagementService';
import ImageUploader from '@/components/upload/ImageUploader';

// Schema validation Zod cho toàn bộ 4 bước
const recipeWizardSchema = z.object({
  // Bước 1: Thông tin cơ bản
  title: z
    .string()
    .trim()
    .min(3, 'Tên công thức cần ít nhất 3 ký tự.')
    .max(200, 'Tên công thức tối đa 200 ký tự.'),
  description: z
    .string()
    .trim()
    .min(10, 'Mô tả cần ít nhất 10 ký tự.')
    .max(2000, 'Mô tả tối đa 2000 ký tự.'),
  categoryId: z.string().min(1, 'Vui lòng chọn danh mục món ăn.'),
  prepTime: z
    .number()
    .int('Phải là số nguyên.')
    .min(1, 'Thời gian chuẩn bị tối thiểu 1 phút.')
    .max(1440, 'Tối đa 1440 phút.'),
  cookTime: z
    .number()
    .int('Phải là số nguyên.')
    .min(0, 'Thời gian nấu không được âm.')
    .max(1440, 'Tối đa 1440 phút.'),
  servings: z
    .number()
    .int('Phải là số nguyên.')
    .min(1, 'Khẩu phần ăn tối thiểu 1 người.')
    .max(100, 'Tối đa 100 người.'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard', 'Expert']),

  // Dinh dưỡng tùy chọn (FR-DVO-002)
  calories: z.number().min(0).optional().nullable(),
  protein: z.number().min(0).optional().nullable(),
  carbohydrates: z.number().min(0).optional().nullable(),
  fat: z.number().min(0).optional().nullable(),
  fiber: z.number().min(0).optional().nullable(),
  sodium: z.number().min(0).optional().nullable(),

  // Bước 2: Nguyên liệu (Ít nhất 1 nguyên liệu theo SRS rule RECIPE_PUBLISH_INCOMPLETE)
  ingredients: z
    .array(
      z.object({
        name: z.string().trim().min(2, 'Tên nguyên liệu ít nhất 2 ký tự.'),
        quantity: z.number().min(0.1, 'Số lượng phải lớn hơn 0.'),
        unit: z.string().trim().min(1, 'Đơn vị không được để trống.'),
        notes: z.string().optional(),
      })
    )
    .min(1, 'Công thức bắt buộc phải có ít nhất 1 nguyên liệu.'),

  // Bước 3: Các bước thực hiện (Ít nhất 1 bước theo SRS rule RECIPE_PUBLISH_INCOMPLETE)
  steps: z
    .array(
      z.object({
        title: z.string().trim().min(3, 'Tiêu đề bước ít nhất 3 ký tự.'),
        description: z.string().trim().min(10, 'Nội dung hướng dẫn ít nhất 10 ký tự.'),
        timerMinutes: z.number().min(0).optional(),
      })
    )
    .min(1, 'Công thức bắt buộc phải có ít nhất 1 bước thực hiện.'),

  // Bước 4: Hình ảnh
  imageUrl: z.string().url('URL hình ảnh không hợp lệ.').or(z.string().length(0)).optional(),
});

type RecipeWizardFormValues = z.infer<typeof recipeWizardSchema>;

const difficultyLabels: Record<RecipeWizardFormValues['difficulty'], string> = {
  Easy: 'Dễ làm (Easy)',
  Medium: 'Trung bình (Medium)',
  Hard: 'Kỳ công (Hard)',
  Expert: 'Chuyên nghiệp (Expert)',
};

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all';

export function CreateRecipeWizard() {
  const router = useRouter();
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [primaryImageId, setPrimaryImageId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80'
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RecipeWizardFormValues>({
    resolver: zodResolver(recipeWizardSchema),
    defaultValues: {
      title: '',
      description: '',
      categoryId: 'cat-1',
      prepTime: 15,
      cookTime: 30,
      servings: 4,
      difficulty: 'Medium',
      calories: 350,
      protein: 25,
      carbohydrates: 30,
      fat: 12,
      fiber: 4,
      sodium: 480,
      ingredients: [
        { name: 'Thịt bò phi lê', quantity: 300, unit: 'g', notes: 'thái mỏng' },
        { name: 'Hành hoa & rau mùi', quantity: 50, unit: 'g', notes: 'rửa sạch cắt khúc' },
      ],
      steps: [
        {
          title: 'Sơ chế nguyên liệu',
          description: 'Rửa sạch thịt bò, để ráo nước và thái lát mỏng vừa ăn. Nhặt sạch các loại rau thơm.',
          timerMinutes: 10,
        },
        {
          title: 'Ướp và nấu món ăn',
          description: 'Ướp thịt cùng gia vị chuẩn bị, sau đó xào trên lửa lớn trong 5 phút đến khi chín tới.',
          timerMinutes: 15,
        },
      ],
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    },
    mode: 'onChange',
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: 'steps',
  });

  const formValues = watch();

  // Chuyển sang bước tiếp theo kèm kiểm tra tính hợp lệ
  const handleNextStep = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger(['title', 'description', 'categoryId', 'prepTime', 'cookTime', 'servings', 'difficulty']);
    } else if (currentStep === 2) {
      isValid = await trigger(['ingredients']);
    } else if (currentStep === 3) {
      isValid = await trigger(['steps']);
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Gửi tạo công thức (Draft hoặc Publish)
  const onSubmit = async (values: RecipeWizardFormValues, publishImmediately: boolean) => {
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    const submission: FullRecipeSubmission = {
      basics: {
        title: values.title,
        description: values.description,
        categoryId: values.categoryId,
        prepTimeMinutes: values.prepTime,
        cookTimeMinutes: values.cookTime,
        servings: values.servings,
        difficulty: values.difficulty,
      },
      ingredients: values.ingredients.map((ing, idx) => ({
        name: ing.name,
        quantity: ing.quantity,
        unit: ing.unit,
        notes: ing.notes,
        orderIndex: idx + 1,
      })),
      steps: values.steps.map((st, idx) => ({
        stepNumber: idx + 1, // Tự động đánh số tuần tự theo SRS domain rule
        title: st.title,
        description: st.description,
        timerMinutes: st.timerMinutes,
      })),
      imageUrl: previewImage || values.imageUrl,
      images: uploadedFiles,
      publishImmediately,
    };

    try {
      const result = await recipeManagementService.submitFullRecipe(
        submission,
        (session?.user as any)?.accessToken
      );

      if (result.success) {
        setSubmitSuccess(result.message || 'Thành công!');
        setTimeout(() => {
          router.push('/dashboard?tab=recipes');
        }, 1200);
      }
    } catch (err: any) {
      setSubmitError(err.message || 'Đã xảy ra lỗi khi tạo công thức.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-amber-100 shadow-xl shadow-amber-900/5 p-6 sm:p-10">
      {/* Wizard Step Progress Tracker */}
      <div className="mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-amber-100 w-full z-0" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-amber-500 transition-all duration-300 z-0"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />

          {[
            { step: 1, label: 'Thông Tin Cơ Bản' },
            { step: 2, label: 'Nguyên Liệu' },
            { step: 3, label: 'Các Bước Thực Hiện' },
            { step: 4, label: 'Hình Ảnh & Xuất Bản' },
          ].map((item) => (
            <div key={item.step} className="relative z-10 flex flex-col items-center">
              <button
                type="button"
                onClick={() => {
                  if (item.step < currentStep) setCurrentStep(item.step);
                }}
                className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  item.step === currentStep
                    ? 'bg-amber-600 text-white ring-4 ring-amber-100 scale-110 shadow-md shadow-amber-600/30'
                    : item.step < currentStep
                    ? 'bg-emerald-600 text-white cursor-pointer hover:bg-emerald-700'
                    : 'bg-white border-2 border-gray-200 text-gray-400'
                }`}
              >
                {item.step < currentStep ? '✓' : item.step}
              </button>
              <span
                className={`text-[11px] font-semibold mt-2 hidden sm:block ${
                  item.step === currentStep ? 'text-amber-700' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Thông báo kết quả / lỗi */}
      {submitError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
          <span>⚠️</span> {submitError}
        </div>
      )}

      {submitSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <span>🎉</span> {submitSuccess} Đang chuyển hướng về Bảng điều khiển...
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        {/* ========================================================== */}
        {/* BƯỚC 1: THÔNG TIN CƠ BẢN (FR-FTE-009) */}
        {/* ========================================================== */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Bước 1: Thông tin cơ bản về món ăn</h2>
              <p className="text-xs text-gray-500 mt-1">
                Cung cấp tên món, mô tả hấp dẫn và các chỉ số thời gian nấu nướng.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Tên công thức <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('title')}
                  placeholder="Ví dụ: Phở Bò Tái Lăn Hà Nội Chuẩn Vị"
                  className={inputClass}
                />
                {errors.title && <p className="text-red-500 text-[11px] mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Mô tả ngắn món ăn <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  placeholder="Mô tả hương vị, nguồn gốc hoặc cảm hứng của món ăn này..."
                  className={inputClass}
                />
                {errors.description && (
                  <p className="text-red-500 text-[11px] mt-1">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Danh mục ẩm thực <span className="text-red-500">*</span>
                  </label>
                  <select {...register('categoryId')} className={inputClass}>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.categoryId && (
                    <p className="text-red-500 text-[11px] mt-1">{errors.categoryId.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Độ khó thực hiện <span className="text-red-500">*</span>
                  </label>
                  <select {...register('difficulty')} className={inputClass}>
                    <option value="Easy">{difficultyLabels.Easy}</option>
                    <option value="Medium">{difficultyLabels.Medium}</option>
                    <option value="Hard">{difficultyLabels.Hard}</option>
                    <option value="Expert">{difficultyLabels.Expert}</option>
                  </select>
                  {errors.difficulty && (
                    <p className="text-red-500 text-[11px] mt-1">{errors.difficulty.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Chuẩn bị (phút) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    {...register('prepTime', { valueAsNumber: true })}
                    className={inputClass}
                  />
                  {errors.prepTime && (
                    <p className="text-red-500 text-[11px] mt-1">{errors.prepTime.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Nấu chín (phút) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    {...register('cookTime', { valueAsNumber: true })}
                    className={inputClass}
                  />
                  {errors.cookTime && (
                    <p className="text-red-500 text-[11px] mt-1">{errors.cookTime.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Khẩu phần (người) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    {...register('servings', { valueAsNumber: true })}
                    className={inputClass}
                  />
                  {errors.servings && (
                    <p className="text-red-500 text-[11px] mt-1">{errors.servings.message}</p>
                  )}
                </div>
              </div>

              {/* Thông tin dinh dưỡng mở rộng (FR-DVO-002) */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <span className="text-xs font-bold text-stone-700 block">
                  🥗 Chỉ số dinh dưỡng mỗi khẩu phần (Tuỳ chọn)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-stone-600 block mb-1">Calories (kcal)</label>
                    <input
                      type="number"
                      {...register('calories', { valueAsNumber: true })}
                      placeholder="350"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-600 block mb-1">Chất đạm / Protein (g)</label>
                    <input
                      type="number"
                      {...register('protein', { valueAsNumber: true })}
                      placeholder="25"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-600 block mb-1">Tinh bột / Carbs (g)</label>
                    <input
                      type="number"
                      {...register('carbohydrates', { valueAsNumber: true })}
                      placeholder="30"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-600 block mb-1">Chất béo / Fat (g)</label>
                    <input
                      type="number"
                      {...register('fat', { valueAsNumber: true })}
                      placeholder="12"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-600 block mb-1">Chất xơ / Fiber (g)</label>
                    <input
                      type="number"
                      {...register('fiber', { valueAsNumber: true })}
                      placeholder="4"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-600 block mb-1">Natri / Sodium (mg)</label>
                    <input
                      type="number"
                      {...register('sodium', { valueAsNumber: true })}
                      placeholder="480"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* BƯỚC 2: NGUYÊN LIỆU (FR-FTE-010) */}
        {/* ========================================================== */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Bước 2: Danh sách nguyên liệu cần chuẩn bị</h2>
                <p className="text-xs text-gray-500 mt-1">
                  Quy tắc nghiệp vụ: Cần ít nhất 1 nguyên liệu hợp lệ để được phép xuất bản.
                </p>
              </div>
              <button
                type="button"
                onClick={() => appendIngredient({ name: '', quantity: 100, unit: 'g', notes: '' })}
                className="px-3 py-1.5 text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 rounded-lg hover:bg-amber-100 transition-all flex items-center gap-1"
              >
                + Thêm nguyên liệu
              </button>
            </div>

            {errors.ingredients && (
              <p className="text-red-500 text-xs font-medium">{errors.ingredients.message}</p>
            )}

            <div className="space-y-3">
              {ingredientFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row items-center gap-2.5"
                >
                  <span className="text-xs font-bold text-gray-400 w-6 text-center">#{index + 1}</span>

                  <div className="flex-1 w-full">
                    <input
                      {...register(`ingredients.${index}.name` as const)}
                      placeholder="Tên nguyên liệu (VD: Thịt ba chỉ)"
                      className={inputClass}
                    />
                    {errors.ingredients?.[index]?.name && (
                      <p className="text-red-500 text-[10px] mt-0.5">
                        {errors.ingredients[index]?.name?.message}
                      </p>
                    )}
                  </div>

                  <div className="w-24">
                    <input
                      type="number"
                      step="0.1"
                      {...register(`ingredients.${index}.quantity` as const, { valueAsNumber: true })}
                      placeholder="Số lượng"
                      className={inputClass}
                    />
                  </div>

                  <div className="w-24">
                    <input
                      {...register(`ingredients.${index}.unit` as const)}
                      placeholder="Đơn vị (g, ml)"
                      className={inputClass}
                    />
                  </div>

                  <div className="flex-1 w-full">
                    <input
                      {...register(`ingredients.${index}.notes` as const)}
                      placeholder="Ghi chú (tùy chọn)"
                      className={inputClass}
                    />
                  </div>

                  {ingredientFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-xs"
                      title="Xóa nguyên liệu"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* BƯỚC 3: CÁC BƯỚC THỰC HIỆN (FR-FTE-010) */}
        {/* ========================================================== */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Bước 3: Hướng dẫn các bước nấu nướng</h2>
                <p className="text-xs text-gray-500 mt-1">
                  Đánh số tuần tự theo StepNumber tự động để hỗ trợ Chế độ nấu ăn (Cooking Mode).
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  appendStep({
                    title: `Bước ${stepFields.length + 1}`,
                    description: '',
                    timerMinutes: 5,
                  })
                }
                className="px-3 py-1.5 text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 rounded-lg hover:bg-amber-100 transition-all flex items-center gap-1"
              >
                + Thêm bước nấu
              </button>
            </div>

            {errors.steps && <p className="text-red-500 text-xs font-medium">{errors.steps.message}</p>}

            <div className="space-y-4">
              {stepFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                      Bước {index + 1}
                    </span>
                    {stepFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="text-red-500 text-xs hover:underline"
                      >
                        Xóa bước này
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <input
                        {...register(`steps.${index}.title` as const)}
                        placeholder={`Tiêu đề bước ${index + 1} (VD: Luộc thịt sơ)`}
                        className={inputClass}
                      />
                      {errors.steps?.[index]?.title && (
                        <p className="text-red-500 text-[10px] mt-0.5">
                          {errors.steps[index]?.title?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="number"
                        {...register(`steps.${index}.timerMinutes` as const, { valueAsNumber: true })}
                        placeholder="Hẹn giờ (phút)"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <textarea
                      {...register(`steps.${index}.description` as const)}
                      rows={2}
                      placeholder="Hướng dẫn chi tiết nhiệt độ, thời gian và bí quyết..."
                      className={inputClass}
                    />
                    {errors.steps?.[index]?.description && (
                      <p className="text-red-500 text-[10px] mt-0.5">
                        {errors.steps[index]?.description?.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* BƯỚC 4: HÌNH ẢNH & XÁC NHẬN (FR-FTE-049) */}
        {/* ========================================================== */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Bước 4: Tải lên hình ảnh thực tế & Hoàn tất</h2>
              <p className="text-xs text-gray-500 mt-1">
                Tải lên nhiều hình ảnh chất lượng cao (kéo thả, kiểm tra dung lượng) và lựa chọn Lưu bản nháp hoặc Xuất bản ngay.
              </p>
            </div>

            {/* Upload ảnh thực tế với ImageUploader (FR-INF-003 & FR-FTE-046 & FR-FTE-049) */}
            <div className="p-5 bg-amber-50/40 rounded-xl border border-amber-200 space-y-4">
              <ImageUploader
                label="Tải lên ảnh món ăn từ máy tính"
                description="Kéo thả hoặc duyệt ảnh món ăn (Hỗ trợ JPEG, PNG, WEBP, tối đa 5MB/ảnh)."
                multiple={true}
                maxFiles={10}
                maxSizeMB={5}
                primaryImageId={primaryImageId || undefined}
                onSetPrimaryImage={(id) => setPrimaryImageId(id)}
                onFilesChange={(files) => {
                  setUploadedFiles(files);
                  if (files.length > 0) {
                    const firstUrl = URL.createObjectURL(files[0]);
                    setPreviewImage(firstUrl);
                    setValue('imageUrl', firstUrl);
                  }
                }}
              />

              <div className="pt-3 border-t border-amber-200/60">
                <p className="text-[11px] text-gray-500 mb-1.5">
                  Hoặc sử dụng ảnh mẫu/đường dẫn ảnh web (Unsplash):
                </p>
                <input
                  placeholder="https://images.unsplash.com/..."
                  value={formValues.imageUrl || ''}
                  onChange={(e) => {
                    setValue('imageUrl', e.target.value);
                    setPreviewImage(e.target.value);
                  }}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Review Tóm tắt dữ liệu */}
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Xem lại tóm tắt công thức
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-1">{formValues.title}</h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{formValues.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-100 text-xs">
                <div>
                  <span className="text-gray-400">Chuẩn bị:</span>{' '}
                  <strong className="text-gray-800">{formValues.prepTime} phút</strong>
                </div>
                <div>
                  <span className="text-gray-400">Nấu chín:</span>{' '}
                  <strong className="text-gray-800">{formValues.cookTime} phút</strong>
                </div>
                <div>
                  <span className="text-gray-400">Khẩu phần:</span>{' '}
                  <strong className="text-gray-800">{formValues.servings} người</strong>
                </div>
                <div>
                  <span className="text-gray-400">Độ khó:</span>{' '}
                  <strong className="text-amber-700">{formValues.difficulty}</strong>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 text-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-gray-700">Nguyên liệu ({formValues.ingredients.length}):</span>
                  <ul className="mt-1 space-y-1 list-disc list-inside text-gray-600">
                    {formValues.ingredients.slice(0, 4).map((ing, i) => (
                      <li key={i}>
                        {ing.name}: {ing.quantity} {ing.unit}
                      </li>
                    ))}
                    {formValues.ingredients.length > 4 && (
                      <li className="text-amber-700 font-medium">
                        + {formValues.ingredients.length - 4} nguyên liệu khác...
                      </li>
                    )}
                  </ul>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Các bước ({formValues.steps.length}):</span>
                  <ul className="mt-1 space-y-1 list-decimal list-inside text-gray-600">
                    {formValues.steps.slice(0, 3).map((st, i) => (
                      <li key={i} className="truncate">
                        {st.title} ({st.timerMinutes || 0} phút)
                      </li>
                    ))}
                    {formValues.steps.length > 3 && (
                      <li className="text-amber-700 font-medium">
                        + {formValues.steps.length - 3} bước tiếp theo...
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={submitting}
                className="px-4 py-2 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-all"
              >
                ← Quay lại bước trước
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-all shadow-md shadow-amber-600/20"
              >
                Tiếp tục Bước {currentStep + 1} →
              </button>
            ) : (
              <>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleSubmit((data) => onSubmit(data, false))}
                  className="px-4 py-2.5 rounded-lg border border-amber-300 bg-amber-50 text-amber-900 text-xs font-semibold hover:bg-amber-100 transition-all disabled:opacity-60"
                >
                  {submitting ? 'Đang lưu...' : '💾 Lưu Bản Nháp (Draft)'}
                </button>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleSubmit((data) => onSubmit(data, true))}
                  className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 disabled:opacity-60"
                >
                  {submitting ? 'Đang xử lý...' : '🚀 Xuất Bản Ngay (Publish)'}
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
