import Link from 'next/link';
import { CreateRecipeBasicsForm } from './CreateRecipeBasicsForm';

export default function CreateRecipePage() {
  return (
    <main className="min-h-screen bg-amber-50/40 px-4 py-8 text-gray-900 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-800"
        >
          <span aria-hidden="true">←</span>
          Về trang chủ
        </Link>
        <header className="mb-8 mt-8">
          <p className="text-sm font-semibold text-amber-700">Tạo công thức · Bước 1</p>
          <h1 className="mt-2 text-3xl font-bold">Thông tin cơ bản</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            Nhập tên món, mô tả và thông tin chuẩn bị để bắt đầu công thức.
          </p>
        </header>
        <CreateRecipeBasicsForm />
      </div>
    </main>
  );
}