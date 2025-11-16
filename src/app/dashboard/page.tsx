'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useCheckIsAuth from '@/hooks/useCheckIsAuth';

export default function DashboardPage() {
  const nextRouter = useRouter();
  const { isAuthenticated } = useCheckIsAuth();

  useEffect(() => {
    if (isAuthenticated === false) {
      nextRouter.push('/login');
      return;
    }
  }, [isAuthenticated]);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}