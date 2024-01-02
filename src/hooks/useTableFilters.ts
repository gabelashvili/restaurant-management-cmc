import { useState } from 'react';

import { type TableFiltersModel } from '../@types/custom-table';

const PAGE_INITIAL = 1;
const LIMIT_INITIAL = 10;

const filtersInitial = {
  limit: LIMIT_INITIAL,
  page: PAGE_INITIAL,
};

const useTableFilters = () => {
  const [filters, setFilters] = useState<TableFiltersModel>(filtersInitial);

  const handleFilterChange = <T extends keyof TableFiltersModel>(filter: T, value: TableFiltersModel[T]) => {
    const newFilters = { ...filters };
    if (filter === 'search') {
      newFilters.page = PAGE_INITIAL;
      newFilters.limit = LIMIT_INITIAL;
    }

    setFilters({ ...newFilters, [filter]: value });
  };

  const removeFilter = (filter: keyof TableFiltersModel) => {
    const newFIlters = { ...filters };
    delete newFIlters[filter];
    setFilters(newFIlters);
  };

  const resetFilters = () => {
    setFilters(filtersInitial);
  };

  const { order, ...rest } = { ...filters };
  const queryParams = { ...rest, ...(order && { orderBy: order.name, orderDir: order.order }) };
  return {
    filters: { ...queryParams },
    handleFilterChange,
    resetFilters,
    removeFilter,
  };
};

export default useTableFilters;
