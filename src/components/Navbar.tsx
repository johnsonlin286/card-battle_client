'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Cookies from "js-cookie";

import { QUERY_KEYS } from "@/utils/constant";
import { useAccountStore } from "@/store/account";
import { fetchAccountData } from "@/services/user";
import useLogout from "@/hooks/useLogout";
import Button from "./Button";

export default function Navbar() {
  const { isAuthenticated, setIsAuthenticated, account, setAccount } = useAccountStore();
  const { logoutAsync, isLoggingOut, clearAuthData } = useLogout();

  useEffect(() => {
    const token = Cookies.get('cardBattleToken');
    if (!token) {
      setIsAuthenticated(false);
      clearAuthData();
      return;
    }
    setIsAuthenticated(true);
  }, []);

  const { data: accountData, isLoading: isLoadingAccount } = useQuery({
    queryKey: [QUERY_KEYS.ACCOUNT],
    queryFn: fetchAccountData,
    enabled: isAuthenticated && !account,
  })

  useEffect(() => {
    if (accountData) {
      setAccount(accountData);
    }
  }, [accountData]);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container flex justify-between items-center mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold">Navbar</h1>
        <ul className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Button type="button" color="primary" disabled={isLoggingOut} onClick={logoutAsync}>
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}