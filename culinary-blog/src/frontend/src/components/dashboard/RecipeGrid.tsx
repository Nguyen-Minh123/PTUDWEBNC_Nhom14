'use client';

/**
 * ============================================================================
 * File:
 * src/components/dashboard/RecipeGrid.tsx
 *
 * Chức năng:
 * - Hiển thị danh sách công thức dưới dạng lưới card.
 * - Dùng lại RecipeCard để render từng công thức.
 * - Hiển thị giao diện rỗng khi không có dữ liệu.
 *
 * Ghi chú:
 * - Component chỉ hiển thị giao diện.
 * - Không gọi API.
 * - Không tự lọc dữ liệu.
 * - Không quản lý state nghiệp vụ.
 * ============================================================================
 */

import React from 'react';
import type { RecipeSummaryDto } from '@/types';
import RecipeCard from './RecipeCard';

/**
 * Props của RecipeGrid.
 */
export interface RecipeGridProps {
    /**
     * Danh sách công thức đã được lọc sẵn.
     */
    recipes: RecipeSummaryDto[];

    /**
     * Gọi khi người dùng bấm nút Xuất bản.
     */
    onPublish?: (recipeId: string) => void | Promise<void>;

    /**
     * Gọi khi người dùng bấm nút Lưu trữ.
     */
    onArchive?: (recipeId: string) => void | Promise<void>;

    /**
     * Gọi khi người dùng bấm nút Xóa.
     */
    onDelete?: (recipeId: string) => void | Promise<void>;

    /**
     * Cho phép ẩn toàn bộ thanh hành động trên card.
     */
    showActions?: boolean;

    /**
     * Nội dung hiển thị khi danh sách rỗng.
     */
    emptyMessage?: string;

    /**
     * ClassName tuỳ biến cho wrapper.
     */
    className?: string;
}

/**
 * RecipeGrid
 * Hiển thị danh sách công thức dưới dạng lưới responsive.
 */
export default function RecipeGrid({
    recipes,
    onPublish,
    onArchive,
    onDelete,
    showActions = true,
    emptyMessage = 'Không có công thức nào phù hợp với bộ lọc hiện tại.',
    className = '',
}: RecipeGridProps) {
    /**
     * Trạng thái rỗng: không có dữ liệu để hiển thị.
     */
    if (recipes.length === 0) {
        return (
            <div
                className={[
                    'bg-white',
                    'rounded-2xl',
                    'border',
                    'border-gray-200',
                    'p-8',
                    'text-center',
                    'text-sm',
                    'text-gray-500',
                    className,
                ].join(' ')}
            >
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div
            className={[
                'grid',
                'grid-cols-1',
                'md:grid-cols-2',
                'lg:grid-cols-3',
                'gap-6',
                className,
            ].join(' ')}
        >
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onPublish={onPublish}
                    onArchive={onArchive}
                    onDelete={onDelete}
                    showActions={showActions}
                />
            ))}
        </div>
    );
}