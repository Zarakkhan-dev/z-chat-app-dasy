import { create } from "zustand";

export const useThemeStore = create((set: any) => ({
  theme: localStorage.getItem("app-theme") || "coffee",
  setTheme: (theme: string) => {
    localStorage.setItem("app-theme", theme);
    set({ theme });
  },
}));
