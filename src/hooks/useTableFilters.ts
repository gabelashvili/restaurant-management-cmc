import { useMemo, useState } from 'react';

const useTableFilters = <T extends Record<string, any>>(initialFilters: T) => {
  const [filters, setFilters] = useState<Record<string, any>>(initialFilters);

  const handleFilterChange = (filter: keyof T, value: any) => {
    const newFilters: Record<string, any> = { ...filters };
    if (filter === 'search' && newFilters?.page && newFilters.limit) {
      newFilters.page = initialFilters.page;
      newFilters.limit = initialFilters.limit;
    }
    newFilters[filter as string] = value;
    setFilters({ ...newFilters });
  };

  const handleMultipleFiltersChange = (values: Partial<Record<keyof T, any>>) => {
    setFilters({ ...filters, ...values });
  };

  const queryParams = useMemo(
    () =>
      Object.keys(filters).reduce((acc, cur) => {
        if (filters[cur]) {
          const newData: any = { ...acc };
          if (cur === 'sort') {
            newData.sortBy = filters[cur].sortBy;
            newData.sortDir = filters[cur].sortDir;
          } else {
            newData[cur] = filters[cur];
          }
          return { ...newData };
        }
        return {
          ...acc,
        };
      }, {}),
    [filters],
  ) as Partial<Record<keyof T, any>>;
  return {
    selectedFilters: filters as Record<keyof T, any>,
    queryParams,
    handleFilterChange,
    handleMultipleFiltersChange,
  };
};

export default useTableFilters;
