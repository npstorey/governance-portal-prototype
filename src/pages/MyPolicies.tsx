import React, { useEffect } from 'react';
import { useAgreementsStore } from '../store/agreements';
import { useAuthStore } from '../store/auth';
import { AgreementCard } from '../components/policies/AgreementCard';
import { useUsersStore } from '../store/users';

export function MyPolicies() {
  const { agreements, attestations, fetchAgreements, fetchAttestations, attestAgreement } = useAgreementsStore();
  const { users, fetchUsers } = useUsersStore();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    fetchAgreements();
    fetchAttestations();
    fetchUsers();
  }, [fetchAgreements, fetchAttestations, fetchUsers]);

  // Filter agreements assigned to the current user
  const assignedAgreements = agreements.filter((agreement) =>
    agreement.assignedUserIds?.includes(user?.id || '')
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Policies</h1>
      </div>
      {assignedAgreements.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <p className="text-gray-500">You don't have any policies assigned to you.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {assignedAgreements.map((agreement) => {
            const attestation = attestations.find(
              (a) => a.agreementId === agreement.id && a.userId === user?.id
            );
            const isNew = !attestation && agreement.status === 'active';
            
            return (
              <AgreementCard
                key={agreement.id}
                agreement={agreement}
                attestation={attestation}
                onAttest={!attestation ? attestAgreement : undefined}
                assignedUsers={users.filter((u) => 
                  agreement.assignedUserIds?.includes(u.id)
                )}
                isNew={isNew}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}