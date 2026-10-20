'use client';

/**
 * ============================================================================
 * Chức năng:
 * - Hiển thị 2 tab điều hướng trong Dashboard.
 * - Cho phép chuyển giữa tab "Công thức" và "Hồ sơ".
 * - Hiển thị số lượng công thức nếu được truyền vào.
 *
 * Ghi chú:
 * - Component chỉ hiển thị giao diện.
 * - Không chứa state nội bộ.
 * - Không gọi API.
 * - Không xử lý business logic.
 * ============================================================================
 */

import React from 'react';

/**
 * Kiểu tab của Dashboard.
 */
export type DashboardTab = 'recipes' | 'profile';

/**
 * Props truyền từ DashboardPage.
 */
export interface DashboardTabsProps {
    /**
     * Tab hiện tại đang được chọn.
     */
    activeTab: DashboardTab;

    /**
     * Hàm xử lý khi đổi tab.
     */
    onTabChange: (tab: DashboardTab) => void;

    /**
     * Tổng số công thức để hiển thị trên tab "Công thức của tôi".
     */
    recipeCount?: number;
}

/**
 * DashboardTabs
 * Hiển thị thanh tab điều hướng cho dashboard cá nhân.
 */
export default function DashboardTabs({
    activeTab,
    onTabChange,
    recipeCount = 0,
}: DashboardTabsProps) {
    /**
     * Xử lý khi người dùng bấm tab Công thức.
     */
    const handleRecipesTabClick = () => {
        onTabChange('recipes');
    };

    /**
     * Xử lý khi người dùng bấm tab Hồ sơ.
     */
    const handleProfileTabClick = () => {
        onTabChange('profile');
    };

    return (
        <div className="flex border-b border-gray-200 mb-6">
            {/* Tab: Công thức của tôi */}
            <button
                type="button"
                onClick={handleRecipesTabClick}
                className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'recipes'
                        ? 'border-amber-600 text-amber-700'
                        : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                aria-pressed={activeTab === 'recipes'}
                aria-label="Chuyển sang tab Công thức của tôi"
            >
                <span>🍲</span>
                <span>Công Thức Của Tôi ({recipeCount})</span>
            </button>

            {/* Tab: Hồ sơ đầu bếp */}
            <button
                type="button"
                onClick={handleProfileTabClick}
                className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'profile'
                        ? 'border-amber-600 text-amber-700'
                        : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                aria-pressed={activeTab === 'profile'}
                aria-label="Chuyển sang tab Hồ sơ đầu bếp"
            >
                <span>👤</span>
                <span>Hồ Sơ Đầu Bếp</span>
            </button>
        </div>
    );
}
