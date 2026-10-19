'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * Trường dùng để sắp xếp danh sách công thức.
 * Có thể mở rộng thêm nếu backend hỗ trợ sort mới.
 */
export type RecipeSortBy =
    | 'newest'
    | 'oldest'
    | 'title'
    | 'cookTime'
    | 'prepTime'
    | 'rating'
    | 'views';

/**
 * Kiểu sắp xếp.
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Mức độ khó của công thức.
 * Giá trị 'all' dùng khi không lọc theo độ khó.
 */
export type RecipeDifficultyFilter = 'all' | 'easy' | 'medium' | 'hard';

/**
 * Trạng thái bộ lọc khoảng thời gian nấu.
 * Dùng để lọc công thức theo tổng thời gian chuẩn bị + nấu.
 */
export interface TimeRangeFilter {
    minMinutes: number | null;
    maxMinutes: number | null;
}

/**
 * Trạng thái bộ lọc danh sách công thức.
 * Store này chỉ giữ state điều khiển truy vấn và giao diện tìm kiếm/lọc.
 */
interface FilterState {
    // =====================================================================
    // Search
    // =====================================================================

    /** Từ khóa tìm kiếm hiện tại. */
    searchTerm: string;

    /** Cập nhật từ khóa tìm kiếm. */
    setSearchTerm: (value: string) => void;

    /** Xóa từ khóa tìm kiếm. */
    clearSearchTerm: () => void;

    // =====================================================================
    // Category filters
    // =====================================================================

    /** Danh sách categoryId đang được chọn. */
    selectedCategoryIds: string[];

    /** Gán toàn bộ danh sách categoryId đang chọn. */
    setSelectedCategoryIds: (ids: string[]) => void;

    /** Bật/tắt một categoryId trong danh sách chọn. */
    toggleCategoryId: (categoryId: string) => void;

    /** Xóa toàn bộ category đang chọn. */
    clearCategoryFilters: () => void;

    // =====================================================================
    // Difficulty filter
    // =====================================================================

    /** Bộ lọc độ khó hiện tại. */
    difficulty: RecipeDifficultyFilter;

    /** Cập nhật bộ lọc độ khó. */
    setDifficulty: (value: RecipeDifficultyFilter) => void;

    /** Đưa độ khó về mặc định. */
    clearDifficulty: () => void;

    // =====================================================================
    // Time range filter
    // =====================================================================

    /** Bộ lọc khoảng thời gian nấu. */
    timeRange: TimeRangeFilter;

    /** Cập nhật khoảng thời gian nấu. */
    setTimeRange: (range: TimeRangeFilter) => void;

    /** Xóa bộ lọc thời gian nấu. */
    clearTimeRange: () => void;

    // =====================================================================
    // Sorting
    // =====================================================================

    /** Trường đang dùng để sắp xếp. */
    sortBy: RecipeSortBy;

    /** Chiều sắp xếp. */
    sortDirection: SortDirection;

    /** Cập nhật trường sắp xếp. */
    setSortBy: (value: RecipeSortBy) => void;

    /** Cập nhật chiều sắp xếp. */
    setSortDirection: (value: SortDirection) => void;

    /** Đổi qua lại giữa asc và desc. */
    toggleSortDirection: () => void;

    // =====================================================================
    // Pagination
    // =====================================================================

    /** Trang hiện tại của danh sách. */
    page: number;

    /** Số item mỗi trang. */
    pageSize: number;

    /** Cập nhật trang hiện tại. */
    setPage: (page: number) => void;

    /** Chuyển sang trang kế tiếp. */
    nextPage: () => void;

    /** Quay về trang trước. */
    previousPage: () => void;

    /** Cập nhật kích thước trang. */
    setPageSize: (pageSize: number) => void;

    // =====================================================================
    // Helpers
    // =====================================================================

    /**
     * Reset toàn bộ bộ lọc về mặc định.
     * Dùng khi người dùng bấm "Xóa bộ lọc".
     */
    resetFilters: () => void;

    /**
     * Tạo object query params từ trạng thái hiện tại.
     * Hữu ích khi map state -> request API.
     */
    toQueryParams: () => Record<string, string | number | string[]>;
}

/**
 * Giá trị mặc định của filter store.
 */
const initialFilterState = {
    searchTerm: '',
    selectedCategoryIds: [] as string[],
    difficulty: 'all' as RecipeDifficultyFilter,
    timeRange: {
        minMinutes: null,
        maxMinutes: null,
    } as TimeRangeFilter,
    sortBy: 'newest' as RecipeSortBy,
    sortDirection: 'desc' as SortDirection,
    page: 1,
    pageSize: 12,
};

/**
 * Chuẩn hóa text trước khi đưa vào query.
 * Giảm lỗi do khoảng trắng đầu/cuối.
 */
function normalizeText(value: string): string {
    return value.trim();
}

/**
 * Loại bỏ phần tử trùng trong mảng string.
 */
function uniqueStrings(values: string[]): string[] {
    return Array.from(new Set(values.filter(Boolean)));
}

/**
 * Store Zustand cho bộ lọc và tìm kiếm recipe.
 */
