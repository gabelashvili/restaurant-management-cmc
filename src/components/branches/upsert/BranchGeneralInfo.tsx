import React from 'react';

import { Autocomplete, Skeleton, TextField } from '@mui/material';
import { Controller, type Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type BranchModel } from '../../../@types/branch';
import MultiLangTextField from '../../shared/MultiLangTextField';
import UpsertSectionWrapper from '../../shared/UpsertSectionWrapper';

interface Props {
  control: Control<BranchModel, any>;
  loading?: boolean;
}

const BranchGeneralInfo = ({ control, loading }: Props) => {
  const { t } = useTranslation();
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
            disablePortal
            options={[]}
            renderInput={(params) => <TextField variant="filled" label={t('branch.upsert.managers')} {...params} />}
          />
        </>
      )}
    </UpsertSectionWrapper>
  );
};

export default BranchGeneralInfo;
