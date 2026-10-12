'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSession } from 'next-auth/react';
import { CATEGORIES } from '../../../services/recipeService';
import {
  recipeManagementService,
  FullRecipeSubmission,
} from '../../../services/recipeManagementService';

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

  // Xử lý upload ảnh từ máy tính (FR-INF-003 / FR-FTE-010)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      setValue('imageUrl', objectUrl);
    }
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
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
                  currentStep === item.step
                    ? 'bg-amber-600 text-white ring-4 ring-amber-100 shadow-md'
                    : item.step < currentStep
                    ? 'bg-emerald-600 text-white cursor-pointer'
                    : 'bg-white border-2 border-gray-200 text-gray-400'
                }`}
              >
                {item.step < currentStep ? '✓' : item.step}
              </button>
              <span
                className={`mt-2 text-[11px] sm:text-xs font-semibold text-center hidden sm:block ${
                  currentStep === item.step ? 'text-amber-800' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Thông báo Alert */}
      {submitError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-800 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="font-bold">Lỗi quy tắc nghiệp vụ (Domain Exception):</p>
            <p className="text-xs mt-0.5">{submitError}</p>
          </div>
        </div>
      )}

      {submitSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-800 flex items-center gap-3">
          <span className="text-xl">🎉</span>
          <p className="font-bold">{submitSuccess}</p>
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()} noValidate>
        {/* ========================================================== */}
        {/* BƯỚC 1: THÔNG TIN CƠ BẢN (FR-FTE-009) */}
        {/* ========================================================== */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Bước 1: Thông tin cơ bản về món ăn</h2>
              <p className="text-xs text-gray-500 mt-1">
                Nhập tên món, mô tả, thời lượng chuẩn bị và độ khó phù hợp.
              </p>
            </div>

            <div>
              <label htmlFor="title" className="block text-xs font-semibold text-gray-800 mb-1.5">
                Tên công thức món ăn *
              </label>
              <input
                id="title"
                placeholder="Ví dụ: Bò Kho Tiêu Xanh Nước Dừa"
                className={inputClass}
                {...register('title')}
              />
              {errors.title && (
                <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-xs font-semibold text-gray-800 mb-1.5">
                Mô tả chi tiết món ăn *
              </label>
              <textarea
                id="description"
                rows={3}
                placeholder="Mô tả hương vị đặc trưng, nguồn gốc món ăn hoặc kỷ niệm ấm cúng..."
                className={inputClass}
                {...register('description')}
              />
              {errors.description && (
                <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="categoryId" className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Danh mục ẩm thực *
                </label>
                <select id="categoryId" className={inputClass} {...register('categoryId')}>
                  {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="difficulty" className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Độ khó thực hiện *
                </label>
                <select id="difficulty" className={inputClass} {...register('difficulty')}>
                  {Object.entries(difficultyLabels).map(([val, label]) => (
                    <option key={val} value={val}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label htmlFor="prepTime" className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Chuẩn bị (phút) *
                </label>
                <input
                  id="prepTime"
                  type="number"
                  min={1}
                  className={inputClass}
                  {...register('prepTime', { valueAsNumber: true })}
                />
                {errors.prepTime && (
                  <p className="mt-1 text-xs text-rose-600 font-medium">{errors.prepTime.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="cookTime" className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Nấu chín (phút) *
                </label>
                <input
                  id="cookTime"
                  type="number"
                  min={0}
                  className={inputClass}
                  {...register('cookTime', { valueAsNumber: true })}
                />
                {errors.cookTime && (
                  <p className="mt-1 text-xs text-rose-600 font-medium">{errors.cookTime.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="servings" className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Khẩu phần (người) *
                </label>
                <input
                  id="servings"
                  type="number"
                  min={1}
                  className={inputClass}
                  {...register('servings', { valueAsNumber: true })}
                />
                {errors.servings && (
                  <p className="mt-1 text-xs text-rose-600 font-medium">{errors.servings.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* BƯỚC 2: NGUYÊN LIỆU (FR-DB-007 / FR-FTE-010) */}
        {/* ========================================================== */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Bước 2: Danh sách nguyên liệu cần chuẩn bị</h2>
                <p className="text-xs text-gray-500 mt-1">
                  Quy tắc nghiệp vụ: Công thức phải có ít nhất 1 nguyên liệu mới được phép xuất bản.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  appendIngredient({ name: '', quantity: 1, unit: 'g', notes: '' })
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold hover:bg-amber-100 transition-all"
              >
                <span>➕</span> Thêm nguyên liệu
              </button>
            </div>

            {errors.ingredients?.message && (
              <p className="p-3 bg-rose-50 text-rose-700 text-xs rounded-lg font-medium border border-rose-200">
                ⚠️ {errors.ingredients.message}
              </p>
            )}

            <div className="space-y-3">
              {ingredientFields.map((field, idx) => (
                <div
                  key={field.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3.5 bg-gray-50/70 rounded-xl border border-gray-200"
                >
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>

                  <div className="flex-1 w-full sm:w-auto">
                    <input
                      placeholder="Tên nguyên liệu (vd: Bột năng)"
                      className={inputClass}
                      {...register(`ingredients.${idx}.name`)}
                    />
                  </div>

                  <div className="w-full sm:w-28">
                    <input
                      type="number"
                      step="any"
                      placeholder="Định lượng"
                      className={inputClass}
                      {...register(`ingredients.${idx}.quantity`, { valueAsNumber: true })}
                    />
                  </div>

                  <div className="w-full sm:w-28">
                    <input
                      placeholder="Đơn vị (g, ml...)"
                      className={inputClass}
                      {...register(`ingredients.${idx}.unit`)}
                    />
                  </div>

                  <div className="w-full sm:w-44">
                    <input
                      placeholder="Ghi chú (tùy chọn)"
                      className={inputClass}
                      {...register(`ingredients.${idx}.notes`)}
                    />
                  </div>

                  {ingredientFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(idx)}
                      className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all"
                      title="Xóa nguyên liệu"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* BƯỚC 3: CÁC BƯỚC THỰC HIỆN (FR-DB-008 / FR-FTE-010) */}
        {/* ========================================================== */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Bước 3: Các bước nấu nướng & Hướng dẫn</h2>
                <p className="text-xs text-gray-500 mt-1">
                  Hệ thống tự động đánh số thứ tự tuần tự (Step 1, Step 2...). Cần tối thiểu 1 bước.
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold hover:bg-amber-100 transition-all"
              >
                <span>➕</span> Thêm bước thực hiện
              </button>
            </div>

            {errors.steps?.message && (
              <p className="p-3 bg-rose-50 text-rose-700 text-xs rounded-lg font-medium border border-rose-200">
                ⚠️ {errors.steps.message}
              </p>
            )}

            <div className="space-y-5">
              {stepFields.map((field, idx) => (
                <div
                  key={field.id}
                  className="p-4 sm:p-5 bg-stone-50/80 rounded-xl border border-stone-200 relative"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500 text-white font-bold text-xs">
                      🔥 Bước {idx + 1}
                    </span>
                    {stepFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStep(idx)}
                        className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
                      >
                        Xóa bước này
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-3">
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Tiêu đề bước
                      </label>
                      <input
                        placeholder="Ví dụ: Ướp gia vị thịt nướng"
                        className={inputClass}
                        {...register(`steps.${idx}.title`)}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Thời gian hẹn giờ (phút)
                      </label>
                      <input
                        type="number"
                        min={0}
                        placeholder="Phút"
                        className={inputClass}
                        {...register(`steps.${idx}.timerMinutes`, { valueAsNumber: true })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      Nội dung hướng dẫn chi tiết *
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Mô tả cụ thể nhiệt độ, độ lửa, thao tác đảo khuấy hoặc mẹo nấu..."
                      className={inputClass}
                      {...register(`steps.${idx}.description`)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* BƯỚC 4: HÌNH ẢNH & XÁC NHẬN (FR-INF-003 / FR-FTE-010) */}
        {/* ========================================================== */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Bước 4: Hình ảnh món ăn & Xem lại trước khi lưu</h2>
              <p className="text-xs text-gray-500 mt-1">
                Tải lên hình ảnh đại diện qua MinIO (FR-INF-003) và lựa chọn Lưu bản nháp hoặc Xuất bản ngay.
              </p>
            </div>

            {/* Upload ảnh & Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 bg-amber-50/40 rounded-xl border border-amber-200">
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Tải lên ảnh món ăn từ thiết bị
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700 cursor-pointer"
                />
                <p className="text-[11px] text-gray-500 mt-2">
                  Hoặc nhập đường dẫn ảnh trực tiếp (URL Unsplash / Web):
                </p>
                <input
                  placeholder="https://images.unsplash.com/..."
                  value={formValues.imageUrl || ''}
                  onChange={(e) => {
                    setValue('imageUrl', e.target.value);
                    setPreviewImage(e.target.value);
                  }}
                  className={`mt-1.5 ${inputClass}`}
                />
              </div>

              <div>
                <span className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Xem trước ảnh đại diện món ăn
                </span>
                <div className="relative w-full h-44 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewImage}
                    alt="Preview món ăn"
                    className="w-full h-full object-cover"
                  />
                </div>
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
                  <strong className="text-gray-800">{difficultyLabels[formValues.difficulty]}</strong>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
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
