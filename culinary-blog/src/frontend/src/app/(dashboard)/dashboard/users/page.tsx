'use client';

/**
 * Trang Quản trị Người dùng & Tác giả dành cho Admin (FR-FTE-044).
 * Tích hợp trực tiếp với các API Backend:
 * - GET /api/v1/users (Phân trang, tìm kiếm theo tên/email, lọc theo vai trò & trạng thái, thống kê công thức)
 * - PUT /api/v1/users/{id}/role (Phân quyền RBAC: Admin, Author, User)
 * - PUT /api/v1/users/{id}/status (Khóa / Mở khóa tài khoản & Thu hồi phiên đăng nhập RefreshTokens tức thì)
 */

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  Users,
  Shield,
  ChefHat,
  UserCheck,
  UserX,
  Search,
  Lock,
  Unlock,
  ShieldAlert,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  CheckCircle2,
  X,
} from 'lucide-react';
import { EmptyState } from '@/components/feedback/EmptyState';
import { useUIStore } from '@/stores/useUIStore';
import { useAuthStore } from '@/stores/auth-store';
import { userService } from '@/services/userService';
import { extractErrorMessage } from '@/lib/api/error-handler';
import type { UserListItemDto, UserRoleType } from '@/types';

function AdminUsersManagementContent() {
  const { data: session } = useSession();
  const authStoreUser = useAuthStore((state) => state.user);
  const addToast = useUIStore((state) => state.addToast);

  const currentUserId = session?.user?.id || authStoreUser?.id || '';
  const currentUserEmail = session?.user?.email || authStoreUser?.email || '';

  // Bộ lọc & phân trang
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRoleType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'locked'>('all');
  const [sortBy, setSortBy] = useState<string>('-createdAt');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize] = useState<number>(8);

  // Dữ liệu người dùng
  const [users, setUsers] = useState<UserListItemDto[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  // Thống kê tổng quan
  const [stats, setStats] = useState({
    totalUsers: 0,
    adminCount: 0,
    authorCount: 0,
    lockedCount: 0,
  });

  // Modal Phân quyền (Change Role)
  const [roleModalUser, setRoleModalUser] = useState<UserListItemDto | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRoleType>('User');
  const [roleSubmitting, setRoleSubmitting] = useState<boolean>(false);

  // Modal Khóa / Mở khóa tài khoản (Lock / Unlock Account)
  const [statusModalUser, setStatusModalUser] = useState<UserListItemDto | null>(null);
  const [lockoutDays, setLockoutDays] = useState<number>(30);
  const [lockReason, setLockReason] = useState<string>('');
  const [statusSubmitting, setStatusSubmitting] = useState<boolean>(false);

  // Debounce từ khóa tìm kiếm (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      setPageNumber(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const getAccessToken = useCallback(() => {
    return (session?.user as any)?.accessToken || useAuthStore.getState().accessToken || undefined;
  }, [session]);

  // Nạp thống kê tổng quan
  const loadSummaryStats = useCallback(async () => {
    try {
      const token = getAccessToken();
      const allRes = await userService.getUsers({ pageNumber: 1, pageSize: 50 }, token);
      const allItems = allRes.items || [];
      setStats({
        totalUsers: allRes.totalCount || allItems.length,
        adminCount: allItems.filter((u) => u.primaryRole === 'Admin' || u.roles.includes('Admin')).length,
        authorCount: allItems.filter((u) => u.primaryRole === 'Author').length,
        lockedCount: allItems.filter((u) => !u.isActive || u.isLockedOut).length,
      });
    } catch {
      // Bỏ qua lỗi phụ khi tải thống kê
    }
  }, [getAccessToken]);

  // Nạp danh sách người dùng theo bộ lọc
  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAccessToken();
      const isActiveParam =
        statusFilter === 'active' ? true : statusFilter === 'locked' ? false : undefined;

      const result = await userService.getUsers(
        {
          searchTerm: debouncedSearch || undefined,
          role: roleFilter === 'all' ? undefined : roleFilter,
          isActive: isActiveParam,
          pageNumber,
          pageSize,
          sort: sortBy,
        },
        token
      );

      setUsers(result.items);
      setTotalCount(result.totalCount);
      setTotalPages(Math.max(1, result.totalPages));
    } catch (err) {
      addToast('error', extractErrorMessage(err) || 'Không thể tải danh sách người dùng.');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, roleFilter, statusFilter, pageNumber, pageSize, sortBy, getAccessToken, addToast]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    loadSummaryStats();
  }, [loadSummaryStats]);

  // Kiểm tra có phải tài khoản đang đăng nhập hay không
  const isCurrentUser = (u: UserListItemDto) => {
    if (currentUserId && u.id === currentUserId) return true;
    if (currentUserEmail && u.email.toLowerCase() === currentUserEmail.toLowerCase()) return true;
    return false;
  };

  // Xử lý mở Modal Phân quyền
  const openRoleModal = (u: UserListItemDto) => {
    setRoleModalUser(u);
    setSelectedRole(u.primaryRole);
  };

  // Xử lý xác nhận đổi vai trò (PUT /api/v1/users/{id}/role)
  const handleConfirmRoleChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleModalUser) return;

    if (isCurrentUser(roleModalUser) && selectedRole !== 'Admin') {
      addToast('error', 'Quản trị viên không thể tự hạ quyền Admin của chính mình.');
      return;
    }

    setRoleSubmitting(true);
    try {
      const token = getAccessToken();
      const updated = await userService.updateUserRole(
        roleModalUser.id,
        { role: selectedRole },
        token
      );

      setUsers((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      addToast(
        'success',
        `Đã cập nhật vai trò của "${updated.displayName}" thành ${updated.primaryRole}!`
      );
      setRoleModalUser(null);
      loadSummaryStats();
    } catch (err) {
      addToast('error', extractErrorMessage(err) || 'Không thể cập nhật vai trò người dùng.');
    } finally {
      setRoleSubmitting(false);
    }
  };

  // Xử lý mở Modal Khóa / Mở khóa
  const openStatusModal = (u: UserListItemDto) => {
    setStatusModalUser(u);
    setLockoutDays(30);
    setLockReason('');
  };

  // Xử lý xác nhận Khóa / Mở khóa tài khoản (PUT /api/v1/users/{id}/status)
  const handleConfirmStatusChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusModalUser) return;

    const targetIsActive = !statusModalUser.isActive;

    if (!targetIsActive && isCurrentUser(statusModalUser)) {
      addToast('error', 'Quản trị viên không thể tự khóa tài khoản của chính mình.');
      return;
    }

    setStatusSubmitting(true);
    try {
      const token = getAccessToken();
      const updated = await userService.updateUserStatus(
        statusModalUser.id,
        {
          isActive: targetIsActive,
          lockoutDays: targetIsActive ? null : lockoutDays,
          reason: targetIsActive ? null : lockReason.trim() || 'Vi phạm quy định cộng đồng',
        },
        token
      );

      setUsers((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      addToast(
        'success',
        targetIsActive
          ? `Đã mở khóa tài khoản "${updated.displayName}" thành công!`
          : `Đã khóa tài khoản "${updated.displayName}" và thu hồi toàn bộ phiên đăng nhập!`
      );
      setStatusModalUser(null);
      loadSummaryStats();
    } catch (err) {
      addToast('error', extractErrorMessage(err) || 'Không thể cập nhật trạng thái tài khoản.');
    } finally {
      setStatusSubmitting(false);
    }
  };

  const renderRoleBadge = (role: UserRoleType) => {
    if (role === 'Admin') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
          <Shield className="w-3.5 h-3.5 text-purple-600" />
          Admin
        </span>
      );
    }
    if (role === 'Author') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
          <ChefHat className="w-3.5 h-3.5 text-amber-600" />
          Tác giả (Author)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
        <Users className="w-3.5 h-3.5 text-stone-500" />
        Thành viên (User)
      </span>
    );
  };

  return (
    <div className="flex-1 bg-stone-50 flex flex-col font-sans">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/30 text-amber-200 text-[11px] font-bold tracking-wider uppercase">
                Quản trị hệ thống • RBAC & Bảo mật tài khoản
              </span>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
                Quản Lý Người Dùng & Đầu Bếp
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
                Tra cứu hồ sơ thành viên, phân quyền tác giả ẩm thực (Admin / Author / User) và khóa tài khoản vi phạm kèm thu hồi phiên đăng nhập tức thì.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/authors"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all"
            >
              <ChefHat className="w-4 h-4 text-amber-300" />
              Xem Trang Tác Giả Công Khai
            </Link>
            <button
              type="button"
              onClick={() => {
                loadUsers();
                loadSummaryStats();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all shadow-md"
              title="Làm mới danh sách"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Làm mới
            </button>
          </div>
        </div>

        {/* 4 Thẻ thống kê nhanh */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                Tổng tài khoản
              </span>
              <p className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">{stats.totalUsers}</p>
              <span className="text-[11px] text-stone-400">Thành viên toàn hệ thống</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-purple-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">
                Quản trị viên (Admin)
              </span>
              <p className="text-2xl sm:text-3xl font-black text-purple-700 mt-1">{stats.adminCount}</p>
              <span className="text-[11px] text-purple-400">Toàn quyền kiểm duyệt</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                Đầu bếp / Tác giả
              </span>
              <p className="text-2xl sm:text-3xl font-black text-amber-700 mt-1">{stats.authorCount}</p>
              <span className="text-[11px] text-amber-500">Sáng tạo công thức nấu ăn</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ChefHat className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
                Tài khoản bị khóa
              </span>
              <p className="text-2xl sm:text-3xl font-black text-rose-700 mt-1">{stats.lockedCount}</p>
              <span className="text-[11px] text-rose-400">Đã thu hồi phiên đăng nhập</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <UserX className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Thanh công cụ Tìm kiếm & Lọc */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs mb-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Ô tìm kiếm */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Tìm kiếm theo tên hiển thị, họ tên hoặc địa chỉ email..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  aria-label="Xóa từ khóa"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Bộ lọc trạng thái & Sắp xếp */}
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as 'all' | 'active' | 'locked');
                  setPageNumber(1);
                }}
                aria-label="Lọc theo trạng thái tài khoản"
                className="px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-xs font-semibold text-stone-700 focus:outline-none focus:border-amber-500"
              >
                <option value="all">Trạng thái: Tất cả</option>
                <option value="active">Đang hoạt động (Active)</option>
                <option value="locked">Đã khóa (Locked)</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPageNumber(1);
                }}
                aria-label="Sắp xếp danh sách người dùng"
                className="px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-xs font-semibold text-stone-700 focus:outline-none focus:border-amber-500"
              >
                <option value="-createdAt">Sắp xếp: Mới tham gia nhất</option>
                <option value="createdAt">Sắp xếp: Tham gia lâu nhất</option>
                <option value="-recipeCount">Sắp xếp: Nhiều công thức nhất</option>
                <option value="displayName">Sắp xếp: Tên hiển thị (A → Z)</option>
                <option value="-displayName">Sắp xếp: Tên hiển thị (Z → A)</option>
              </select>
            </div>
          </div>

          {/* Tabs lọc theo Vai trò (Role) */}
          <div className="flex items-center gap-2 pt-3 border-t border-stone-100 overflow-x-auto">
            <span className="text-xs font-semibold text-stone-500 mr-1 shrink-0">Vai trò:</span>
            {[
              { key: 'all', label: 'Tất cả vai trò' },
              { key: 'Admin', label: '🛡️ Quản trị viên (Admin)' },
              { key: 'Author', label: '👨‍🍳 Tác giả / Đầu bếp (Author)' },
              { key: 'User', label: '👤 Thành viên (User)' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setRoleFilter(tab.key as 'all' | UserRoleType);
                  setPageNumber(1);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  roleFilter === tab.key
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bảng Danh sách Người dùng */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-stone-500 font-medium">
                Đang tải danh sách người dùng từ hệ thống...
              </p>
            </div>
          ) : users.length === 0 ? (
            <EmptyState
              icon="👥"
              title="Không tìm thấy người dùng phù hợp"
              description="Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc vai trò / trạng thái để xem kết quả."
              className="py-16"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50/80 border-b border-stone-200 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    <th className="py-3.5 px-5">Thành viên / Đầu bếp</th>
                    <th className="py-3.5 px-4">Vai trò (RBAC)</th>
                    <th className="py-3.5 px-4">Trạng thái</th>
                    <th className="py-3.5 px-4 text-center">Đóng góp công thức</th>
                    <th className="py-3.5 px-4">Ngày tham gia</th>
                    <th className="py-3.5 px-5 text-right">Thao tác quản trị</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-sm">
                  {users.map((u) => {
                    const self = isCurrentUser(u);
                    return (
                      <tr
                        key={u.id}
                        className={`hover:bg-amber-50/30 transition-colors ${
                          !u.isActive ? 'bg-rose-50/20' : ''
                        }`}
                      >
                        {/* Cột 1: Thông tin người dùng */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3.5">
                            <div className="w-11 h-11 rounded-full bg-amber-100 border border-amber-200 overflow-hidden shrink-0 flex items-center justify-center text-sm font-bold text-amber-800">
                              {u.avatarUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={u.avatarUrl}
                                  alt={u.displayName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                (u.displayName || 'U')[0].toUpperCase()
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-stone-900 truncate">
                                  {u.displayName}
                                </span>
                                {self && (
                                  <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold">
                                    Bạn
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-stone-500 truncate">{u.email}</p>
                              {u.bio && (
                                <p className="text-[11px] text-stone-400 line-clamp-1 max-w-xs mt-0.5">
                                  {u.bio}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Cột 2: Vai trò */}
                        <td className="py-4 px-4">{renderRoleBadge(u.primaryRole)}</td>

                        {/* Cột 3: Trạng thái */}
                        <td className="py-4 px-4">
                          {u.isActive && !u.isLockedOut ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                              Đang hoạt động
                            </span>
                          ) : (
                            <div className="space-y-0.5">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 border border-rose-200">
                                <Lock className="w-3.5 h-3.5 text-rose-600" />
                                Đã bị khóa
                              </span>
                              {u.lockoutEnd && (
                                <p className="text-[10px] text-rose-500">
                                  Đến: {new Date(u.lockoutEnd).toLocaleDateString('vi-VN')}
                                </p>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Cột 4: Số lượng công thức */}
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-stone-100 text-stone-800 text-xs font-bold">
                            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                            <span>{u.publishedRecipeCount}</span>
                            <span className="text-stone-400 font-normal">/ {u.recipeCount} bài</span>
                          </div>
                        </td>

                        {/* Cột 5: Ngày tham gia */}
                        <td className="py-4 px-4 text-xs text-stone-500">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-stone-400" />
                            <span>{new Date(u.createdAt).toLocaleDateString('vi-VN')}</span>
                          </div>
                        </td>

                        {/* Cột 6: Hành động quản trị */}
                        <td className="py-4 px-5 text-right">
                          <div className="inline-flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => openRoleModal(u)}
                              disabled={self}
                              title={
                                self
                                  ? 'Không thể tự thay đổi quyền của chính mình'
                                  : 'Phân quyền vai trò (Admin / Author / User)'
                              }
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              <Shield className="w-3.5 h-3.5 text-amber-600" />
                              Đổi quyền
                            </button>

                            {u.isActive && !u.isLockedOut ? (
                              <button
                                type="button"
                                onClick={() => openStatusModal(u)}
                                disabled={self}
                                title={
                                  self
                                    ? 'Không thể tự khóa tài khoản của chính mình'
                                    : 'Khóa tài khoản và thu hồi phiên đăng nhập'
                                }
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                <Lock className="w-3.5 h-3.5" />
                                Khóa
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => openStatusModal(u)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-2xs"
                              >
                                <Unlock className="w-3.5 h-3.5" />
                                Mở khóa
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Thanh Phân trang */}
          {!loading && users.length > 0 && (
            <div className="px-5 py-4 bg-stone-50/70 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
              <span>
                Hiển thị <strong>{users.length}</strong> trên tổng số <strong>{totalCount}</strong> tài khoản
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={pageNumber <= 1}
                  onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Trước
                </button>
                <span className="px-3 py-1.5 font-bold text-stone-800">
                  Trang {pageNumber} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={pageNumber >= totalPages}
                  onClick={() => setPageNumber((p) => Math.min(totalPages, p + 1))}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Sau
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* MODAL 1: PHÂN QUYỀN VAI TRÒ (PUT /api/v1/users/{id}/role) */}
        {roleModalUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl border border-stone-200 max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900">Phân quyền người dùng</h3>
                    <p className="text-xs text-stone-500">{roleModalUser.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setRoleModalUser(null)}
                  className="text-stone-400 hover:text-stone-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleConfirmRoleChange} className="space-y-4">
                <div className="space-y-2.5">
                  {(
                    [
                      {
                        role: 'Admin' as UserRoleType,
                        title: 'Quản trị viên (Admin)',
                        desc: 'Toàn quyền quản lý người dùng, danh mục, công thức và nhật ký hệ thống.',
                      },
                      {
                        role: 'Author' as UserRoleType,
                        title: 'Đầu bếp / Tác giả (Author)',
                        desc: 'Được phép sáng tạo, xuất bản công thức nấu ăn và xuất hiện trên trang Tác giả.',
                      },
                      {
                        role: 'User' as UserRoleType,
                        title: 'Thành viên (User)',
                        desc: 'Khám phá công thức, lưu món ăn yêu thích và quản lý hồ sơ cá nhân.',
                      },
                    ] as const
                  ).map((option) => (
                    <label
                      key={option.role}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedRole === option.role
                          ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-100'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={option.role}
                        checked={selectedRole === option.role}
                        onChange={() => setSelectedRole(option.role)}
                        className="mt-1 accent-amber-600"
                      />
                      <div>
                        <p className="text-xs font-bold text-stone-900">{option.title}</p>
                        <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                          {option.desc}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setRoleModalUser(null)}
                    className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    disabled={roleSubmitting}
                    className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md disabled:opacity-50"
                  >
                    {roleSubmitting ? 'Đang cập nhật...' : 'Lưu Phân Quyền'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: KHÓA / MỞ KHÓA TÀI KHOẢN & THU HỒI PHIÊN ĐĂNG NHẬP (PUT /api/v1/users/{id}/status) */}
        {statusModalUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl border border-stone-200 max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      statusModalUser.isActive
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {statusModalUser.isActive ? (
                      <ShieldAlert className="w-5 h-5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900">
                      {statusModalUser.isActive
                        ? 'Khóa tài khoản người dùng'
                        : 'Mở khóa tài khoản người dùng'}
                    </h3>
                    <p className="text-xs text-stone-500">
                      {statusModalUser.displayName} ({statusModalUser.email})
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStatusModalUser(null)}
                  className="text-stone-400 hover:text-stone-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleConfirmStatusChange} className="space-y-4">
                {statusModalUser.isActive ? (
                  <>
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 leading-relaxed">
                      <strong>Cảnh báo bảo mật:</strong> Khi khóa tài khoản này, hệ thống sẽ đặt{' '}
                      <code>IsActive = false</code>, cập nhật <code>LockoutEnd</code> và{' '}
                      <strong>thu hồi tức thì toàn bộ RefreshTokens</strong> đang hoạt động của người dùng.
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Thời hạn khóa tài khoản
                      </label>
                      <select
                        value={lockoutDays}
                        onChange={(e) => setLockoutDays(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-rose-500"
                      >
                        <option value={7}>Khóa tạm thời 7 ngày</option>
                        <option value={30}>Khóa 30 ngày</option>
                        <option value={90}>Khóa 90 ngày</option>
                        <option value={36500}>Khóa vô thời hạn (Vĩnh viễn)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Lý do khóa tài khoản (Ghi vào nhật ký hệ thống)
                      </label>
                      <textarea
                        rows={3}
                        value={lockReason}
                        onChange={(e) => setLockReason(e.target.value)}
                        placeholder="Ví dụ: Vi phạm tiêu chuẩn cộng đồng, đăng tải nội dung spam..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 leading-relaxed">
                    Bạn sắp kích hoạt lại tài khoản của{' '}
                    <strong>{statusModalUser.displayName}</strong>. Người dùng sẽ có thể đăng nhập và sử dụng hệ thống bình thường ngay lập tức.
                  </div>
                )}

                <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setStatusModalUser(null)}
                    className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    disabled={statusSubmitting}
                    className={`px-5 py-2 rounded-xl text-white text-xs font-bold shadow-md disabled:opacity-50 ${
                      statusModalUser.isActive
                        ? 'bg-rose-600 hover:bg-rose-700'
                        : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    {statusSubmitting
                      ? 'Đang xử lý...'
                      : statusModalUser.isActive
                      ? 'Xác nhận Khóa & Thu hồi phiên'
                      : 'Xác nhận Mở khóa'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-sm text-stone-500">
          Đang tải trang Quản trị Người dùng...
        </div>
      }
    >
      <AdminUsersManagementContent />
    </Suspense>
  );
}
