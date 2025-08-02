import { create } from "zustand";

type AuthType = {
  user: boolean;
  logout: () => void;
  login: () => void;
};

export const useAuth = create<AuthType>((set) => ({
  user: false,
  logout: () => set(() => ({ user: false })),
  login: () => set(() => ({ user: true })),
}));

export const useTimetable = create((set) => ({
  data: {},
  setData: (info: object) => set(() => ({ data: info })),
}));
