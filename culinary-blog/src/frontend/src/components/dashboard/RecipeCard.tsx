'use client';

/**
 * ============================================================================
 * Chức năng:
 * - Hiển thị một thẻ công thức trong Dashboard.
 * - Hiển thị ảnh, trạng thái, tiêu đề, mô tả và thông tin tóm tắt.
 * - Cung cấp các nút thao tác Publish / Archive / Delete.
 *
 * Ghi chú:
 * - Component chỉ hiển thị giao diện.
 * - Không gọi API trực tiếp.
 * - Không quản lý state nghiệp vụ.
 * - Hành động được truyền từ ngoài vào qua props.
 * ============================================================================
 */

import React from 'react';
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
 * Dùng để tránh lỗi dữ liệu API trả về dạng string rộng hơn kiểu DTO.
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
    if (status === 'Published') return 'bg-emerald-500 text-white';
    if (status === 'Draft') return 'bg-amber-500 text-white';
    return 'bg-gray-600 text-white';
}

/**
 * RecipeCard
 * Hiển thị một công thức trong dashboard dưới dạng card.
 */
export default function RecipeCard({
    recipe,
    onPublish,
    onArchive,
    onDelete,
    showActions = true,
    className = '',
}: RecipeCardProps) {
    /**
     * Trạng thái đã chuẩn hóa để dùng an toàn trong UI.
     */
    const status = normalizeRecipeStatus(recipe.status);

    /**
     * Tổng thời gian hiển thị.
     * Ưu tiên totalTime, nếu không có thì cộng prepTime + cookTime.
     */
    const totalTime = recipe.totalTime || recipe.prepTime + recipe.cookTime;

    /**
     * Ảnh đại diện công thức.
     * Dùng ảnh mặc định nếu recipe chưa có coverImageUrl.
     */
    const coverImage =
        recipe.coverImageUrl ||
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';

    /**
     * Xử lý bấm nút Publish.
     */
    const handlePublish = () => {
        if (!onPublish) return;
        void onPublish(recipe.id);
    };

    /**
     * Xử lý bấm nút Archive.
     */
    const handleArchive = () => {
        if (!onArchive) return;
        void onArchive(recipe.id);
    };

    /**
     * Xử lý bấm nút Delete.
     */
    const handleDelete = () => {
        if (!onDelete) return;
        void onDelete(recipe.id);
    };

    return (
        <article
            className={[
                'bg-white',
                'rounded-2xl',
                'border',
                'border-gray-200',
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
                <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={coverImage}
                        alt={recipe.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />

                    {/* Badge trạng thái */}
                    <div className="absolute top-3 right-3">
                        <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs ${getStatusBadgeClass(
                                status
                            )}`}
                        >
                            {getStatusLabel(status)}
                        </span>
                    </div>
                </div>

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
                    <h3 className="text-base font-bold text-gray-900 line-clamp-1 hover:text-amber-600 transition-colors">
                        {recipe.title}
                    </h3>

                    {/* Mô tả */}
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {recipe.description}
                    </p>
                </div>
            </div>

            {/* Thanh hành động */}
            {showActions && (
                <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5">
                        {/* Nút xuất bản chỉ hiện khi recipe còn ở Draft */}
                        {status === 'Draft' && onPublish && (
                            <button
                                type="button"
                                onClick={handlePublish}
                                className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all shadow-2xs"
                                title="Xuất bản công thức này lên trang chủ"
                            >
                                🚀 Xuất bản
                            </button>
                        )}

                        {/* Nút lưu trữ chỉ hiện khi recipe đã Published */}
                        {status === 'Published' && onArchive && (
                            <button
                                type="button"
                                onClick={handleArchive}
                                className="px-2.5 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all"
                                title="Chuyển công thức vào lưu trữ"
                            >
                                📦 Lưu trữ
                            </button>
                        )}
                    </div>

                    {/* Nút xóa luôn hiển thị nếu có callback */}
                    {onDelete && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="px-2 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg font-semibold transition-all"
                            title="Xóa công thức"
                        >
                            🗑️ Xóa
                        </button>
                    )}
                </div>
            )}
        </article>
    );
}