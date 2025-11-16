'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';

import { useAccountStore } from '@/store/account';
import useLogout from "@/hooks/useLogout";

export default function useCheckIsAuth() {
  const { clearAuthData } = useLogout();
  const { isAuthenticated, setIsAuthenticated, clearAccount } = useAccountStore();

  useEffect(() => {
    const token = Cookies.get('cardBattleToken');
    if (!token) {
      setIsAuthenticated(false);
      clearAccount();
      clearAuthData();
      return;
    }
    setIsAuthenticated(true);
  }, []);

  return { isAuthenticated };
}