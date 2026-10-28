/**
 * Chức năng:
 * - Layout dùng chung cho toàn bộ module Categories.
 * - Hiển thị CategorySidebar cố định bên trái.
 * - Bao bọc phần nội dung trang con ở bên phải.
 * - Giữ giao diện đồng nhất cho /categories và các trang liên quan.
 */

import type { ReactNode } from 'react';
import CategorySidebar from '@/components/categories/CategorySidebar';

export default function CategoriesLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6">
                {/* Sidebar danh mục */}
                <aside className="col-span-12 lg:col-span-3">
                    <CategorySidebar />
                </aside>

                {/* Nội dung trang con */}
                <section className="col-span-12 lg:col-span-9">
                    {children}
                </section>
            </div>
        </main>
    );
}