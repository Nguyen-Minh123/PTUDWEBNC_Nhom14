/**
 * Chức năng:
 * - UI loading mặc định của route /dashboard.
 * - Hiển thị khi Next.js đang stream hoặc chuẩn bị render trang.
 */

import LoadingState from '@/components/dashboard/LoadingState';

export default function Loading() {
  return (
    <LoadingState
      fullScreen
      message="Đang tải Dashboard..."
      rows={5}
    />
  );
}