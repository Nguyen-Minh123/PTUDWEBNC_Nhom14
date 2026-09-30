'use client';

import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Tìm kiếm công thức nấu ăn, món nước, món kho, nguyên liệu...',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute left-4 pointer-events-none text-amber-600">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-12 pr-24 py-3.5 bg-white border-2 border-amber-200 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 shadow-sm transition-all duration-200"
        />

        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-14 text-gray-400 hover:text-gray-600 p-1 rounded-full"
            aria-label="Xóa từ khóa"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Submit / Action Button */}
        <button
          type="button"
          onClick={onSearch}
          className="absolute right-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-full hover:from-amber-600 hover:to-orange-600 focus:ring-2 focus:ring-orange-300 transition-all duration-150 shadow-sm text-sm"
        >
          Tìm
        </button>
      </div>

      {/* Gợi ý nhanh */}
      <div className="flex items-center gap-2 mt-2 px-4 text-xs text-gray-500 overflow-x-auto">
        <span className="font-semibold text-gray-600 shrink-0">Gợi ý:</span>
        {['Phở Bò', 'Bún Bò', 'Cơm Tấm', 'Cá Kho', 'Canh Chua'].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onChange(tag)}
            className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-full transition-colors shrink-0"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};
