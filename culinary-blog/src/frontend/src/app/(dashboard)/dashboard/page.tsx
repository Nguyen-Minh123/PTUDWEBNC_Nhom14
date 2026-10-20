/**
 * Chức năng:
 * - Entry point của route /dashboard.
 * - Bọc DashboardPage bằng Suspense.
 * - Hiển thị fallback trong lúc component con khởi tạo.
 */

import { Suspense } from 'react';
import DashboardPage from './DashboardPage';
import LoadingState from '@/components/dashboard/LoadingState';

export default function Page() {
  return (
    <Suspense
      fallback={
        <LoadingState
          fullScreen
          message="Đang tải Dashboard..."
          rows={5}
        />
      }
    >
      <DashboardPage />
    </Suspense>
  );
}