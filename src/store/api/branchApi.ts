import baseApi from './baseApi';
import { type ResponseModel } from '../../@types/common';

const branchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBranch: build.query<ResponseModel<any>, string>({
      query: (branchId) => ({
        url: `branch/${branchId}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetBranchQuery } = branchApi;
export default branchApi;
