import { type ChangeEvent, useState } from 'react';

import { AddAPhoto } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Button, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { useAppSelector } from '../../../hooks/store';
import { useLazyUpdateAvatarQuery } from '../../../store/api/authApi';
import { updateAvatar } from '../../../store/slices/authSlice';
import { generateAvatarImage } from '../../../utils/utils';
import SettingsComponentContainer from '../SettingsComponentContainer';

const UpdateAvatar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [uploadAvatar, { isFetching }] = useLazyUpdateAvatarQuery();
  const { user } = useAppSelector((state) => state.auth);
  const [avatar, setAvatar] = useState<null | File>(null);

  const onSubmit = async () => {
    if (avatar) {
      const formData = new FormData();
      formData.append('avatar', avatar);
      const result = await uploadAvatar(formData);
      if (result.data) {
        setAvatar(null);
        dispatch(updateAvatar(URL.createObjectURL(avatar)));
      }
    }
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    if (e.target.files[0].size > 5 * 1024) {
      toast.error(t('errors.maxFileSize', { size: '5MB' }));
      return;
    }
    setAvatar(e.target.files[0]);
    if (e.target) {
      e.target.value = '';
    }
  };

  return (
    <SettingsComponentContainer title="Update Avatar">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 3,
          height: 'fit-content',
        }}
      >
        <Wrapper>
          <Avatar sx={{ width: '100%', height: '100%' }} src={generateAvatarImage(avatar, user?.avatar)} />
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
            <VisuallyHiddenInput type="file" accept="image/png, image/jpg, image/jpeg" onChange={handleAvatarChange} />
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
  width: 120,
  height: 120,
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
