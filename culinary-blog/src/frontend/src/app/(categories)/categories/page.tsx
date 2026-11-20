import { Suspense } from 'react';
import Loading from './loading';
import CategoriesPageClient from '@/components/categories/CategoriesPageClient';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CategoriesPageClient />
    </Suspense>
  );
}
