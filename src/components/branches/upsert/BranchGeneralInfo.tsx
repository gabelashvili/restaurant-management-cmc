import React from 'react';

import { Autocomplete, TextField } from '@mui/material';

import MultiLangTextField from '../../shared/MultiLangTextField';
import UpsertSectionWrapper from '../../shared/UpsertSectionWrapper';

const BranchGeneralInfo = () => {
  return (
    <UpsertSectionWrapper title="ზოგადი ინფორმაცია">
      <MultiLangTextField variant="filled" fullWidth onChange={(lang, value) => console.log(lang, value)} label="სახელი" />
      <MultiLangTextField variant="filled" fullWidth onChange={(lang, value) => console.log(lang, value)} label="მისამართი" />
      <TextField variant="filled" fullWidth onChange={(value) => console.log(value)} label="ტელეფონის ნომერი" />
      <TextField variant="filled" fullWidth onChange={(value) => console.log(value)} label="ელ.ფოსტა" />
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
