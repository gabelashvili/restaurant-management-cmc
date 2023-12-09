import React from 'react';

import { Autocomplete, TextField } from '@mui/material';
import { Controller, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form';

import { type BranchGeneralInfoModel, type BranchModel } from '../../../@types/bracnh';
import MultiLangTextField from '../../shared/MultiLangTextField';
import UpsertSectionWrapper from '../../shared/UpsertSectionWrapper';

interface Props {
  errors?: FieldErrors<BranchGeneralInfoModel>;
  register: UseFormRegister<BranchModel>;
  control: Control<BranchModel, any>;
}

const BranchGeneralInfo = ({ errors, register, control }: Props) => {
  return (
    <UpsertSectionWrapper title="ზოგადი ინფორმაცია">
      {/* <Controller
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
      /> */}
      {/* <MultiLangTextField variant="filled" fullWidth label="სახელი" error={!!errors?.name} name="general.name" register={register} /> */}
      {/* <MultiLangTextField variant="filled" fullWidth label="მისამართი" error={!!errors?.name} name="general.address" register={register} /> */}
      <Controller
        control={control}
        name={`general.phone`}
        render={(params) => (
          <TextField
            variant="filled"
            fullWidth
            label="ტელეფონის ნომერი"
            {...params.field}
            error={!!params.fieldState.error}
            inputRef={params.field.ref}
          />
        )}
      />
      <Controller
        control={control}
        name={`general.email`}
        render={(params) => <TextField variant="filled" fullWidth label="ელ.ფოსტა" {...params.field} error={!!params.fieldState.error} />}
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
