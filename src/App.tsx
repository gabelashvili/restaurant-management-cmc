import { Box, CircularProgress, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import moment from 'moment';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import './i18n/config';
import AuthLayout from './components/AuthLayout';
import Layout from './components/layout/Layout';
import useAuth from './hooks/useAuth';
import Branches from './pages/branches/Branches';
import NewBranch from './pages/branches/NewBranch';
import Dishes from './pages/Dishes';
import Drinks from './pages/Drinks';
import Employees from './pages/Employees';
import SignIn from './pages/SignIn';
import UserSettings from './pages/UserSettings';
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
        element: <Employees />,
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
            element: <Dishes />,
          },
          {
            path: 'drinks',
            element: <Drinks />,
          },
        ],
      },
      {
        path: 'branches',
        children: [
          {
            index: true,
            element: <Branches />,
          },
          {
            path: 'new',
            element: <NewBranch />,
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
