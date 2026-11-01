/**
 * ============================================================================
 * Chức năng:
 * - Quản lý toàn bộ state và logic của Dashboard.
 * - Nạp danh sách công thức và hồ sơ cá nhân.
 * - Xử lý publish / archive / delete công thức.
 * - Cập nhật profile người dùng.
 * - Lọc recipe theo trạng thái.
 * - Cung cấp toast, counts và các helper cho DashboardPage.
 *
 * Ghi chú:
 * - Hook này chứa logic nghiệp vụ trung gian, không phải component UI.
 * - UI chỉ cần render dữ liệu từ hook.
 * - Các API call vẫn dùng service riêng.
 * ============================================================================
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

import { authService } from '@/services/authService';
import { recipeManagementService } from '@/services/recipeManagementService';
import type { RecipeStatus, RecipeSummaryDto } from '@/types';

/**
 * Tab hiển thị trong Dashboard.
 */
export type DashboardTab = 'recipes' | 'profile';

/**
 * Bộ lọc trạng thái công thức.
 */
export type RecipeFilterStatus = 'all' | RecipeStatus;

/**
 * Loại toast hiển thị trong UI.
 */
export type ToastType = 'success' | 'error' | 'info';

/**
 * Cấu trúc toast của Dashboard.
 */
export interface DashboardToast {
    title: string;
    message: string;
    type: ToastType;
}

/**
 * Thông tin user mở rộng từ NextAuth session.
 * Dùng để lấy thêm accessToken và các field custom.
 */
type SessionUserExt = {
    id?: string;
    accessToken?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    bio?: string | null;
};

/**
 * Input cho hook.
 */
export interface UseDashboardOptions {
    /**
     * Tab khởi tạo ban đầu.
     */
    initialTab?: DashboardTab;
}

/**
 * Output của hook Dashboard.
 */
export interface UseDashboardReturn {
    // ===== Session / User =====
    currentUser: SessionUserExt | undefined;
    accessToken: string | null;
    userId: string | null;

    // ===== Tab & Filter =====
    activeTab: DashboardTab;
    setActiveTab: (tab: DashboardTab) => void;

    recipeStatusFilter: RecipeFilterStatus;
    setRecipeStatusFilter: (filter: RecipeFilterStatus) => void;

    // ===== Data =====
    recipes: RecipeSummaryDto[];
    filteredRecipes: RecipeSummaryDto[];

    // ===== Loading =====
    loading: boolean;
    profileSaving: boolean;

    // ===== Profile form state =====
    displayName: string;
    setDisplayName: (value: string) => void;

    bio: string;
    setBio: (value: string) => void;

    avatarUrl: string;
    setAvatarUrl: (value: string) => void;

    // ===== Counts =====
    totalRecipes: number;
    publishedCount: number;
    draftCount: number;
    archivedCount: number;

    // ===== Derived banner data =====
    bannerName: string;
    bannerBio: string;

    // ===== Toast =====
    toast: DashboardToast | null;
    showToast: (message: string, type?: ToastType, title?: string) => void;
    closeToast: () => void;

    // ===== Actions =====
    reloadDashboard: () => Promise<void>;
    handleSaveProfile: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handlePublish: (recipeId: string) => Promise<void>;
    handleArchive: (recipeId: string) => Promise<void>;
    handleDelete: (recipeId: string) => Promise<void>;
}

/**
 * Chuẩn hóa status trả về từ API về đúng 3 giá trị hợp lệ.
 */
function normalizeRecipeStatus(status: string): RecipeStatus {
    if (status === 'Published' || status === 'Draft' || status === 'Archived') {
        return status;
    }

    return 'Draft';
}

/**
 * useDashboard
 * Gom toàn bộ logic dữ liệu và thao tác của dashboard vào một hook duy nhất.
 */
