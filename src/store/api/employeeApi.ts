import baseApi from './baseApi';
import { type BranchModel } from '../../@types/branch';
import { type ResponseModel } from '../../@types/common';
import { removeIdsFromBranchUpsert } from '../../utils/branch';

const branchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createEmployee: build.mutation<ResponseModel<BranchModel>, Partial<Omit<BranchModel, '_id'>>>({
      query: (args) => ({
        url: `branches`,
        method: 'POST',
        body: removeIdsFromBranchUpsert(args),
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateEmployeeMutation } = branchApi;
export default branchApi;
