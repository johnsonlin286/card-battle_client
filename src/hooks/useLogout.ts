'use client';

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { MUTATION_KEYS } from "@/utils/constant";
import { logoutUser } from "@/services/user";
import { useAccountStore } from "@/store/account";
import { useToastStore } from "@/store/toast";

export default function useLogout() {
  const nextRouter = useRouter();
  const { clearIsAuthenticated, clearAccount } = useAccountStore();
  const { addToast } = useToastStore();

  const clearAuthData = () => {
    clearIsAuthenticated();
    clearAccount();
    Cookies.remove('cardBattleToken');
    Cookies.remove('cardBattleRefreshToken');
  }

  const { mutateAsync: logoutAsync, isPending: isLoggingOut } = useMutation({
    mutationKey: [MUTATION_KEYS.LOGOUT],
    mutationFn: logoutUser,
    onSuccess: () => {
      clearAuthData();
      addToast({
        message: 'Logged out successfully',
        variant: 'success',
      });
      nextRouter.push('/login');
    },
    onError: (error: any) => {
      clearAuthData();
      addToast({
        message: `Logout failed. ${error.message}`,
        variant: 'error',
      });
      nextRouter.push('/login');
    },
  })

  return {
    logoutAsync,
    isLoggingOut,
    clearAuthData,
  };
}