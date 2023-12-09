import React from 'react';

import { Autocomplete, TextField } from '@mui/material';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';

import { type BranchGeneralInfoModel, type BranchModel } from '../../../@types/bracnh';
import MultiLangTextField from '../../shared/MultiLangTextField';
import UpsertSectionWrapper from '../../shared/UpsertSectionWrapper';

interface Props {
  errors?: FieldErrors<BranchGeneralInfoModel>;
  register: UseFormRegister<BranchModel>;
}

const BranchGeneralInfo = ({ errors, register }: Props) => {
  return (
    <UpsertSectionWrapper title="ზოგადი ინფორმაცია">
      <MultiLangTextField variant="filled" fullWidth label="სახელი" error={!!errors?.name} name="general.name" register={register} />
      <MultiLangTextField variant="filled" fullWidth label="სახელი" error={!!errors?.name} name="general.address" register={register} />

      <TextField variant="filled" fullWidth label="ტელეფონის ნომერი" {...register('general.phone')} />
      <TextField variant="filled" fullWidth label="ელ.ფოსტა" {...register('general.email')} />
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
