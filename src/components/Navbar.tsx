'use client';

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { QUERY_KEYS } from "@/utils/constant";
import { useAccountStore } from "@/store/account";
import { fetchAccountData } from "@/services/user";
import useCheckIsAuth from "@/hooks/useCheckIsAuth";
import useLogout from "@/hooks/useLogout";
import Button from "./Button";

export default function Navbar() {
  const { account, setAccount } = useAccountStore();
  const { isAuthenticated } = useCheckIsAuth();
  const { logoutAsync, isLoggingOut } = useLogout();

  const { data: accountData, isLoading: isLoadingAccount } = useQuery({
    queryKey: [QUERY_KEYS.ACCOUNT],
    queryFn: fetchAccountData,
    enabled: isAuthenticated === true && !account,
  })

  useEffect(() => {
    if (accountData) {
      setAccount(accountData);
    }
  }, [accountData]);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container flex justify-between items-center mx-auto px-4 py-5">
        <h1 className="text-2xl font-bold">Navbar</h1>
        <ul className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <li>
                <Button type="button" color="primary" disabled={isLoggingOut} onClick={logoutAsync}>
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <li>
              <Button type="link" color="primary" block href="/login">Login or Register</Button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}