'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function DashboardPage() {
  const nextRouter = useRouter();

  useEffect(() => {
    const token = Cookies.get('cardBattleToken');
    if (!token) {
      nextRouter.push('/login');
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}