import React from 'react';
import { Search, Filter } from 'lucide-react';

interface PolicyFiltersProps {
  filters: {
    search: string;
    category: string;
    status: string;
    department: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

export function PolicyFilters({ filters, onFilterChange }: PolicyFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search policies..."
              className="pl-10 w-full border-gray-300 rounded-md shadow-sm"
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
            />
          </div>
        </div>

        <div>
          <select
            className="w-full border-gray-300 rounded-md shadow-sm"
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="data-sharing">Data Sharing</option>
            <option value="privacy">Privacy</option>
            <option value="security">Security</option>
            <option value="compliance">Compliance</option>
          </select>
        </div>

        <div>
          <select
            className="w-full border-gray-300 rounded-md shadow-sm"
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        <div>
          <select
            className="w-full border-gray-300 rounded-md shadow-sm"
            value={filters.department}
            onChange={(e) => onFilterChange('department', e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="IT">IT</option>
            <option value="Legal">Legal</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
      </div>
    </div>
  );
}