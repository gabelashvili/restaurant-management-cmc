import { type ReactNode } from 'react';

import { Box, Divider, Paper, Typography } from '@mui/material';

interface Props {
  title: string;
  children: ReactNode;
}

const Container = ({ title, children }: Props) => {
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ p: 2 }} variant="h6">
        {title}
      </Typography>
      <Divider />
      <Box sx={{ p: 2 }}>{children}</Box>
    </Paper>
  );
};

export default Container;
