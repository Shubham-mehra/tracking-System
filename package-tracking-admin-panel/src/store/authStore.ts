
import { create } from 'zustand';

type Role = 'admin' | 'user' | null;

interface AuthState {
  token: string | null;
  role: Role;
  login: (token: string, role: Role) => void;
  logout: () => void;
  setRole: (role: Role) => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,
  login: (token, role) => {
    localStorage.setItem('token', token ?? '');
    localStorage.setItem('role', role ?? ''); // Convert null to empty string
    
    set({ token, role });
  },  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    set({ token: null, role: null });
  },
  setRole: (role) => set((state) => ({ ...state, role })),
  hydrate: () => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    const role = storedRole === 'admin' || storedRole === 'user' ? storedRole : null;
    if (token && role) {
      set({ token, role });
    }
  },
  
}));

