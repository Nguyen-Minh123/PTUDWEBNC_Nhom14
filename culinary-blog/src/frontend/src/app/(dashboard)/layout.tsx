import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
    </div>
  );
}
