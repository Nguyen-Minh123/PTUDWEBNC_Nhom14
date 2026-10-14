import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-stone-50 to-stone-100 flex flex-col justify-between">
      <Header variant="auth" />

      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      <Footer variant="compact" />
    </div>
  );
}
