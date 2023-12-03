import { useRef, useState, Fragment } from 'react';

import { Logout } from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, ListItemButton, ListItemIcon, ListItemText, Popover, Typography } from '@mui/material';

import { useAppSelector } from '../../../hooks/store';
import { generateAvatarImage } from '../../../utils/utils';

const UserMenu = () => {
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
            <Typography>{`${user?.firstName} ${user?.lastName}`}</Typography>
            <Typography display="block" fontWeight={500} color="text.disabled">
              {user?.role.roleName}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box>
          <ListItemButton>
            <ListItemText>set status</ListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemText>Set Status</ListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemText>Set Status</ListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemText>Set Status</ListItemText>
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText>Log out</ListItemText>
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
