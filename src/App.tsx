import { Suspense } from 'react';

import { Box, CircularProgress, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import './i18n/config';
import SignIn from './components/auth/SignIn';
import AuthLayout from './components/AuthLayout';
import BranchesList from './components/branches/BranchesList';
import UpsertBranch from './components/branches/upsert/UpsertBranch';
import EmployeesList from './components/employees/EmployeesList';
import Layout from './components/layout/Layout';
import UpsertProduct from './components/product/UpsertProduct';
import ProductCategoriesList from './components/product-categories/ProductCategoriesList';
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
        path: 'products',
        children: [
          {
            path: 'categories',
            element: <ProductCategoriesList />,
          },
          {
            path: 'list',
            children: [
              {
                path: 'new',
                element: <UpsertProduct />,
              },
            ],
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

  return (
    <Suspense>
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
    </Suspense>
  );
}

export default App;
