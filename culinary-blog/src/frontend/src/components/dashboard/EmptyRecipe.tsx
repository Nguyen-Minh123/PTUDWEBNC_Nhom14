'use client';

/**
 * ============================================================================
 * Chức năng:
 * - Hiển thị trạng thái rỗng khi không có công thức nào phù hợp.
 * - Gợi ý người dùng tạo công thức mới.
 * - Dùng trong Dashboard khi bộ lọc không trả về dữ liệu.
 *
 * Ghi chú:
 * - Component chỉ hiển thị giao diện.
 * - Không gọi API.
 * - Không quản lý state.
 * - Không chứa business logic.
 * ============================================================================
 */

import Link from 'next/link';

export interface EmptyRecipeProps {
    /**
     * Tiêu đề trạng thái rỗng.
     */
    title?: string;

    /**
     * Mô tả ngắn giải thích vì sao đang trống.
     */
    description?: string;

    /**
     * Nhãn nút hành động chính.
     */
    actionLabel?: string;

    /**
     * Đường dẫn điều hướng khi bấm nút hành động.
     */
    actionHref?: string;

    /**
     * Emoji hoặc icon đơn giản để tăng tính trực quan.
     */
    icon?: string;
}

/**
 * EmptyRecipe
 * Hiển thị giao diện rỗng cho danh sách công thức.
 */
export default function EmptyRecipe({
    title = 'Chưa có công thức nào',
    description = 'Bạn chưa tạo công thức nào ở trạng thái này. Hãy bắt đầu chia sẻ công thức đầu tiên!',
    actionLabel = 'Tạo Công Thức Ngay',
    actionHref = '/recipes/new',
    icon = '🍳',
}: EmptyRecipeProps) {
    return (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8">
            {/* Biểu tượng minh họa */}
            <span className="text-4xl" aria-hidden="true">
                {icon}
            </span>

            {/* Tiêu đề trạng thái rỗng */}
            <h3 className="text-base font-bold text-gray-800 mt-2">
                {title}
            </h3>

            {/* Mô tả hỗ trợ người dùng */}
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                {description}
            </p>

            {/* Nút điều hướng tạo công thức mới */}
            <Link
                href={actionHref}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-all shadow-xs"
            >
                <span aria-hidden="true">✍️</span>
                {actionLabel}
            </Link>
        </div>
    );
}