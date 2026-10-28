'use client';

/**
 * ============================================================================
 * Chức năng:
 * - Hiển thị trạng thái đang tải cho Dashboard.
 * - Dùng khi chờ dữ liệu từ API hoặc chuyển màn hình.
 * - Có thể dùng cho toàn trang hoặc cho từng khối nội dung.
 *
 * Ghi chú:
 * - Component chỉ hiển thị giao diện.
 * - Không gọi API.
 * - Không quản lý state.
 * - Không chứa business logic.
 * ============================================================================
 */

import React from 'react';

export interface LoadingStateProps {
    /**
     * Nội dung thông báo khi đang tải.
     */
    message?: string;

    /**
     * Số dòng skeleton muốn hiển thị.
     * Mặc định phù hợp cho khung dashboard.
     */
    rows?: number;

    /**
     * Có hiển thị dạng full screen hay không.
     */
    fullScreen?: boolean;
}

/**
 * LoadingState
 * Hiển thị spinner + skeleton đơn giản cho dashboard.
 */
export default function LoadingState({
    message = 'Đang tải dữ liệu...',
    rows = 4,
    fullScreen = false,
}: LoadingStateProps) {
    return (
        <div
            className={[
                'flex flex-col items-center justify-center',
                fullScreen ? 'min-h-screen' : 'py-12',
            ].join(' ')}
        >
            {/* Spinner loading */}
            <div
                className="
                    w-10
                    h-10
                    rounded-full
                    border-4
                    border-amber-200
                    border-t-amber-600
                    animate-spin
                "
                aria-hidden="true"
            />

            {/* Thông báo trạng thái */}
            <p className="mt-4 text-sm font-medium text-gray-500">
                {message}
            </p>

            {/* Skeleton placeholder */}
            <div className="mt-6 w-full max-w-4xl px-4">
                <div className="grid gap-3">
                    {Array.from({ length: rows }).map((_, index) => (
                        <div
                            key={index}
                            className="
                                h-4
                                w-full
                                rounded-full
                                bg-gray-200
                                animate-pulse
                            "
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}