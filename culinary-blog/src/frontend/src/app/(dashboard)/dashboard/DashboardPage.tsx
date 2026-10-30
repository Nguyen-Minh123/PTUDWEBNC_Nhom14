'use client';

/**
 * Chức năng:
 * - Ghép toàn bộ dashboard cá nhân.
 * - Nhận dữ liệu từ useDashboard().
 * - Render các component con theo từng tab.
 * - Không chứa business logic gọi API.
 */

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { Navbar } from '@/components/layout/Navbar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import RecipeFilterBar from '@/components/dashboard/RecipeFilterBar';
import RecipeGrid from '@/components/dashboard/RecipeGrid';
import ProfileForm from '@/components/dashboard/ProfileForm';
import LoadingState from '@/components/dashboard/LoadingState';
import Toast from '@/components/dashboard/Toast';
import { useDashboard } from '@/hooks/dashboard/useDashboard';

export default function DashboardPage() {
    // Đọc tab từ URL (?tab=profile).
    const searchParams = useSearchParams();

    // Tab khởi tạo theo query string.
    const initialTab = useMemo(() => {
        return searchParams.get('tab') === 'profile' ? 'profile' : 'recipes';
    }, [searchParams]);

    // Gom toàn bộ state và actions của dashboard.
    const dashboard = useDashboard({ initialTab });

    // Màn hình loading.
    if (dashboard.loading) {
        return (
            <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
                <Navbar />
                <LoadingState fullScreen message="Đang tải Dashboard..." rows={5} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
            {/* Thanh điều hướng chính */}
            <Navbar />

            {/* Toast thông báo */}
            <Toast
                isOpen={!!dashboard.toast}
                title={dashboard.toast?.title ?? ''}
                message={dashboard.toast?.message ?? ''}
                type={dashboard.toast?.type ?? 'info'}
                onClose={dashboard.closeToast}
                autoCloseMs={3000}
            />

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {/* Banner chào mừng */}
                <DashboardHeader
                    displayName={dashboard.bannerName}
                    bio={dashboard.bannerBio}
                    avatarUrl={dashboard.avatarUrl}
                />

                {/* Thống kê nhanh */}
                <DashboardStats
                    totalRecipes={dashboard.totalRecipes}
                    publishedRecipes={dashboard.publishedCount}
                    draftRecipes={dashboard.draftCount}
                    archivedRecipes={dashboard.archivedCount}
                />

                {/* Tab điều hướng */}
                <DashboardTabs
                    activeTab={dashboard.activeTab}
                    onTabChange={dashboard.setActiveTab}
                    recipeCount={dashboard.totalRecipes}
                />

                {/* TAB: Danh sách công thức */}
                {dashboard.activeTab === 'recipes' && (
                    <section>
                        <RecipeFilterBar
                            activeFilter={dashboard.recipeStatusFilter}
                            onStatusChange={dashboard.setRecipeStatusFilter}
                            totalRecipes={dashboard.totalRecipes}
                            publishedRecipes={dashboard.publishedCount}
                            draftRecipes={dashboard.draftCount}
                            archivedRecipes={dashboard.archivedCount}
                        />

                        <RecipeGrid
                            recipes={dashboard.filteredRecipes}
                            onPublish={dashboard.handlePublish}
                            onArchive={dashboard.handleArchive}
                            onDelete={dashboard.handleDelete}
                            emptyMessage="Chưa có công thức nào phù hợp với bộ lọc hiện tại."
                        />
                    </section>
                )}

                {/* TAB: Hồ sơ cá nhân */}
                {dashboard.activeTab === 'profile' && (
                    <ProfileForm
                        displayName={dashboard.displayName}
                        email={dashboard.currentUser?.email || ''}
                        avatarUrl={dashboard.avatarUrl}
                        bio={dashboard.bio}
                        onDisplayNameChange={dashboard.setDisplayName}
                        onAvatarUrlChange={dashboard.setAvatarUrl}
                        onBioChange={dashboard.setBio}
                        onSubmit={dashboard.handleSaveProfile}
                        isSaving={dashboard.profileSaving}
                    />
                )}
            </main>
        </div>
    );
}
