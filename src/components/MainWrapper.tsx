'use client';

import { usePathname } from "next/navigation";
import { NO_HEADER_ROUTES } from "@/utils/constant";

import Navbar from '@/components/Navbar'
import NavDrawer from '@/components/NavDrawer'
import Toaster from '@/components/Toast'

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isNoHeaderRoute = NO_HEADER_ROUTES.includes(pathname);

  return (
    <main className={`${isNoHeaderRoute ? 'pt-0' : 'pt-[90px]'}`}>
      {!isNoHeaderRoute && <Navbar />}
      <section className="flex justify-between items-start">
        <NavDrawer />
        <div className="container px-5">
          {children}
        </div>
      </section>
      <Toaster />
    </main>
  )
}