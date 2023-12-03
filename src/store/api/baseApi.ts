import { type Middleware, type MiddlewareAPI } from '@reduxjs/toolkit';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';

import { type SignInRespModel } from '../../@types/auth';
import { type ResponseModel } from '../../@types/common';
import { logOut, setAuthState, setAuthedUserId } from '../slices/authSlice';

const getTokensFromStorage = () => {
  try {
    const authJson = localStorage.getItem('auth');
    if (!authJson) {
      return null;
    }
    const data = JSON.parse(authJson) as SignInRespModel;
    return data.tokens;
  } catch (error) {
    return null;
  }
};

const setNewAccessTokenInLocalStorage = (token: string) => {
  const authJson = localStorage.getItem('auth');
  if (authJson) {
    try {
      const data = JSON.parse(authJson) as SignInRespModel;
      if (data.tokens?.accessToken) {
        data.tokens.accessToken = token;
      }
      localStorage.setItem('auth', JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API}/api/v1/`,
  prepareHeaders: async (headers) => {
    headers.set('authorization', `Bearer ${getTokensFromStorage()?.accessToken}`);

    return headers;
  },
});

const refreshBaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API}/api/v1/`,
  prepareHeaders: async (headers) => {
    headers.set('authorization', `Bearer ${getTokensFromStorage()?.refreshToken}`);
  },
});

const refreshBlackListUrl = (args: string | FetchArgs) => {
  if (typeof args === 'string') {
    return false;
  }
  return ['auth/sign-in'].includes(args.url);
};

const baseQueryWithRefreshToken: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Set tokens and user id after successfully sign in
  if (typeof args !== 'string' && args.url === 'auth/sign-in') {
    const response = result.data as ResponseModel<SignInRespModel>;
    if (response?.success && response?.data?.tokens) {
      localStorage.setItem('auth', JSON.stringify(response.data));
      api.dispatch(setAuthedUserId(response.data.userId));
      api.dispatch(setAuthState('pending'));
    }
  }

  // Refresh token flow
  if (!refreshBlackListUrl(args) && result.error && result.error.status === 401) {
    const refreshResult = await refreshBaseQuery({ url: '/auth/refresh-token', method: 'POST' }, api, extraOptions);
    const res = refreshResult?.data as ResponseModel<{ accessToken: string }>;
    if (refreshResult.error) {
      api.dispatch(logOut());
      return refreshResult;
    }

    if (res?.data?.accessToken) {
      setNewAccessTokenInLocalStorage(res.data.accessToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
      return result;
    }
  }
  return result;
};

export const rtkQueryErrorLogger: Middleware = (_api: MiddlewareAPI) => (next) => (action) => {
  if (action.type.includes('fulfilled') && action?.payload?.message) {
    toast.success(action.payload.message);
  }
  if (action.type.includes('rejected') && action?.payload?.data?.message) {
    if (!toast.isActive('unauthorized')) {
      toast.error(action.payload.data.message, {
        toastId: 'unauthorized',
      });
    }
  }
  return next(action);
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});

export default baseApi;
