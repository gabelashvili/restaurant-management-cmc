import { type ReactNode } from 'react';

import { Box, Divider, Typography } from '@mui/material';

interface Props {
  title: string;
  children: ReactNode;
}

const SettingsComponentContainer = ({ children, title }: Props) => {
  return (
    <Box sx={(theme) => ({ border: `1px solid ${theme.palette.divider}`, borderRadius: 2, height: 'fit-content' })}>
      <Typography sx={{ p: 2, fontWeight: 600 }}>{title}</Typography>
      <Divider sx={{ mb: 1 }} />
      <Box sx={{ p: 2 }}>{children}</Box>
    </Box>
  );
};

export default SettingsComponentContainer;
