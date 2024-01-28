import baseApi from './baseApi';
import { employeeApiTags } from './employeeApi';
import { type GetAllBranchesModel, type BranchModel } from '../../@types/branch';
import { type WithPaginationModel, type ResponseModel } from '../../@types/common';

const branchApiTags = {
  getBranchList: 'GET_BRANCHES_LIST',
  getBranch: 'GET_BRANCH',
};

const branchApi = baseApi.enhanceEndpoints({ addTagTypes: [...Object.values(branchApiTags)] }).injectEndpoints({
  endpoints: (build) => ({
    getBranches: build.query<ResponseModel<WithPaginationModel<GetAllBranchesModel>>, Record<string, any>>({
      query: (args) => ({
        url: `branches`,
        method: 'GET',
        params: { ...args },
      }),
      providesTags: [branchApiTags.getBranchList],
    }),
    getBranch: build.query<ResponseModel<BranchModel>, string | undefined>({
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
        body: args,
      }),
      invalidatesTags: (result, error) => (error ? [] : [branchApiTags.getBranchList]),
    }),
    updateBranch: build.mutation<ResponseModel<BranchModel>, { data: Partial<Omit<BranchModel, '_id'>>; branchId: string }>({
      query: (args) => ({
        url: `branches/${args.branchId}`,
        method: 'PUT',
        body: args.data,
      }),
      async onQueryStarted({ branchId, data }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            branchApi.util.updateQueryData('getBranch', branchId, (draft) => {
              draft.data = {
                ...draft.data,
                ...data,
              };
            }),
          );
        } catch {}
      },
      invalidatesTags: (result, error) => (error ? [] : [branchApiTags.getBranchList, employeeApiTags.getEmployeesList]),
    }),
    removeBranch: build.mutation<ResponseModel<null>, string>({
      query: (branchId) => ({
        url: `branches/${branchId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error) => (error ? [] : [branchApiTags.getBranchList, employeeApiTags.getEmployeesList]),
    }),
  }),
  overrideExisting: false,
});

export const { useGetBranchQuery, useUpdateBranchMutation, useGetBranchesQuery, useCreateBranchMutation, useRemoveBranchMutation } =
  branchApi;
export default branchApi;
