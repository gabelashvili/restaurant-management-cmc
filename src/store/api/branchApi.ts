import baseApi from './baseApi';
import { type BranchModel } from '../../@types/bracnh';
import { type ResponseModel } from '../../@types/common';
import { branchUpsertReqObject } from '../../components/branches/upsertBranchUtils';

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
        body: branchUpsertReqObject(args),
      }),
    }),
    updateBranch: build.query<ResponseModel<BranchModel>, Omit<BranchModel, '_id'>>({
      query: (args) => ({
        url: `branches`,
        method: 'PUT',
        body: branchUpsertReqObject(args),
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetBranchQuery, useLazyCreateBranchQuery } = branchApi;
export default branchApi;
