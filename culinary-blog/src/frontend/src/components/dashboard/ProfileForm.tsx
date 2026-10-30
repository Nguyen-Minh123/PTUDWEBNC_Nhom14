'use client';

/**
 * ============================================================================
 * Chức năng:
 * - Hiển thị form cập nhật hồ sơ cá nhân.
 * - Cho phép sửa tên hiển thị, avatar URL và bio.
 * - Hiển thị email ở chế độ chỉ đọc.
 * - Hiển thị ảnh xem trước avatar nếu có URL.
 *
 * Ghi chú:
 * - Component chỉ hiển thị giao diện.
 * - Không gọi API.
 * - Không quản lý state nội bộ.
 * - Dữ liệu được truyền từ DashboardPage qua props.
 * ============================================================================
 */

import React from 'react';

export interface ProfileFormProps {
    /**
     * Tên hiển thị công khai.
     */
    displayName: string;

    /**
     * Email người dùng, chỉ hiển thị để tham khảo.
     */
    email?: string;

    /**
     * Đường dẫn avatar hiện tại.
     */
    avatarUrl: string;

    /**
     * Bio / mô tả cá nhân.
     */
    bio: string;

    /**
     * Xử lý thay đổi tên hiển thị.
     */
    onDisplayNameChange: (value: string) => void;

    /**
     * Xử lý thay đổi avatar URL.
     */
    onAvatarUrlChange: (value: string) => void;

    /**
     * Xử lý thay đổi bio.
     */
    onBioChange: (value: string) => void;

    /**
     * Xử lý khi submit form.
     */
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;

    /**
     * Trạng thái đang lưu.
     */
    isSaving?: boolean;
}

/**
 * ProfileForm
 * Hiển thị form chỉnh sửa hồ sơ cá nhân cho dashboard.
 */
export default function ProfileForm({
    displayName,
    email = 'user@example.com',
    avatarUrl,
    bio,
    onDisplayNameChange,
    onAvatarUrlChange,
    onBioChange,
    onSubmit,
    isSaving = false,
}: ProfileFormProps) {
    /**
     * Kiểm tra có avatar URL hợp lệ để hiển thị preview hay không.
     */
    const hasAvatarPreview = avatarUrl.trim().length > 0;

    return (
        <section className="max-w-2xl bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
            {/* Tiêu đề khối form */}
            <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                    Cập nhật hồ sơ cá nhân
                </h2>
                <p className="text-xs text-gray-500">
                    Thông tin sẽ hiển thị công khai trên các công thức nấu ăn của bạn.
                </p>
            </div>

            {/* Form cập nhật hồ sơ */}
            <form onSubmit={onSubmit} className="space-y-5">
                {/* Tên hiển thị */}
                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Tên hiển thị công khai *
                    </label>
                    <input
                        type="text"
                        required
                        value={displayName}
                        onChange={(e) => onDisplayNameChange(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        placeholder="Nhập tên hiển thị..."
                    />
                </div>

                {/* Email chỉ đọc */}
                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Địa chỉ Email (Chỉ đọc)
                    </label>
                    <input
                        type="email"
                        disabled
                        value={email}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-500 cursor-not-allowed"
                    />
                </div>

                {/* Avatar URL */}
                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Đường dẫn ảnh đại diện (Avatar URL)
                    </label>
                    <input
                        type="url"
                        value={avatarUrl}
                        onChange={(e) => onAvatarUrlChange(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                    />

                    {/* Preview avatar */}
                    {hasAvatarPreview && (
                        <div className="mt-3 flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={avatarUrl}
                                alt="Avatar Preview"
                                className="w-12 h-12 rounded-full object-cover border border-amber-300"
                            />
                            <span className="text-xs text-gray-500">
                                Xem trước ảnh đại diện
                            </span>
                        </div>
                    )}
                </div>

                {/* Bio */}
                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Tiểu sử & Châm ngôn nấu ăn (Bio)
                    </label>
                    <textarea
                        rows={4}
                        value={bio}
                        onChange={(e) => onBioChange(e.target.value)}
                        placeholder="Chia sẻ niềm yêu thích nấu ăn hoặc phong cách ẩm thực của bạn..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                    />
                </div>

                {/* Nút lưu */}
                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-2.5 rounded-lg bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition-all shadow-md shadow-amber-600/20 disabled:opacity-60"
                    >
                        {isSaving ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                    </button>
                </div>
            </form>
        </section>
    );
}