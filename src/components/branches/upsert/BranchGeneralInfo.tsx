import React from 'react';

import { Autocomplete, TextField } from '@mui/material';
import { Controller, type Control } from 'react-hook-form';

import { type BranchModel } from '../../../@types/bracnh';
import MultiLangTextField from '../../shared/MultiLangTextField';
import UpsertSectionWrapper from '../../shared/UpsertSectionWrapper';

interface Props {
  control: Control<BranchModel, any>;
}

const BranchGeneralInfo = ({ control }: Props) => {
  return (
    <UpsertSectionWrapper title="ზოგადი ინფორმაცია">
      <Controller
        control={control}
        name={`general.name`}
        render={(params) => (
          <MultiLangTextField
            variant="filled"
            fullWidth
            label="სახელი"
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
            label="მისამართი"
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
        render={(params) => (
          <TextField
            variant="filled"
            fullWidth
            label="ტელეფონის ნომერი"
            error={!!params.fieldState.error}
            inputProps={{ ...params.field }}
          />
        )}
      />
      <Controller
        control={control}
        name={`general.email`}
        render={(params) => (
          <TextField variant="filled" fullWidth label="ელ.ფოსტა" error={!!params.fieldState.error} inputProps={{ ...params.field }} />
        )}
      />
      <Autocomplete
        fullWidth
        disablePortal
        options={[]}
        renderInput={(params) => <TextField {...params} variant="filled" label="მენეჯერი(ები)" />}
      />
    </UpsertSectionWrapper>
  );
};

export default BranchGeneralInfo;
