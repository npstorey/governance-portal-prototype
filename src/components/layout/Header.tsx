import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/auth';

export function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-[#1e40af] text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button className="lg:hidden p-2">
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="text-xl font-bold ml-2">
              Data Governance Portal
            </Link>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-sm">{user.name}</span>
              <button
                onClick={() => logout()}
                className="p-2 hover:bg-[#1e3a8a] rounded-full"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}