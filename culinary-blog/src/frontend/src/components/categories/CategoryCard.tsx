'use client';

import Link from 'next/link';
import React from 'react';
import { CategoryDto } from '@/types/category.dto';

/**
 * ==========================================================
 * CategoryCard
 * ----------------------------------------------------------
 * Chức năng:
 * - Hiển thị thông tin của một Category.
 * - Điều hướng sang trang danh sách Recipe theo Category.
 * - Hỗ trợ callback khi người dùng click.
 * - Responsive và tái sử dụng cho nhiều màn hình.
 * ==========================================================
 */

interface CategoryCardProps {
    /** Thông tin Category */
    category: CategoryDto;

    /** Hàm callback khi chọn Category */
    onClick?: () => void;
}

/**
 * Sinh màu nền ngẫu nhiên dựa trên tên Category.
 * Giúp mỗi Category có màu nhận diện khác nhau.
 */
function getGradient(name: string): string {
    const gradients = [
        'from-orange-500 to-red-500',
        'from-amber-500 to-yellow-500',
        'from-emerald-500 to-green-600',
        'from-blue-500 to-cyan-500',
        'from-purple-500 to-pink-500',
        'from-indigo-500 to-violet-500',
        'from-rose-500 to-pink-600',
        'from-teal-500 to-emerald-600',
    ];

    let hash = 0;

    for (let i = 0; i < name.length; i++) {
        hash += name.charCodeAt(i);
    }

    return gradients[hash % gradients.length];
}

/**
 * Sinh Icon Emoji theo tên Category.
 */
function getCategoryIcon(name: string): string {
    const value = name.toLowerCase();

    if (value.includes('beef')) return "🥩";
    if (value.includes('meat')) return "🍖";
    if (value.includes('chicken')) return "🍗";
    if (value.includes('fish')) return "🐟";
    if (value.includes('seafood')) return "🦐";
    if (value.includes('vegetable')) return "🥬";
    if (value.includes('dessert')) return "🍰";
    if (value.includes('cake')) return "🎂";
    if (value.includes('drink')) return "🥤";
    if (value.includes('coffee')) return "☕";
    if (value.includes('fruit')) return "🍎";
    if (value.includes('salad')) return "🥗";
    if (value.includes('rice')) return "🍚";
    if (value.includes('soup')) return "🍲";

    return "🍽️";
}

/**
 * Component CategoryCard
 */
export function CategoryCard({
    category,
    onClick,
}: CategoryCardProps) {
    return (
        <Link
            href={`/recipes?category=${category.id}`}
            onClick={onClick}
            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            {/* =======================================================
           Banner Category
      ======================================================= */}
            <div
                className={`relative h-40 bg-gradient-to-br ${getGradient(
                    category.name
                )}`}
            >
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center text-6xl transition-transform duration-300 group-hover:scale-110">
                    {getCategoryIcon(category.name)}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* =======================================================
           Nội dung Category
      ======================================================= */}
            <div className="p-5">
                {/* Tên Category */}
                <h3 className="line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-amber-600">
                    {category.name}
                </h3>

                {/* Mô tả */}
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-500">
                    {category.description ||
                        'Danh mục món ăn của Culinary Blog.'}
                </p>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                        Category
                    </span>

                    <span className="text-sm font-semibold text-amber-600 transition-all group-hover:translate-x-1">
                        Xem →
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default CategoryCard;