import { create } from "zustand";
import { persist, StorageValue } from "zustand/middleware";

interface AuthState {
  token: string | null;
  email: string | null;
  setToken: (token: string) => void;
  setUser: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      email: null,
      setToken: (token: string) => {
        set({ token });
      },
      setUser: (email: string) => {
        set({ email });
      },
      logout: () => {
        console.log("Logging out");
        set({ token: null, email: null });
      },
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (name: string) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name: string, value: StorageValue<AuthState>) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
