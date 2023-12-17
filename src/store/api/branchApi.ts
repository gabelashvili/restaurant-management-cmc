import baseApi from './baseApi';
import { type BranchModel } from '../../@types/branch';
import { type WithPaginationModel, type ResponseModel, type FiltersModel } from '../../@types/common';
import { removeIdsFromBranchUpsert } from '../../utils/branch';

const branchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBranches: build.query<ResponseModel<WithPaginationModel<BranchModel>>, FiltersModel>({
      query: (args) => ({
        url: `branches`,
        method: 'GET',
        params: { ...args },
      }),
    }),
    getBranch: build.query<ResponseModel<BranchModel>, string>({
      query: (branchId) => ({
        url: `branches/${branchId}`,
        method: 'GET',
      }),
    }),
    createBranch: build.query<ResponseModel<BranchModel>, Partial<Omit<BranchModel, '_id'>>>({
      query: (args) => ({
        url: `branches`,
        method: 'POST',
        body: removeIdsFromBranchUpsert(args),
      }),
    }),
    updateBranch: build.query<ResponseModel<BranchModel>, { data: Partial<Omit<BranchModel, '_id'>>; branchId: string }>({
      query: (args) => ({
        url: `branches/${args.branchId}`,
        method: 'PUT',
        body: removeIdsFromBranchUpsert(args.data),
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetBranchQuery, useLazyCreateBranchQuery, useLazyUpdateBranchQuery, useGetBranchesQuery } = branchApi;
export default branchApi;
