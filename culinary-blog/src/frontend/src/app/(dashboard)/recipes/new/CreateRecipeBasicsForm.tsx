'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const recipeBasicsSchema = z.object({
  title: z.string().trim().min(3, 'Tên cần ít nhất 3 ký tự.').max(200, 'Tên tối đa 200 ký tự.'),
  description: z.string().trim().min(10, 'Mô tả cần ít nhất 10 ký tự.').max(2000, 'Mô tả tối đa 2000 ký tự.'),
  prepTime: z.number().int('Nhập số nguyên.').min(1, 'Thời gian chuẩn bị phải lớn hơn 0.').max(2147483647),
  cookTime: z.number().int('Nhập số nguyên.').min(0, 'Thời gian nấu không được âm.').max(2147483647),
  servings: z.number().int('Nhập số nguyên.').min(1, 'Khẩu phần phải lớn hơn 0.').max(2147483647),
  difficulty: z.enum(['Easy', 'Medium', 'Hard', 'Expert']),
});

type RecipeBasics = z.infer<typeof recipeBasicsSchema>;

const difficultyLabels: Record<RecipeBasics['difficulty'], string> = {
  Easy: 'Dễ',
  Medium: 'Vừa',
  Hard: 'Khó',
  Expert: 'Nâng cao',
};

const fieldClassName =
  'mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100';

export function CreateRecipeBasicsForm() {
  const [validatedBasics, setValidatedBasics] = useState<RecipeBasics | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecipeBasics>({
    resolver: zodResolver(recipeBasicsSchema),
    defaultValues: {
      title: '',
      description: '',
      prepTime: 1,
      cookTime: 0,
      servings: 1,
      difficulty: 'Easy',
    },
  });

  if (validatedBasics) {
    return (
      <section aria-labelledby="review-heading" className="rounded-xl border border-emerald-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-emerald-700" aria-live="polite">Thông tin hợp lệ</p>
        <h2 id="review-heading" className="mt-2 text-xl font-bold text-gray-900">{validatedBasics.title}</h2>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">{validatedBasics.description}</p>
        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5 text-sm sm:grid-cols-4">
          <div><dt className="text-gray-500">Chuẩn bị</dt><dd className="mt-1 font-semibold">{validatedBasics.prepTime} phút</dd></div>
          <div><dt className="text-gray-500">Nấu</dt><dd className="mt-1 font-semibold">{validatedBasics.cookTime} phút</dd></div>
          <div><dt className="text-gray-500">Khẩu phần</dt><dd className="mt-1 font-semibold">{validatedBasics.servings} người</dd></div>
          <div><dt className="text-gray-500">Độ khó</dt><dd className="mt-1 font-semibold">{difficultyLabels[validatedBasics.difficulty]}</dd></div>
        </dl>
        <button
          type="button"
          onClick={() => setValidatedBasics(null)}
          className="mt-6 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Chỉnh sửa thông tin
        </button>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((values) => setValidatedBasics(values))}
      noValidate
      className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div>
        <label htmlFor="title" className="text-sm font-semibold text-gray-800">Tên công thức</label>
        <input id="title" autoComplete="off" aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? 'title-error' : undefined} className={fieldClassName} {...register('title')} />
        {errors.title && <p id="title-error" role="alert" className="mt-1.5 text-sm text-rose-700">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-semibold text-gray-800">Mô tả</label>
        <textarea id="description" rows={4} aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? 'description-error' : undefined} className={fieldClassName} {...register('description')} />
        {errors.description && <p id="description-error" role="alert" className="mt-1.5 text-sm text-rose-700">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="prepTime" className="text-sm font-semibold text-gray-800">Chuẩn bị (phút)</label>
          <input id="prepTime" type="number" min={1} step={1} aria-invalid={Boolean(errors.prepTime)} aria-describedby={errors.prepTime ? 'prepTime-error' : undefined} className={fieldClassName} {...register('prepTime', { valueAsNumber: true })} />
          {errors.prepTime && <p id="prepTime-error" role="alert" className="mt-1.5 text-sm text-rose-700">{errors.prepTime.message}</p>}
        </div>
        <div>
          <label htmlFor="cookTime" className="text-sm font-semibold text-gray-800">Nấu (phút)</label>
          <input id="cookTime" type="number" min={0} step={1} aria-invalid={Boolean(errors.cookTime)} aria-describedby={errors.cookTime ? 'cookTime-error' : undefined} className={fieldClassName} {...register('cookTime', { valueAsNumber: true })} />
          {errors.cookTime && <p id="cookTime-error" role="alert" className="mt-1.5 text-sm text-rose-700">{errors.cookTime.message}</p>}
        </div>
        <div>
          <label htmlFor="servings" className="text-sm font-semibold text-gray-800">Khẩu phần (người)</label>
          <input id="servings" type="number" min={1} step={1} aria-invalid={Boolean(errors.servings)} aria-describedby={errors.servings ? 'servings-error' : undefined} className={fieldClassName} {...register('servings', { valueAsNumber: true })} />
          {errors.servings && <p id="servings-error" role="alert" className="mt-1.5 text-sm text-rose-700">{errors.servings.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="difficulty" className="text-sm font-semibold text-gray-800">Độ khó</label>
        <select id="difficulty" className={fieldClassName} {...register('difficulty')}>
          {Object.entries(difficultyLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </div>

      <div className="flex justify-end border-t border-gray-100 pt-5">
        <button type="submit" disabled={isSubmitting} className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60">
          Kiểm tra thông tin
        </button>
      </div>
    </form>
  );
}