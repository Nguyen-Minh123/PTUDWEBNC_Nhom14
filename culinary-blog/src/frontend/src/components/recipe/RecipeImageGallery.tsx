'use client';

import React, { useEffect, useMemo, useState } from 'react';

/**
 * Mô tả một ảnh trong thư viện công thức.
 * Component này chỉ lo phần hiển thị và phát sự kiện ra ngoài,
 * còn API upload/xóa/đặt ảnh chính nên do parent xử lý.
 */
export interface RecipeGalleryImage {
    id: string;
    url: string;
    alt?: string;
    name?: string;
    isPrimary?: boolean;
}

/**
 * Props của RecipeImageGallery.
 * Dùng cho:
 * - Trang chi tiết recipe
 * - Trang chỉnh sửa recipe
 * - Vùng preview ảnh khi kết hợp với ImageUploader
 */
export interface RecipeImageGalleryProps {
    images: RecipeGalleryImage[];

    /** Tiêu đề section */
    title?: string;

    /** Mô tả ngắn */
    description?: string;

    /** Nút thêm ảnh, thường mở ImageUploader hoặc modal upload */
    onAddImages?: () => void;
    addButtonLabel?: string;

    /** Đặt ảnh chính */
    onSetPrimaryImage?: (imageId: string) => void;

    /** Xóa ảnh */
    onRemoveImage?: (imageId: string) => void;

    /** Khóa toàn bộ tương tác */
    disabled?: boolean;

    /** ClassName tùy biến */
    className?: string;
}

/** Lấy ảnh chính đầu tiên; nếu không có thì lấy ảnh đầu danh sách. */
function getDefaultActiveImageId(images: RecipeGalleryImage[]): string | null {
    const primary = images.find((image) => image.isPrimary);
    return primary?.id ?? images[0]?.id ?? null;
}

/** Sinh alt text an toàn cho accessibility. */
function buildAltText(image: RecipeGalleryImage): string {
    if (image.alt?.trim()) return image.alt;
    if (image.name?.trim()) return image.name;
    return 'Recipe image';
}

/**
 * Component thư viện ảnh công thức.
 * Chức năng:
 * - hiển thị ảnh chính cỡ lớn
 * - cho phép chuyển ảnh bằng thumbnail
 * - hỗ trợ phím mũi tên trái/phải
 * - hiển thị ảnh chính
 * - cho phép đặt ảnh chính / xóa ảnh qua callback từ parent
 */
