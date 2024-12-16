export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff';
  department: string;
  lastLogin: string;
};

export type Agreement = {
  id: string;
  title: string;
  description: string;
  version: string;
  status: 'active' | 'expired' | 'pending';
  createdAt: string;
  updatedAt: string;
  expiresAt: string | null;
  documentUrl: string;
  category: 'data-sharing' | 'privacy' | 'security' | 'compliance';
  department: string;
  requiresAnnualAttestation: boolean;
  assignedUserIds: string[];
  lastNotified?: string;
};

export type Attestation = {
  id: string;
  userId: string;
  agreementId: string;
  attestedAt: string;
  expiresAt: string;
};