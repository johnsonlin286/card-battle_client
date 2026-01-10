'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useCheckIsAuth from '@/hooks/useCheckIsAuth';
import Panel from "@/components/Panel";
import FormRegister from "@/components/FormRegister";
import AuthLink from "@/components/AuthLink";

export default function RegisterPage() {
  const nextRouter = useRouter();
  const { isAuthenticated } = useCheckIsAuth();

  useEffect(() => {
    if (isAuthenticated === true) {
      nextRouter.push('/dashboard');
      return;
    }
  }, [isAuthenticated]);

  return (
    <section className="container flex justify-center items-center h-dvh">
      <Panel className="w-full max-w-2xl">
        <FormRegister />
        <AuthLink />
      </Panel>
    </section>
  )
}