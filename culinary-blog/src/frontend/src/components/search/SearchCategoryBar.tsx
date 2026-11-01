'use client';

/**
 * Chức năng:
 * - Hiển thị ô tìm kiếm.
 * - Lọc theo Category bằng dropdown.
 * - Hiển thị nút xóa nhanh.
 * - Nhận dữ liệu từ hook cha để đồng bộ với query params.
 */

import React from 'react';

export interface SearchCategoryOption {
    id: string;
    name: string;
    recipeCount?: number;
}

export interface SearchBarProps {
    /** Từ khóa đang nhập */
    searchTerm: string;

    /** Category đang được chọn */
    categoryId: string;

    /** Danh sách category để render dropdown */
    categories: SearchCategoryOption[];

    /** Callback khi đổi từ khóa */
    onSearchTermChange: (value: string) => void;

    /** Callback khi đổi category */
    onCategoryChange: (categoryId: string) => void;

    /** Callback khi xóa toàn bộ bộ lọc */
    onClear: () => void;

    /** Placeholder của ô tìm kiếm */
    placeholder?: string;

    /** ClassName bổ sung */
    className?: string;
}

/**
 * SearchCategoryBar
 * Hiển thị tìm kiếm + lọc theo danh mục trong một cụm UI.
 */
export default function SearchCategoryBar({
    searchTerm,
    categoryId,
    categories,
    onSearchTermChange,
    onCategoryChange,
    onClear,
    placeholder = 'Tìm kiếm công thức...',
    className = '',
}: SearchBarProps) {
    const hasActiveFilters = searchTerm.trim().length > 0 || categoryId.trim().length > 0;

    return (
        <div
            className={[
                'flex',
                'flex-col',
                'gap-3',
                'rounded-2xl',
                'border',
                'border-gray-200',
                'bg-white',
                'p-4',
                'shadow-sm',
                className,
            ].join(' ')}
        >
            {/* Ô tìm kiếm */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="flex-1">
                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                        Tìm kiếm
                    </label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearchTermChange(e.target.value)}
                        placeholder={placeholder}
                        className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-2.5
              text-sm
              outline-none
              transition
              focus:border-amber-500
              focus:ring-2
              focus:ring-amber-100
            "
                    />
                </div>

                {/* Bộ lọc Category */}
                <div className="w-full md:w-72">
                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                        Danh mục
                    </label>
                    <select
                        value={categoryId}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="
              w-full
              rounded-xl
              border
              border-gray-200
              bg-white
              px-4
              py-2.5
              text-sm
              outline-none
              transition
              focus:border-amber-500
              focus:ring-2
              focus:ring-amber-100
            "
                    >
                        <option value="">Tất cả danh mục</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                                {typeof category.recipeCount === 'number' ? ` (${category.recipeCount})` : ''}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Thanh trạng thái + nút xóa */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-gray-500">
                    {hasActiveFilters
                        ? 'Đang lọc theo từ khóa và/hoặc danh mục.'
                        : 'Nhập từ khóa hoặc chọn danh mục để lọc kết quả.'}
                </p>

                <button
                    type="button"
                    onClick={onClear}
                    disabled={!hasActiveFilters}
                    className="
            rounded-xl
            border
            border-gray-200
            px-4
            py-2
            text-xs
            font-semibold
            text-gray-600
            transition
            hover:border-amber-300
            hover:bg-amber-50
            hover:text-amber-700
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
                >
                    Xóa bộ lọc
                </button>
            </div>
        </div>
    );
}