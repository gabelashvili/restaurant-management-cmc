import { Box, CircularProgress, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import moment from 'moment';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import './i18n/config';
import SignIn from './components/auth/SignIn';
import AuthLayout from './components/AuthLayout';
import BranchesList from './components/branches/BranchesList';
import UpsertBranch from './components/branches/upsert/UpsertBranch';
import EmployeesList from './components/employees/EmployeesList';
import Layout from './components/layout/Layout';
import UserSettings from './components/settings/UserSettings';
import useAuth from './hooks/useAuth';
import { getTheme } from './theme';

import 'moment/locale/ka';

// App theme
const appTheme = getTheme();

const defaultRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <div>home</div>,
      },
      {
        path: 'employees',
        element: <EmployeesList />,
      },
      {
        path: 'menu',
        children: [
          {
            path: 'categories',
            element: <div>კატეგორიები</div>,
          },
          {
            path: 'dishes',
            element: <div>ae</div>,
          },
          {
            path: 'drinks',
            element: <div>oee</div>,
          },
        ],
      },
      {
        path: 'branches',
        children: [
          {
            index: true,
            element: <BranchesList />,
          },
          {
            path: 'new',
            element: <UpsertBranch />,
          },
          {
            path: 'edit/:branchId',
            element: <UpsertBranch />,
          },
        ],
      },
      {
        path: 'settings',
        element: <UserSettings />,
      },
    ],
  },
]);

const authRoutes = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: '*',
        element: <Navigate to={'/'} />,
      },
    ],
  },
]);

function App() {
  const { state } = useAuth();

  const lng = localStorage.getItem('i18nextLng');

  if (lng) {
    moment.locale(lng);
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={appTheme}>
        <div className="App">
          <CssBaseline />
          {state === 'pending' && (
            <Box sx={{ height: '100vh', display: 'flex' }}>
              <CircularProgress sx={{ m: 'auto', display: 'flex' }} />
            </Box>
          )}
          {state !== 'pending' && (
            <RouterProvider router={state === 'authorized' ? defaultRoutes : authRoutes} fallbackElement={<p>Loading...</p>} />
          )}
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
