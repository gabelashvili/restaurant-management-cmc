import baseApi from './baseApi';
import { type ResponseModel } from '../../@types/common';
import { type UpsertEmployeeModel } from '../../@types/employee';

const employeeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createEmployee: build.mutation<ResponseModel<null>, UpsertEmployeeModel>({
      query: (args) => ({
        url: `employees`,
        method: 'POST',
        body: args,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateEmployeeMutation } = employeeApi;
export default employeeApi;
