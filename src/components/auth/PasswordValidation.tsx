import { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const PasswordValidation = ({ password }: { password: string }) => {
  const { t } = useTranslation();
  const [canValidate, setCanValidate] = useState(false);

  const checkValidations = () => {
    return {
      minOneUpper: /[A-Z]/.test(password),
      minOneLower: /[a-z]/.test(password),
      minOneSymbol: password.split('').find((el) => /[^A-Za-z0-9]/.test(el)),
      minOneNumber: /[0-9]/.test(password),
      min8Characters: password.length >= 8,
    };
  };

  // ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$

  const getColor = (key: string) => {
    if (!canValidate) {
      return 'inherit';
    }

    const validations = checkValidations();

    return validations[key as keyof typeof validations] ? 'primary.main' : 'error.main';
  };

  useEffect(() => {
    if (password.length > 0 && !canValidate) {
      setCanValidate(true);
    }
  }, [password]);
  return (
    <Box sx={{ px: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography sx={{ color: getColor('minOneLower') }}> {t('auth.passwordValidations.min_one_lower_case')} </Typography>
      <Typography sx={{ color: getColor('minOneUpper') }}> {t('auth.passwordValidations.min_one_upper_case')} </Typography>
      <Typography sx={{ color: getColor('minOneSymbol') }}>
        {' '}
        {t('auth.passwordValidations.min_one_special_character')} (#$@!%&*?)
      </Typography>
      <Typography sx={{ color: getColor('minOneNumber') }}> {t('auth.passwordValidations.min_one_special_number')}</Typography>
      <Typography sx={{ color: getColor('min8Characters') }}> {t('auth.passwordValidations.min_length')}</Typography>
    </Box>
  );
};

export default PasswordValidation;
