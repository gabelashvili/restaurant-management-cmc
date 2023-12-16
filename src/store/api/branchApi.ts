import baseApi from './baseApi';
import { type BranchModel } from '../../@types/bracnh';
import { type ResponseModel } from '../../@types/common';

const branchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBranch: build.query<ResponseModel<BranchModel>, string>({
      query: (branchId) => ({
        url: `branches/${branchId}`,
        method: 'GET',
      }),
    }),
    createBranch: build.query<ResponseModel<BranchModel>, Partial<Omit<BranchModel, '_id'>>>({
      query: (body) => ({
        url: `branches`,
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetBranchQuery, useLazyCreateBranchQuery } = branchApi;
export default branchApi;
