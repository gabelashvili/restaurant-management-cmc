import React, { type ReactNode } from 'react';

import { Box, Typography } from '@mui/material';

interface Props {
  title: string;
  children: ReactNode;
}
const UpsertSectionWrapper = ({ children, title }: Props) => {
  return (
    <Box>
      <Typography sx={{ fontSize: 16, fontWeight: 500, mb: 3 }}>{title}</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>{children}</Box>
    </Box>
  );
};

export default UpsertSectionWrapper;
