import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AccountStore {
  isAuthenticated: boolean | null;
  account: AccountType | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  clearIsAuthenticated: () => void;
  setAccount: (account: AccountType) => void;
  clearAccount: () => void;
}

export const useAccountStore = create<AccountStore>()(
  persist(
    (set) => ({
      isAuthenticated: null,
      account: null,
      setIsAuthenticated: () => set({ isAuthenticated: true }),
      clearIsAuthenticated: () => set({ isAuthenticated: false }),
      setAccount: (account) => set({ account }),
      clearAccount: () => set({ account: null, isAuthenticated: false }),
    }),
    {
      name: "card-battle-account",
      storage: createJSONStorage(() => localStorage),
    }
  )
)