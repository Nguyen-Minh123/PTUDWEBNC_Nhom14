import { QueryClient } from '@tanstack/react-query';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 phút cache dữ liệu tươi
        gcTime: 5 * 60 * 1000, // 5 phút lưu trữ bộ nhớ
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Phía Server: luôn tạo mới một instance QueryClient cho mỗi request
    return makeQueryClient();
  } else {
    // Phía Client: giữ lại instance để tránh khởi tạo lại khi render
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
