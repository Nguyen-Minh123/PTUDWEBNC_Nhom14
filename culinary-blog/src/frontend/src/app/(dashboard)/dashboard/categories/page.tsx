'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FolderKanban,
  Plus,
  Pencil,
  Trash2,
  Search,
  RefreshCw,
  BookOpen,
  ShieldAlert,
  X,
  Check,
  Image as ImageIcon,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useAuthStore } from '@/stores/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';
import ImageUploader from '@/components/upload/ImageUploader';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5075';

export interface AdminCategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  orderIndex: number;
  recipeCount: number;
}

function slugifyVi(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function AdminCategoriesPage() {
  const { data: session } = useSession();
  const authStoreUser = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const { toast } = useToast();

  const token =
    accessToken ||
    ((session as unknown as { accessToken?: string } | null)?.accessToken ?? '');

  const isAdmin = useMemo(() => {
    const roles = authStoreUser?.roles || [];
    const sessionRole = (session?.user as { role?: string } | undefined)?.role;
    return (
      roles.some((r) => r.toLowerCase() === 'admin') ||
      sessionRole?.toLowerCase() === 'admin'
    );
  }, [authStoreUser?.roles, session?.user]);

  const [categories, setCategories] = useState<AdminCategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Form Modal State (Add / Edit)
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategoryItem | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [orderIndex, setOrderIndex] = useState<number>(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/categories`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        const items: AdminCategoryItem[] = Array.isArray(data)
          ? data
          : data.items || [];
        setCategories(items);
      }
    } catch {
      toast({
        title: 'Không thể tải danh mục',
        description: 'Vui lòng kiểm tra kết nối tới máy chủ Backend API.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [token, toast]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filteredCategories = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q))
    );
  }, [categories, searchTerm]);

  const totalRecipesInCategories = useMemo(
    () => categories.reduce((sum, item) => sum + (item.recipeCount || 0), 0),
    [categories]
  );

  const openCreateModal = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setImageUrl('');
    setOrderIndex(categories.length + 1);
    setSelectedFiles([]);
    setModalOpen(true);
  };

  const openEditModal = (cat: AdminCategoryItem) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setImageUrl(cat.imageUrl || '');
    setOrderIndex(cat.orderIndex || 0);
    setSelectedFiles([]);
    setModalOpen(true);
  };

  const uploadCategoryImageIfAny = async (): Promise<string | null> => {
    if (selectedFiles.length === 0) return imageUrl.trim() || null;

    const formData = new FormData();
    formData.append('file', selectedFiles[0]);
    formData.append('folder', 'categories');

    const res = await fetch(`${API_BASE_URL}/api/v1/media/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });

    if (res.ok) {
      const uploaded = await res.json();
      return uploaded.url || null;
    }
    return imageUrl.trim() || null;
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: 'Thiếu tên danh mục',
        description: 'Vui lòng nhập tên danh mục ẩm thực.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const finalImageUrl = await uploadCategoryImageIfAny();
      const finalSlug = slug.trim() || slugifyVi(name);

      const payload = {
        name: name.trim(),
        slug: finalSlug,
        description: description.trim() || null,
        imageUrl: finalImageUrl,
        orderIndex: Number(orderIndex) || 0,
      };

      const url = editingCategory
        ? `${API_BASE_URL}/api/v1/categories/${editingCategory.id}`
        : `${API_BASE_URL}/api/v1/categories`;
      const method = editingCategory ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(
          errData?.detail || errData?.title || 'Không thể lưu danh mục.'
        );
      }

      toast({
        title: editingCategory
          ? 'Đã cập nhật danh mục'
          : 'Đã thêm danh mục mới',
        description: `Danh mục "${payload.name}" đã được lưu thành công.`,
        variant: 'success',
      });

      setModalOpen(false);
      await fetchCategories();
    } catch (err) {
      toast({
        title: 'Lỗi lưu danh mục',
        description:
          err instanceof Error ? err.message : 'Đã xảy ra lỗi khi lưu.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCategory = async (cat: AdminCategoryItem) => {
    if (
      !window.confirm(
        `Bạn có chắc chắn muốn xóa danh mục "${cat.name}" không?`
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/categories/${cat.id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(
          errData?.detail ||
            errData?.title ||
            'Không thể xóa danh mục đang có công thức liên kết.'
        );
      }

      toast({
        title: 'Đã xóa danh mục',
        description: `Danh mục "${cat.name}" đã được xóa khỏi hệ thống.`,
        variant: 'success',
      });
      await fetchCategories();
    } catch (err) {
      toast({
        title: 'Không thể xóa danh mục',
        description:
          err instanceof Error ? err.message : 'Vui lòng thử lại sau.',
        variant: 'destructive',
      });
    }
  };

  if (!isAdmin) {
    return (
      <div className="bg-white rounded-2xl border border-rose-200 p-8 text-center max-w-lg mx-auto my-12 shadow-xs">
        <div className="h-12 w-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-bold text-stone-900 mb-2">
          Khu vực dành riêng cho Quản trị viên (Admin)
        </h2>
        <p className="text-sm text-stone-600">
          Bạn cần đăng nhập bằng tài khoản có quyền <strong>Admin</strong> để
          quản lý danh mục ẩm thực trên hệ thống.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <FolderKanban className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-stone-900">
                Quản Trị Danh Mục Ẩm Thực
              </h1>
              <p className="text-sm text-stone-500">
                Thêm mới, chỉnh sửa, tải ảnh đại diện và sắp xếp thứ tự các chuyên mục món ăn (FR-FTE-047)
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchCategories}
            disabled={loading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-1.5 ${loading ? 'animate-spin' : ''}`}
            />
            Làm mới
          </Button>
          <Button
            size="sm"
            onClick={openCreateModal}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Thêm danh mục mới
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Tổng số danh mục
          </p>
          <p className="text-2xl font-bold text-stone-900 mt-1">
            {categories.length}
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Tổng số công thức thuộc danh mục
          </p>
          <p className="text-2xl font-bold text-amber-600 mt-1">
            {totalRecipesInCategories}
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Kết quả đang hiển thị
          </p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">
            {filteredCategories.length}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="h-4 w-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm danh mục theo tên, slug hoặc mô tả..."
            className="pl-10"
          />
        </div>
        <span className="text-xs text-stone-500">
          Sắp xếp theo thứ tự ưu tiên (OrderIndex)
        </span>
      </div>

      {/* Category Table */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50/80 text-stone-600 border-b border-stone-200/80 text-xs uppercase">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Thứ tự</th>
                <th className="py-3.5 px-4 font-semibold">Danh mục</th>
                <th className="py-3.5 px-4 font-semibold">Slug URL</th>
                <th className="py-3.5 px-4 font-semibold">Mô tả</th>
                <th className="py-3.5 px-4 font-semibold text-center">
                  Số bài viết
                </th>
                <th className="py-3.5 px-4 font-semibold text-right">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">
                    Đang tải danh sách danh mục...
                  </td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-500">
                    Không tìm thấy danh mục nào phù hợp.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="hover:bg-stone-50/70 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-semibold text-stone-500">
                      #{cat.orderIndex}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {cat.imageUrl ? (
                          <img
                            src={cat.imageUrl}
                            alt={cat.name}
                            className="h-10 w-10 rounded-lg object-cover border border-stone-200"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                            <ImageIcon className="h-4 w-4" />
                          </div>
                        )}
                        <span className="font-bold text-stone-900">
                          {cat.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <code className="text-xs bg-stone-100 text-stone-700 px-2 py-1 rounded-md">
                        /{cat.slug}
                      </code>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 max-w-xs truncate">
                      {cat.description || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Badge
                        variant="secondary"
                        className="bg-amber-50 text-amber-800 border border-amber-200/60"
                      >
                        <BookOpen className="h-3 w-3 mr-1" />
                        {cat.recipeCount || 0} công thức
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(cat)}
                        >
                          <Pencil className="h-3.5 w-3.5 mr-1" />
                          Sửa
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCategory(cat)}
                          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" />
                          Xóa
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-stone-200 max-w-lg w-full p-6 shadow-xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-bold text-stone-900">
                {editingCategory
                  ? `Chỉnh sửa danh mục: ${editingCategory.name}`
                  : 'Thêm danh mục ẩm thực mới'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                  Tên danh mục *
                </label>
                <Input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editingCategory) {
                      setSlug(slugifyVi(e.target.value));
                    }
                  }}
                  placeholder="Ví dụ: Món nướng & BBQ"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                    Slug đường dẫn
                  </label>
                  <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="mon-nuong-bbq"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                    Thứ tự hiển thị
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={orderIndex}
                    onChange={(e) => setOrderIndex(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                  Mô tả danh mục
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  placeholder="Mô tả ngắn gọn về các món ăn thuộc danh mục này..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                  URL ảnh đại diện (hoặc tải file bên dưới)
                </label>
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <ImageUploader
                label="Tải ảnh minh họa danh mục lên MinIO (FR-FTE-046)"
                description="Chọn hoặc kéo thả 1 ảnh đại diện cho danh mục."
                multiple={false}
                maxFiles={1}
                maxSizeMB={5}
                onFilesChange={setSelectedFiles}
              />

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                  disabled={submitting}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <Check className="h-4 w-4 mr-1.5" />
                  {submitting ? 'Đang lưu...' : 'Lưu danh mục'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
