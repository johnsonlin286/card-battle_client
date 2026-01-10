'use client';

import { BookImageIcon, LayoutDashboardIcon, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import Link from 'next/link';

import { useDrawerStore } from '@/store/drawer';
import useCheckIsAuth from '@/hooks/useCheckIsAuth';

export default function NavDrawer() {
  const { isAuthenticated } = useCheckIsAuth();
  const { isOpen, toggleDrawer } = useDrawerStore();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={`w-full h-[calc(100vh-90px)] transition-all duration-300 ${isOpen ? 'max-w-60' : 'max-w-14'} bg-white shadow-sm shadow-zinc-300`}>
      <ul className="flex flex-col gap-5 py-4">
        <li className="w-full flex justify-end items-center">
          <button type="button" onClick={toggleDrawer} className="w-full flex justify-end items-center gap-2 cursor-pointer hover:bg-gray-100 py-2 px-4 rounded-md transition-all duration-300">
            {isOpen && <span>Close</span>}
            {isOpen ? <PanelLeftClose className="inline-block w-6 h-6" /> : <PanelLeftOpen className="inline-block w-6 h-6" />}
          </button>
        </li>
        <li className="w-full flex justify-start items-center overflow-hidden">
          <Link href="/dashboard" className="flex items-center gap-2 w-2xs hover:bg-gray-100 py-2 px-4">
            <LayoutDashboardIcon className="inline-block w-6 h-6" />
            <span className={`transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Dashboard</span>
          </Link>
        </li>
        <li className="w-full flex justify-start items-center overflow-hidden">
          <Link href="/collection/cards" className="flex items-center gap-2 w-2xs hover:bg-gray-100 py-2 px-4">
            <BookImageIcon className="inline-block w-6 h-6" />
            <span className={`transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Collection</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}