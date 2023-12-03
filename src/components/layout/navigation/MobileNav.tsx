import { type Dispatch, type SetStateAction } from 'react';

import { Drawer } from '@mui/material';

import NavigationList from './NavigationList';

const MobileNav = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => {
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
      }}
    >
      <NavigationList />
    </Drawer>
  );
};

export default MobileNav;
