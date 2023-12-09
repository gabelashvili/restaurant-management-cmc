import React from 'react';

import { Autocomplete, TextField } from '@mui/material';
import { type FieldErrors, type UseFormSetValue, type FieldPath } from 'react-hook-form';

import { type BranchGeneralInfoModel, type BranchModel } from '../../../@types/bracnh';
import MultiLangTextField from '../../shared/MultiLangTextField';
import UpsertSectionWrapper from '../../shared/UpsertSectionWrapper';

interface Props {
  values: BranchGeneralInfoModel;
  setValue: UseFormSetValue<BranchModel>;
  errors?: FieldErrors<BranchGeneralInfoModel>;
}

const BranchGeneralInfo = ({ values, setValue, errors }: Props) => {
  const handleValueChange = (field: FieldPath<BranchGeneralInfoModel>, value: any) => {
    console.log(field, value);

    setValue(`general.${field}`, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <UpsertSectionWrapper title="ზოგადი ინფორმაცია">
      <MultiLangTextField
        value={values.name}
        variant="filled"
        fullWidth
        onChange={(lang, value) => handleValueChange(`name.${lang}`, value)}
        label="სახელი"
        error={!!errors?.name}
      />
      <MultiLangTextField
        value={values.address}
        variant="filled"
        fullWidth
        onChange={(lang, value) => handleValueChange(`address.${lang}`, value)}
        label="მისამართი"
        error={!!errors?.name}
      />
      <TextField
        // value={values.phone}
        variant="filled"
        fullWidth
        onChange={(e) =>
          setValue(`general.phone`, e.target.value, {
            shouldValidate: true,
            shouldDirty: true,
          })
        }
        label="ტელეფონის ნომერი"
      />
      <TextField value={values.email} variant="filled" fullWidth onChange={(value) => handleValueChange(`email`, value)} label="ელ.ფოსტა" />
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
