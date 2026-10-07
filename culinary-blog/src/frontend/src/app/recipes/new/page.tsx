import Link from 'next/link';
import { CreateRecipeWizard } from './CreateRecipeWizard';
import { Navbar } from '../../../components/layout/Navbar';

export default function CreateRecipePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors"
          >
            <span>←</span> Quay lại Trang Chủ
          </Link>
          <div className="mt-4">
            <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-100 text-amber-800 rounded-full">
              Lab 4 • FR-FTE-009 & FR-FTE-010
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2 tracking-tight">
              Tạo Công Thức Nấu Ăn Mới
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              Điền đầy đủ các bước bên dưới để tạo bản nháp hoặc xuất bản món ăn của bạn lên nền tảng Culinary Blog.
            </p>
          </div>
        </div>

        <CreateRecipeWizard />
      </main>
    </div>
  );
}