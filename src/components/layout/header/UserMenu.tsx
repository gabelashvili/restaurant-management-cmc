import { useRef, useState, Fragment } from 'react';

import { Logout } from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, ListItemButton, ListItemIcon, ListItemText, Popover, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { type Languages } from '../../../@types/common';
import { useAppSelector } from '../../../hooks/store';
import { logOut } from '../../../store/slices/authSlice';
import { generateAvatarImage } from '../../../utils/utils';

const UserMenu = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Languages;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef(null);

  return (
    <Fragment>
      <IconButton ref={anchorRef} onClick={() => setOpen(true)}>
        <Avatar sx={{ width: 30, height: 30 }} src={generateAvatarImage(null, user?.avatar)} />
      </IconButton>
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorRef.current}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        slotProps={{ paper: { sx: { minWidth: 300 }, elevation: 2 } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3, mx: 2 }}>
          <Avatar sx={{ width: 35, height: 35 }} />

          <Box>
            <Typography>{`${user?.firstName[lang]} ${user?.lastName[lang]}`}</Typography>
            <Typography display="block" fontWeight={500} color="text.disabled">
              {user?.role?.roleName}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mt: 2 }} />
        <Box>
          <ListItemButton
            onClick={() => {
              navigate('settings/?update-details');
              setOpen(false);
            }}
          >
            <ListItemText>{t('auth.user_menu.settings')}</ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate('settings/?update-password');
              setOpen(false);
            }}
          >
            <ListItemText>{t('auth.user_menu.password_change')}</ListItemText>
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => dispatch(logOut())}>
            <ListItemText>{t('auth.user_menu.logout')}</ListItemText>
            <ListItemIcon sx={{ minWidth: 0 }}>
              <Logout />
            </ListItemIcon>
          </ListItemButton>
        </Box>
      </Popover>
    </Fragment>
  );
};

export default UserMenu;
