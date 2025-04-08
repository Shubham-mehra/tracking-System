import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/authStore';

export default function DashboardPage() {
  const { role } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
debugger
    if (!token || role !== 'admin') {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [role]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">📦 Admin Dashboard</h1>
    </div>
  );
}
