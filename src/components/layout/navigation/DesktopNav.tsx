import { Box, Drawer } from '@mui/material';

import NavigationList from './NavigationList';

const DesktopNav = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent" open PaperProps={{ sx: { width: 280 } }}>
        <NavigationList />
      </Drawer>
    </Box>
  );
};

export default DesktopNav;
