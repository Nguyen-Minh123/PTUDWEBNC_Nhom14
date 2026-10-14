'use client';

import React, { useEffect } from 'react';
import { RecipeSummaryDto } from '../../types';
import { CommentSection } from '../comments/CommentSection';

interface RecipeDetailModalProps {
  recipe: RecipeSummaryDto | null;
  onClose: () => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ recipe, onClose }) => {
  // Đóng modal khi bấm phím ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!recipe) return null;

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

        {/* Nội dung cuộn được */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Header & Ảnh lớn */}
          <div className="relative rounded-2xl overflow-hidden aspect-video w-full max-h-80 bg-gray-100">
            <img
              src={recipe.coverImageUrl || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&auto=format&fit=crop&q=80'}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="px-3 py-1 bg-amber-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-md mb-2 inline-block">
                {recipe.categoryName}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {recipe.title}
              </h2>
              <p className="text-xs text-amber-200 mt-1">
                Tác giả: <span className="font-semibold text-white">{recipe.authorName || 'Đầu Bếp'}</span> • Ngày đăng: {new Date(recipe.createdAt).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>

          {/* Thông số nấu ăn */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-amber-50/50 rounded-2xl border border-amber-100/80 text-center">
            <div>
              <span className="text-[11px] text-gray-500 font-medium">Chuẩn bị</span>
              <div className="text-base font-bold text-gray-900 mt-0.5">⏱ {recipe.prepTime} phút</div>
            </div>
            <div>
              <span className="text-[11px] text-gray-500 font-medium">Thời gian nấu</span>
              <div className="text-base font-bold text-gray-900 mt-0.5">🔥 {recipe.cookTime} phút</div>
            </div>
            <div>
              <span className="text-[11px] text-gray-500 font-medium">Khẩu phần</span>
              <div className="text-base font-bold text-gray-900 mt-0.5">👥 {recipe.servings} người</div>
            </div>
            <div>
              <span className="text-[11px] text-gray-500 font-medium">Độ khó</span>
              <div className="text-base font-bold text-amber-600 mt-0.5">⚡ {recipe.difficulty}</div>
            </div>
          </div>

          {/* Mô tả món ăn */}
          <div>
            <h4 className="text-base font-bold text-gray-900 mb-2">Giới thiệu món ăn</h4>
            <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
              {recipe.description}
            </p>
          </div>

          {/* Tích hợp trực tiếp Comment Section */}
          <CommentSection recipeId={recipe.id} recipeTitle={recipe.title} />
        </div>
      </div>
    </div>
  );
};
