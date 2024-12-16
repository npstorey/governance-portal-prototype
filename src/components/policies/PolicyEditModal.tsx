import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import type { Agreement, User } from '../../types';

interface PolicyEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (policyId: string, policy: Partial<Agreement>) => void;
  policy: Agreement;
  users: User[];
}

export function PolicyEditModal({
  isOpen,
  onClose,
  onUpdate,
  policy,
  users,
}: PolicyEditModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'data-sharing',
    department: '',
    version: '',
    requiresAnnualAttestation: true,
    expiresAt: '',
    assignedUserIds: [] as string[],
  });

  useEffect(() => {
    if (policy) {
      setFormData({
        title: policy.title,
        description: policy.description,
        category: policy.category,
        department: policy.department,
        version: policy.version,
        requiresAnnualAttestation: policy.requiresAnnualAttestation,
        expiresAt: policy.expiresAt || '',
        assignedUserIds: policy.assignedUserIds || [],
      });
    }
  }, [policy]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(policy.id, {
      ...formData,
      updatedAt: format(new Date(), 'yyyy-MM-dd'),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">Edit Policy</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Policy Title
            </label>
            <input
              type="text"
              required
              className="w-full border-gray-300 rounded-md shadow-sm"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              className="w-full border-gray-300 rounded-md shadow-sm"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="w-full border-gray-300 rounded-md shadow-sm"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="data-sharing">Data Sharing</option>
                <option value="privacy">Privacy</option>
                <option value="security">Security</option>
                <option value="compliance">Compliance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                required
                className="w-full border-gray-300 rounded-md shadow-sm"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Version
              </label>
              <input
                type="text"
                required
                className="w-full border-gray-300 rounded-md shadow-sm"
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiration Date
              </label>
              <input
                type="date"
                className="w-full border-gray-300 rounded-md shadow-sm"
                value={formData.expiresAt}
                onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign Users
            </label>
            <div className="max-h-40 overflow-y-auto border rounded-md p-2">
              {users.map((user) => (
                <label key={user.id} className="flex items-center p-2 hover:bg-gray-50">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-[#1e40af] border-gray-300 rounded"
                    checked={formData.assignedUserIds.includes(user.id)}
                    onChange={(e) => {
                      const newAssignedUsers = e.target.checked
                        ? [...formData.assignedUserIds, user.id]
                        : formData.assignedUserIds.filter((id) => id !== user.id);
                      setFormData({ ...formData, assignedUserIds: newAssignedUsers });
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {user.name} ({user.department})
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="requiresAnnualAttestation"
              className="h-4 w-4 text-[#1e40af] border-gray-300 rounded"
              checked={formData.requiresAnnualAttestation}
              onChange={(e) =>
                setFormData({ ...formData, requiresAnnualAttestation: e.target.checked })
              }
            />
            <label
              htmlFor="requiresAnnualAttestation"
              className="ml-2 block text-sm text-gray-700"
            >
              Requires annual attestation
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1e40af] hover:bg-[#1e3a8a]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}