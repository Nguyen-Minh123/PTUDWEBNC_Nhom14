'use client';

/**
 * ============================================================================
 * Chức năng:
 * - Hiển thị các thẻ thống kê của Dashboard.
 * - Hiển thị tổng số công thức.
 * - Hiển thị số công thức đã xuất bản.
 * - Hiển thị số bản nháp.
 * - Hiển thị số công thức lưu trữ.
 * - Hiển thị tỷ lệ xuất bản.
 *
 * Ghi chú:
 * - Component chỉ hiển thị dữ liệu.
 * - Không gọi API.
 * - Không chứa useEffect.
 * - Không quản lý state.
 * ============================================================================
 */

import React from 'react';

/**
 * Props truyền từ DashboardPage.
 */
export interface DashboardStatsProps {

    /**
     * Tổng số công thức.
     */
    totalRecipes: number;

    /**
     * Công thức đã xuất bản.
     */
    publishedRecipes: number;

    /**
     * Công thức bản nháp.
     */
    draftRecipes: number;

    /**
     * Công thức lưu trữ.
     */
    archivedRecipes: number;
}

/**
 * Định nghĩa một thẻ thống kê.
 */
interface StatCard {

    title: string;

    value: number;

    icon: string;

    textColor: string;

    borderColor: string;

    backgroundColor: string;
}

/**
 * Component DashboardStats.
 */
export default function DashboardStats({

    totalRecipes,

    publishedRecipes,

    draftRecipes,

    archivedRecipes,

}: DashboardStatsProps) {

    /**
     * Tính tỷ lệ công thức đã xuất bản.
     */
    const publishRate =

        totalRecipes === 0

            ? 0

            : Math.round(
                (publishedRecipes / totalRecipes) * 100
            );

    /**
     * Danh sách các thẻ thống kê.
     */
    const cards: StatCard[] = [

        {
            title: 'Tổng công thức',
            value: totalRecipes,
            icon: '🍲',
            textColor: 'text-gray-900',
            borderColor: 'border-gray-200',
            backgroundColor: 'bg-white',
        },

        {
            title: 'Đã xuất bản',
            value: publishedRecipes,
            icon: '🚀',
            textColor: 'text-emerald-700',
            borderColor: 'border-emerald-200',
            backgroundColor: 'bg-emerald-50',
        },

        {
            title: 'Bản nháp',
            value: draftRecipes,
            icon: '📝',
            textColor: 'text-amber-700',
            borderColor: 'border-amber-200',
            backgroundColor: 'bg-amber-50',
        },

        {
            title: 'Lưu trữ',
            value: archivedRecipes,
            icon: '📦',
            textColor: 'text-slate-700',
            borderColor: 'border-slate-200',
            backgroundColor: 'bg-slate-50',
        },

    ];

    return (

        <section
            className="mb-8">

            {/* Tiêu đề */}

            <div
                className="flex items-center justify-between mb-4">

                <div>

                    <h2
                        className="text-lg font-bold text-gray-900">

                        Thống kê nhanh

                    </h2>

                    <p
                        className="text-sm text-gray-500">

                        Tổng quan về hoạt động sáng tạo công thức.

                    </p>

                </div>

                {/* Hiển thị tỷ lệ xuất bản */}

                <div
                    className="
                        rounded-xl
                        bg-amber-100
                        px-4
                        py-2
                        text-center">

                    <p
                        className="text-xs text-gray-500">

                        Tỷ lệ xuất bản

                    </p>

                    <p
                        className="text-xl font-black text-amber-700">

                        {publishRate}%

                    </p>

                </div>

            </div>

            {/* Danh sách các Card */}

            <div
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-4
                    gap-5">

                {

                    cards.map((card) => (

                        <article

                            key={card.title}

                            className={`
                                rounded-2xl
                                border
                                ${card.borderColor}
                                ${card.backgroundColor}
                                p-5
                                shadow-sm
                                transition-all
                                hover:-translate-y-1
                                hover:shadow-lg
                            `}>

                            {/* Icon */}

                            <div
                                className="
                                    w-12
                                    h-12
                                    rounded-xl
                                    bg-white
                                    flex
                                    items-center
                                    justify-center
                                    text-2xl
                                    shadow-sm">

                                {card.icon}

                            </div>

                            {/* Tiêu đề */}

                            <p
                                className="
                                    mt-4
                                    text-xs
                                    uppercase
                                    tracking-wide
                                    text-gray-500
                                    font-semibold">

                                {card.title}

                            </p>

                            {/* Giá trị */}

                            <h3
                                className={`
                                    mt-2
                                    text-3xl
                                    font-black
                                    ${card.textColor}
                                `}>

                                {card.value}

                            </h3>

                        </article>

                    ))

                }

            </div>

        </section>

    );

}
