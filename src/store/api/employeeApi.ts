import baseApi from './baseApi';
import { type ResponseModel } from '../../@types/common';
import { type RoleModel, type UpsertEmployeeModel } from '../../@types/employee';

const employeeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createEmployee: build.mutation<ResponseModel<null>, UpsertEmployeeModel>({
      query: (args) => ({
        url: `employees`,
        method: 'POST',
        body: args,
      }),
    }),
    getRoles: build.query<ResponseModel<RoleModel[]>, void>({
      query: () => ({
        url: `employees/roles`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateEmployeeMutation, useGetRolesQuery } = employeeApi;
export default employeeApi;
