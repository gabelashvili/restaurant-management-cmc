import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type UpdateDetailModel, type AuthStoreModel } from '../../@types/auth';
import authApi from '../api/authApi';

const initialState: AuthStoreModel = {
  state: 'pending',
  userId: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthedUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setAuthState: (state, action: PayloadAction<'pending' | 'authorized' | 'not-authorized'>) => {
      state.state = action.payload;
    },
    logOut: (state) => {
      state.state = 'not-authorized';
      state.user = null;
      state.userId = null;
      localStorage.removeItem('auth');
    },
    updateUserData: (state, action: PayloadAction<UpdateDetailModel>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    updateAvatar: (state, action: PayloadAction<string | null>) => {
      if (state.user) {
        state.user.avatar = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.authedUser.matchFulfilled, (state, { payload }) => {
      state.user = payload.data;
      state.state = 'authorized';
    });
  },
});

export const { setAuthedUserId, setAuthState, logOut, updateUserData, updateAvatar } = authSlice.actions;

export default authSlice.reducer;
