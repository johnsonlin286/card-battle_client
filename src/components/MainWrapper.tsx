'use client';

import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { NO_HEADER_ROUTES } from "@/utils/constant";
import Navbar from '@/components/Navbar'
import NavDrawer from '@/components/NavDrawer'
import Toaster from '@/components/Toast'

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isNoHeaderRoute = NO_HEADER_ROUTES.includes(pathname);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <main className={`${isNoHeaderRoute ? 'pt-0' : 'pt-[90px]'}`}>
        {!isNoHeaderRoute && <Navbar />}
        <section className="flex justify-between items-start">
          <NavDrawer />
          {children}
        </section>
        <Toaster />
      </main>
      <div id="portal" />
    </QueryClientProvider>
  )
}