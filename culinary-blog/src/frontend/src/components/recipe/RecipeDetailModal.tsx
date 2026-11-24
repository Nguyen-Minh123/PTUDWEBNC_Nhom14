'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RecipeSummaryDto } from '../../types';
import { CommentSection } from '../comments/CommentSection';
import { useRecipeDetail } from '@/hooks/queries/useRecipes';
import { RecipeDetailSkeleton } from './RecipeDetailSkeleton';

interface RecipeDetailModalProps {
  recipe: RecipeSummaryDto | null;
  onClose: () => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ recipe, onClose }) => {
  const { data: recipeDetail, isLoading } = useRecipeDetail(recipe?.id ?? '');

  // Đóng modal khi bấm phím ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!recipe) return null;

  // Dữ liệu tóm tắt vẫn cho phép mở modal nếu API không có bản chi tiết.
  const displayedRecipe = recipeDetail ?? recipe;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng modal */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Đóng cửa sổ"
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all"
        >
          ✕
        </button>

        {isLoading ? (
          <RecipeDetailSkeleton />
        ) : (
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Header & Ảnh lớn */}
            <div className="relative rounded-2xl overflow-hidden aspect-video w-full max-h-80 bg-gray-100">
              <img
                src={displayedRecipe.coverImageUrl || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&auto=format&fit=crop&q=80'}
                alt={displayedRecipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-3 py-1 bg-amber-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-md mb-2 inline-block">
                  {displayedRecipe.categoryName}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {displayedRecipe.title}
                </h2>
                <p className="text-xs text-amber-200 mt-1">
                  Tác giả: <span className="font-semibold text-white">{displayedRecipe.authorName || 'Đầu Bếp'}</span> • Ngày đăng: {new Date(displayedRecipe.createdAt).toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>

            {/* Thông số nấu ăn */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-amber-50/50 rounded-2xl border border-amber-100/80 text-center">
              <div>
                <span className="text-[11px] text-gray-500 font-medium">Chuẩn bị</span>
                <div className="text-base font-bold text-gray-900 mt-0.5">⏱ {displayedRecipe.prepTime} phút</div>
              </div>
              <div>
                <span className="text-[11px] text-gray-500 font-medium">Thời gian nấu</span>
                <div className="text-base font-bold text-gray-900 mt-0.5">🔥 {displayedRecipe.cookTime} phút</div>
              </div>
              <div>
                <span className="text-[11px] text-gray-500 font-medium">Khẩu phần</span>
                <div className="text-base font-bold text-gray-900 mt-0.5">👥 {displayedRecipe.servings} người</div>
              </div>
              <div>
                <span className="text-[11px] text-gray-500 font-medium">Độ khó</span>
                <div className="text-base font-bold text-amber-600 mt-0.5">⚡ {displayedRecipe.difficulty}</div>
              </div>
            </div>

            {/* Mô tả món ăn */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-base font-bold text-gray-900">Giới thiệu món ăn</h4>
                <Link
                  href={`/recipes/${displayedRecipe.id}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>Xem đầy đủ & Chế độ nấu ăn →</span>
                </Link>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                {displayedRecipe.description}
              </p>
            </div>

            {/* Nguyên liệu & Các bước chế biến tóm tắt */}
            {recipeDetail && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recipeDetail.ingredients && recipeDetail.ingredients.length > 0 && (
                  <div className="bg-amber-50/40 p-4 rounded-2xl border border-amber-100">
                    <h4 className="text-sm font-bold text-gray-900 mb-3">
                      🛒 Nguyên liệu ({recipeDetail.ingredients.length})
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-700">
                      {recipeDetail.ingredients.map((ing, idx) => (
                        <li key={ing.id || idx} className="flex items-center justify-between border-b border-amber-100/60 pb-1.5">
                          <span className="font-medium text-gray-800">{ing.name}</span>
                          <span className="font-bold text-amber-700">
                            {ing.quantity} {ing.unit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {recipeDetail.steps && recipeDetail.steps.length > 0 && (
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
                    <h4 className="text-sm font-bold text-gray-900 mb-3">
                      👨‍🍳 Các bước chế biến ({recipeDetail.steps.length} bước)
                    </h4>
                    <ol className="space-y-2.5 text-xs text-gray-700">
                      {recipeDetail.steps.map((st) => (
                        <li key={st.id || st.stepNumber} className="space-y-0.5">
                          <div className="font-bold text-stone-900">
                            Bước {st.stepNumber}: {st.title}
                            {st.timerMinutes ? (
                              <span className="ml-1.5 text-[11px] font-semibold text-amber-600">
                                ({st.timerMinutes} phút)
                              </span>
                            ) : null}
                          </div>
                          <p className="text-stone-600 line-clamp-2 leading-relaxed">{st.description}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            )}

            {/* Tích hợp trực tiếp Comment Section */}
            <CommentSection recipeId={displayedRecipe.id} recipeTitle={displayedRecipe.title} />
          </div>
        )}
      </div>
    </div>
  );
};
