import { create } from 'zustand';
import type { User } from '../types';
import { format, subDays } from 'date-fns';

interface UsersState {
  users: User[];
  fetchUsers: () => Promise<void>;
  updateUserRole: (userId: string, role: 'admin' | 'staff') => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
}

const mockUsers: User[] = [
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    department: 'IT',
    lastLogin: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
  },
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'staff',
    department: 'HR',
    lastLogin: format(subDays(new Date(), 3), 'yyyy-MM-dd'),
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'staff',
    department: 'Finance',
    lastLogin: format(subDays(new Date(), 5), 'yyyy-MM-dd'),
  },
];

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  fetchUsers: async () => {
    set({ users: mockUsers });
  },
  updateUserRole: async (userId: string, role: 'admin' | 'staff') => {
    const { users } = get();
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, role } : user
    );
    set({ users: updatedUsers });
  },
  deleteUser: async (userId: string) => {
    const { users } = get();
    set({ users: users.filter((user) => user.id !== userId) });
  },
}));