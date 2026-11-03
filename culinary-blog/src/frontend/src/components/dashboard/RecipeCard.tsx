'use client';

/**
 * ============================================================================
 * Chức năng:
 * - Hiển thị một thẻ công thức trong Dashboard.
 * - Hiển thị ảnh, trạng thái, tiêu đề, mô tả và thông tin tóm tắt.
 * - Cung cấp các nút thao tác chuyển đổi trạng thái: Publish / Archive / Delete / Edit.
 * - Hỗ trợ liên kết trực tiếp tới trang chỉnh sửa (/recipes/[id]/edit) (FR-FTE-050 & FR-FTE-051).
 * ============================================================================
 */

import React, { useState } from 'react';
import Link from 'next/link';
import type { RecipeStatus, RecipeSummaryDto } from '@/types';

/**
 * Props của RecipeCard.
 */
export interface RecipeCardProps {
    /**
     * Dữ liệu công thức cần hiển thị.
     */
    recipe: RecipeSummaryDto;

    /**
     * Xử lý khi người dùng muốn xuất bản công thức.
     */
    onPublish?: (recipeId: string) => void | Promise<void>;

    /**
     * Xử lý khi người dùng muốn lưu trữ công thức.
     */
    onArchive?: (recipeId: string) => void | Promise<void>;

    /**
     * Xử lý khi người dùng muốn xóa công thức.
     */
    onDelete?: (recipeId: string) => void | Promise<void>;

    /**
     * Ẩn toàn bộ thanh hành động nếu cần.
     */
    showActions?: boolean;

    /**
     * Thêm className tùy biến cho container.
     */
    className?: string;
}

/**
 * Chuẩn hóa status về đúng kiểu RecipeStatus.
 */
function normalizeRecipeStatus(status: string): RecipeStatus {
    if (status === 'Published' || status === 'Draft' || status === 'Archived') {
        return status;
    }
    return 'Draft';
}

/**
 * Tạo nhãn tiếng Việt cho từng trạng thái.
 */
function getStatusLabel(status: RecipeStatus): string {
    if (status === 'Published') return 'Đã Xuất Bản';
    if (status === 'Draft') return 'Bản Nháp';
    return 'Lưu Trữ';
}

/**
 * Tạo class màu cho badge trạng thái.
 */
function getStatusBadgeClass(status: RecipeStatus): string {
    if (status === 'Published') return 'bg-emerald-600 text-white';
    if (status === 'Draft') return 'bg-amber-500 text-white';
    return 'bg-stone-600 text-white';
}

export default function RecipeCard({
    recipe,
    onPublish,
    onArchive,
    onDelete,
    showActions = true,
    className = '',
}: RecipeCardProps) {
    const status = normalizeRecipeStatus(recipe.status);
    const totalTime = recipe.totalTime || recipe.prepTime + recipe.cookTime;
    const coverImage =
        recipe.coverImageUrl ||
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handlePublish = () => {
        if (!onPublish) return;
        void onPublish(recipe.id);
    };

    const handleArchive = () => {
        if (!onArchive) return;
        void onArchive(recipe.id);
    };

    const handleDelete = () => {
        if (!onDelete) return;
        setShowDeleteConfirm(false);
        void onDelete(recipe.id);
    };

    return (
        <article
            className={[
                'bg-white',
                'rounded-2xl',
                'border',
                'border-gray-200/80',
                'overflow-hidden',
                'shadow-xs',
                'hover:shadow-md',
                'transition-all',
                'flex',
                'flex-col',
                'justify-between',
                className,
            ].join(' ')}
        >
            {/* Phần nội dung chính của card */}
            <div>
                {/* Ảnh công thức */}
                <Link href={`/recipes/${recipe.id}`} className="block relative h-44 w-full bg-gray-100 overflow-hidden group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={coverImage}
                        alt={recipe.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    />

                    {/* Badge trạng thái (FR-FTE-051) */}
                    <div className="absolute top-3 right-3">
                        <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs ${getStatusBadgeClass(
                                status
                            )}`}
                        >
                            {getStatusLabel(status)}
                        </span>
                    </div>
                </Link>

                {/* Nội dung tóm tắt */}
                <div className="p-4 sm:p-5">
                    {/* Meta data */}
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-1">
                        <span>{recipe.categoryName || 'Ẩm thực'}</span>
                        <span>•</span>
                        <span>{totalTime} phút</span>
                        <span>•</span>
                        <span>Độ khó: {recipe.difficulty}</span>
                    </div>

                    {/* Tiêu đề */}
                    <Link href={`/recipes/${recipe.id}`}>
                        <h3 className="text-base font-bold text-gray-900 line-clamp-1 hover:text-amber-600 transition-colors">
                            {recipe.title}
                        </h3>
                    </Link>

                    {/* Mô tả */}
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {recipe.description}
                    </p>
                </div>
            </div>

            {/* Thanh hành động và chuyển đổi trạng thái (FR-FTE-050 & FR-FTE-051) */}
            {showActions && (
                <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5">
                        {/* Nút chỉnh sửa công thức (FR-FTE-050) */}
                        <Link
                            href={`/recipes/${recipe.id}/edit`}
                            className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg font-semibold transition-all flex items-center gap-1"
                            title="Chỉnh sửa chi tiết công thức kèm RowVersion"
                        >
                            ✏️ Sửa
                        </Link>

                        {/* Nút xuất bản khi còn ở Draft hoặc tái xuất bản khi ở Archived */}
                        {(status === 'Draft' || status === 'Archived') && onPublish && (
                            <button
                                type="button"
                                onClick={handlePublish}
                                className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all shadow-2xs"
                                title="Xuất bản công thức này lên nền tảng"
                            >
                                🚀 {status === 'Archived' ? 'Tái xuất bản' : 'Xuất bản'}
                            </button>
                        )}

                        {/* Nút lưu trữ khi đã Published */}
                        {status === 'Published' && onArchive && (
                            <button
                                type="button"
                                onClick={handleArchive}
                                className="px-2.5 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg font-medium transition-all"
                                title="Chuyển công thức vào lưu trữ"
                            >
                                📦 Lưu trữ
                            </button>
                        )}
                    </div>

                    {/* Nút xóa có xác nhận */}
                    {onDelete && (
                        <div>
                            {showDeleteConfirm ? (
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        className="px-2 py-1 bg-red-600 text-white rounded text-[11px] font-bold hover:bg-red-700"
                                    >
                                        Xóa ngay
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="px-1.5 py-1 text-gray-500 text-[11px] hover:underline"
                                    >
                                        Hủy
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="px-2 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg font-semibold transition-all"
                                    title="Xóa mềm công thức"
                                >
                                    🗑️ Xóa
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </article>
    );
}
