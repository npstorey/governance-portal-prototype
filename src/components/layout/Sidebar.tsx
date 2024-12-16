import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileText, User, Settings, Users } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import clsx from 'clsx';

export function Sidebar() {
  const { user } = useAuthStore();

  const navigation = [
    { name: 'Policies', href: '/policies', icon: FileText },
    { name: 'My Policies', href: '/my-policies', icon: User },
    ...(user?.role === 'admin'
      ? [
          { name: 'Admin Dashboard', href: '/admin', icon: Settings },
          { name: 'User Management', href: '/admin/users', icon: Users },
        ]
      : []),
  ];

  return (
    <nav className="bg-gray-50 w-64 min-h-screen border-r border-gray-200">
      <div className="p-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              clsx(
                'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium',
                isActive
                  ? 'bg-[#1e40af] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}