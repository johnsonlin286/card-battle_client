'use client';

import { memo, useState, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';

import BtnTab from "@/components/BtnTab";
interface NavTabProps {
  navItems: {
    label: string;
    value: string;
  }[];
  onTabChange?: (value: string) => void;
}

function NavTab({ navItems, onTabChange }: NavTabProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname.split('/')[2]);

  useEffect(() => {
    setActiveTab(pathname.split('/')[2]);
  }, [pathname]);
  
  return (
    <div className="sticky top-0 z-10">
      <nav className="flex justify-stretch items-center gap-3 bg-white shadow-sm shadow-zinc-300 py-4 px-5">
        {navItems.map((item, index) => (
          <BtnTab key={index} onClick={() => router.push(`/collection/${item.value}`)} isActive={activeTab === item.value}>
            {item.label}
          </BtnTab>
        ))}
      </nav>
    </div>
  );
}

export default memo(NavTab);