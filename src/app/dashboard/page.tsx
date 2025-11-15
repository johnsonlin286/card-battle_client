'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { useToastStore } from "@/store/toast";

export default function DashboardPage() {
  const nextRouter = useRouter();
  const { addToast } = useToastStore();

  useEffect(() => {
    const token = Cookies.get('cardBattleToken');
    if (!token) {
      nextRouter.push('/login');
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => addToast({ message: 'Hello, world!', variant: 'success' })} className="bg-blue-500 text-white p-2 rounded-md cursor-pointer">Add Success Toast</button>
      <button onClick={() => addToast({ message: 'Hello, world!', variant: 'error' })} className="bg-red-500 text-white p-2 rounded-md cursor-pointer">Add Error Toast</button>
      <button onClick={() => addToast({ message: 'Hello, world!', variant: 'warning' })} className="bg-yellow-500 text-white p-2 rounded-md cursor-pointer">Add Warning Toast</button>
      <button onClick={() => addToast({ message: 'Hello, world!', variant: 'info' })} className="bg-gray-500 text-white p-2 rounded-md cursor-pointer">Add Info Toast</button>
    </div>
  )
}