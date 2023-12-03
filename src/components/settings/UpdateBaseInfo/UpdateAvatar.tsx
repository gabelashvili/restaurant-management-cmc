import { useState } from 'react';

import { AddAPhoto } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Button, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../hooks/store';
import { useLazyUpdateAvatarQuery } from '../../../store/api/authApi';
import SettingsComponentContainer from '../SettingsComponentContainer';

const UpdateAvatar = () => {
  const { t } = useTranslation();
  const [updateAvatar, { isFetching }] = useLazyUpdateAvatarQuery();
  const { user } = useAppSelector((state) => state.auth);
  const [avatar, setAvatar] = useState<null | File>(null);

  const onSubmit = async () => {
    if (avatar) {
      const formData = new FormData();
      formData.append('avatar', avatar);
      const result = await updateAvatar(formData);
      if (result.data) {
        setAvatar(null);
        // Todo update url in store
      }
    }
  };

  return (
    <SettingsComponentContainer title="Update Avatar">
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', gap: 3, height: 'fit-content' }}>
        <Wrapper>
          <Avatar sx={{ width: '100%', height: '100%' }} src={avatar ? URL.createObjectURL(avatar) : user?.avatar || ''} />
          <Button
            component="label"
            variant="contained"
            sx={{
              background: 'transparent',
              height: '100%',
              width: '100%',
              borderRadius: '50%',
              m: 0,
              p: 0,
              position: 'absolute',
              top: 0,
              opacity: '0',
            }}
          >
            <AddAPhoto />
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => {
                setAvatar(e.target.files?.[0] || null);
                if (e.target) {
                  e.target.value = '';
                }
              }}
            />
          </Button>
        </Wrapper>
        <Typography sx={{ textAlign: 'center' }}>Upload/Change Your Profile Image</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'end' }}>
          {avatar && (
            <LoadingButton size="small" variant="outlined" onClick={() => setAvatar(null)}>
              {t('common.cancel')}
            </LoadingButton>
          )}
          <LoadingButton size="small" variant="contained" loading={isFetching} disabled={!avatar} onClick={onSubmit}>
            {t('common.save')}
          </LoadingButton>
        </Box>
      </Box>
    </SettingsComponentContainer>
  );
};

export default UpdateAvatar;

const Wrapper = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  position: 'relative',
  cursor: 'pointer',
  '&:hover > label': {
    opacity: '1',
    transitions: 'all 250s',
  },
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
