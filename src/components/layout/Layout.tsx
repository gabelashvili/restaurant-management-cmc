import { useState } from 'react';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from './header/Header';
import Navigation from './navigation/Navigation';

const Layout = () => {
  const [openMobileNav, setOpenMobileNav] = useState<boolean>(false);

  return (
    <Box
      sx={{
        bgcolor: 'grey.200',
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: '280px 1fr' },
      }}
    >
      <Navigation openMobileNav={openMobileNav} setOpenMobileNav={setOpenMobileNav} />
      <Box sx={{ height: '100%' }}>
        <Header openMobileNav={openMobileNav} setOpenMobileNav={setOpenMobileNav} />
        <Box sx={{ mx: 2, my: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
