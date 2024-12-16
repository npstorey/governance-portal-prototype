import React, { useEffect } from 'react';
import { DashboardStats } from '../components/admin/DashboardStats';
import { useUsersStore } from '../store/users';
import { useAgreementsStore } from '../store/agreements';

export function AdminDashboard() {
  const { users, fetchUsers } = useUsersStore();
  const { agreements, attestations, fetchAgreements, fetchAttestations } =
    useAgreementsStore();

  useEffect(() => {
    fetchUsers();
    fetchAgreements();
    fetchAttestations();
  }, [fetchUsers, fetchAgreements, fetchAttestations]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      <DashboardStats
        users={users}
        agreements={agreements}
        attestations={attestations}
      />

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-500">
            Activity feed will be implemented in the next iteration.
          </p>
        </div>
      </div>
    </div>
  );
}