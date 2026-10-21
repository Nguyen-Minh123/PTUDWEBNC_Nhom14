import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50 text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      {/* 1. Header Navigation Bar */}
      <Header />

      {/* 2. Main Page Content Shell */}
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>

      {/* 3. Global Footer */}
      <Footer variant="main" />
    </div>
  );
}
