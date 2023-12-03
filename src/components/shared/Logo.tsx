import React from 'react';

import { AccountBalance } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

const Logo = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <AccountBalance color="primary" sx={{ fontSize: 28 }} />
      <Typography sx={{ fontWeight: 600, fontSize: 18 }}>LOGO</Typography>
    </Box>
  );
};

export default Logo;
