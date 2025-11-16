'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useCheckIsAuth from '@/hooks/useCheckIsAuth';
import Panel from "@/components/Panel";
import FormLogin from "@/components/FormLogin";
import AuthLink from "@/components/AuthLink";

export default function LoginPage() {
  const nextRouter = useRouter();
  const { isAuthenticated } = useCheckIsAuth();

  useEffect(() => {
    if (isAuthenticated === true) {
      nextRouter.push('/dashboard');
      return;
    }
  }, [isAuthenticated]);

  return (
    <section>
      <div className="container flex justify-center items-center h-screen">
        <Panel className="w-full max-w-md">
          <FormLogin />
          <AuthLink />
        </Panel>
      </div>
    </section>
  )
}