'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * Chế độ giao diện toàn cục.
 * - light: sáng
 * - dark: tối
 * - system: theo hệ điều hành
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Các panel/ui layer có thể mở đồng thời theo ngữ cảnh.
 * Tách riêng loại này giúp UI dễ quản lý hơn khi có nhiều modal/popup.
 */
export type UiPanel =
    | 'none'
    | 'search'
    | 'filters'
    | 'recipe-detail'
    | 'confirm-delete'
    | 'sidebar';

/**
 * Trạng thái giao diện người dùng.
 * Store này chỉ nên giữ state UI, không giữ dữ liệu nghiệp vụ.
 */
interface UIState {
    // =========================
    // Theme
    // =========================

    /** Theme hiện tại của ứng dụng. */
    theme: ThemeMode;

    /** Cập nhật theme. */
    setTheme: (theme: ThemeMode) => void;

    /** Đổi qua lại giữa light và dark. */
    toggleTheme: () => void;

    // =========================
    // Sidebar / Menu
    // =========================

    /** Sidebar trên desktop đang mở hay không. */
    isSidebarOpen: boolean;

    /** Mobile menu / drawer đang mở hay không. */
    isMobileMenuOpen: boolean;

    /** Mở sidebar desktop. */
    openSidebar: () => void;

    /** Đóng sidebar desktop. */
    closeSidebar: () => void;

    /** Bật/tắt sidebar desktop. */
    toggleSidebar: () => void;

    /** Mở mobile menu. */
    openMobileMenu: () => void;

    /** Đóng mobile menu. */
    closeMobileMenu: () => void;

    /** Bật/tắt mobile menu. */
    toggleMobileMenu: () => void;

    // =========================
    // Search / Filter
    // =========================

    /** Ô tìm kiếm nhanh đang mở hay không. */
    isSearchOpen: boolean;

    /** Khung lọc công thức đang mở hay không. */
    isFilterOpen: boolean;

    /** Mở search panel. */
    openSearch: () => void;

    /** Đóng search panel. */
    closeSearch: () => void;

    /** Mở filter panel. */
    openFilters: () => void;

    /** Đóng filter panel. */
    closeFilters: () => void;

    // =========================
    // Modal / Panel chung
    // =========================

    /** Panel/modal đang active. */
    activePanel: UiPanel;

    /** ID công thức đang xem chi tiết. */
    selectedRecipeId: string | null;

    /** Mở chi tiết công thức theo ID. */
    openRecipeDetail: (recipeId: string) => void;

    /** Đóng chi tiết công thức. */
    closeRecipeDetail: () => void;

    /** Mở hộp thoại xác nhận xóa. */
    openConfirmDelete: () => void;

    /** Đóng hộp thoại xác nhận xóa. */
    closeConfirmDelete: () => void;

    /** Đóng toàn bộ panel đang mở. */
    closeAllPanels: () => void;

    // =========================
    // Loading
    // =========================

    /** Hiển thị loading toàn cục hay không. */
    isGlobalLoading: boolean;

    /** Cập nhật trạng thái loading toàn cục. */
    setGlobalLoading: (value: boolean) => void;

    // =========================
    // Reset
    // =========================

    /** Đưa UI về trạng thái ban đầu. */
    resetUI: () => void;
}

/**
 * Giá trị mặc định của UI.
 * Tách ra riêng để dễ reset toàn bộ store.
 */
const initialUIState = {
    theme: 'system' as ThemeMode,
    isSidebarOpen: true,
    isMobileMenuOpen: false,
    isSearchOpen: false,
    isFilterOpen: false,
    activePanel: 'none' as UiPanel,
    selectedRecipeId: null,
    isGlobalLoading: false,
};

