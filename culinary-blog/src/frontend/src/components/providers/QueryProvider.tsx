'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface QueryProviderProps {
  children: React.ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // Dữ liệu coi là fresh trong 1 phút
            gcTime: 5 * 60 * 1000, // Giữ trong cache 5 phút
            retry: 1, // Thử lại tối đa 1 lần nếu lỗi mạng
            refetchOnWindowFocus: false, // Tránh re-fetch phiền toái khi focus lại tab
          },
          mutations: {
            retry: 0, // Không tự động retry mutations tránh gửi trùng dữ liệu
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
