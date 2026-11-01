'use client';

/**
 * Trang Danh sách Tác giả & Đầu bếp ẩm thực công khai (/authors - FR-FTE-045).
 * Tích hợp với API:
 * - GET /api/v1/users/authors (Truy vấn công khai danh sách tác giả kèm số lượng công thức đã xuất bản)
 * - GET /api/v1/users/{id} (Xem chi tiết hồ sơ tác giả)
 */

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import {
  ChefHat,
  Search,
  BookOpen,
  Award,
  Calendar,
  ArrowRight,
  Sparkles,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  Mail,
} from 'lucide-react';
import { EmptyState } from '@/components/feedback/EmptyState';
import { userService } from '@/services/userService';
import type { AuthorSummaryDto } from '@/types';

function AuthorsDirectoryContent() {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortBy, setSortBy] = useState<string>('-publishedRecipeCount');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize] = useState<number>(9);

  const [authors, setAuthors] = useState<AuthorSummaryDto[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorSummaryDto | null>(null);

  // Debounce từ khóa tìm kiếm (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      setPageNumber(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const loadAuthors = useCallback(async () => {
    setLoading(true);
    try {
      const result = await userService.getAuthors({
        searchTerm: debouncedSearch || undefined,
        pageNumber,
        pageSize,
        sort: sortBy,
      });

      setAuthors(result.items || []);
      setTotalCount(result.totalCount || 0);
      setTotalPages(Math.max(1, result.totalPages || 1));
    } catch (err) {
      console.error('Lỗi tải danh sách tác giả:', err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, pageNumber, pageSize, sortBy]);

  useEffect(() => {
    loadAuthors();
  }, [loadAuthors]);

  const totalPublishedRecipes = authors.reduce(
    (sum, a) => sum + (a.publishedRecipeCount || 0),
    0
  );

  const getChefBadge = (author: AuthorSummaryDto) => {
    if (author.publishedRecipeCount >= 20) {
      return {
        label: 'Master Chef',
        className: 'bg-amber-100 text-amber-800 border-amber-300',
      };
    }
    if (author.primaryRole === 'Admin') {
      return {
        label: 'Ban Biên Tập',
        className: 'bg-purple-100 text-purple-800 border-purple-200',
      };
    }
    return {
      label: 'Đầu Bếp Sáng Tạo',
      className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-amber-950 to-orange-900 text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Cộng Đồng Đầu Bếp & Tác Giả Ẩm Thực
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Gặp gỡ những <span className="text-amber-400">Nghệ nhân Ẩm thực</span> đằng sau mỗi món ngon
            </h1>
            <p className="mt-4 text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl">
              Khám phá đội ngũ đầu bếp chuyên nghiệp, chuyên gia dinh dưỡng và những tác giả đam mê nấu nướng đã đóng góp hàng chục công thức chuẩn vị cho cộng đồng Culinary Blog.
            </p>

            {/* Thống kê nhanh cộng đồng */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xs border border-white/15 px-4 py-3 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-amber-500/30 flex items-center justify-center text-amber-300">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-black">{totalCount}</p>
                  <p className="text-[11px] text-stone-300">Đầu bếp & Tác giả</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xs border border-white/15 px-4 py-3 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/30 flex items-center justify-center text-emerald-300">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-black">{totalPublishedRecipes}+</p>
                  <p className="text-[11px] text-stone-300">Công thức đã xuất bản</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thanh Tìm kiếm & Sắp xếp */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
        <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Tìm kiếm tác giả theo tên hiển thị, phong cách ẩm thực hoặc tiểu sử..."
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

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-semibold text-stone-500 hidden md:inline">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPageNumber(1);
              }}
              aria-label="Sắp xếp danh sách tác giả"
              className="px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-bold text-stone-700 focus:outline-none focus:border-amber-500"
            >
              <option value="-publishedRecipeCount">Nhiều công thức xuất bản nhất</option>
              <option value="-joinedAt">Mới gia nhập cộng đồng</option>
              <option value="displayName">Tên tác giả (A → Z)</option>
              <option value="-displayName">Tên tác giả (Z → A)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lưới Danh sách Tác giả */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 p-6 animate-pulse space-y-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-stone-200" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-stone-200 rounded w-2/3" />
                    <div className="h-3 bg-stone-100 rounded w-1/2" />
                  </div>
                </div>
                <div className="h-12 bg-stone-100 rounded-xl" />
                <div className="h-8 bg-stone-100 rounded-xl" />
              </div>
            ))}
          </div>
        ) : authors.length === 0 ? (
          <EmptyState
            icon="👨‍🍳"
            title="Không tìm thấy tác giả phù hợp"
            description="Không có đầu bếp hoặc tác giả nào khớp với từ khóa tìm kiếm của bạn."
            className="py-16 bg-white rounded-2xl border border-stone-200"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author) => {
              const badge = getChefBadge(author);
              return (
                <article
                  key={author.id}
                  className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header Card: Avatar & Danh hiệu */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-200 overflow-hidden shrink-0 flex items-center justify-center text-xl font-black text-amber-800 shadow-xs">
                          {author.avatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={author.avatarUrl}
                              alt={author.displayName}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            (author.displayName || 'C')[0].toUpperCase()
                          )}
                        </div>
                        <div>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.className}`}
                          >
                            <Award className="w-3 h-3" />
                            {badge.label}
                          </span>
                          <h2 className="text-lg font-extrabold text-stone-900 mt-1 group-hover:text-amber-700 transition-colors">
                            {author.displayName}
                          </h2>
                          <p className="text-xs text-stone-400 truncate max-w-[190px]">
                            {author.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tiểu sử (Bio) */}
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed min-h-[3.75rem]">
                      {author.bio ||
                        'Đầu bếp đam mê sáng tạo và lan tỏa hương vị ẩm thực gia đình Việt Nam đến mọi căn bếp.'}
                    </p>

                    {/* Số liệu thống kê */}
                    <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 font-bold">
                        <ChefHat className="w-4 h-4 text-amber-600" />
                        <span>{author.publishedRecipeCount} công thức xuất bản</span>
                      </div>

                      <div className="flex items-center gap-1 text-stone-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(author.joinedAt).toLocaleDateString('vi-VN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Nút hành động */}
                  <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedAuthor(author)}
                      className="px-3.5 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-all"
                    >
                      Xem hồ sơ chi tiết
                    </button>

                    <Link
                      href={`/recipes/search?q=${encodeURIComponent(
                        author.displayName.replace(/^Chef\s+/i, '')
                      )}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <span>Xem món ăn</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Thanh phân trang */}
        {!loading && totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-xs font-bold text-stone-700 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
              Trang trước
            </button>
            <span className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold">
              Trang {pageNumber} / {totalPages}
            </span>
            <button
              type="button"
              disabled={pageNumber >= totalPages}
              onClick={() => setPageNumber((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-xs font-bold text-stone-700 disabled:opacity-40"
            >
              Trang sau
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* Modal Xem Hồ sơ Chi tiết Tác giả */}
      {selectedAuthor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl border border-stone-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-amber-100 border-2 border-amber-300 overflow-hidden shrink-0 flex items-center justify-center text-2xl font-black text-amber-800">
                  {selectedAuthor.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={selectedAuthor.avatarUrl}
                      alt={selectedAuthor.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    (selectedAuthor.displayName || 'C')[0].toUpperCase()
                  )}
                </div>
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                    <Award className="w-3.5 h-3.5" />
                    {getChefBadge(selectedAuthor).label}
                  </span>
                  <h3 className="text-xl font-black text-stone-900 mt-1">
                    {selectedAuthor.displayName}
                  </h3>
                  <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    {selectedAuthor.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAuthor(null)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 p-4 rounded-2xl bg-stone-50 border border-stone-100 text-sm text-stone-700 leading-relaxed">
              {selectedAuthor.bio ||
                'Đầu bếp đam mê sáng tạo và lan tỏa hương vị ẩm thực gia đình Việt Nam đến mọi căn bếp.'}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100">
                <p className="text-2xl font-black text-amber-800">
                  {selectedAuthor.publishedRecipeCount}
                </p>
                <p className="text-xs font-semibold text-amber-700">Công thức đã xuất bản</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-100/80 border border-stone-200">
                <p className="text-base font-bold text-stone-800 mt-1">
                  {new Date(selectedAuthor.joinedAt).toLocaleDateString('vi-VN')}
                </p>
                <p className="text-xs font-semibold text-stone-500 mt-0.5">Ngày tham gia</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedAuthor(null)}
                className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
              >
                Đóng
              </button>
              <Link
                href="/recipes/search"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md"
              >
                <span>Khám phá Kho Công Thức</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AuthorsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-sm text-stone-500">
          Đang tải danh sách tác giả ẩm thực...
        </div>
      }
    >
      <AuthorsDirectoryContent />
    </Suspense>
  );
}
