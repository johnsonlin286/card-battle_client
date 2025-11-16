import { useState } from 'react';
import { BookImageIcon, LayoutDashboardIcon, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import Link from 'next/link';

export default function NavDrawer() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`fixed top-20 left-0 w-full h-full transition-all duration-300 ${isOpen ? 'max-w-2xs' : 'max-w-14'} bg-white shadow-md`}>
      <ul className="flex flex-col gap-5 py-4">
        <li className="w-full flex justify-end items-center">
          <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 cursor-pointer px-4">
            {isOpen && <span>Close</span>}
            {isOpen ? <PanelLeftClose className="inline-block w-6 h-6" /> : <PanelLeftOpen className="inline-block w-6 h-6" />}
          </button>
        </li>
        <li className="w-full flex justify-start items-center">
          <Link href="/dashboard" className="flex items-center gap-2 w-2xs hover:bg-gray-100 py-2 px-4">
            <LayoutDashboardIcon className="inline-block w-6 h-6" />
            <span className={`${isOpen ? 'inline-block' : 'hidden'}`}>Dashboard</span>
          </Link>
        </li>
        <li className="w-full flex justify-start items-center">
          <Link href="/dashboard" className="flex items-center gap-2 w-2xs hover:bg-gray-100 py-2 px-4">
            <BookImageIcon className="inline-block w-6 h-6" />
            <span className={`${isOpen ? 'inline-block' : 'hidden'}`}>Collections</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}