export const useUIStore = create<UIState>()(
    persist(
        (set, get) => ({
            // =========================
            // Initial state
            // =========================
            ...initialUIState,

            // =========================
            // Theme
            // =========================

            /**
             * Cập nhật theme toàn cục.
             */
            setTheme: (theme) =>
                set({
                    theme,
                }),

            /**
             * Chuyển theme giữa light và dark.
             * Nếu đang ở system thì mặc định chuyển sang dark.
             */
            toggleTheme: () => {
                const currentTheme = get().theme;

                const nextTheme =
                    currentTheme === 'light'
                        ? 'dark'
                        : 'light';

                set({
                    theme: nextTheme,
                });
            },

            // =========================
            // Sidebar / Menu
            // =========================

            /**
             * Mở sidebar desktop.
             */
            openSidebar: () =>
                set({
                    isSidebarOpen: true,
                    activePanel: 'sidebar',
                }),

            /**
             * Đóng sidebar desktop.
             */
            closeSidebar: () =>
                set({
                    isSidebarOpen: false,
                    activePanel: get().activePanel === 'sidebar' ? 'none' : get().activePanel,
                }),

            /**
             * Bật/tắt sidebar desktop.
             */
            toggleSidebar: () =>
                set((state) => ({
                    isSidebarOpen: !state.isSidebarOpen,
                    activePanel: !state.isSidebarOpen ? 'sidebar' : 'none',
                })),

            /**
             * Mở mobile menu.
             */
            openMobileMenu: () =>
                set({
                    isMobileMenuOpen: true,
                }),

            /**
             * Đóng mobile menu.
             */
            closeMobileMenu: () =>
                set({
                    isMobileMenuOpen: false,
                }),

            /**
             * Bật/tắt mobile menu.
             */
            toggleMobileMenu: () =>
                set((state) => ({
                    isMobileMenuOpen: !state.isMobileMenuOpen,
                })),

            // =========================
            // Search / Filter
            // =========================

            /**
             * Mở khung tìm kiếm nhanh.
             */
            openSearch: () =>
                set({
                    isSearchOpen: true,
                    activePanel: 'search',
                }),

            /**
             * Đóng khung tìm kiếm nhanh.
             */
            closeSearch: () =>
                set({
                    isSearchOpen: false,
                    activePanel: get().activePanel === 'search' ? 'none' : get().activePanel,
                }),

            /**
             * Mở khung lọc công thức.
             */
            openFilters: () =>
                set({
                    isFilterOpen: true,
                    activePanel: 'filters',
                }),

            /**
             * Đóng khung lọc công thức.
             */
            closeFilters: () =>
                set({
                    isFilterOpen: false,
                    activePanel: get().activePanel === 'filters' ? 'none' : get().activePanel,
                }),

            // =========================
            // Modal / Panel chung
            // =========================

            /**
             * Mở modal chi tiết công thức.
             */
            openRecipeDetail: (recipeId) =>
                set({
                    activePanel: 'recipe-detail',
                    selectedRecipeId: recipeId,
                }),

            /**
             * Đóng modal chi tiết công thức.
             */
            closeRecipeDetail: () =>
                set({
                    activePanel: 'none',
                    selectedRecipeId: null,
                }),

            /**
             * Mở hộp thoại xác nhận xóa.
             */
            openConfirmDelete: () =>
                set({
                    activePanel: 'confirm-delete',
                }),

            /**
             * Đóng hộp thoại xác nhận xóa.
             */
            closeConfirmDelete: () =>
                set({
                    activePanel: 'none',
                }),

            /**
             * Đóng tất cả panel/modal đang mở.
             */
            closeAllPanels: () =>
                set({
                    activePanel: 'none',
                    selectedRecipeId: null,
                    isSearchOpen: false,
                    isFilterOpen: false,
                    isMobileMenuOpen: false,
                }),

            // =========================
            // Loading
            // =========================

            /**
             * Bật/tắt loading toàn cục.
             * Dùng cho các thao tác chờ API hoặc chuyển trang nặng.
             */
            setGlobalLoading: (value) =>
                set({
                    isGlobalLoading: value,
                }),

            // =========================
            // Reset
            // =========================

            /**
             * Đưa UI về trạng thái ban đầu.
             * Hữu ích khi logout hoặc đổi layout.
             */
            resetUI: () =>
                set({
                    ...initialUIState,
                }),
        }),
        {
            name: 'culinary-blog-ui-store',

            /**
             * Chỉ lưu theme vào localStorage.
             * Các state UI khác là tạm thời nên không cần persist.
             */
            storage: createJSONStorage(() => localStorage),

            /**
             * Persist tối thiểu để tránh lưu những state giao diện ngắn hạn.
             */
            partialize: (state) => ({
                theme: state.theme,
            }),
        }
    )
);