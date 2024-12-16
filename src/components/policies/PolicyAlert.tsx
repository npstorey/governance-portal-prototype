import React from 'react';
import { AlertTriangle, AlertCircle } from 'lucide-react';
import { Agreement } from '../../types';
import { isAfter, isBefore, parseISO } from 'date-fns';

interface PolicyAlertProps {
  agreement: Agreement;
  isNew?: boolean;
}

export function PolicyAlert({ agreement, isNew }: PolicyAlertProps) {
  const isExpired = agreement.expiresAt && isBefore(parseISO(agreement.expiresAt), new Date());
  const isExpiringSoon = agreement.expiresAt && 
    isAfter(parseISO(agreement.expiresAt), new Date()) && 
    isBefore(parseISO(agreement.expiresAt), new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

  if (!isNew && !isExpired && !isExpiringSoon) return null;

  return (
    <div
      className={`rounded-md p-4 mb-4 ${
        isNew
          ? 'bg-blue-50 border border-blue-200'
          : isExpired
          ? 'bg-red-50 border border-red-200'
          : 'bg-yellow-50 border border-yellow-200'
      }`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {isNew ? (
            <AlertCircle className="h-5 w-5 text-blue-400" />
          ) : (
            <AlertTriangle
              className={`h-5 w-5 ${
                isExpired ? 'text-red-400' : 'text-yellow-400'
              }`}
            />
          )}
        </div>
        <div className="ml-3">
          <h3
            className={`text-sm font-medium ${
              isNew
                ? 'text-blue-800'
                : isExpired
                ? 'text-red-800'
                : 'text-yellow-800'
            }`}
          >
            {isNew
              ? 'New Policy Requires Attestation'
              : isExpired
              ? 'Policy Has Expired'
              : 'Policy Expiring Soon'}
          </h3>
          <div
            className={`mt-2 text-sm ${
              isNew
                ? 'text-blue-700'
                : isExpired
                ? 'text-red-700'
                : 'text-yellow-700'
            }`}
          >
            {isNew ? (
              <p>This policy requires your attention and attestation.</p>
            ) : isExpired ? (
              <p>This policy has expired and needs to be re-attested.</p>
            ) : (
              <p>This policy will expire soon and will need to be re-attested.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}