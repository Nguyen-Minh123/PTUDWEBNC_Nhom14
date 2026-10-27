/**
 * Chức năng:
 * - Hiển thị trang danh sách Category.
 * - Render CategoryGrid trong layout đã có Sidebar.
 * - Dùng dữ liệu mẫu để dựng giao diện tĩnh trước khi nối API.
 */
import { Suspense } from 'react';
import Loading from './loading';
import type { CategoryDto } from '@/types/category.dto';
import CategoriesPageClient from '@/components/categories/CategoriesPageClient';

/**
 * Dữ liệu mẫu cho giao diện tĩnh.
 * Khi tích hợp thật, thay bằng dữ liệu từ API hoặc React Query.
 */

const categories: CategoryDto[] = [
    {
        id: 'mon-viet',
        name: 'Món Việt',
        slug: 'mon-viet',
        description: 'Nhóm món ăn truyền thống, gần gũi và phù hợp khẩu vị hàng ngày.',
        orderIndex: 1,
        recipeCount: 42,
    },
    {
        id: 'mon-a',
        name: 'Món Á',
        slug: 'mon-a',
        description: 'Các công thức châu Á với hương vị đậm đà, đa dạng nguyên liệu.',
        orderIndex: 2,
        recipeCount: 31,
    },
    {
        id: 'mon-au',
        name: 'Món Âu',
        slug: 'mon-au',
        description: 'Những món Âu tinh giản, đẹp mắt và phù hợp bữa tối hiện đại.',
        orderIndex: 3,
        recipeCount: 24,
    },
    {
        id: 'mon-chay',
        name: 'Món Chay',
        slug: 'mon-chay',
        description: 'Lựa chọn lành mạnh, nhẹ nhàng, phù hợp chế độ ăn cân bằng.',
        orderIndex: 4,
        recipeCount: 18,
    },
    {
        id: 'trang-mieng',
        name: 'Tráng miệng',
        slug: 'trang-mieng',
        description: 'Những món ngọt để kết thúc bữa ăn bằng một trải nghiệm mềm mại.',
        orderIndex: 5,
        recipeCount: 16,
    },
    {
        id: 'do-uong',
        name: 'Đồ uống',
        slug: 'do-uong',
        description: 'Công thức nước ép, trà, cà phê và đồ uống giải nhiệt.',
        orderIndex: 6,
        recipeCount: 20,
    },
];

/**
 * Trang danh sách Category.
 */
export default function Page() {

    return (
        <Suspense fallback={<Loading />}>
            <CategoriesPageClient />
        </Suspense>
    );
}