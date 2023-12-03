import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Box
      sx={(theme) => ({
        bgcolor: theme.palette.grey[200],
        height: '100vh',
        display: 'flex',
        alignContent: 'center',
      })}
    >
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
