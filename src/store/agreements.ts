import { create } from 'zustand';
import type { Agreement, Attestation } from '../types';
import { format, addMonths } from 'date-fns';
import { useAuthStore } from './auth';

interface AgreementsState {
  agreements: Agreement[];
  attestations: Attestation[];
  fetchAgreements: () => Promise<void>;
  fetchAttestations: () => Promise<void>;
  attestAgreement: (agreementId: string) => Promise<void>;
  uploadAgreement: (agreement: Omit<Agreement, 'id'>) => Promise<void>;
  updateAgreement: (agreementId: string, agreement: Partial<Agreement>) => Promise<void>;
}

// Mock data
const mockAgreements: Agreement[] = [
  {
    id: '1',
    title: 'Data Access and Usage Policy',
    description: 'Guidelines for accessing and using sensitive data within the organization',
    version: '1.0.0',
    status: 'active',
    createdAt: format(new Date(), 'yyyy-MM-dd'),
    updatedAt: format(new Date(), 'yyyy-MM-dd'),
    expiresAt: format(addMonths(new Date(), 6), 'yyyy-MM-dd'),
    documentUrl: 'https://example.com/policies/data-access',
    category: 'data-sharing',
    department: 'IT',
    requiresAnnualAttestation: true,
    assignedUserIds: ['1', '2'],
  },
  {
    id: '2',
    title: 'Data Sharing Agreement',
    description: 'Terms and conditions for sharing data with external partners',
    version: '2.1.0',
    status: 'pending',
    createdAt: format(new Date(), 'yyyy-MM-dd'),
    updatedAt: format(new Date(), 'yyyy-MM-dd'),
    expiresAt: format(addMonths(new Date(), 3), 'yyyy-MM-dd'),
    documentUrl: 'https://example.com/policies/data-sharing',
    category: 'data-sharing',
    department: 'Legal',
    requiresAnnualAttestation: true,
    assignedUserIds: ['2', '3'],
  },
];

export const useAgreementsStore = create<AgreementsState>((set, get) => ({
  agreements: [],
  attestations: [],
  fetchAgreements: async () => {
    set({ agreements: mockAgreements });
  },
  fetchAttestations: async () => {
    set({ attestations: [] });
  },
  attestAgreement: async (agreementId: string) => {
    const { attestations } = get();
    const user = useAuthStore.getState().user;
    if (!user) return;

    const newAttestation: Attestation = {
      id: Date.now().toString(),
      userId: user.id,
      agreementId,
      attestedAt: format(new Date(), 'yyyy-MM-dd'),
      expiresAt: format(addMonths(new Date(), 6), 'yyyy-MM-dd'),
    };
    set({ attestations: [...attestations, newAttestation] });
  },
  uploadAgreement: async (agreement: Omit<Agreement, 'id'>) => {
    const { agreements } = get();
    const newAgreement: Agreement = {
      ...agreement,
      id: Date.now().toString(),
    };
    set({ agreements: [...agreements, newAgreement] });
  },
  updateAgreement: async (agreementId: string, agreement: Partial<Agreement>) => {
    const { agreements } = get();
    const updatedAgreements = agreements.map((a) =>
      a.id === agreementId ? { ...a, ...agreement } : a
    );
    set({ agreements: updatedAgreements });
  },
}));