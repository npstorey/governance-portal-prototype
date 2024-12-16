import React from 'react';
import { Users, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import type { Agreement, User, Attestation } from '../../types';
import { isAfter, parseISO } from 'date-fns';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
}

function StatsCard({ title, value, icon, description }: StatsCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">{icon}</div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm text-gray-500">{description}</div>
      </div>
    </div>
  );
}

interface DashboardStatsProps {
  users: User[];
  agreements: Agreement[];
  attestations: Attestation[];
}

export function DashboardStats({
  users,
  agreements,
  attestations,
}: DashboardStatsProps) {
  const getAgreementStats = () => {
    const now = new Date();
    let allAttested = 0;
    let pendingAttestations = 0;
    let expired = 0;

    agreements.forEach((agreement) => {
      const isExpired = agreement.expiresAt && isAfter(now, parseISO(agreement.expiresAt));
      if (isExpired) {
        expired++;
        return;
      }

      const allUsersAttested = agreement.assignedUserIds.every((userId) =>
        attestations.some((a) => a.agreementId === agreement.id && a.userId === userId)
      );

      if (allUsersAttested) {
        allAttested++;
      } else {
        pendingAttestations++;
      }
    });

    return { allAttested, pendingAttestations, expired };
  };

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: <Users className="h-6 w-6 text-gray-400" />,
      description: 'Active users in the system',
    },
    {
      title: 'Active, All Users Attested',
      value: getAgreementStats().allAttested,
      icon: <CheckCircle className="h-6 w-6 text-green-400" />,
      description: 'Policies with all users attested',
    },
    {
      title: 'Active, Pending Attestations',
      value: getAgreementStats().pendingAttestations,
      icon: <FileText className="h-6 w-6 text-yellow-400" />,
      description: 'Policies with pending attestations',
    },
    {
      title: 'Expired',
      value: getAgreementStats().expired,
      icon: <AlertCircle className="h-6 w-6 text-red-400" />,
      description: 'Expired policies requiring renewal',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}