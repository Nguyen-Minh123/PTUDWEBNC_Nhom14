import Link from 'next/link';

type CategoryStatus = 'Popular' | 'New' | 'Classic';

type CategoryCardData = {
    name: string;
    slug: string;
    description: string;
    recipeCount: number;
    featuredRecipe: string;
    image: string;
    label: CategoryStatus;
};

const categories: CategoryCardData[] = [
    {
        name: 'Món Việt',
        slug: 'mon-viet',
        description: 'Nhóm món ăn truyền thống, gần gũi và phù hợp khẩu vị hàng ngày.',
        recipeCount: 42,
        featuredRecipe: 'Phở bò tái',
        image:
            'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80',
        label: 'Popular',
    },
    {
        name: 'Món Á',
        slug: 'mon-a',
        description: 'Các công thức châu Á với hương vị đậm đà, đa dạng nguyên liệu.',
        recipeCount: 31,
        featuredRecipe: 'Ramen trứng',
        image:
            'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
        label: 'Popular',
    },
    {
        name: 'Món Âu',
        slug: 'mon-au',
        description: 'Những món Âu tinh giản, đẹp mắt và phù hợp bữa tối hiện đại.',
        recipeCount: 24,
        featuredRecipe: 'Pasta sốt kem',
        image:
            'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80',
        label: 'Classic',
    },
    {
        name: 'Món Chay',
        slug: 'mon-chay',
        description: 'Lựa chọn lành mạnh, nhẹ nhàng, phù hợp chế độ ăn cân bằng.',
        recipeCount: 18,
        featuredRecipe: 'Salad quinoa',
        image:
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
        label: 'New',
    },
    {
        name: 'Tráng miệng',
        slug: 'trang-mieng',
        description: 'Những món ngọt để kết thúc bữa ăn bằng một trải nghiệm mềm mại.',
        recipeCount: 16,
        featuredRecipe: 'Tiramisu',
        image:
            'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
        label: 'Classic',
    },
    {
        name: 'Đồ uống',
        slug: 'do-uong',
        description: 'Công thức nước ép, trà, cà phê và đồ uống giải nhiệt.',
        recipeCount: 20,
        featuredRecipe: 'Matcha latte',
        image:
            'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80',
        label: 'New',
    },
];

function getLabelClass(label: CategoryStatus): string {
    switch (label) {
        case 'Popular':
            return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200';
        case 'New':
            return 'bg-amber-100 text-amber-700 ring-1 ring-amber-200';
        default:
            return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
    }
}

function CategoryCard({ category }: { category: CategoryCardData }) {
    return (
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            {/* Ảnh danh mục */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />

                {/* Badge */}
                <div className="absolute left-3 top-3">
                    <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${getLabelClass(
                            category.label
                        )}`}
                    >
                        {category.label}
                    </span>
                </div>
            </div>

            {/* Nội dung */}
            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h2 className="text-base font-bold text-slate-900">{category.name}</h2>
                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">
                            {category.description}
                        </p>
                    </div>

                    <div className="shrink-0 rounded-xl bg-amber-50 px-3 py-2 text-center">
                        <p className="text-lg font-black text-amber-700">{category.recipeCount}</p>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600">
                            Recipes
                        </p>
                    </div>
                </div>

                {/* Món nổi bật */}
                <div className="mt-4 rounded-xl bg-slate-50 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Món nổi bật
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-800">{category.featuredRecipe}</p>
                </div>

                {/* Link chi tiết */}
                <Link
                    href={`/categories/${category.slug}`}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700"
                >
                    Xem danh mục
                    <span aria-hidden="true">→</span>
                </Link>
            </div>
        </article>
    );
}

export default function Page() {
    const totalCategories = categories.length;
    const totalRecipes = categories.reduce((sum, category) => sum + category.recipeCount, 0);
    const popularCategories = categories.filter((category) => category.label === 'Popular').length;

    return (
        <main className="min-h-screen bg-stone-50 text-slate-900">
            {/* Hero */}
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Browse Categories
                    </p>
                    <h1 className="mt-2 text-2xl font-black sm:text-3xl">Danh sách tất cả Category</h1>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                        Trang tổng hợp các danh mục công thức theo nhóm món ăn. Giao diện này được thiết kế
                        dạng lưới để người dùng truy cập nhanh vào từng chủ đề nấu ăn.
                    </p>
                </div>
            </section>

            {/* Thống kê */}
            <section className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 lg:grid-cols-3 lg:px-8">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Tổng danh mục</p>
                    <p className="mt-2 text-3xl font-black text-slate-900">{totalCategories}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Tổng công thức</p>
                    <p className="mt-2 text-3xl font-black text-slate-900">{totalRecipes}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Danh mục nổi bật</p>
                    <p className="mt-2 text-3xl font-black text-slate-900">{popularCategories}</p>
                </div>
            </section>

            {/* Grid */}
            <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-slate-900">Khám phá theo danh mục</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Chọn nhóm món ăn để xem nhanh các công thức liên quan.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {categories.map((category) => (
                        <CategoryCard key={category.slug} category={category} />
                    ))}
                </div>
            </section>
        </main>
    );
}