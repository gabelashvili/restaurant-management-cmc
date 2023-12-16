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
    createBranch: build.query<ResponseModel<BranchModel>, Omit<BranchModel, '_id'>>({
      query: (args) => ({
        url: `branches`,
        method: 'POST',
        body: args,
      }),
    }),
    updateBranch: build.query<ResponseModel<BranchModel>, { data: Partial<Omit<BranchModel, '_id'>>; branchId: string }>({
      query: (args) => ({
        url: `branches/${args.branchId}`,
        method: 'PUT',
        body: args.data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetBranchQuery, useLazyCreateBranchQuery, useLazyUpdateBranchQuery } = branchApi;
export default branchApi;
