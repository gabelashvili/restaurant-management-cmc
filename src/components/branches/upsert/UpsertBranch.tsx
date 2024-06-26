import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Divider } from '@mui/material';
import { omit } from 'lodash';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';

import BranchExceptionDates from './BranchExceptionDates';
import BranchGeneralInfo from './BranchGeneralInfo';
import BranchWorkingHours from './BranchWorkingHours';
import { type BranchWorkingHoursModel, type BranchModel } from '../../../@types/branch';
import { useGetBranchQuery, useCreateBranchMutation, useUpdateBranchMutation } from '../../../store/api/branchApi';
import { upsertBranchSchema } from '../../../validations/branch-schema';
import Container from '../../shared/Container';

const initialState = {
  general: {
    name: {
      ka: '',
      en: '',
    },
    address: {
      ka: '',
      en: '',
    },
    email: null,
    phone: null,
    managers: [],
  },
  workingHours: {
    monday: {
      enabled: false,
      data: [
        {
          _id: `new-${uuid4()}`,
          start: null,
          end: null,
        },
      ],
    },
    tuesday: {
      enabled: false,
      data: [
        {
          _id: `new-${uuid4()}`,
          start: null,
          end: null,
        },
      ],
    },
    wednesday: {
      enabled: false,
      data: [
        {
          _id: `new-${uuid4()}`,
          start: null,
          end: null,
        },
      ],
    },
    thursday: {
      enabled: false,
      data: [
        {
          _id: `new-${uuid4()}`,
          start: null,
          end: null,
        },
      ],
    },
    friday: {
      enabled: false,
      data: [
        {
          _id: `new-${uuid4()}`,
          start: null,
          end: null,
        },
      ],
    },
    saturday: {
      enabled: false,
      data: [
        {
          _id: `new-${uuid4()}`,
          start: null,
          end: null,
        },
      ],
    },
    sunday: {
      enabled: false,
      data: [
        {
          _id: `new-${uuid4()}`,
          start: null,
          end: null,
        },
      ],
    },
  },
  exceptions: [],
};

const UpsertBranch = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { branchId } = useParams();
  const { data: getBranchResponse, isFetching: branchDataFetching } = useGetBranchQuery(branchId, { skip: !branchId });
  const [createBranch, { data: createBranchData, isLoading: createBranchIsLoading }] = useCreateBranchMutation();
  const [updateBranch, { isLoading: updateBranchIsLoading }] = useUpdateBranchMutation();
  const {
    handleSubmit,
    getValues,
    control,
    trigger,
    setValue,
    reset,
    formState: { isDirty, errors },
  } = useForm<BranchModel>({
    defaultValues: { ...initialState },
    resolver: yupResolver(upsertBranchSchema),
  });
  console.log(errors);

  const onSubmit = handleSubmit(
    async (data) => {
      const reqData: BranchModel = {
        ...data,
        workingHours: Object.keys(data.workingHours).reduce((acc, cur) => {
          const item = data.workingHours[cur as keyof BranchWorkingHoursModel];
          return { ...acc, [cur]: { ...item, data: item.data.map((el) => (el._id?.includes('new') ? omit(el, '_id') : el)) } };
        }, {}) as BranchWorkingHoursModel,
        exceptions: data.exceptions.map((el) => (el._id?.includes('new') ? omit(el, '_id') : el)),
      };

      if (branchId) {
        updateBranch({ branchId, data: { ...reqData } });
      } else {
        createBranch({ ...reqData });
      }
    },
    (err) => console.log(err),
  );

  useEffect(() => {
    if (getBranchResponse?.data) {
      reset({
        general: getBranchResponse.data.general,
        exceptions: getBranchResponse.data.exceptions,
        workingHours: getBranchResponse.data.workingHours,
      });
    }
  }, [getBranchResponse]);

  useEffect(() => {
    if (createBranchData?.data._id) {
      navigate(`../edit/${createBranchData?.data._id}`);
    }
  }, [createBranchData?.data._id]);

  return (
    <Container title={t(`branch.${branchId ? 'update' : 'add'}`)} centerTitle sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <BranchGeneralInfo control={control} loading={branchDataFetching} />
      <BranchWorkingHours control={control} trigger={trigger} getValues={getValues} setValue={setValue} loading={branchDataFetching} />
      <BranchExceptionDates control={control} trigger={trigger} loading={branchDataFetching} />
      <Divider />
      <LoadingButton
        loading={createBranchIsLoading || updateBranchIsLoading}
        variant="contained"
        sx={{ ml: 'auto', display: 'flex', width: 'fit-content' }}
        onClick={onSubmit}
        disabled={!isDirty}
      >
        {t(branchId ? `common.update` : `common.add`)}
      </LoadingButton>
    </Container>
  );
};

export default UpsertBranch;
