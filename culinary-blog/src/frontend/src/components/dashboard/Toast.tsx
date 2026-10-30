'use client';

/**
 * ============================================================================
 * Chức năng:
 * - Hiển thị thông báo nhanh cho Dashboard.
 * - Hỗ trợ các kiểu: success, error, info.
 * - Có nút đóng thủ công.
 * - Có thể tự ẩn sau một khoảng thời gian.
 *
 * Ghi chú:
 * - Component chỉ hiển thị giao diện.
 * - Không gọi API.
 * - Không quản lý state nghiệp vụ.
 * - Dễ tái sử dụng cho nhiều màn hình khác nhau.
 * ============================================================================
 */

import React, { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
    /**
     * Trạng thái hiển thị toast.
     */
    isOpen: boolean;

    /**
     * Nội dung thông báo.
     */
    message: string;

    /**
     * Loại toast để đổi màu giao diện.
     */
    type?: ToastType;

    /**
     * Tiêu đề ngắn của toast.
     */
    title?: string;

    /**
     * Callback khi đóng toast.
     */
    onClose: () => void;

    /**
     * Tự động ẩn toast sau số mili-giây.
     * Nếu không truyền, toast sẽ chỉ đóng bằng nút X.
     */
    autoCloseMs?: number;
}

/**
 * Trả về class theo từng loại toast.
 */
function getToastStyle(type: ToastType): {
    container: string;
    accent: string;
    icon: string;
} {
    if (type === 'success') {
        return {
            container: 'border-emerald-200 bg-emerald-50 text-emerald-900',
            accent: 'bg-emerald-500',
            icon: '✅',
        };
    }

    if (type === 'error') {
        return {
            container: 'border-rose-200 bg-rose-50 text-rose-900',
            accent: 'bg-rose-500',
            icon: '⛔',
        };
    }

    return {
        container: 'border-sky-200 bg-sky-50 text-sky-900',
        accent: 'bg-sky-500',
        icon: 'ℹ️',
    };
}

/**
 * Toast
 * Hiển thị thông báo nổi ở góc màn hình.
 */
export default function Toast({
    isOpen,
    message,
    type = 'info',
    title,
    onClose,
    autoCloseMs,
}: ToastProps) {
    /**
     * Tự động đóng toast nếu có cấu hình thời gian.
     */
    useEffect(() => {
        if (!isOpen || !autoCloseMs) {
            return;
        }

        const timer = window.setTimeout(() => {
            onClose();
        }, autoCloseMs);

        return () => {
            window.clearTimeout(timer);
        };
    }, [isOpen, autoCloseMs, onClose]);

    /**
     * Không hiển thị gì nếu toast chưa mở.
     */
    if (!isOpen) {
        return null;
    }

    const style = getToastStyle(type);

    return (
        <div
            className="
                fixed
                bottom-6
                right-6
                z-50
                w-[min(92vw,22rem)]
                rounded-2xl
                border
                shadow-xl
                backdrop-blur-sm
            "
            role={type === 'error' ? 'alert' : 'status'}
            aria-live={type === 'error' ? 'assertive' : 'polite'}
        >
            <div className={`h-1 w-full rounded-t-2xl ${style.accent}`} />

            <div className={`flex items-start gap-3 p-4 ${style.container} rounded-b-2xl`}>
                {/* Biểu tượng trạng thái */}
                <div className="mt-0.5 text-lg" aria-hidden="true">
                    {style.icon}
                </div>

                {/* Nội dung thông báo */}
                <div className="flex-1 min-w-0">
                    {title && (
                        <p className="text-sm font-bold leading-5">
                            {title}
                        </p>
                    )}

                    <p className="text-sm leading-5 mt-1 break-words">
                        {message}
                    </p>
                </div>

                {/* Nút đóng */}
                <button
                    type="button"
                    onClick={onClose}
                    className="
                        shrink-0
                        rounded-lg
                        px-2
                        py-1
                        text-sm
                        font-bold
                        text-current
                        opacity-70
                        transition
                        hover:opacity-100
                        hover:bg-white/60
                    "
                    aria-label="Đóng thông báo"
                    title="Đóng"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}