export default function RecipeImageGallery({
    images,
    title = 'Thư viện ảnh công thức',
    description = 'Xem ảnh chính, chuyển ảnh nhanh và quản lý ảnh của công thức.',
    onAddImages,
    addButtonLabel = 'Thêm ảnh',
    onSetPrimaryImage,
    onRemoveImage,
    disabled = false,
    className = '',
}: RecipeImageGalleryProps) {
    // Ảnh đang được hiển thị lớn.
    const [activeImageId, setActiveImageId] = useState<string | null>(
        getDefaultActiveImageId(images),
    );

    // Giữ active image hợp lệ khi danh sách ảnh thay đổi.
    useEffect(() => {
        setActiveImageId((current) => {
            if (current && images.some((image) => image.id === current)) {
                return current;
            }
            return getDefaultActiveImageId(images);
        });
    }, [images]);

    // Tìm ảnh đang active để render.
    const activeImage = useMemo(
        () => images.find((image) => image.id === activeImageId) ?? images[0] ?? null,
        [images, activeImageId],
    );

    /**
     * Chọn ảnh từ thumbnail.
     */
    const handleSelectImage = (imageId: string) => {
        setActiveImageId(imageId);
    };

    /**
     * Chuyển sang ảnh tiếp theo.
     * Khi đến cuối danh sách thì quay vòng về đầu.
     */
    const handleNext = () => {
        if (!images.length || !activeImage) return;

        const currentIndex = images.findIndex((item) => item.id === activeImage.id);
        const nextIndex = (currentIndex + 1) % images.length;
        setActiveImageId(images[nextIndex].id);
    };

    /**
     * Chuyển về ảnh trước đó.
     * Khi ở đầu danh sách thì quay vòng về cuối.
     */
    const handlePrev = () => {
        if (!images.length || !activeImage) return;

        const currentIndex = images.findIndex((item) => item.id === activeImage.id);
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setActiveImageId(images[prevIndex].id);
    };

    /**
     * Gọi callback đặt ảnh chính.
     * Parent sẽ gọi API update primary image.
     */
    const handleSetPrimary = () => {
        if (!activeImage || disabled || !onSetPrimaryImage) return;
        onSetPrimaryImage(activeImage.id);
    };

    /**
     * Gọi callback xóa ảnh.
     * Parent sẽ gọi API xóa ảnh trên server.
     */
    const handleRemove = () => {
        if (!activeImage || disabled || !onRemoveImage) return;
        onRemoveImage(activeImage.id);
    };

    /**
     * Xử lý phím tắt cơ bản:
     * - ArrowLeft: ảnh trước
     * - ArrowRight: ảnh sau
     */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') handlePrev();
        if (event.key === 'ArrowRight') handleNext();
    };

    /**
     * Trạng thái rỗng: chưa có ảnh.
     */
    if (!images.length) {
        return (
            <section
                className={`rounded-2xl border border-dashed border-slate-300 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 ${className}`}
            >
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        {description}
                    </p>

                    {onAddImages ? (
                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={onAddImages}
                                disabled={disabled}
                                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {addButtonLabel}
                            </button>
                        </div>
                    ) : null}
                </div>
            </section>
        );
    }

    return (
        <section
            className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
        >
            {/* Header của gallery */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {onAddImages ? (
                        <button
                            type="button"
                            onClick={onAddImages}
                            disabled={disabled}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            {addButtonLabel}
                        </button>
                    ) : null}
                </div>
            </div>

            {/* Khung ảnh lớn */}
            <div
                tabIndex={0}
                onKeyDown={handleKeyDown}
                className="outline-none"
                aria-label="Recipe image gallery"
            >
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950">
                    {activeImage ? (
                        <>
                            <img
                                src={activeImage.url}
                                alt={buildAltText(activeImage)}
                                className="h-[320px] w-full object-cover sm:h-[420px]"
                            />

                            {/* Badge ảnh chính */}
                            {activeImage.isPrimary ? (
                                <span className="absolute left-4 top-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                                    Ảnh chính
                                </span>
                            ) : null}

                            {/* Thanh điều khiển */}
                            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/75 to-transparent p-4 text-white">
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    disabled={disabled}
                                    className="rounded-full bg-white/15 px-3 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    ← Trước
                                </button>

                                <div className="text-center">
                                    <p className="text-sm font-medium">
                                        {activeImage.name ?? 'Ảnh công thức'}
                                    </p>
                                    <p className="text-xs text-white/80">
                                        {images.findIndex((item) => item.id === activeImage.id) + 1}/{images.length}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={disabled}
                                    className="rounded-full bg-white/15 px-3 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Sau →
                                </button>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>

            {/* Thumbnail */}
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                {images.map((image) => {
                    const isActive = image.id === activeImageId;

                    return (
                        <button
                            key={image.id}
                            type="button"
                            onClick={() => handleSelectImage(image.id)}
                            className={[
                                'group overflow-hidden rounded-xl border-2 transition',
                                isActive
                                    ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900/40'
                                    : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700',
                            ].join(' ')}
                        >
                            <div className="relative aspect-square bg-slate-100 dark:bg-slate-800">
                                <img
                                    src={image.url}
                                    alt={buildAltText(image)}
                                    className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.03]"
                                />

                                {image.isPrimary ? (
                                    <span className="absolute left-1 top-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                                        Chính
                                    </span>
                                ) : null}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Các nút hành động dành cho role có quyền */}
            {(onSetPrimaryImage || onRemoveImage) ? (
                <div className="mt-5 flex flex-wrap gap-2">
                    {onSetPrimaryImage ? (
                        <button
                            type="button"
                            onClick={handleSetPrimary}
                            disabled={disabled || !activeImage}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            Đặt làm ảnh chính
                        </button>
                    ) : null}

                    {onRemoveImage ? (
                        <button
                            type="button"
                            onClick={handleRemove}
                            disabled={disabled || !activeImage}
                            className="rounded-xl border border-red-300 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/30"
                        >
                            Xóa ảnh
                        </button>
                    ) : null}
                </div>
            ) : null}
        </section>
    );
}
