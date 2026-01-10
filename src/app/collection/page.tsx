'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useCheckIsAuth from '@/hooks/useCheckIsAuth';

export default function CollectionPage() {
  const nextRouter = useRouter();
  const { isAuthenticated } = useCheckIsAuth();

  useEffect(() => {
    if (isAuthenticated === false) {
      nextRouter.push('/login');
      return;
    } else {
      nextRouter.push('/collection/cards');
    }
  }, [isAuthenticated]);
  
  return (
    <></>
  )
}