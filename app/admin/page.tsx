import { cookies } from 'next/headers';
import AdminLogin from '@/components/AdminLogin';
import AdminDashboard from '@/components/AdminDashboard';

export default function AdminPage() {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('admin_authenticated');

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}