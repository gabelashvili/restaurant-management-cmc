import baseApi from './baseApi';
import { type SignInRespModel, type SignInModel, type UpdatePasswordModel, type UpdateDetailModel } from '../../@types/auth';
import { type ResponseModel } from '../../@types/common';
import { type UserModel } from '../../@types/user';

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.query<ResponseModel<SignInRespModel>, SignInModel>({
      query: (arg) => ({
        url: 'auth/sign-in',
        method: 'POST',
        body: arg,
      }),
    }),
    authedUser: build.query<ResponseModel<UserModel>, void>({
      query: () => ({
        url: 'auth/user',
        method: 'GET',
      }),
    }),
    updatePassword: build.query<ResponseModel<null>, Omit<UpdatePasswordModel, 'repeatNewPassword'>>({
      query: (args) => ({
        url: 'auth/update-password',
        method: 'POST',
        body: args,
      }),
    }),
    updateDetails: build.query<ResponseModel<null>, Partial<UpdateDetailModel>>({
      query: (args) => ({
        url: 'auth/update-details',
        method: 'POST',
        body: args,
      }),
    }),
    updateAvatar: build.query<ResponseModel<null>, FormData>({
      query: (args) => ({
        url: 'auth/update-avatar',
        method: 'POST',
        body: args,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazySignInQuery,
  useLazyAuthedUserQuery,
  useLazyUpdatePasswordQuery,
  useLazyUpdateDetailsQuery,
  useLazyUpdateAvatarQuery,
} = authApi;
export default authApi;
