import { Suspense } from 'react';

import { Paper } from '@mui/material';

import SignInForm from '../components/auth/SignInForm';

const SignIn = () => {
  return (
    <Suspense>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          maxWidth: 500,
          width: '100%',
          m: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          borderRadius: 2,
        }}
      >
        <SignInForm />
      </Paper>
    </Suspense>
  );
};

export default SignIn;
