import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Divider, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type UpdatePasswordModel } from '../../@types/auth';
import { useLazyUpdatePasswordQuery } from '../../store/api/authApi';
import { updatePasswordSchema } from '../../validations/auth-schemas';

const UpdatePassword = () => {
  const { t } = useTranslation();
  const [updatePassword, { isFetching }] = useLazyUpdatePasswordQuery();
  const [passwordVisible, setPasswordVisible] = useState({
    currentPassword: false,
    newPassword: false,
    repeatNewPassword: false,
  });

  const {
    handleSubmit,
    formState: { isDirty, errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm<UpdatePasswordModel>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },
    resolver: yupResolver(updatePasswordSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await updatePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
    reset();
  });

  return (
    <Paper>
      <Typography sx={{ p: 2, fontWeight: 600 }}>{t('auth.settings.update_password')}</Typography>
      <Divider sx={{ mb: 1 }} />
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr', p: 2 }}>
        <TextField
          onChange={(e) => {
            setValue('currentPassword', e.target.value, { shouldDirty: true, shouldValidate: true });
          }}
          value={watch('currentPassword')}
          label={t('auth.settings.current_password')}
          error={!!errors.currentPassword}
          type={passwordVisible.currentPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="toggle password visibility"
                  onClick={() => setPasswordVisible({ ...passwordVisible, currentPassword: !passwordVisible.currentPassword })}
                  edge="end"
                >
                  {passwordVisible.currentPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          onChange={(e) => {
            setValue('newPassword', e.target.value, { shouldDirty: true, shouldValidate: true });
            setValue('repeatNewPassword', watch('repeatNewPassword'), { shouldDirty: true, shouldValidate: true });
          }}
          value={watch('newPassword')}
          label={t('auth.settings.new_password')}
          error={!!errors.newPassword}
          type={passwordVisible.newPassword ? 'text' : 'password'}
          helperText={errors?.newPassword?.message === 'password_already_used' && t('errors.password_already_used')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="toggle password visibility"
                  onClick={() => setPasswordVisible({ ...passwordVisible, newPassword: !passwordVisible.newPassword })}
                  edge="end"
                >
                  {passwordVisible.newPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          onChange={(e) => setValue('repeatNewPassword', e.target.value, { shouldDirty: true, shouldValidate: true })}
          value={watch('repeatNewPassword')}
          label={t('auth.settings.repeat_new_password')}
          error={!!errors.repeatNewPassword}
          onPaste={(e) => e.preventDefault()}
          type={passwordVisible.repeatNewPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="toggle password visibility"
                  onClick={() => setPasswordVisible({ ...passwordVisible, repeatNewPassword: !passwordVisible.repeatNewPassword })}
                  edge="end"
                >
                  {passwordVisible.repeatNewPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'end', mt: 3, p: 2 }}>
        {isDirty && (
          <LoadingButton onClick={() => reset()} size="small" variant="outlined">
            {t('common.cancel')}
          </LoadingButton>
        )}
        <LoadingButton loading={isFetching} disabled={!isDirty || !isValid} onClick={onSubmit} size="small" variant="contained">
          {t('common.save')}
        </LoadingButton>
      </Box>
    </Paper>
  );
};

export default UpdatePassword;
