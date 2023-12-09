import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import BranchExceptionDates from './BranchExceptionDates';
import BranchGeneralInfo from './BranchGeneralInfo';
import BranchWorkingHours from './BranchWorkingHours';
import { type BranchModel } from '../../../@types/bracnh';
import { upsertBranchSchema } from '../../../validations/branch';
import Container from '../../shared/Container';

const initialState = {
  id: null,
  general: {
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
  },
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
  exceptions: [],
};

const UpsertBranch = () => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    getValues,
    control,
    trigger,
    formState: { errors },
  } = useForm<BranchModel>({
    defaultValues: { ...initialState },
    resolver: yupResolver(upsertBranchSchema),
  });

  const onSubmit = handleSubmit(
    (data) => {
      console.log(data);
    },
    (err) => console.log(err),
  );

  return (
    <Container title={t('branch.add')} centerTitle sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <BranchGeneralInfo control={control} />
      <BranchWorkingHours control={control} trigger={trigger} getValues={getValues} />
      <BranchExceptionDates control={control} trigger={trigger} getValues={getValues} />
      <LoadingButton variant="contained" sx={{ ml: 'left', display: 'flex' }} onClick={onSubmit}>
        damateba
      </LoadingButton>
    </Container>
  );
};

export default UpsertBranch;
