import { useState } from 'react';

import { type TableFiltersModel } from '../@types/common';

const PAGE_INITIAL = 1;
const LIMIT_INITIAL = 10;

const filtersInitial = {
  limit: LIMIT_INITIAL,
  page: PAGE_INITIAL,
};

const useTableFilters = () => {
  const [filters, setFilters] = useState<TableFiltersModel>(filtersInitial);

  const handleFilterChange = (filter: keyof TableFiltersModel, value: any) => {
    setFilters({ ...filters, [filter]: value });
  };

  const removeFilter = (filter: keyof TableFiltersModel) => {
    const newFIlters = { ...filters };
    delete newFIlters[filter];
    setFilters(newFIlters);
  };

  const resetFilters = () => {
    setFilters(filtersInitial);
  };

  return {
    filters,
    handleFilterChange,
    resetFilters,
    removeFilter,
  };
};

export default useTableFilters;
