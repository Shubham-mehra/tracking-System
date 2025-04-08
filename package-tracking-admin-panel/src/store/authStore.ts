// /store/authStore.ts
import { create } from 'zustand';

type Role = 'admin' | 'user' | null;

interface AuthState {
  token: string | null;
  role: Role;
  login: (token: string, role: Role) => void;
  logout: () => void;
  setRole: (role: Role) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,
  login: (token, role) => set({ token, role }),
  logout: () => set({ token: null, role: null }),
  setRole: (role) => set((state) => ({ ...state, role })),
}));
