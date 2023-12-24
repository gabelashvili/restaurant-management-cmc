import baseApi from './baseApi';
import { type WithPaginationModel, type ResponseModel, type TableFiltersModel } from '../../@types/common';
import { type EmployeeModel, type RoleModel, type UpsertEmployeeModel } from '../../@types/employee';

const employeeApiTags = {
  getEmployeesList: 'GET_EMPLOYEES_LIST',
  getEmployee: 'GET_EMPLOYEE',
};

const employeeApi = baseApi.enhanceEndpoints({ addTagTypes: [...Object.values(employeeApiTags)] }).injectEndpoints({
  endpoints: (build) => ({
    getEmployees: build.query<ResponseModel<WithPaginationModel<EmployeeModel[]>>, TableFiltersModel>({
      query: (args) => ({
        url: `employees`,
        method: 'GET',
        params: { ...args },
      }),
      providesTags: [employeeApiTags.getEmployeesList],
    }),
    createEmployee: build.mutation<ResponseModel<null>, UpsertEmployeeModel>({
      query: (args) => ({
        url: `employees`,
        method: 'POST',
        body: args,
      }),
      invalidatesTags: (result, error) => (error ? [] : [employeeApiTags.getEmployeesList]),
    }),
    updateEmployee: build.mutation<ResponseModel<null>, { employeeId: string; data: UpsertEmployeeModel }>({
      query: (args) => ({
        url: `employees/${args.employeeId}`,
        method: 'PUT',
        body: {
          ...args.data,
        },
      }),
      invalidatesTags: [employeeApiTags.getEmployeesList],
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

export const { useCreateEmployeeMutation, useGetRolesQuery, useGetEmployeesQuery, useUpdateEmployeeMutation } = employeeApi;
export default employeeApi;
