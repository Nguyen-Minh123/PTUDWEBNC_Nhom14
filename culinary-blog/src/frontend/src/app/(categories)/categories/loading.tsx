/**
 * Chức năng:
 * - Hiển thị trạng thái loading cho trang /categories.
 * - Dùng khi Next.js đang stream dữ liệu hoặc chờ render.
 * - Giúp giao diện không bị trống trong lúc tải.
 */

export default function Loading() {
    return (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6">
                {/* Sidebar skeleton */}
                <aside className="col-span-12 lg:col-span-3">
                    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
                        <div className="mt-4 space-y-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-10 animate-pulse rounded-lg bg-gray-100"
                                />
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Content skeleton */}
                <section className="col-span-12 lg:col-span-9">
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
                        <div className="mt-3 h-4 w-full max-w-2xl animate-pulse rounded bg-gray-100" />

                        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                                >
                                    <div className="h-40 animate-pulse bg-gray-200" />
                                    <div className="p-5 space-y-3">
                                        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
                                        <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                                        <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}