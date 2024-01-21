import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, FormControlLabel, FormGroup, Paper, Switch, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import UpdateAvatar from './UpdateAvatar';
import { type UpdateDetailModel } from '../../../@types/auth';
import { useAppSelector } from '../../../hooks/store';
import { useLazyUpdateDetailsQuery } from '../../../store/api/authApi';
import { updateUserData } from '../../../store/slices/authSlice';
import { updateDetailSchema } from '../../../validations/auth-schemas';
import MultiLangTextField from '../../shared/MultiLangTextField';
import SettingsComponentContainer from '../SettingsComponentContainer';

const UpdateBaseInfo = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  const [updateDetails, { isFetching }] = useLazyUpdateDetailsQuery();

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
    control,
  } = useForm<Omit<UpdateDetailModel, '_id' | 'branches'>>({
    defaultValues: {
      firstName: {
        ka: '',
        en: '',
      },
      lastName: {
        ka: '',
        en: '',
      },
      email: '',
      phone: '',
    },
    resolver: yupResolver(updateDetailSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const response = await updateDetails({ ...data });
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
        phone: user.phone,
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
            <Controller
              control={control}
              name={`firstName`}
              render={(params) => (
                <MultiLangTextField
                  fullWidth
                  label={t('common.first_name')}
                  required
                  onChange={params.field.onChange}
                  value={params.field.value}
                  error={!!params.fieldState.error}
                  ref={params.field.ref}
                />
              )}
            />
            <Controller
              control={control}
              name={`lastName`}
              render={(params) => (
                <MultiLangTextField
                  fullWidth
                  label={t('common.last_name')}
                  required
                  onChange={params.field.onChange}
                  value={params.field.value}
                  error={!!params.fieldState.error}
                  ref={params.field.ref}
                />
              )}
            />
            <Controller
              control={control}
              name={`phone`}
              defaultValue={''}
              render={(params) => (
                <TextField fullWidth label={t('common.phone_number')} error={!!params.fieldState.error} inputProps={{ ...params.field }} />
              )}
            />
            <Controller
              control={control}
              name={`email`}
              defaultValue={''}
              render={(params) => (
                <TextField fullWidth label={t('common.email')} error={!!params.fieldState.error} inputProps={{ ...params.field }} />
              )}
            />

            <TextField disabled value={user?.role?.roleName} label={t('common.role')} />
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
