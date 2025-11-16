'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useCheckIsAuth from '@/hooks/useCheckIsAuth';
import NavDrawer from '@/components/NavDrawer';

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
    <section className="flex justify-between items-start gap-5 min-h-screen">
      <NavDrawer />
      <div></div>
    </section>
  )
}