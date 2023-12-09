import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Divider, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import BranchGeneralInfo from './BranchGeneralInfo';
import BranchWorkingHours from './BranchWorkingHours';
import { type BranchModel } from '../../../@types/bracnh';
import { upsertBranchSchema } from '../../../validations/branch';
import Container from '../../shared/Container';

const initialState = {
  id: null,
  name: {
    ge: '',
    en: '',
  },
  address: {
    ge: '',
    en: '',
  },
  email: '',
  phone: '',
  workingHours: {
    monday: {
      enabled: true,
      start: null,
      end: null,
    },
    tuesday: {
      enabled: true,
      start: null,
      end: null,
    },
    wednesday: {
      enabled: true,
      start: null,
      end: null,
    },
    thursday: {
      enabled: true,
      start: null,
      end: null,
    },
    friday: {
      enabled: true,
      start: null,
      end: null,
    },
    saturday: {
      enabled: true,
      start: null,
      end: null,
    },
    sunday: {
      enabled: true,
      start: null,
      end: null,
    },
  },
  // exceptions: [],
};

const UpsertBranch = () => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
  } = useForm<BranchModel>({
    defaultValues: initialState,
    resolver: yupResolver<BranchModel>(upsertBranchSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Container title="ფილიალის დამატება" centerTitle>
      <BranchGeneralInfo />
      <Divider sx={{ mt: 4, mb: 2 }} />
      <BranchWorkingHours values={watch('workingHours')} setValue={setValue} errors={errors.workingHours} clearErrors={clearErrors} />
      <Divider sx={{ mt: 4, mb: 2 }} />
      <Box>
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>გამონაკლისი დღეები</Typography>
      </Box>
      <LoadingButton variant="contained" sx={{ ml: 'left', display: 'flex' }} onClick={onSubmit}>
        damateba
      </LoadingButton>
    </Container>
  );
};

export default UpsertBranch;
