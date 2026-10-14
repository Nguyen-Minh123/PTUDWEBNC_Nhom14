'use client';

import React from 'react';
import { CATEGORIES } from '../../services/recipeService';

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  selectedDifficulty: string;
  onSelectDifficulty: (difficulty: string) => void;
  selectedSort: string;
  onSelectSort: (sort: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedDifficulty,
  onSelectDifficulty,
  selectedSort,
  onSelectSort,
}) => {
  return (
    <div className="w-full space-y-4 my-6">
      {/* 1. Danh mục ẩm thực (Pills) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                isActive
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-200'
                  : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200 hover:border-amber-300'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* 2. Bộ lọc độ khó & Sắp xếp linh hoạt (?sort=-field) */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-amber-50/60 p-4 rounded-2xl border border-amber-100">
        {/* Lọc Độ Khó */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Độ khó:
          </span>
          <div className="inline-flex rounded-lg bg-white p-1 border border-gray-200 text-xs">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'easy', label: 'Dễ' },
              { id: 'medium', label: 'Vừa' },
              { id: 'hard', label: 'Khó' },
            ].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => onSelectDifficulty(d.id)}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  selectedDifficulty === d.id
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cú pháp sắp xếp chuẩn RESTful */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Sắp xếp theo:
          </span>
          <select
            value={selectedSort}
            onChange={(e) => onSelectSort(e.target.value)}
            className="bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 cursor-pointer shadow-sm"
          >
            <option value="-createdAt">✨ Mới nhất (?sort=-createdAt)</option>
            <option value="createdAt">⏳ Cũ nhất (?sort=createdAt)</option>
            <option value="title">🔤 Tên A-Z (?sort=title)</option>
            <option value="-title">🔤 Tên Z-A (?sort=-title)</option>
            <option value="prepTime">⚡ Chuẩn bị nhanh nhất (?sort=prepTime)</option>
            <option value="-prepTime">⏱ Chuẩn bị kỹ nhất (?sort=-prepTime)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
