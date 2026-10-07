'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Navbar } from '../../components/layout/Navbar';
import { RecipeSummaryDto, RecipeStatus } from '../../types';
import { authService } from '../../services/authService';
import { recipeManagementService } from '../../services/recipeManagementService';

function DashboardContent() {
  const { data: session, update: updateSession } = useSession();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'profile' ? 'profile' : 'recipes';

  const [activeTab, setActiveTab] = useState<'recipes' | 'profile'>(initialTab);
  const [recipes, setRecipes] = useState<RecipeSummaryDto[]>([]);
  const [recipeStatusFilter, setRecipeStatusFilter] = useState<'all' | RecipeStatus>('all');
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Profile Form States
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);

  // Tải danh sách công thức & hồ sơ
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const userRecipes = await recipeManagementService.getUserRecipes(session?.user?.id);
        setRecipes(userRecipes);

        const profile = await authService.getProfile((session?.user as any)?.accessToken);
        if (profile) {
          setDisplayName(profile.displayName || session?.user?.name || '');
          setBio(profile.bio || (session?.user as any)?.bio || '');
          setAvatarUrl(profile.avatarUrl || session?.user?.image || '');
        }
      } catch (err) {
        console.error('Lỗi nạp dữ liệu dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [session]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cập nhật hồ sơ cá nhân (FR-BKE-006 / FR-FTE-008)
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    try {
      const updated = await authService.updateProfile(
        { displayName, bio, avatarUrl },
        (session?.user as any)?.accessToken
      );
      if (updated) {
        await updateSession({
          ...session,
          user: {
            ...session?.user,
            name: displayName,
            image: avatarUrl,
            bio,
          },
        });
        showToast('Đã lưu thông tin hồ sơ thành công!');
      }
    } catch {
      showToast('Không thể cập nhật hồ sơ cá nhân.');
    } finally {
      setProfileSaving(false);
    }
  };

  // Xuất bản công thức (Publish)
  const handlePublish = async (recipeId: string) => {
    const success = await recipeManagementService.publishRecipe(
      recipeId,
      (session?.user as any)?.accessToken
    );
    if (success) {
      setRecipes((prev) =>
        prev.map((r) => (r.id === recipeId ? { ...r, status: 'Published' } : r))
      );
      showToast('Công thức đã được xuất bản công khai!');
    }
  };

  // Lưu trữ công thức (Archive)
  const handleArchive = async (recipeId: string) => {
    const success = await recipeManagementService.archiveRecipe(
      recipeId,
      (session?.user as any)?.accessToken
    );
    if (success) {
      setRecipes((prev) =>
        prev.map((r) => (r.id === recipeId ? { ...r, status: 'Archived' } : r))
      );
      showToast('Đã chuyển công thức vào mục Lưu trữ.');
    }
  };

  // Xóa mềm công thức (Delete)
  const handleDelete = async (recipeId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa công thức này không?')) {
      const success = await recipeManagementService.deleteRecipe(
        recipeId,
        (session?.user as any)?.accessToken
      );
      if (success) {
        setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
        showToast('Đã xóa công thức thành công.');
      }
    }
  };

  // Lọc danh sách theo trạng thái
  const filteredRecipes = recipes.filter((r) => {
    if (recipeStatusFilter === 'all') return true;
    return r.status.toLowerCase() === recipeStatusFilter.toLowerCase();
  });

  const publishedCount = recipes.filter((r) => r.status === 'Published').length;
  const draftCount = recipes.filter((r) => r.status === 'Draft').length;
  const archivedCount = recipes.filter((r) => r.status === 'Archived').length;

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      <Navbar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-gray-900 text-white rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span>🔔</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Banner Chào mừng */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl shadow-amber-900/10 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 overflow-hidden shrink-0 flex items-center justify-center text-2xl font-black">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                (displayName || 'U')[0].toUpperCase()
              )}
            </div>
            <div>
              <span className="inline-block px-2 py-0.5 rounded-full bg-amber-500/40 text-[10px] font-bold tracking-wider uppercase">
                Bảng điều khiển tác giả • Lab 4 (FR-FTE-008)
              </span>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                Xin chào, {displayName || 'Đầu bếp Culinary'} 👋
              </h1>
              <p className="text-xs text-amber-100 max-w-xl line-clamp-1 mt-0.5">
                {bio || 'Quản lý các công thức sáng tạo và cập nhật hồ sơ cá nhân của bạn.'}
              </p>
            </div>
          </div>

          <Link
            href="/recipes/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-amber-900 text-xs font-bold hover:bg-amber-50 transition-all shadow-md shrink-0"
          >
            <span>✍️</span> Tạo Công Thức Mới
          </Link>
        </div>

        {/* Thống kê nhanh */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <span className="text-[11px] font-semibold text-gray-500 uppercase">Tổng công thức</span>
            <p className="text-2xl font-black text-gray-900 mt-1">{recipes.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-xs">
            <span className="text-[11px] font-semibold text-emerald-600 uppercase">Đã xuất bản</span>
            <p className="text-2xl font-black text-emerald-700 mt-1">{publishedCount}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-xs">
            <span className="text-[11px] font-semibold text-amber-600 uppercase">Bản nháp (Draft)</span>
            <p className="text-2xl font-black text-amber-700 mt-1">{draftCount}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-[11px] font-semibold text-gray-500 uppercase">Lưu trữ</span>
            <p className="text-2xl font-black text-gray-600 mt-1">{archivedCount}</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('recipes')}
            className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'recipes'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            <span>🍲</span> Công Thức Của Tôi ({recipes.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            <span>👤</span> Hồ Sơ Đầu Bếp
          </button>
        </div>

        {/* TAB 1: DANH SÁCH CÔNG THỨC */}
        {activeTab === 'recipes' && (
          <div>
            {/* Lọc trạng thái Recipe */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
              <span className="text-xs font-semibold text-gray-500 mr-2 shrink-0">Lọc theo:</span>
              {[
                { key: 'all', label: `Tất cả (${recipes.length})` },
                { key: 'Published', label: `Đã Xuất Bản (${publishedCount})` },
                { key: 'Draft', label: `Bản Nháp (${draftCount})` },
                { key: 'Archived', label: `Đã Lưu Trữ (${archivedCount})` },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setRecipeStatusFilter(tab.key as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                    recipeStatusFilter === tab.key
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="text-center py-12 text-sm text-gray-400">Đang tải danh sách công thức...</div>
            ) : filteredRecipes.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8">
                <span className="text-4xl">🍳</span>
                <h3 className="text-base font-bold text-gray-800 mt-2">Chưa có công thức nào</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  Bạn chưa tạo công thức nào ở trạng thái này. Hãy bắt đầu chia sẻ công thức đầu tiên!
                </p>
                <Link
                  href="/recipes/new"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-all shadow-xs"
                >
                  <span>✍️</span> Tạo Công Thức Ngay
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Ảnh & Trạng thái badge */}
                      <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={recipe.coverImageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'}
                          alt={recipe.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                        <div className="absolute top-3 right-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs ${
                              recipe.status === 'Published'
                                ? 'bg-emerald-500 text-white'
                                : recipe.status === 'Draft'
                                ? 'bg-amber-500 text-white'
                                : 'bg-gray-600 text-white'
                            }`}
                          >
                            {recipe.status === 'Published'
                              ? 'Đã Xuất Bản'
                              : recipe.status === 'Draft'
                              ? 'Bản Nháp'
                              : 'Lưu Trữ'}
                          </span>
                        </div>
                      </div>

                      {/* Nội dung tóm tắt */}
                      <div className="p-4 sm:p-5">
                        <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-1">
                          <span>{recipe.categoryName || 'Ẩm thực'}</span>
                          <span>•</span>
                          <span>{recipe.totalTime || recipe.prepTime + recipe.cookTime} phút</span>
                          <span>•</span>
                          <span>Độ khó: {recipe.difficulty}</span>
                        </div>

                        <h3 className="text-base font-bold text-gray-900 line-clamp-1 hover:text-amber-600 transition-colors">
                          {recipe.title}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {recipe.description}
                        </p>
                      </div>
                    </div>

                    {/* Thanh hành động (Publish, Archive, Delete) */}
                    <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-1.5">
                        {recipe.status === 'Draft' && (
                          <button
                            type="button"
                            onClick={() => handlePublish(recipe.id)}
                            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all shadow-2xs"
                            title="Xuất bản công thức này lên trang chủ"
                          >
                            🚀 Xuất bản
                          </button>
                        )}

                        {recipe.status === 'Published' && (
                          <button
                            type="button"
                            onClick={() => handleArchive(recipe.id)}
                            className="px-2.5 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all"
                            title="Chuyển vào lưu trữ"
                          >
                            📦 Lưu trữ
                          </button>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDelete(recipe.id)}
                        className="px-2 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg font-semibold transition-all"
                        title="Xóa công thức"
                      >
                        🗑️ Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: HỒ SƠ ĐẦU BẾP (PROFILE) */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Cập nhật hồ sơ cá nhân</h2>
            <p className="text-xs text-gray-500 mb-6">
              Thông tin sẽ hiển thị công khai trên các công thức nấu ăn của bạn (API: PUT /api/v1/users/me).
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Tên hiển thị công khai *
                </label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Địa chỉ Email (Chỉ đọc)
                </label>
                <input
                  type="email"
                  disabled
                  value={session?.user?.email || 'chef.hieu@culinary.com'}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Đường dẫn ảnh đại diện (Avatar URL)
                </label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
                {avatarUrl && (
                  <div className="mt-3 flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={avatarUrl}
                      alt="Avatar Preview"
                      className="w-12 h-12 rounded-full object-cover border border-amber-300"
                    />
                    <span className="text-xs text-gray-500">Xem trước ảnh đại diện</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Tiểu sử & Châm ngôn nấu ăn (Bio)
                </label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Chia sẻ niềm yêu thích nấu ăn hoặc phong cách ẩm thực của bạn..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  disabled={profileSaving}
                  className="px-6 py-2.5 rounded-lg bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition-all shadow-md shadow-amber-600/20 disabled:opacity-60"
                >
                  {profileSaving ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-gray-500">Đang tải Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
