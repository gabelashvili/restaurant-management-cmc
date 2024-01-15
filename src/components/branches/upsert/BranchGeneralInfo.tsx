import { type UIEvent, useRef } from 'react';

import { Autocomplete, CircularProgress, Skeleton, TextField } from '@mui/material';
import { Controller, type Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type BranchModel } from '../../../@types/branch';
import { type Languages } from '../../../@types/common';
import useTableFilters from '../../../hooks/useTableFilters';
import { useGetEmployeesInfiniteQuery } from '../../../store/api/employeeApi';
import MultiLangTextField from '../../shared/MultiLangTextField';
import UpsertSectionWrapper from '../../shared/UpsertSectionWrapper';

interface Props {
  control: Control<BranchModel, any>;
  loading?: boolean;
}

const initialFilters = {
  page: 1,
  limit: 10,
  search: null,
  roleId: 2,
};

const BranchGeneralInfo = ({ control, loading }: Props) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Languages;
  const { handleFilterChange, selectedFilters, queryParams, handleMultipleFiltersChange } = useTableFilters(initialFilters);
  const { isFetching, data: managers } = useGetEmployeesInfiniteQuery(queryParams);
  const listBoxRef = useRef<HTMLElement | null>(null);
  const timer = useRef<NodeJS.Timeout>();

  const onScroll = (e: UIEvent<HTMLUListElement>) => {
    const { currentTarget } = e;
    const scrollPosition = currentTarget.scrollTop + currentTarget.clientHeight;
    if (
      currentTarget.scrollHeight - scrollPosition <= 1 &&
      !isFetching &&
      managers &&
      selectedFilters.page < Math.ceil(managers.data.count / initialFilters.limit)
    ) {
      handleFilterChange('page', selectedFilters.page + 1);
      listBoxRef?.current?.scrollTo(0, currentTarget.scrollTop - 50);
    }
  };

  const handleSearch = (value: string) => {
    window.clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      handleMultipleFiltersChange({ ...initialFilters, search: value || null });
      window.clearTimeout(timer.current);
    }, 300);
  };

  return (
    <UpsertSectionWrapper title={t('branch.upsert.general_info')}>
      {loading ? (
        new Array(5).fill(0).map(() => <Skeleton variant="rounded" sx={{ height: 40 }} key={Math.random().toString()} />)
      ) : (
        <>
          <Controller
            control={control}
            name={`general.name`}
            render={(params) => (
              <MultiLangTextField
                variant="filled"
                fullWidth
                label={t('common.name')}
                required
                onChange={params.field.onChange}
                value={params.field.value}
                error={!!params.fieldState.error}
                ref={params.field.ref}
              />
            )}
          />
          <Controller
            control={control}
            name={`general.address`}
            render={(params) => (
              <MultiLangTextField
                variant="filled"
                fullWidth
                label={t('common.address')}
                required
                onChange={params.field.onChange}
                value={params.field.value}
                error={!!params.fieldState.error}
                ref={params.field.ref}
              />
            )}
          />
          <Controller
            control={control}
            name={`general.phone`}
            defaultValue={''}
            render={(params) => (
              <TextField
                variant="filled"
                fullWidth
                label={t('common.phone_number')}
                error={!!params.fieldState.error}
                inputProps={{ ...params.field, value: params.field.value || '' }}
                onChange={(e) => params.field.onChange(e.target.value || null)}
              />
            )}
          />
          <Controller
            control={control}
            name={`general.email`}
            render={(params) => (
              <TextField
                variant="filled"
                fullWidth
                label={t('common.email')}
                error={!!params.fieldState.error}
                inputProps={{ ...params.field, value: params.field.value || '' }}
                onChange={(e) => params.field.onChange(e.target.value || null)}
              />
            )}
          />
          <Autocomplete
            fullWidth
            multiple
            loading={isFetching}
            onClose={() => {
              handleMultipleFiltersChange(initialFilters);
            }}
            filterOptions={(options) => options}
            options={managers?.data.list || []}
            getOptionLabel={(item) => `${item.firstName[lang]} ${item.lastName[lang]}`}
            ListboxProps={{
              sx: { maxHeight: 250 },
              ref: listBoxRef,
              onScroll,
            }}
            onInputChange={(_, value, reason) => {
              if (reason === 'input') {
                handleSearch(value);
              }
            }}
            renderInput={(params) => (
              <TextField
                variant="filled"
                label={t('branch.upsert.managers')}
                {...params}
                InputLabelProps={{ ...params.InputLabelProps, children: null }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isFetching ? <CircularProgress sx={{ mt: -2 }} color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </>
      )}
    </UpsertSectionWrapper>
  );
};

export default BranchGeneralInfo;
