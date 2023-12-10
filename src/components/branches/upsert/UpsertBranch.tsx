import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

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
      ka: '',
      en: '',
    },
    address: {
      ka: '',
      en: '',
    },
    email: '',
    phone: '',
  },
  workingHours: {
    monday: {
      id: uuidv4(),
      enabled: true,
      data: [
        {
          id: uuidv4(),
          start: null,
          end: null,
        },
        {
          id: uuidv4(),
          start: null,
          end: null,
        },
        {
          id: uuidv4(),
          start: null,
          end: null,
        },
        {
          id: uuidv4(),
          start: null,
          end: null,
        },
      ],
    },
    tuesday: {
      id: uuidv4(),
      enabled: true,
      data: [
        {
          id: uuidv4(),
          start: null,
          end: null,
        },
      ],
    },
    wednesday: {
      id: uuidv4(),
      enabled: true,
      data: [
        {
          id: uuidv4(),
          start: null,
          end: null,
        },
      ],
    },
    thursday: {
      id: uuidv4(),
      enabled: true,
      data: [
        {
          id: uuidv4(),
          start: null,
          end: null,
        },
      ],
    },
    friday: {
      id: uuidv4(),
      enabled: true,
      data: [
        {
          id: uuidv4(),
          start: null,
          end: null,
        },
      ],
    },
    saturday: {
      id: uuidv4(),
      enabled: true,
      data: [
        {
          id: uuidv4(),
          start: null,
          end: null,
        },
      ],
    },
    sunday: {
      id: uuidv4(),
      enabled: true,
      data: [
        {
          id: uuidv4(),
          start: null,
          end: null,
        },
      ],
    },
  },
  exceptions: [],
};

const UpsertBranch = () => {
  const { t } = useTranslation();
  const { handleSubmit, getValues, control, trigger } = useForm<BranchModel>({
    defaultValues: { ...initialState },
    resolver: yupResolver(upsertBranchSchema),
  });

  const onSubmit = handleSubmit(
    (data) => {
      console.log(data);
    },
    (err) => console.log(err),
  );

  console.log(getValues());

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
