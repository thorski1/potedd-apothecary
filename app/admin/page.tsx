import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Breadcrumbs } from '@/components/breadcrumbs';

const AdminDashboard = dynamic(() => import('@/components/AdminDashboard'), {
  loading: () => <Skeleton className="w-full h-96" />,
});

export default function AdminPage() {
  return (
    <Suspense fallback={<Skeleton className="w-full h-96" />}>
      <div className="container mx-auto px-4 py-8">
        <AdminDashboard />
      </div>
    </Suspense>
  );
}