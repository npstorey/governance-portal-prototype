import React, { useEffect } from 'react';
import { UserTable } from '../components/admin/UserTable';
import { useUsersStore } from '../store/users';

export function UserManagement() {
  const { users, fetchUsers, updateUserRole, deleteUser } = useUsersStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
      </div>

      <div className="bg-white shadow rounded-lg">
        <UserTable
          users={users}
          onUpdateRole={updateUserRole}
          onDeleteUser={deleteUser}
        />
      </div>
    </div>
  );
}