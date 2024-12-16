import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const defaultUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'staff',
  department: 'IT',
  lastLogin: new Date().toISOString(),
};

const adminUser: User = {
  id: '2',
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  role: 'admin',
  department: 'IT',
  lastLogin: new Date().toISOString(),
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {
    // If email contains 'admin', use admin user, otherwise use default user
    const user = credentials.email.includes('admin') ? adminUser : defaultUser;
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));