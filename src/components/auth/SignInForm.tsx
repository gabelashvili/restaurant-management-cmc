import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Divider, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type SignInModel } from '../../@types/auth';
import { useLazySignInQuery } from '../../store/api/authApi';
import { signInSchema } from '../../validations/user';
import Logo from '../shared/Logo';

const SignInForm = () => {
  const { t } = useTranslation();
  const [signIn, { isFetching }] = useLazySignInQuery();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignInModel>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = handleSubmit((data) => {
    signIn({ ...data });
  });

  const handleEnterClick = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !isFetching) {
      onSubmit();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEnterClick);
    return () => {
      window.removeEventListener('keydown', handleEnterClick);
    };
  }, [isFetching]);

  return (
    <>
      <Logo />
      <Typography sx={{ mt: 5, fontSize: 24, fontWeight: 700, color: 'primary.400' }}>{t('auth.welcome')}</Typography>
      <Typography sx={{ mt: 1, textAlign: 'center' }}>{t('auth.insert_details')}</Typography>

      <Box sx={{ mt: 5, display: 'flex', gap: 2, flexDirection: 'column', width: '100%' }}>
        <TextField
          label={t('common.email')}
          autoFocus
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          error={!!errors.email}
          value={watch('email')}
          onChange={(e) => setValue('email', e.target.value, { shouldDirty: true, shouldValidate: true })}
        />
        <TextField
          label={t('common.password')}
          fullWidth
          value={watch('password')}
          onChange={(e) => setValue('password', e.target.value, { shouldDirty: true, shouldValidate: true })}
          type={passwordVisible ? 'text' : 'password'}
          error={!!errors.password}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="toggle password visibility"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  edge="end"
                >
                  {passwordVisible ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton fullWidth variant="contained" size="large" sx={{ mt: 3 }} loading={isFetching} onClick={onSubmit}>
          {t('auth.sign_in')}
        </LoadingButton>
      </Box>

      <Divider sx={{ my: 3, width: '100%' }} />
      <Typography sx={{ fontWeight: 600 }}>{t('auth.forgot_password')}</Typography>
    </>
  );
};

export default SignInForm;
