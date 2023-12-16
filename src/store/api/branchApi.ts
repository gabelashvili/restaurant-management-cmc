import { omit } from 'lodash';

import baseApi from './baseApi';
import { type BranchWorkingHoursModel, type BranchModel } from '../../@types/bracnh';
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
      query: (body) => ({
        url: `branches`,
        method: 'POST',
        body: {
          general: body.general,
          exceptions: body.exceptions.map((el) => (el._id.includes('new') ? omit(el, '_id') : el)),
          workingHours: Object.keys(body.workingHours).reduce((acc, cur) => {
            return {
              ...acc,
              [cur]: {
                ...body.workingHours[cur as keyof BranchWorkingHoursModel],
                data: body.workingHours[cur as keyof BranchWorkingHoursModel].data.map((el) =>
                  el._id.includes('new') ? omit(el, '_id') : el,
                ),
              },
            };
          }, {}),
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetBranchQuery, useLazyCreateBranchQuery } = branchApi;
export default branchApi;
