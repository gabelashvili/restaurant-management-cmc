import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
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
  const [createBranch, { data: createBranchData }] = useLazyCreateBranchQuery();
  const [updateBranch] = useLazyUpdateBranchQuery();
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
      <LoadingButton variant="contained" sx={{ ml: 'left', display: 'flex' }} onClick={onSubmit}>
        damateba
      </LoadingButton>
    </Container>
  );
};

export default UpsertBranch;

// {
//   "id": null,
//   "general": {
//       "name": {
//           "ka": "ქუთაისის ფილიალი",
//           "en": "kutaisi's branch"
//       },
//       "address": {
//           "ka": "ავტომშენებლის 15/43",
//           "en": "avtomshenebeli str, 15/43"
//       },
//       "email": "test@gmail.com",
//       "phone": "579288707"
//   },
//   "workingHours": {
//       "monday": {
//           "id": "05ecd939-9e10-484a-a0ff-b1cf2565ffd9",
//           "enabled": true,
//           "data": [
//               {
//                   "id": "6918d36e-35bf-4120-b72e-44db04355f2f",
//                   "start": "09:00",
//                   "end": "14:00"
//               },
//               {
//                   "id": "b659b6d8-ee4f-4dc4-9fe0-85f1ce8b9160",
//                   "end": "20:00",
//                   "start": "15:00"
//               }
//           ]
//       },
//       "tuesday": {
//           "id": "3170e34c-084e-4df5-8deb-393cccbc135c",
//           "enabled": true,
//           "data": [
//               {
//                   "id": "a2a5d177-7ee2-4d9a-a7f7-98aad30fb995",
//                   "start": "09:00",
//                   "end": "13:00"
//               },
//               {
//                   "id": "ff71460b-c61e-422b-ba24-b9667e04481c",
//                   "end": "17:00",
//                   "start": "15:00"
//               },
//               {
//                   "id": "aa3d0f5b-5cd1-426a-9e47-201d4c7afe77",
//                   "end": "21:30",
//                   "start": "18:30"
//               }
//           ]
//       },
//       "wednesday": {
//           "id": "733b395d-c57d-4154-99b1-3d1eebe5135e",
//           "enabled": true,
//           "data": [
//               {
//                   "id": "d3a216d9-6ca9-439f-b276-46201a8a9082",
//                   "start": "09:00",
//                   "end": "20:00"
//               }
//           ]
//       },
//       "thursday": {
//           "id": "bccbc61d-c8cb-4553-8ced-f04119995d8f",
//           "enabled": true,
//           "data": [
//               {
//                   "id": "f89969ca-4d59-4395-bb05-564b3a480add",
//                   "start": "09:00",
//                   "end": "20:00"
//               }
//           ]
//       },
//       "friday": {
//           "id": "645ec0ae-7261-411a-8b78-eacd7d4dabbc",
//           "enabled": true,
//           "data": [
//               {
//                   "id": "4ccd56e5-34d6-4261-8faf-3b853f1bd1d9",
//                   "start": "09:00",
//                   "end": "18:00"
//               }
//           ]
//       },
//       "saturday": {
//           "id": "5f2fd0c2-aeb7-4dc3-8a3c-a33cc2f83351",
//           "enabled": true,
//           "data": [
//               {
//                   "id": "2193d77f-b201-45c8-8461-1e57dfcc0b72",
//                   "start": "11:00",
//                   "end": "18:00"
//               }
//           ]
//       },
//       "sunday": {
//           "id": "84799a72-cfbd-4547-92ba-fc428d11848f",
//           "enabled": false,
//           "data": [
//               {
//                   "id": "395d9dd4-0ff5-48be-bd5d-ba8997f85019",
//                   "start": null,
//                   "end": null
//               }
//           ]
//       }
//   },
//   "exceptions": [
//       {
//           "start": "2023-12-12T09:30:00.000Z",
//           "end": "2023-12-12T11:30:00.000Z",
//           "repeat": "one_time",
//           "id": "9577504c-e415-4702-983b-4f49f48bed84"
//       },
//       {
//           "start": "2023-12-21T09:00:00.000Z",
//           "end": "2023-12-30T09:30:00.000Z",
//           "repeat": "annually",
//           "id": "52ab8dc9-5dad-4f53-a13a-b49aa9695143"
//       }
//   ]
// }
