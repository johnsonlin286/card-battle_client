'use client';

import Panel from "@/components/Panel";
import FormRegister from "@/components/FormRegister";
import AuthLink from "@/components/AuthLink";

export default function RegisterPage() {
  return (
    <section>
      <div className="container flex justify-center items-center h-screen">
        <Panel className="w-full max-w-2xl">
          <FormRegister />
          <AuthLink />
        </Panel>
      </div>
    </section>
  )
}