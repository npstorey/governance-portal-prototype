import React, { useEffect, useState } from 'react';
import { useAgreementsStore } from '../store/agreements';
import { useAuthStore } from '../store/auth';
import { useUsersStore } from '../store/users';
import { PolicyList } from '../components/policies/PolicyList';
import { PolicyFilters } from '../components/policies/PolicyFilters';
import { PolicyUploadModal } from '../components/policies/PolicyUploadModal';
import { PolicyEditModal } from '../components/policies/PolicyEditModal';
import { usePolicyFilters } from '../hooks/usePolicyFilters';
import { Plus } from 'lucide-react';
import type { Agreement } from '../types';

export function Policies() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<Agreement | null>(null);
  const { agreements, attestations, fetchAgreements, fetchAttestations, uploadAgreement, updateAgreement } =
    useAgreementsStore();
  const { users, fetchUsers } = useUsersStore();
  const user = useAuthStore((state) => state.user);
  const { filters, filteredAgreements, handleFilterChange } = usePolicyFilters(agreements);

  useEffect(() => {
    fetchAgreements();
    fetchAttestations();
    fetchUsers();
  }, [fetchAgreements, fetchAttestations, fetchUsers]);

  const handleEditPolicy = (policy: Agreement) => {
    setEditingPolicy(policy);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Policies</h1>
        {user?.role === 'admin' && (
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1e40af] hover:bg-[#1e3a8a]"
          >
            <Plus className="h-5 w-5 mr-2" />
            Upload New Policy
          </button>
        )}
      </div>

      <PolicyFilters filters={filters} onFilterChange={handleFilterChange} />
      
      <PolicyList 
        agreements={filteredAgreements} 
        attestations={attestations}
        users={users}
        onEditPolicy={handleEditPolicy}
      />

      <PolicyUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={uploadAgreement}
        users={users}
      />

      {editingPolicy && (
        <PolicyEditModal
          isOpen={!!editingPolicy}
          onClose={() => setEditingPolicy(null)}
          onUpdate={updateAgreement}
          policy={editingPolicy}
          users={users}
        />
      )}
    </div>
  );
}