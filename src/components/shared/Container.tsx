import { type ReactNode } from 'react';

import { Box, Divider, Paper, type SxProps, Typography } from '@mui/material';

interface Props {
  title: string;
  children: ReactNode;
  centerTitle?: boolean;
  sx?: SxProps;
}

const Container = ({ title, children, centerTitle, sx = {} }: Props) => {
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ p: 2, textAlign: centerTitle ? 'center' : 'inherit' }} variant="h6">
        {title}
      </Typography>
      <Divider />
      <Box sx={{ p: 2, ...sx }}>{children}</Box>
    </Paper>
  );
};

export default Container;
