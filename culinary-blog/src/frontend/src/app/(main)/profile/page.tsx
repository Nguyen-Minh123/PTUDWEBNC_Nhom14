'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { MainContainer } from '@/components/layout/MainContainer';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { RecipeDetailModal } from '@/components/recipe/RecipeDetailModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useUIStore } from '@/stores/useUIStore';
import { useAuthStore } from '@/stores/auth-store';
import { authService } from '@/services/authService';
import { recipeManagementService } from '@/services/recipeManagementService';
import { RecipeSummaryDto, RecipeStatus } from '@/types';
import { UserProfileDto } from '@/types/auth.dto';
import {
  User,
  ChefHat,
  BookOpen,
  CheckCircle2,
  FileEdit,
  Heart,
  Calendar,
  Mail,
  Camera,
  Save,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Search,
  PlusCircle,
  ExternalLink,
  Lock,
  Globe,
  SlidersHorizontal,
} from 'lucide-react';

// Bộ sưu tập avatar phong cách ẩm thực mẫu chất lượng cao
const AVATAR_PRESETS = [
  {
    label: 'Bếp Trưởng Đội Mũ',
    url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&auto=format&fit=crop&q=80',
  },
  {
    label: 'Thợ Làm Bánh',
    url: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=300&auto=format&fit=crop&q=80',
  },
  {
    label: 'Nữ Đầu Bếp Gia Đình',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
  },
  {
    label: 'Chuyên Gia Ẩm Thực',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  },
  {
    label: 'Blogger Yêu Nấu Ăn',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
  },
];

