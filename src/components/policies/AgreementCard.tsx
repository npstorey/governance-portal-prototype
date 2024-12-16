import React from 'react';
import { format } from 'date-fns';
import { FileText, Clock, CheckCircle, Users, Edit } from 'lucide-react';
import type { Agreement, Attestation, User } from '../../types';
import { PolicyAlert } from './PolicyAlert';
import { useAuthStore } from '../../store/auth';

interface AgreementCardProps {
  agreement: Agreement;
  attestation?: Attestation;
  attestations: Attestation[];
  onAttest?: (agreementId: string) => void;
  onEdit?: (agreement: Agreement) => void;
  assignedUsers?: User[];
  isNew?: boolean;
  showStatus?: boolean;
}

export function AgreementCard({
  agreement,
  attestation,
  attestations,
  onAttest,
  onEdit,
  assignedUsers,
  isNew,
  showStatus = false,
}: AgreementCardProps) {
  const user = useAuthStore((state) => state.user);

  const getStatusDisplay = () => {
    if (!showStatus || !assignedUsers) return null;
    
    const allUsersAttested = assignedUsers.every((user) =>
      attestations.some((a) => a.userId === user.id && a.agreementId === agreement.id)
    );

    if (agreement.expiresAt && new Date(agreement.expiresAt) < new Date()) {
      return {
        label: 'Expired',
        className: 'bg-red-100 text-red-800',
      };
    }

    if (allUsersAttested) {
      return {
        label: 'Active, All Users Attested',
        className: 'bg-green-100 text-green-800',
      };
    }

    return {
      label: 'Active, Pending Attestations',
      className: 'bg-yellow-100 text-yellow-800',
    };
  };

  const status = getStatusDisplay();

  return (
    <div>
      <PolicyAlert agreement={agreement} isNew={isNew} />
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-gray-400" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">{agreement.title}</h3>
              <p className="text-sm text-gray-500">{agreement.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {user?.role === 'admin' && onEdit && (
              <button
                onClick={() => onEdit(agreement)}
                className="p-1 text-gray-400 hover:text-gray-600"
                title="Edit Policy"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
            {status && (
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.className}`}
              >
                {status.label}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>
              {agreement.expiresAt
                ? `Expires: ${format(new Date(agreement.expiresAt), 'MMM d, yyyy')}`
                : 'No expiration date'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Version: {agreement.version}</span>
          </div>
        </div>

        {assignedUsers && (
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            <span>
              Assigned to: {assignedUsers.map((user) => user.name).join(', ')}
            </span>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <a
            href={agreement.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1e40af] hover:text-[#1e3a8a] text-sm font-medium"
          >
            View Document
          </a>
          {onAttest && !attestation && (
            <button
              onClick={() => onAttest(agreement.id)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#1e40af] hover:bg-[#1e3a8a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e40af]"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Attest
            </button>
          )}
          {attestation && (
            <span className="text-sm text-gray-500">
              Attested on: {format(new Date(attestation.attestedAt), 'MMM d, yyyy')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}