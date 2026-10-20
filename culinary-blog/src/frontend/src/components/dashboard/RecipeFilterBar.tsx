'use client';

/**
 * ============================================================================
 * Chức năng:
 * - Hiển thị bộ lọc trạng thái công thức.
 * - Cho phép chuyển nhanh giữa:
 *      + Tất cả
 *      + Published
 *      + Draft
 *      + Archived
 * - Không tự lọc dữ liệu.
 * - Chỉ phát sự kiện cho DashboardPage.
 *
 * Ghi chú:
 * - Không gọi API.
 * - Không quản lý state nghiệp vụ.
 * - Component chỉ hiển thị giao diện.
 * ============================================================================
 */

import React from 'react';
import type { RecipeStatus } from '@/types';

/**
 * Kiểu filter hỗ trợ.
 */
export type RecipeFilterStatus =
    | 'all'
    | RecipeStatus;

/**
 * Props của component.
 */
export interface RecipeFilterBarProps {

    /**
     * Filter đang được chọn.
     */
    activeFilter: RecipeFilterStatus;

    /**
     * Callback khi thay đổi filter.
     */
    onStatusChange: (
        status: RecipeFilterStatus
    ) => void;

    /**
     * Tổng số công thức.
     */
    totalRecipes: number;

    /**
     * Số Published.
     */
    publishedRecipes: number;

    /**
     * Số Draft.
     */
    draftRecipes: number;

    /**
     * Số Archived.
     */
    archivedRecipes: number;

}

/**
 * Định nghĩa một button filter.
 */
interface FilterButton {

    key: RecipeFilterStatus;

    label: string;

    count: number;

}

/**
 * ============================================================================
 * RecipeFilterBar Component
 * ============================================================================
 */
export default function RecipeFilterBar({

    activeFilter,

    onStatusChange,

    totalRecipes,

    publishedRecipes,

    draftRecipes,

    archivedRecipes,

}: RecipeFilterBarProps) {

    /**
     * Danh sách filter.
     */
    const filters: FilterButton[] = [

        {
            key: 'all',
            label: 'Tất cả',
            count: totalRecipes,
        },

        {
            key: 'Published',
            label: 'Đã Xuất Bản',
            count: publishedRecipes,
        },

        {
            key: 'Draft',
            label: 'Bản Nháp',
            count: draftRecipes,
        },

        {
            key: 'Archived',
            label: 'Đã Lưu Trữ',
            count: archivedRecipes,
        },

    ];

    return (

        <section className="mb-6">

            {/* Tiêu đề */}

            <div className="flex items-center gap-2 mb-3">

                <span
                    className="
                        text-xs
                        font-semibold
                        text-gray-500">

                    Lọc theo trạng thái

                </span>

            </div>

            {/* Danh sách Filter */}

            <div
                className="
                    flex
                    items-center
                    gap-2

                    overflow-x-auto

                    pb-2">

                {

                    filters.map((filter) => {

                        const isActive =
                            activeFilter === filter.key;

                        return (

                            <button

                                key={filter.key}

                                type="button"

                                onClick={() =>
                                    onStatusChange(filter.key)
                                }

                                aria-pressed={isActive}

                                title={`Hiển thị ${filter.label}`}

                                className={`

                                    shrink-0

                                    px-4

                                    py-2

                                    rounded-xl

                                    text-xs

                                    font-semibold

                                    transition-all

                                    duration-200

                                    ${isActive

                                        ? 'bg-amber-600 text-white shadow-md'

                                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-amber-300'

                                    }

                                `}

                            >

                                {filter.label}

                                <span
                                    className="
                                        ml-2

                                        rounded-full

                                        bg-white/20

                                        px-2

                                        py-0.5">

                                    {filter.count}

                                </span>

                            </button>

                        );

                    })

                }

            </div>

        </section>

    );

}
