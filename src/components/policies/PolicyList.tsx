import React from 'react';
import { AgreementCard } from './AgreementCard';
import type { Agreement, Attestation, User } from '../../types';

interface PolicyListProps {
  agreements: Agreement[];
  attestations: Attestation[];
  users: User[];
  onEditPolicy?: (policy: Agreement) => void;
}

export function PolicyList({ agreements, attestations, users, onEditPolicy }: PolicyListProps) {
  if (agreements.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No policies found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {agreements.map((agreement) => (
        <AgreementCard
          key={agreement.id}
          agreement={agreement}
          attestation={attestations.find((a) => a.agreementId === agreement.id)}
          attestations={attestations}
          assignedUsers={users.filter((user) => 
            agreement.assignedUserIds?.includes(user.id)
          )}
          onEdit={onEditPolicy}
          showStatus={true}
        />
      ))}
    </div>
  );
}