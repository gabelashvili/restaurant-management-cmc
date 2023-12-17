import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Divider } from '@mui/material';
import { cloneDeep } from 'lodash';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';

import BranchExceptionDates from './BranchExceptionDates';
import BranchGeneralInfo from './BranchGeneralInfo';
import BranchWorkingHours from './BranchWorkingHours';
import { type BranchModel } from '../../../@types/branch';
import { useGetBranchQuery, useLazyCreateBranchQuery, useLazyUpdateBranchQuery } from '../../../store/api/branchApi';
import { getDirtyFieldsValues } from '../../../utils/utils';
import { upsertBranchSchema } from '../../../validations/branch';
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
  const { data: getBranchResponse } = useGetBranchQuery(branchId || '', { skip: !branchId });
  const [createBranch, { data: createBranchData, isFetching: createBranchIsFetching }] = useLazyCreateBranchQuery();
  const [updateBranch, { isFetching: updateBranchIsFetching }] = useLazyUpdateBranchQuery();
  const {
    handleSubmit,
    getValues,
    control,
    trigger,
    setValue,
    reset,
    formState: { dirtyFields },
  } = useForm<BranchModel>({
    defaultValues: { ...initialState },
    resolver: yupResolver(upsertBranchSchema),
  });

  const onSubmit = handleSubmit(
    async (data) => {
      const values = getDirtyFieldsValues<BranchModel>(Object.keys(dirtyFields), cloneDeep(data));
      if (branchId) {
        updateBranch({ branchId, data: { ...values } });
      } else {
        createBranch({ ...values });
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
    <Container title={t('branch.add')} centerTitle sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <BranchGeneralInfo control={control} />
      <BranchWorkingHours control={control} trigger={trigger} getValues={getValues} setValue={setValue} />
      <BranchExceptionDates control={control} trigger={trigger} />
      <Divider />
      <LoadingButton
        loading={createBranchIsFetching || updateBranchIsFetching}
        variant="contained"
        sx={{ ml: 'auto', display: 'flex', width: 'fit-content' }}
        onClick={onSubmit}
      >
        {t(branchId ? `common.update` : `common.add`)}
      </LoadingButton>
    </Container>
  );
};

export default UpsertBranch;
