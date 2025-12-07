import { create } from 'zustand';

interface DrawerStore {
  isOpen: boolean;
  toggleDrawer: () => void;
}

export const useDrawerStore = create<DrawerStore>((set) => ({
  isOpen: false,
  toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
}));