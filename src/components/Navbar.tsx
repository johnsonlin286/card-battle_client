'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCartIcon } from "lucide-react";

import { QUERY_KEYS } from "@/utils/constant";
import { useAccountStore } from "@/store/account";
import { fetchAccountData } from "@/services/user";
import useCheckIsAuth from "@/hooks/useCheckIsAuth";
import useLogout from "@/hooks/useLogout";
import Button from "./Button";

export default function Navbar() {
  const pathname = usePathname();
  const isShopRoute = pathname === '/shop';
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
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm shadow-zinc-300 z-50">
      <div className="container flex justify-between items-center mx-auto px-4 py-5">
        <h1 className="text-2xl font-bold">Navbar</h1>
        <ul className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {!isShopRoute && (
                <li>
                  <Button type="link" color="success" disabled={isLoggingOut} href="/shop">
                    <ShoppingCartIcon className="relative inline-block size-4 -top-0.5 mr-2" />
                    Shop
                  </Button>
                </li>
              )}
              <li>
                <Button type="button" color="none" disabled={isLoggingOut} onClick={logoutAsync}>
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