export function useDashboard(
    options: UseDashboardOptions = {}
): UseDashboardReturn {
    const { initialTab = 'recipes' } = options;

    // Session NextAuth hiện tại.
    const { data: session, update: updateSession } = useSession();

    // User mở rộng từ session.
    const currentUser = session?.user as SessionUserExt | undefined;

    // Token để gọi API.
    const accessToken = currentUser?.accessToken ?? null;

    // UserId để lấy danh sách công thức của chính người dùng.
    const userId = currentUser?.id ?? null;

    // Tab hiện tại.
    const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab);

    // Filter trạng thái công thức.
    const [recipeStatusFilter, setRecipeStatusFilter] =
        useState<RecipeFilterStatus>('all');

    // Danh sách công thức.
    const [recipes, setRecipes] = useState<RecipeSummaryDto[]>([]);

    // Loading tổng quát khi nạp dashboard.
    const [loading, setLoading] = useState(true);

    // Loading khi lưu profile.
    const [profileSaving, setProfileSaving] = useState(false);

    // Dữ liệu form profile.
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    // Toast hiện tại.
    const [toast, setToast] = useState<DashboardToast | null>(null);

    // Timer tự ẩn toast.
    const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    /**
     * Đóng toast hiện tại.
     */
    const closeToast = useCallback(() => {
        if (toastTimerRef.current) {
            clearTimeout(toastTimerRef.current);
            toastTimerRef.current = null;
        }

        setToast(null);
    }, []);

    /**
     * Hiển thị toast mới.
     */
    const showToast = useCallback(
        (message: string, type: ToastType = 'info', title = 'Thông báo') => {
            if (toastTimerRef.current) {
                clearTimeout(toastTimerRef.current);
                toastTimerRef.current = null;
            }

            setToast({
                title,
                message,
                type,
            });

            toastTimerRef.current = setTimeout(() => {
                setToast(null);
                toastTimerRef.current = null;
            }, 3000);
        },
        []
    );

    /**
     * Nạp lại toàn bộ dữ liệu dashboard.
     */
    const reloadDashboard = useCallback(async () => {
        try {
            if (!userId) {
                setRecipes([]);
                setDisplayName(currentUser?.name ?? '');
                setBio(currentUser?.bio ?? '');
                setAvatarUrl(currentUser?.image ?? '');
                setLoading(false);
                return;
            }

            setLoading(true);

            const recipesPromise = recipeManagementService.getUserRecipes(userId);
            const profilePromise = accessToken
                ? authService.getProfile(accessToken)
                : Promise.resolve(null);

            const [recipesResult, profileResult] = await Promise.allSettled([
                recipesPromise,
                profilePromise,
            ]);

            // Nạp danh sách công thức.
            if (recipesResult.status === 'fulfilled') {
                const normalizedRecipes = (recipesResult.value ?? []).map((recipe) => ({
                    ...recipe,
                    status: normalizeRecipeStatus(String(recipe.status)),
                }));

                setRecipes(normalizedRecipes);
            } else {
                console.error('Lỗi tải danh sách công thức:', recipesResult.reason);
                showToast('Không thể tải danh sách công thức.', 'error');
            }

            // Nạp hồ sơ cá nhân.
            if (profileResult.status === 'fulfilled' && profileResult.value) {
                const profile = profileResult.value;

                setDisplayName(profile.displayName || currentUser?.name || '');
                setBio(profile.bio || currentUser?.bio || '');
                setAvatarUrl(profile.avatarUrl || currentUser?.image || '');
            } else if (profileResult.status === 'rejected') {
                console.error('Lỗi tải hồ sơ cá nhân:', profileResult.reason);
            }

            // Fallback từ session nếu API profile chưa trả dữ liệu.
            if (profileResult.status !== 'fulfilled' || !profileResult.value) {
                setDisplayName((prev) => prev || currentUser?.name || '');
                setBio((prev) => prev || currentUser?.bio || '');
                setAvatarUrl((prev) => prev || currentUser?.image || '');
            }
        } catch (error) {
            console.error('Lỗi nạp dữ liệu dashboard:', error);
            showToast('Đã xảy ra lỗi khi nạp dữ liệu dashboard.', 'error');
        } finally {
            setLoading(false);
        }
    }, [accessToken, currentUser?.bio, currentUser?.image, currentUser?.name, showToast, userId]);

    /**
     * Đồng bộ tab ban đầu theo props.
     */
    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    /**
     * Tải dữ liệu khi session thay đổi.
     */
    useEffect(() => {
        void reloadDashboard();

        return () => {
            if (toastTimerRef.current) {
                clearTimeout(toastTimerRef.current);
                toastTimerRef.current = null;
            }
        };
    }, [reloadDashboard]);

    /**
     * Cập nhật profile cá nhân.
     */
    const handleSaveProfile = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (!accessToken) {
                showToast('Không tìm thấy phiên đăng nhập hợp lệ.', 'error');
                return;
            }

            setProfileSaving(true);

            try {
                const updatedProfile = await authService.updateProfile(
                    {
                        displayName,
                        bio,
                        avatarUrl,
                    },
                    accessToken
                );

                if (updatedProfile) {
                    // Đồng bộ lại session để Navbar và các trang khác dùng ngay.
                    if (updateSession) {
                        await updateSession({
                            ...(session ?? {}),
                            user: {
                                ...(currentUser ?? {}),
                                name: displayName,
                                image: avatarUrl,
                                bio,
                            },
                        } as never);
                    }

                    showToast('Đã lưu thông tin hồ sơ thành công!', 'success');
                } else {
                    showToast('Không thể cập nhật hồ sơ cá nhân.', 'error');
                }
            } catch (error) {
                console.error('Lỗi cập nhật hồ sơ:', error);
                showToast('Không thể cập nhật hồ sơ cá nhân.', 'error');
            } finally {
                setProfileSaving(false);
            }
        },
        [accessToken, avatarUrl, bio, currentUser, displayName, session, showToast, updateSession]
    );

    /**
     * Xuất bản một công thức.
     */
    const handlePublish = useCallback(
        async (recipeId: string) => {
            if (!accessToken) {
                showToast('Không tìm thấy phiên đăng nhập hợp lệ.', 'error');
                return;
            }

            try {
                const success = await recipeManagementService.publishRecipe(
                    recipeId,
                    accessToken
                );

                if (success) {
                    setRecipes((prev) =>
                        prev.map((recipe) =>
                            recipe.id === recipeId
                                ? { ...recipe, status: 'Published' }
                                : recipe
                        )
                    );

                    showToast('Công thức đã được xuất bản công khai!', 'success');
                } else {
                    showToast('Không thể xuất bản công thức này.', 'error');
                }
            } catch (error) {
                console.error('Lỗi xuất bản công thức:', error);
                showToast('Không thể xuất bản công thức này.', 'error');
            }
        },
        [accessToken, showToast]
    );

    /**
     * Lưu trữ một công thức.
     */
    const handleArchive = useCallback(
        async (recipeId: string) => {
            if (!accessToken) {
                showToast('Không tìm thấy phiên đăng nhập hợp lệ.', 'error');
                return;
            }

            try {
                const success = await recipeManagementService.archiveRecipe(
                    recipeId,
                    accessToken
                );

                if (success) {
                    setRecipes((prev) =>
                        prev.map((recipe) =>
                            recipe.id === recipeId
                                ? { ...recipe, status: 'Archived' }
                                : recipe
                        )
                    );

                    showToast('Đã chuyển công thức vào mục lưu trữ.', 'success');
                } else {
                    showToast('Không thể lưu trữ công thức này.', 'error');
                }
            } catch (error) {
                console.error('Lỗi lưu trữ công thức:', error);
                showToast('Không thể lưu trữ công thức này.', 'error');
            }
        },
        [accessToken, showToast]
    );

    /**
     * Xóa mềm một công thức.
     */
    const handleDelete = useCallback(
        async (recipeId: string) => {
            const confirmed = window.confirm(
                'Bạn có chắc chắn muốn xóa công thức này không?'
            );

            if (!confirmed) {
                return;
            }

            if (!accessToken) {
                showToast('Không tìm thấy phiên đăng nhập hợp lệ.', 'error');
                return;
            }

            try {
                const success = await recipeManagementService.deleteRecipe(
                    recipeId,
                    accessToken
                );

                if (success) {
                    setRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
                    showToast('Đã xóa công thức thành công.', 'success');
                } else {
                    showToast('Không thể xóa công thức này.', 'error');
                }
            } catch (error) {
                console.error('Lỗi xóa công thức:', error);
                showToast('Không thể xóa công thức này.', 'error');
            }
        },
        [accessToken, showToast]
    );

    /**
     * Danh sách công thức sau khi lọc theo trạng thái.
     */
    const filteredRecipes = useMemo(() => {
        return recipes.filter((recipe) => {
            if (recipeStatusFilter === 'all') {
                return true;
            }

            return recipe.status === recipeStatusFilter;
        });
    }, [recipeStatusFilter, recipes]);

    /**
     * Tổng số công thức.
     */
    const totalRecipes = useMemo(() => recipes.length, [recipes]);

    /**
     * Số công thức đã xuất bản.
     */
    const publishedCount = useMemo(
        () => recipes.filter((recipe) => recipe.status === 'Published').length,
        [recipes]
    );

    /**
     * Số công thức nháp.
     */
    const draftCount = useMemo(
        () => recipes.filter((recipe) => recipe.status === 'Draft').length,
        [recipes]
    );

    /**
     * Số công thức đã lưu trữ.
     */
    const archivedCount = useMemo(
        () => recipes.filter((recipe) => recipe.status === 'Archived').length,
        [recipes]
    );

    /**
     * Tên hiển thị trên banner.
     */
    const bannerName = useMemo(() => {
        return displayName.trim() || currentUser?.name || 'Đầu bếp Culinary';
    }, [currentUser?.name, displayName]);

    /**
     * Bio hiển thị trên banner.
     */
    const bannerBio = useMemo(() => {
        return (
            bio.trim() ||
            currentUser?.bio ||
            'Quản lý các công thức sáng tạo và cập nhật hồ sơ cá nhân của bạn.'
        );
    }, [bio, currentUser?.bio]);

    return {
        currentUser,
        accessToken,
        userId,

        activeTab,
        setActiveTab,

        recipeStatusFilter,
        setRecipeStatusFilter,

        recipes,
        filteredRecipes,

        loading,
        profileSaving,

        displayName,
        setDisplayName,

        bio,
        setBio,

        avatarUrl,
        setAvatarUrl,

        totalRecipes,
        publishedCount,
        draftCount,
        archivedCount,

        bannerName,
        bannerBio,

        toast,
        showToast,
        closeToast,

        reloadDashboard,
        handleSaveProfile,
        handlePublish,
        handleArchive,
        handleDelete,
    };
}