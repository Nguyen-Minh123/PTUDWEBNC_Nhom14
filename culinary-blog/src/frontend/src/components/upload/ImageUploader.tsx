'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Ảnh đã tồn tại trên server (ví dụ: ảnh recipe đã lưu).
 * Component chỉ hiển thị và cho phép xóa/đặt làm chính qua callback từ parent.
 */
export type ExistingImage = {
    id: string;
    url: string;
    name?: string;
    isPrimary?: boolean;
};

/**
 * Ảnh mới người dùng vừa chọn từ máy.
 * previewUrl là object URL dùng để xem trước ngay trên trình duyệt.
 */
type LocalImage = {
    id: string;
    file: File;
    previewUrl: string;
};

export interface ImageUploaderProps {
    label?: string;
    description?: string;
    helperText?: string;
    multiple?: boolean;
    maxFiles?: number;
    maxSizeMB?: number;
    accept?: string[];
    disabled?: boolean;
    className?: string;

    /**
     * Ảnh hiện có (nếu đang ở chế độ sửa).
     * Nếu không có, component hoạt động như uploader thuần.
     */
    existingImages?: ExistingImage[];

    /**
     * Danh sách file mới sau khi người dùng chọn.
     * Parent sẽ dùng danh sách này để build FormData và gọi API upload.
     */
    onFilesChange?: (files: File[]) => void;

    /**
     * Xóa ảnh đã có trên server.
     * Parent sẽ gọi API delete theo id.
     */
    onRemoveExistingImage?: (imageId: string) => void;

    /**
     * Chọn ảnh chính (primary image).
     * Có thể nhận cả id của ảnh server hoặc ảnh local.
     */
    primaryImageId?: string;
    onSetPrimaryImage?: (imageId: string | null) => void;

    /**
     * Callback khi người dùng bấm "Xóa tất cả" local files.
     * Thích hợp cho form reset.
     */
    onClearAll?: () => void;
}

const DEFAULT_ACCEPT = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