export const useFilterStore = create<FilterState>()(
    persist(
        (set, get) => ({
            // =============================================================
            // Initial state
            // =============================================================
            ...initialFilterState,

            // =============================================================
            // Search
            // =============================================================

            /**
             * Cập nhật từ khóa tìm kiếm.
             * Khi người dùng gõ search, thường nên reset về trang 1.
             */
            setSearchTerm: (value) =>
                set({
                    searchTerm: value,
                    page: 1,
                }),

            /**
             * Xóa từ khóa tìm kiếm.
             * Đồng thời đưa trang về đầu.
             */
            clearSearchTerm: () =>
                set({
                    searchTerm: '',
                    page: 1,
                }),

            // =============================================================
            // Category filters
            // =============================================================

            /**
             * Gán toàn bộ danh sách category đang chọn.
             * Dùng khi click nhiều chip lọc cùng lúc.
             */
            setSelectedCategoryIds: (ids) =>
                set({
                    selectedCategoryIds: uniqueStrings(ids),
                    page: 1,
                }),

            /**
             * Bật/tắt một category trong danh sách chọn.
             * Nếu đã có thì bỏ; nếu chưa có thì thêm vào.
             */
            toggleCategoryId: (categoryId) =>
                set((state) => {
                    const exists = state.selectedCategoryIds.includes(categoryId);

                    const nextIds = exists
                        ? state.selectedCategoryIds.filter((id) => id !== categoryId)
                        : [...state.selectedCategoryIds, categoryId];

                    return {
                        selectedCategoryIds: uniqueStrings(nextIds),
                        page: 1,
                    };
                }),

            /**
             * Xóa toàn bộ category filters.
             */
            clearCategoryFilters: () =>
                set({
                    selectedCategoryIds: [],
                    page: 1,
                }),

            // =============================================================
            // Difficulty filter
            // =============================================================

            /**
             * Cập nhật độ khó.
             */
            setDifficulty: (value) =>
                set({
                    difficulty: value,
                    page: 1,
                }),

            /**
             * Đưa độ khó về mặc định.
             */
            clearDifficulty: () =>
                set({
                    difficulty: 'all',
                    page: 1,
                }),

            // =============================================================
            // Time range filter
            // =============================================================

            /**
             * Cập nhật khoảng thời gian nấu.
             * Ví dụ: minMinutes = 15, maxMinutes = 30.
             */
            setTimeRange: (range) =>
                set({
                    timeRange: {
                        minMinutes: range.minMinutes,
                        maxMinutes: range.maxMinutes,
                    },
                    page: 1,
                }),

            /**
             * Xóa khoảng thời gian nấu.
             */
            clearTimeRange: () =>
                set({
                    timeRange: {
                        minMinutes: null,
                        maxMinutes: null,
                    },
                    page: 1,
                }),

            // =============================================================
            // Sorting
            // =============================================================

            /**
             * Cập nhật trường sắp xếp.
             * Khi đổi sort field thường nên quay về trang 1.
             */
            setSortBy: (value) =>
                set({
                    sortBy: value,
                    page: 1,
                }),

            /**
             * Cập nhật chiều sắp xếp.
             */
            setSortDirection: (value) =>
                set({
                    sortDirection: value,
                    page: 1,
                }),

            /**
             * Đổi qua lại giữa asc và desc.
             */
            toggleSortDirection: () =>
                set((state) => ({
                    sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc',
                    page: 1,
                })),

            // =============================================================
            // Pagination
            // =============================================================

            /**
             * Chuyển sang trang cụ thể.
             */
            setPage: (page) =>
                set({
                    page: Math.max(1, page),
                }),

            /**
             * Sang trang kế tiếp.
             */
            nextPage: () =>
                set((state) => ({
                    page: state.page + 1,
                })),

            /**
             * Quay về trang trước.
             */
            previousPage: () =>
                set((state) => ({
                    page: Math.max(1, state.page - 1),
                })),

            /**
             * Cập nhật số phần tử mỗi trang.
             * Khi đổi pageSize, nên quay về trang 1 để tránh page vượt quá range.
             */
            setPageSize: (pageSize) =>
                set({
                    pageSize: Math.max(1, pageSize),
                    page: 1,
                }),

            // =============================================================
            // Helpers
            // =============================================================

            /**
             * Reset tất cả bộ lọc về mặc định.
             */
            resetFilters: () =>
                set({
                    ...initialFilterState,
                }),

            /**
             * Chuyển state hiện tại thành query params.
             * Dùng khi build request cho React Query / Axios.
             */
            toQueryParams: () => {
                const state = get();

                const params: Record<string, string | number | string[]> = {
                    q: normalizeText(state.searchTerm),
                    sortBy: state.sortBy,
                    sortDirection: state.sortDirection,
                    page: state.page,
                    pageSize: state.pageSize,
                };

                if (state.selectedCategoryIds.length > 0) {
                    params.categoryIds = state.selectedCategoryIds;
                }

                if (state.difficulty !== 'all') {
                    params.difficulty = state.difficulty;
                }

                if (state.timeRange.minMinutes !== null) {
                    params.minMinutes = state.timeRange.minMinutes;
                }

                if (state.timeRange.maxMinutes !== null) {
                    params.maxMinutes = state.timeRange.maxMinutes;
                }

                return params;
            },
        }),
        {
            name: 'culinary-blog-filter-store',
            storage: createJSONStorage(() => localStorage),

            /**
             * Persist các bộ lọc để người dùng quay lại màn hình vẫn thấy lựa chọn gần nhất.
             * Không persist page nếu bạn muốn luôn mở từ trang đầu sau khi reload.
             * Ở đây mình vẫn lưu page để giữ ngữ cảnh điều hướng.
             */
            partialize: (state) => ({
                searchTerm: state.searchTerm,
                selectedCategoryIds: state.selectedCategoryIds,
                difficulty: state.difficulty,
                timeRange: state.timeRange,
                sortBy: state.sortBy,
                sortDirection: state.sortDirection,
                page: state.page,
                pageSize: state.pageSize,
            }),
        }
    )
);
