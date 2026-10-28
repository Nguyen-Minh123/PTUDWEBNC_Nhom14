import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Hồ sơ cá nhân | Culinary Blog',
  description:
    'Quản lý thông tin tài khoản cá nhân, xem và cập nhật danh sách các công thức nấu ăn đặc sắc của bạn trên Culinary Blog.',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
