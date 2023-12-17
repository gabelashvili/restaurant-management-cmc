import baseApi from './baseApi';
import { type GetAllBranchesModel, type BranchModel } from '../../@types/branch';
import { type WithPaginationModel, type ResponseModel, type TableFiltersModel } from '../../@types/common';
import { removeIdsFromBranchUpsert } from '../../utils/branch';

const branchApiTags = {
  getBranchList: 'GET_BRANCHES_LIST',
};

const branchApi = baseApi.enhanceEndpoints({ addTagTypes: [...Object.values(branchApiTags)] }).injectEndpoints({
  endpoints: (build) => ({
    getBranches: build.query<ResponseModel<WithPaginationModel<GetAllBranchesModel>>, TableFiltersModel>({
      query: (args) => ({
        url: `branches`,
        method: 'GET',
        params: { ...args },
      }),
      providesTags: [branchApiTags.getBranchList],
    }),
    getBranch: build.query<ResponseModel<BranchModel>, string>({
      query: (branchId) => ({
        url: `branches/${branchId}`,
        method: 'GET',
      }),
    }),
    createBranch: build.mutation<ResponseModel<BranchModel>, Partial<Omit<BranchModel, '_id'>>>({
      query: (args) => ({
        url: `branches`,
        method: 'POST',
        body: removeIdsFromBranchUpsert(args),
      }),
      invalidatesTags: [branchApiTags.getBranchList],
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

export const { useGetBranchQuery, useLazyUpdateBranchQuery, useGetBranchesQuery, useCreateBranchMutation } = branchApi;
export default branchApi;
