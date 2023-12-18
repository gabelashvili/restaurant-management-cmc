import baseApi from './baseApi';
import { type GetAllBranchesModel, type BranchModel } from '../../@types/branch';
import { type WithPaginationModel, type ResponseModel, type TableFiltersModel } from '../../@types/common';
import { removeIdsFromBranchUpsert } from '../../utils/branch';

const branchApiTags = {
  getBranchList: 'GET_BRANCHES_LIST',
  getBranch: 'GET_BRANCH',
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
      providesTags: [branchApiTags.getBranch],
    }),
    createBranch: build.mutation<ResponseModel<BranchModel>, Partial<Omit<BranchModel, '_id'>>>({
      query: (args) => ({
        url: `branches`,
        method: 'POST',
        body: removeIdsFromBranchUpsert(args),
      }),
      invalidatesTags: [branchApiTags.getBranchList],
    }),
    updateBranch: build.mutation<ResponseModel<BranchModel>, { data: Partial<Omit<BranchModel, '_id'>>; branchId: string }>({
      query: (args) => ({
        url: `branches/${args.branchId}`,
        method: 'PUT',
        body: removeIdsFromBranchUpsert(args.data),
      }),
      invalidatesTags: [branchApiTags.getBranchList, branchApiTags.getBranch],
    }),
    removeBranch: build.mutation<ResponseModel<null>, string>({
      query: (branchId) => ({
        url: `branches/${branchId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [branchApiTags.getBranchList],
    }),
  }),
  overrideExisting: false,
});

export const { useGetBranchQuery, useUpdateBranchMutation, useGetBranchesQuery, useCreateBranchMutation, useRemoveBranchMutation } =
  branchApi;
export default branchApi;