/** Sinh id ổn định cho ảnh local để quản lý preview và xóa. */
function createId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }

    return `img_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

/** Chuyển số byte sang chuỗi dễ đọc. */
function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;

    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;

    return `${(kb / 1024).toFixed(1)} MB`;
}

/** Kiểm tra file có thuộc nhóm MIME hợp lệ hay không. */
function isAllowedMimeType(file: File, accept: string[]): boolean {
    // Một số browser có thể trả về type rỗng với file kéo thả đặc biệt.
    // Ở đây chỉ chấp nhận khi MIME khớp danh sách cho phép.
    return accept.includes(file.type);
}

/** Validate từng file theo ràng buộc SRS: dung lượng, định dạng, số lượng. */
function validateFile(file: File, accept: string[], maxSizeBytes: number): string | null {
    if (!isAllowedMimeType(file, accept)) {
        return `File "${file.name}" không đúng định dạng. Chỉ chấp nhận: ${accept.join(', ')}.`;
    }

    if (file.size > maxSizeBytes) {
        return `File "${file.name}" vượt quá dung lượng cho phép (${formatFileSize(maxSizeBytes)}).`;
    }

    return null;
}

/**
 * Tạo object URL để preview ảnh local.
 * Object URL cần revoke khi xóa hoặc unmount để tránh leak bộ nhớ.
 */
function buildLocalImage(file: File): LocalImage {
    return {
        id: createId(),
        file,
        previewUrl: URL.createObjectURL(file),
    };
}

export default function ImageUploader({
    label = 'Tải ảnh',
    description = 'Kéo thả hoặc chọn ảnh từ máy tính.',
    helperText = 'Hỗ trợ JPEG, PNG, WEBP, AVIF.',
    multiple = true,
    maxFiles = 10,
    maxSizeMB = 5,
    accept = DEFAULT_ACCEPT,
    disabled = false,
    className = '',
    existingImages = [],
    onFilesChange,
    onRemoveExistingImage,
    primaryImageId,
    onSetPrimaryImage,
    onClearAll,
}: ImageUploaderProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [localImages, setLocalImages] = useState<LocalImage[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const allowedMimeTypes = useMemo(
        () => (accept.length > 0 ? accept : DEFAULT_ACCEPT),
        [accept],
    );

    const acceptAttribute = useMemo(() => allowedMimeTypes.join(','), [allowedMimeTypes]);

    const maxSizeBytes = useMemo(() => maxSizeMB * 1024 * 1024, [maxSizeMB]);

    const totalCount = existingImages.length + localImages.length;
    const isLimitReached = totalCount >= maxFiles;

    /** Đồng bộ danh sách file local ra ngoài cho parent. */
    useEffect(() => {
        onFilesChange?.(localImages.map((item) => item.file));
    }, [localImages, onFilesChange]);

    /** Dọn object URL khi component unmount để tránh rò rỉ bộ nhớ. */
    useEffect(() => {
        return () => {
            localImages.forEach((item) => URL.revokeObjectURL(item.previewUrl));
        };
    }, [localImages]);

    /** Mở hộp thoại chọn file. */
    const openFilePicker = () => {
        if (disabled) return;
        inputRef.current?.click();
    };

    /**
     * Xử lý thêm file mới:
     * - kiểm tra giới hạn số lượng
     * - kiểm tra định dạng
     * - kiểm tra dung lượng
     * - tạo preview local
     */
    const appendFiles = (incomingFiles: File[]) => {
        setError(null);

        if (disabled) return;

        const normalized = multiple ? incomingFiles : incomingFiles.slice(0, 1);

        if (!normalized.length) return;

        const remainingSlots = Math.max(maxFiles - totalCount, 0);
        if (remainingSlots <= 0) {
            setError(`Đã đạt giới hạn tối đa ${maxFiles} ảnh.`);
            return;
        }

        const filesToProcess = normalized.slice(0, remainingSlots);
        const accepted: LocalImage[] = [];

        for (const file of filesToProcess) {
            const validationError = validateFile(file, allowedMimeTypes, maxSizeBytes);

            if (validationError) {
                setError(validationError);
                continue;
            }

            accepted.push(buildLocalImage(file));
        }

        if (!accepted.length) return;

        setLocalImages((prev) => [...prev, ...accepted]);
    };

    /**
     * Khi người dùng chọn file bằng input.
     * Reset value input để có thể chọn lại đúng file vừa xóa.
     */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);
        appendFiles(files);

        // Reset để lần sau chọn lại cùng file vẫn phát sinh onChange.
        event.target.value = '';
    };

    /** Kéo file qua vùng drop thì bật hiệu ứng hover. */
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (!disabled) setIsDragging(true);
    };

    /** Rời khỏi vùng drop thì tắt hiệu ứng hover. */
    const handleDragLeave = () => {
        setIsDragging(false);
    };

    /** Thả file trực tiếp vào vùng drop. */
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        if (disabled) return;

        const files = Array.from(event.dataTransfer.files ?? []);
        appendFiles(files);
    };

    /** Xóa một file local và revoke object URL của nó. */
    const removeLocalImage = (id: string) => {
        setError(null);

        setLocalImages((prev) => {
            const target = prev.find((item) => item.id === id);
            if (target) URL.revokeObjectURL(target.previewUrl);

            return prev.filter((item) => item.id !== id);
        });
    };

    /** Xóa toàn bộ file local, hữu ích cho reset form. */
    const clearAllLocalImages = () => {
        localImages.forEach((item) => URL.revokeObjectURL(item.previewUrl));
        setLocalImages([]);
        setError(null);
        onClearAll?.();

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    /** Hợp nhất ảnh server và ảnh local để render chung một grid. */
    const renderItems = useMemo(() => {
        const serverItems = existingImages.map((img) => ({
            id: img.id,
            src: img.url,
            name: img.name ?? 'existing-image',
            type: 'server' as const,
            isPrimary: img.isPrimary ?? false,
            sizeLabel: '',
        }));

        const localItems = localImages.map((img) => ({
            id: img.id,
            src: img.previewUrl,
            name: img.file.name,
            type: 'local' as const,
            isPrimary: false,
            sizeLabel: formatFileSize(img.file.size),
        }));

        return [...serverItems, ...localItems];
    }, [existingImages, localImages]);

    return (
        <div className={`w-full ${className}`}>
            {label ? (
                <div className="mb-2">
                    <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {label}
                    </label>
                    {description ? (
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
                    ) : null}
                </div>
            ) : null}

            <div
                role="button"
                tabIndex={0}
                aria-disabled={disabled}
                onClick={openFilePicker}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        openFilePicker();
                    }
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={[
                    'cursor-pointer rounded-2xl border-2 border-dashed p-5 transition',
                    'bg-white dark:bg-slate-900',
                    isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' : 'border-slate-300 dark:border-slate-700',
                    disabled ? 'opacity-60 cursor-not-allowed' : '',
                ].join(' ')}
            >
                <input
                    ref={inputRef}
                    type="file"
                    hidden
                    multiple={multiple}
                    accept={acceptAttribute}
                    onChange={handleInputChange}
                    disabled={disabled}
                />

                <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                        ⬆
                    </div>

                    <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                            {isLimitReached ? `Đã đủ ${maxFiles} ảnh` : 'Nhấn để chọn ảnh hoặc kéo thả vào đây'}
                        </p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {helperText} Tối đa {formatFileSize(maxSizeBytes)} / ảnh.
                        </p>
                    </div>
                </div>
            </div>

            {error ? (
                <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">
                    {error}
                </p>
            ) : null}

            {renderItems.length > 0 ? (
                <div className="mt-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                            Danh sách ảnh ({renderItems.length})
                        </p>

                        <button
                            type="button"
                            onClick={clearAllLocalImages}
                            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                        >
                            Xóa ảnh mới
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                        {renderItems.map((item) => {
                            const isPrimary = primaryImageId ? primaryImageId === item.id : false;

                            return (
                                <div
                                    key={item.id}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div className="relative aspect-square bg-slate-100 dark:bg-slate-800">
                                        <img
                                            src={item.src}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                        />

                                        {isPrimary ? (
                                            <span className="absolute left-2 top-2 rounded-full bg-emerald-600 px-2 py-1 text-[11px] font-semibold text-white">
                                                Ảnh chính
                                            </span>
                                        ) : null}
                                    </div>

                                    <div className="space-y-2 p-3">
                                        <div>
                                            <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                                                {item.name}
                                            </p>

                                            {item.sizeLabel ? (
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    {item.sizeLabel}
                                                </p>
                                            ) : null}
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {onSetPrimaryImage ? (
                                                <button
                                                    type="button"
                                                    onClick={() => onSetPrimaryImage(item.id)}
                                                    className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                                                >
                                                    Đặt làm chính
                                                </button>
                                            ) : null}

                                            {item.type === 'local' ? (
                                                <button
                                                    type="button"
                                                    onClick={() => removeLocalImage(item.id)}
                                                    className="rounded-lg border border-red-300 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/30"
                                                >
                                                    Xóa
                                                </button>
                                            ) : onRemoveExistingImage ? (
                                                <button
                                                    type="button"
                                                    onClick={() => onRemoveExistingImage(item.id)}
                                                    className="rounded-lg border border-red-300 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/30"
                                                >
                                                    Xóa đã lưu
                                                </button>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : null}

            {existingImages.length === 0 && localImages.length === 0 ? (
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                    Chưa có ảnh nào được chọn.
                </p>
            ) : null}
        </div>
    );
}
