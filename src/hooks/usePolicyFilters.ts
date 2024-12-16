import { useState, useMemo } from 'react';
import type { Agreement } from '../types';

export function usePolicyFilters(agreements: Agreement[]) {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    department: '',
  });

  const filteredAgreements = useMemo(() => {
    return agreements.filter((agreement) => {
      const matchesSearch =
        !filters.search ||
        agreement.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        agreement.description.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory = !filters.category || agreement.category === filters.category;
      const matchesStatus = !filters.status || agreement.status === filters.status;
      const matchesDepartment =
        !filters.department || agreement.department === filters.department;

      return matchesSearch && matchesCategory && matchesStatus && matchesDepartment;
    });
  }, [agreements, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return {
    filters,
    filteredAgreements,
    handleFilterChange,
  };
}