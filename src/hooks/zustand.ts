import { create } from "zustand";

type AuthType = {
  user: boolean;
  logout: () => void;
  login: () => void;
};

type SidebarState = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

export const useAuth = create<AuthType>((set) => ({
  user: false,
  logout: () => set(() => ({ user: false })),
  login: () => set(() => ({ user: true })),
}));

import { useSyncExternalStore } from "react";

export function useScreen() {
  const isMobile = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      callback();
      window.addEventListener("resize", callback);
      return () => window.removeEventListener("resize", callback);
    },
    () => {
      if (typeof window === "undefined") return true;
      return window.innerWidth <= 1200;
    },
    () => true
  );
  return { isMobile };
}

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: false,
  setOpen: (open: boolean) => set({ isOpen: open }),
}));
