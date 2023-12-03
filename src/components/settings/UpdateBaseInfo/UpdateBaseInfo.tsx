import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, FormControlLabel, FormGroup, Paper, Switch, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import UpdateAvatar from './UpdateAvatar';
import { type UpdateDetailModel } from '../../../@types/auth';
import { useAppSelector } from '../../../hooks/store';
import { useLazyUpdateDetailsQuery } from '../../../store/api/authApi';
import { updateUserData } from '../../../store/slices/authSlice';
import { getDirtyFieldsValues } from '../../../utils/utils';
import { updateDetailSchema } from '../../../validations/user';
import SettingsComponentContainer from '../SettingsComponentContainer';

const UpdateBaseInfo = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  const [updateDetails, { isFetching }] = useLazyUpdateDetailsQuery();

  const {
    handleSubmit,
    formState: { isDirty, errors, dirtyFields },
    setValue,
    watch,
    reset,
  } = useForm<UpdateDetailModel>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    resolver: yupResolver(updateDetailSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const reqData = getDirtyFieldsValues<UpdateDetailModel>(dirtyFields, data);
    const response = await updateDetails({ ...reqData });
    if (response.data) {
      reset({ ...data });
      dispatch(updateUserData({ ...data }));
    }
  });

  const handleReset = () => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  };

  useEffect(() => {
    handleReset();
  }, [user]);

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'minmax(280px, 1fr) 2.5fr' } }}>
        <UpdateAvatar />
        <SettingsComponentContainer title={t('auth.settings.update_details')}>
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', xl: '1fr 1fr' } }}>
            <TextField
              onChange={(e) => setValue('firstName', e.target.value, { shouldDirty: true, shouldValidate: true })}
              value={watch('firstName')}
              label={t('common.firstName')}
              error={!!errors.firstName}
            />
            <TextField
              onChange={(e) => setValue('lastName', e.target.value, { shouldDirty: true, shouldValidate: true })}
              value={watch('lastName')}
              label={t('common.lastName')}
              error={!!errors.lastName}
            />
            <TextField
              onChange={(e) => setValue('email', e.target.value, { shouldDirty: true, shouldValidate: true })}
              value={watch('email')}
              label={t('common.email')}
              error={!!errors.email}
            />
            <TextField disabled value={user?.role.roleName} label={t('common.role')} />
            <FormGroup>
              <FormControlLabel control={<Switch defaultChecked />} label="Show notifications" />
              <FormControlLabel control={<Switch />} label="Show notifications" />
              <FormControlLabel control={<Switch />} label="Show notifications" />
            </FormGroup>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'end', mt: 3 }}>
            {isDirty && (
              <LoadingButton onClick={handleReset} size="small" variant="outlined">
                {t('common.cancel')}
              </LoadingButton>
            )}
            <LoadingButton loading={isFetching} disabled={!isDirty} onClick={onSubmit} size="small" variant="contained">
              {t('common.save')}
            </LoadingButton>
          </Box>
        </SettingsComponentContainer>
      </Box>
    </Paper>
  );
};

export default UpdateBaseInfo;
