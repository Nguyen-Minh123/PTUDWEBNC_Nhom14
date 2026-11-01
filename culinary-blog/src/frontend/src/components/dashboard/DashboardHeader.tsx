
'use client';

/**
 * ============================================================================
 * File: DashboardHeader.tsx
 * Đường dẫn:
 * src/components/dashboard/DashboardHeader.tsx
 *
 * Chức năng:
 * - Hiển thị banner chào mừng của Dashboard.
 * - Hiển thị avatar người dùng.
 * - Hiển thị tên đầu bếp.
 * - Hiển thị bio.
 * - Hiển thị badge Dashboard.
 * - Hiển thị nút tạo công thức mới.
 *
 * Ghi chú:
 * - Component chỉ hiển thị giao diện.
 * - Không chứa API.
 * - Không chứa useEffect.
 * - Không chứa business logic.
 * ============================================================================
 */

import Link from 'next/link';

export interface DashboardHeaderProps {

    /**
     * Tên hiển thị của người dùng.
     */
    displayName: string;

    /**
     * Tiểu sử.
     */
    bio?: string;

    /**
     * Đường dẫn ảnh đại diện.
     */
    avatarUrl?: string;

    /**
     * Hiển thị tên fallback nếu chưa có Display Name.
     */
    fallbackName?: string;

    /**
     * Có hiển thị nút tạo công thức hay không.
     */
    showCreateButton?: boolean;
}

/**
 * ============================================================================
 * Dashboard Header
 * ============================================================================
 */
export default function DashboardHeader({

    displayName,

    bio,

    avatarUrl,

    fallbackName = 'Đầu bếp Culinary',

    showCreateButton = true,

}: DashboardHeaderProps) {

    /**
     * Tên cuối cùng hiển thị.
     */
    const userName =
        displayName.trim() !== ''
            ? displayName
            : fallbackName;

    /**
     * Bio cuối cùng hiển thị.
     */
    const userBio =
        bio && bio.trim() !== ''
            ? bio
            : 'Quản lý các công thức sáng tạo và cập nhật hồ sơ cá nhân của bạn.';

    /**
     * Ký tự đầu của tên để làm Avatar mặc định.
     */
    const avatarLetter =
        userName.charAt(0).toUpperCase();

    return (

        <section
            className="
                bg-gradient-to-r
                from-amber-600
                via-orange-600
                to-amber-700

                rounded-2xl

                p-6
                sm:p-8

                shadow-xl
                shadow-amber-900/10

                mb-8

                flex
                flex-col
                sm:flex-row

                justify-between

                items-start
                sm:items-center

                gap-6">

            {/* ============================================================
                 Khối Avatar + Thông tin
               ============================================================ */}

            <div
                className="
                    flex
                    items-center
                    gap-4">

                {/* Avatar */}

                <div
                    className="
                        w-16
                        h-16

                        rounded-full

                        overflow-hidden

                        border-2
                        border-white/40

                        bg-white/20

                        flex
                        items-center
                        justify-center

                        text-2xl
                        font-black

                        text-white">

                    {
                        avatarUrl
                            ? (

                                // Hiển thị ảnh đại diện nếu có.

                                // eslint-disable-next-line @next/next/no-img-element
                                <img

                                    src={avatarUrl}

                                    alt="Avatar"

                                    className="
                                        w-full
                                        h-full
                                        object-cover"

                                />

                            )

                            : (

                                // Nếu chưa có Avatar
                                // hiển thị chữ cái đầu.

                                avatarLetter

                            )
                    }

                </div>

                {/* Thông tin */}

                <div>

                    {/* Badge */}

                    <span
                        className="
                            inline-block

                            px-2
                            py-0.5

                            rounded-full

                            bg-amber-500/40

                            text-[10px]

                            font-bold

                            uppercase

                            tracking-wider

                            text-white">

                        Bảng điều khiển tác giả • Lab 4 (FR-FTE-008)

                    </span>

                    {/* Tiêu đề */}

                    <h1
                        className="
                            text-xl
                            sm:text-2xl

                            font-black

                            tracking-tight

                            text-white

                            mt-1">

                        Xin chào, {userName} 👋

                    </h1>

                    {/* Bio */}

                    <p
                        className="
                            text-xs

                            text-amber-100

                            mt-1

                            max-w-xl

                            line-clamp-2">

                        {userBio}

                    </p>

                </div>

            </div>

            {/* ============================================================
                 Nút tạo công thức
               ============================================================ */}

            {
                showCreateButton && (

                    <Link

                        href="/recipes/new"

                        className="
                            inline-flex

                            items-center

                            gap-2

                            px-4
                            py-2.5

                            rounded-xl

                            bg-white

                            text-amber-900

                            text-xs

                            font-bold

                            hover:bg-amber-50

                            transition-all

                            shadow-md

                            shrink-0">

                        <span>

                            ✍️

                        </span>

                        Tạo Công Thức Mới

                    </Link>

                )
            }

        </section>

    );

}