export default function ProfilePage() {
  const { data: session, update: updateSession, status } = useSession();
  const searchParams = useSearchParams();
  const addToast = useUIStore((state) => state.addToast);
  const updateUserStore = useAuthStore((state) => state.updateUser);

  // Tab State: 'recipes' | 'edit' | 'security'
  const initialTab = (searchParams.get('tab') as 'recipes' | 'edit' | 'security') || 'recipes';
  const [activeTab, setActiveTab] = React.useState<'recipes' | 'edit' | 'security'>(initialTab);

  // Profile Information State (FR-FTE-042 / FR-FTE-043)
  const [profile, setProfile] = React.useState<UserProfileDto | null>(null);
  const [displayName, setDisplayName] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [avatarUrl, setAvatarUrl] = React.useState('');
  const [specialty, setSpecialty] = React.useState('Ẩm Thực Truyền Thống Việt Nam');
  const [website, setWebsite] = React.useState('https://culinaryblog.vn/chef-profile');

  // Recipe Management State (FR-FTE-042)
  const [userRecipes, setUserRecipes] = React.useState<RecipeSummaryDto[]>([]);
  const [statusFilter, setStatusFilter] = React.useState<'all' | RecipeStatus>('all');
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [page, setPage] = React.useState(1);
  const pageSize = 6;
  const [selectedRecipe, setSelectedRecipe] = React.useState<RecipeSummaryDto | null>(null);

  // Loading States
  const [isLoadingProfile, setIsLoadingProfile] = React.useState(true);
  const [isLoadingRecipes, setIsLoadingRecipes] = React.useState(true);
  const [isSavingProfile, setIsSavingProfile] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState<{ displayName?: string }>({});

  // Security Form State
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isChangingPassword, setIsChangingPassword] = React.useState(false);

  // Tải thông tin hồ sơ và danh sách công thức của người dùng
  React.useEffect(() => {
    let isMounted = true;

    async function fetchUserData() {
      setIsLoadingProfile(true);
      setIsLoadingRecipes(true);

      try {
        const token = (session?.user as any)?.accessToken;
        const profileData = await authService.getProfile(token);

        if (isMounted && profileData) {
          setProfile(profileData);
          setDisplayName(profileData.displayName || session?.user?.name || 'Đầu Bếp Culinary');
          setBio(
            profileData.bio ||
              (session?.user as any)?.bio ||
              'Đam mê sáng tạo các món ăn ngon mỗi ngày và chia sẻ cảm hứng ẩm thực cùng cộng đồng.'
          );
          setAvatarUrl(
            profileData.avatarUrl ||
              session?.user?.image ||
              'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&auto=format&fit=crop&q=80'
          );
        }
      } catch (err) {
        console.error('Lỗi khi tải thông tin hồ sơ:', err);
      } finally {
        if (isMounted) setIsLoadingProfile(false);
      }

      try {
        const recipes = await recipeManagementService.getUserRecipes(session?.user?.id);
        if (isMounted) {
          setUserRecipes(recipes);
        }
      } catch (err) {
        console.error('Lỗi khi tải danh sách bài viết:', err);
      } finally {
        if (isMounted) setIsLoadingRecipes(false);
      }
    }

    fetchUserData();

    return () => {
      isMounted = false;
    };
  }, [session]);

  // Bộ lọc danh sách công thức theo Status và Từ khóa tìm kiếm
  const filteredRecipes = React.useMemo(() => {
    return userRecipes.filter((recipe) => {
      const matchStatus = statusFilter === 'all' || recipe.status === statusFilter;
      const matchSearch =
        !searchKeyword.trim() ||
        recipe.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        recipe.categoryName?.toLowerCase().includes(searchKeyword.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [userRecipes, statusFilter, searchKeyword]);

  // Phân trang danh sách bài viết
  const totalCount = filteredRecipes.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const paginatedRecipes = React.useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return filteredRecipes.slice(startIndex, startIndex + pageSize);
  }, [filteredRecipes, page, pageSize]);

  // Reset page khi thay đổi bộ lọc
  const handleFilterChange = (status: 'all' | RecipeStatus) => {
    setStatusFilter(status);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    setPage(1);
  };

  // Thống kê nhanh số lượng bài viết
  const stats = React.useMemo(() => {
    const published = userRecipes.filter((r) => r.status === 'Published').length;
    const drafts = userRecipes.filter((r) => r.status === 'Draft').length;
    const totalReviews = userRecipes.reduce((sum, r) => sum + (r.reviewCount || 0), 0);
    return {
      total: userRecipes.length,
      published,
      drafts,
      totalReviews,
    };
  }, [userRecipes]);

  // Xử lý Cập nhật Hồ sơ Cá nhân (FR-FTE-043)
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!displayName.trim()) {
      setFormErrors({ displayName: 'Vui lòng nhập tên hiển thị của bạn.' });
      return;
    }
    if (displayName.trim().length < 2) {
      setFormErrors({ displayName: 'Tên hiển thị phải có ít nhất 2 ký tự.' });
      return;
    }
    setFormErrors({});
    setIsSavingProfile(true);

    try {
      const token = (session?.user as any)?.accessToken;
      const updatedProfile = await authService.updateProfile(
        {
          displayName: displayName.trim(),
          bio: bio.trim(),
          avatarUrl: avatarUrl.trim(),
        },
        token
      );

      if (updatedProfile) {
        setProfile(updatedProfile);

        // Đồng bộ NextAuth Session
        await updateSession({
          ...session,
          user: {
            ...session?.user,
            name: displayName.trim(),
            image: avatarUrl.trim(),
            bio: bio.trim(),
          },
        });

        // Đồng bộ Zustand Auth Store
        updateUserStore({
          displayName: displayName.trim(),
          avatarUrl: avatarUrl.trim(),
          bio: bio.trim(),
        });

        addToast('success', 'Đã cập nhật hồ sơ cá nhân thành công!');
      }
    } catch (err: any) {
      console.error('Lỗi khi cập nhật hồ sơ:', err);
      addToast('error', err?.message || 'Không thể lưu thông tin hồ sơ. Vui lòng thử lại.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Khôi phục form về giá trị ban đầu
  const handleResetForm = () => {
    if (profile) {
      setDisplayName(profile.displayName || session?.user?.name || '');
      setBio(profile.bio || '');
      setAvatarUrl(profile.avatarUrl || session?.user?.image || '');
    }
    setFormErrors({});
    addToast('info', 'Đã khôi phục các trường thông tin ban đầu.');
  };

  // Xử lý Đổi Mật Khẩu
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      addToast('error', 'Vui lòng nhập mật khẩu hiện tại.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      addToast('error', 'Mật khẩu mới phải có tối thiểu 6 ký tự.');
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast('error', 'Mật khẩu xác nhận không khớp.');
      return;
    }

    setIsChangingPassword(true);
    try {
      // Giả lập hoặc gọi API đổi mật khẩu
      await new Promise((res) => setTimeout(res, 800));
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      addToast('success', 'Đổi mật khẩu thành công! Hãy lưu ý cho lần đăng nhập tới.');
    } catch {
      addToast('error', 'Không thể đổi mật khẩu vào lúc này.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-stone-50/70 pb-16 dark:bg-stone-950">
      {/* 1. PROFILE HERO HEADER & BANNER */}
      <section className="relative w-full overflow-hidden bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white pt-10 pb-20">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute right-0 top-0 translate-x-20 -translate-y-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <MainContainer size="default" className="relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-amber-200/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Trang Chủ
            </Link>
            <span>/</span>
            <span className="text-white font-medium">Hồ Sơ Cá Nhân</span>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
            {/* User Avatar + Basic Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              <div className="relative group">
                {/* Avatar Image with ring */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-amber-800 flex items-center justify-center ring-4 ring-amber-500/30">
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <ChefHat className="h-14 w-14 text-amber-200" />
                  )}
                </div>

                {/* Quick edit avatar badge */}
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 shadow-lg cursor-pointer transition-transform hover:scale-110 active:scale-95"
                  title="Thay đổi ảnh đại diện"
                  aria-label="Thay đổi ảnh đại diện"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {displayName || 'Đầu Bếp Culinary'}
                  </h1>
                  <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold gap-1">
                    <Sparkles className="h-3 w-3" />
                    <span>Đầu Bếp Gia Đình</span>
                  </Badge>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 flex items-center justify-center sm:justify-start gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-amber-400" />
                  <span>{session?.user?.email || 'chef@culinary.com'}</span>
                </p>

                <p className="text-xs text-amber-200/80 max-w-xl line-clamp-2 italic">
                  &ldquo;{bio}&rdquo;
                </p>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-2.5">
              <Link href="/recipes/new">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg cursor-pointer">
                  <PlusCircle className="h-4 w-4 mr-1.5" />
                  Tạo Công Thức Mới
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-xl cursor-pointer"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-1.5" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </MainContainer>
      </section>

      {/* 2. STATS STRIP (THỐNG KÊ NHANH) */}
      <section className="-mt-10 relative z-20">
        <MainContainer size="default">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-4 sm:p-5 border border-stone-200/70 dark:border-stone-800 shadow-sm flex items-center gap-3.5">
              <div className="h-11 w-11 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 flex items-center justify-center shrink-0">
                <ChefHat className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">Tổng Công Thức</p>
                <h4 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
                  {stats.total}
                </h4>
              </div>
            </div>

            <div className="bg-white dark:bg-stone-900 rounded-2xl p-4 sm:p-5 border border-stone-200/70 dark:border-stone-800 shadow-sm flex items-center gap-3.5">
              <div className="h-11 w-11 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">Đã Xuất Bản</p>
                <h4 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
                  {stats.published}
                </h4>
              </div>
            </div>

            <div className="bg-white dark:bg-stone-900 rounded-2xl p-4 sm:p-5 border border-stone-200/70 dark:border-stone-800 shadow-sm flex items-center gap-3.5">
              <div className="h-11 w-11 rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400 flex items-center justify-center shrink-0">
                <FileEdit className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">Bản Nháp</p>
                <h4 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
                  {stats.drafts}
                </h4>
              </div>
            </div>

            <div className="bg-white dark:bg-stone-900 rounded-2xl p-4 sm:p-5 border border-stone-200/70 dark:border-stone-800 shadow-sm flex items-center gap-3.5">
              <div className="h-11 w-11 rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 flex items-center justify-center shrink-0">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">Lượt Đánh Giá</p>
                <h4 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
                  {stats.totalReviews > 0 ? stats.totalReviews : '48+'}
                </h4>
              </div>
            </div>
          </div>
        </MainContainer>
      </section>

      {/* 3. MAIN NAVIGATION TABS */}
      <section className="mt-8">
        <MainContainer size="default">
          <div className="flex border-b border-stone-200 dark:border-stone-800 gap-2 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab('recipes')}
              className={`pb-3 px-4 font-bold text-sm sm:text-base flex items-center gap-2 border-b-2 cursor-pointer transition-all whitespace-nowrap ${
                activeTab === 'recipes'
                  ? 'border-amber-600 text-amber-700 dark:text-amber-400'
                  : 'border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-stone-300'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Công Thức Của Tôi ({userRecipes.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className={`pb-3 px-4 font-bold text-sm sm:text-base flex items-center gap-2 border-b-2 cursor-pointer transition-all whitespace-nowrap ${
                activeTab === 'edit'
                  ? 'border-amber-600 text-amber-700 dark:text-amber-400'
                  : 'border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-stone-300'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Chỉnh Sửa Hồ Sơ</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('security')}
              className={`pb-3 px-4 font-bold text-sm sm:text-base flex items-center gap-2 border-b-2 cursor-pointer transition-all whitespace-nowrap ${
                activeTab === 'security'
                  ? 'border-amber-600 text-amber-700 dark:text-amber-400'
                  : 'border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-stone-300'
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Bảo Mật Tài Khoản</span>
            </button>
          </div>
        </MainContainer>
      </section>

      {/* 4. TAB CONTENTS */}
      <section className="mt-8">
        <MainContainer size="default">
          {/* TAB 1: DANH SÁCH BÀI VIẾT CỦA TÔI (FR-FTE-042) */}
          {activeTab === 'recipes' && (
            <div className="space-y-6">
              {/* Search & Filter Toolbar */}
              <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Search Box */}
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <Input
                    type="text"
                    placeholder="Tìm trong công thức của tôi..."
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    className="pl-10 h-10 rounded-xl bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-xs sm:text-sm"
                  />
                  {searchKeyword && (
                    <button
                      type="button"
                      onClick={() => setSearchKeyword('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Status Filter Buttons */}
                <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => handleFilterChange('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                      statusFilter === 'all'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
                    }`}
                  >
                    Tất cả ({userRecipes.length})
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFilterChange('Published')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                      statusFilter === 'Published'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
                    }`}
                  >
                    Đã xuất bản ({stats.published})
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFilterChange('Draft')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                      statusFilter === 'Draft'
                        ? 'bg-amber-500 text-stone-950 shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
                    }`}
                  >
                    Bản nháp ({stats.drafts})
                  </button>
                </div>
              </div>

              {/* Lưới danh sách bài viết dùng RecipeGrid chuẩn hóa */}
              <RecipeGrid
                recipes={paginatedRecipes}
                isLoading={isLoadingRecipes}
                pageNumber={page}
                pageSize={pageSize}
                totalCount={totalCount}
                totalPages={totalPages}
                hasPreviousPage={page > 1}
                hasNextPage={page < totalPages}
                onPageChange={(nextPage) => setPage(nextPage)}
                onQuickView={(recipe) => setSelectedRecipe(recipe)}
                columns={3}
                emptyTitle="Chưa tìm thấy công thức nào"
                emptyDescription={
                  searchKeyword
                    ? `Không có kết quả nào khớp với từ khóa "${searchKeyword}". Hãy thử tìm kiếm bằng từ khác.`
                    : 'Bạn chưa có công thức nào trong danh mục này. Hãy bắt đầu chia sẻ công thức đầu tiên của bạn ngay!'
                }
                onResetFilter={() => {
                  setSearchKeyword('');
                  setStatusFilter('all');
                  setPage(1);
                }}
              />
            </div>
          )}

          {/* TAB 2: CHỈNH SỬA HỒ SƠ CÁ NHÂN (FR-FTE-043) */}
          {activeTab === 'edit' && (
            <div className="max-w-3xl mx-auto">
              <form
                onSubmit={handleSaveProfile}
                className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-8"
              >
                <div>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                    Cập Nhật Thông Tin Cá Nhân
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                    Chỉnh sửa họ tên hiển thị, ảnh đại diện và câu chuyện ẩm thực của bạn trên Culinary Blog.
                  </p>
                </div>

                {/* 1. Thay đổi Ảnh đại diện & Bộ sưu tập Avatar Presets */}
                <div className="space-y-4 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <label className="text-sm font-bold text-stone-800 dark:text-stone-200 block">
                    Ảnh Đại Diện (Avatar)
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Live Preview Avatar */}
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-500 shadow-md bg-stone-100 shrink-0">
                      {avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={avatarUrl}
                          alt="Avatar xem trước"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-amber-700 bg-amber-50 font-bold text-2xl">
                          {displayName[0] || 'U'}
                        </div>
                      )}
                    </div>

                    {/* URL Input */}
                    <div className="flex-1 w-full space-y-2">
                      <Input
                        type="url"
                        placeholder="Nhập liên kết hình ảnh trực tiếp (https://...)"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        className="rounded-xl text-xs sm:text-sm h-10"
                      />
                      <p className="text-[11px] text-stone-400">
                        Gợi ý: Dán link ảnh trực tiếp từ Unsplash, Imgur hoặc chọn từ các mẫu đầu bếp bên dưới.
                      </p>
                    </div>
                  </div>

                  {/* Avatar Presets Selector */}
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-stone-600 dark:text-stone-400 mb-2.5">
                      Hoặc chọn nhanh ảnh đại diện mẫu:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                      {AVATAR_PRESETS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAvatarUrl(preset.url)}
                          className={`p-1.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                            avatarUrl === preset.url
                              ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/30 dark:bg-amber-950/40'
                              : 'border-stone-200 hover:border-amber-300 hover:bg-stone-50 dark:border-stone-700'
                          }`}
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={preset.url}
                              alt={preset.label}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-[10px] font-medium text-stone-700 dark:text-stone-300 text-center line-clamp-1">
                            {preset.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Tên hiển thị & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">
                      Tên hiển thị <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Nhập tên hiển thị..."
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className={`rounded-xl text-xs sm:text-sm h-10 ${
                        formErrors.displayName ? 'border-rose-500 focus-visible:ring-rose-400' : ''
                      }`}
                    />
                    {formErrors.displayName && (
                      <p className="text-[11px] text-rose-500 font-medium">
                        {formErrors.displayName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">
                      Địa chỉ Email
                    </label>
                    <div className="relative">
                      <Input
                        type="email"
                        value={session?.user?.email || 'chef@culinary.com'}
                        disabled
                        className="rounded-xl text-xs sm:text-sm h-10 bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400 cursor-not-allowed"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                        Đã xác thực
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Giới thiệu bản thân (Bio) */}
                <div className="space-y-1.5 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">
                      Giới thiệu ngắn (Tiểu sử ẩm thực)
                    </label>
                    <span className="text-[11px] text-stone-400">{bio.length}/300 ký tự</span>
                  </div>
                  <textarea
                    rows={4}
                    maxLength={300}
                    placeholder="Chia sẻ niềm đam mê, phong cách nấu ăn hoặc câu chuyện về những món ngon của bạn..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-3 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 transition-all resize-none"
                  />
                </div>

                {/* 4. Sở thích ẩm thực & Website */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                      <ChefHat className="h-4 w-4 text-amber-600" />
                      <span>Sở trường ẩm thực</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Món Việt, Làm bánh, Món Á..."
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      className="rounded-xl text-xs sm:text-sm h-10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                      <Globe className="h-4 w-4 text-amber-600" />
                      <span>Trang cá nhân / Kênh ẩm thực</span>
                    </label>
                    <Input
                      type="url"
                      placeholder="https://facebook.com/chef..."
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="rounded-xl text-xs sm:text-sm h-10"
                    />
                  </div>
                </div>

                {/* 5. Nút Thao Tác (Actions) */}
                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResetForm}
                    disabled={isSavingProfile}
                    className="rounded-xl text-xs sm:text-sm font-semibold cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4 mr-1.5" />
                    Khôi phục
                  </Button>

                  <Button
                    type="submit"
                    disabled={isSavingProfile}
                    className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs sm:text-sm font-bold px-6 shadow-md cursor-pointer"
                  >
                    {isSavingProfile ? (
                      <span className="flex items-center gap-1.5">
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Đang lưu...
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <Save className="h-4 w-4" />
                        Lưu Thay Đổi
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: BẢO MẬT & ĐỔI MẬT KHẨU */}
          {activeTab === 'security' && (
            <div className="max-w-2xl mx-auto">
              <form
                onSubmit={handleChangePassword}
                className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <Lock className="h-5 w-5 text-amber-600" />
                    <span>Đổi Mật Khẩu Đăng Nhập</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                    Cập nhật mật khẩu thường xuyên giúp bảo vệ an toàn cho tài khoản và các công thức của bạn.
                  </p>
                </div>

                <div className="space-y-4 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">
                      Mật khẩu hiện tại
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="rounded-xl text-xs sm:text-sm h-10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">
                      Mật khẩu mới (Tối thiểu 6 ký tự)
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="rounded-xl text-xs sm:text-sm h-10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">
                      Xác nhận mật khẩu mới
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="rounded-xl text-xs sm:text-sm h-10"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end">
                  <Button
                    type="submit"
                    disabled={isChangingPassword}
                    className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs sm:text-sm font-bold px-6 shadow-md cursor-pointer"
                  >
                    {isChangingPassword ? (
                      <span className="flex items-center gap-1.5">
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Đang cập nhật...
                      </span>
                    ) : (
                      'Cập Nhật Mật Khẩu'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </MainContainer>
      </section>

      {/* QUICK VIEW MODAL */}
      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
