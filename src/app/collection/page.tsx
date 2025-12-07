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
    }
  }, [isAuthenticated]);

  return (
    <>
      <h1>Collection</h1>
      <p>This is the collection page</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab nisi sed consectetur, sint illo earum nobis perferendis corrupti ut tempore, labore asperiores minus deserunt? Quaerat vero quasi molestias maxime molestiae!</p>
    </>
  )
}