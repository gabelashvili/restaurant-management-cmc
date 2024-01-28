import { createSelector } from '@reduxjs/toolkit';

import baseApi from './baseApi';
import { type WithPaginationModel, type ResponseModel } from '../../@types/common';
import { type EmployeeModel, type RoleModel, type UpsertEmployeeModel } from '../../@types/employee';

export const employeeApiTags = {
  getEmployeesList: 'GET_EMPLOYEES_LIST',
};

const employeeApi = baseApi.enhanceEndpoints({ addTagTypes: [...Object.values(employeeApiTags)] }).injectEndpoints({
  endpoints: (build) => ({
    getEmployees: build.query<ResponseModel<WithPaginationModel<EmployeeModel[]>>, Record<string, string>>({
      query: (args) => ({
        url: `employees`,
        method: 'GET',
        params: { ...args },
      }),
      providesTags: [employeeApiTags.getEmployeesList],
    }),
    getEmployeesInfinite: build.query<ResponseModel<WithPaginationModel<EmployeeModel[]>>, Record<string, string>>({
      query: (args) => ({
        url: `employees`,
        method: 'GET',
        params: { ...args },
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        const newQueryArgs = { ...queryArgs };
        if (newQueryArgs.page) {
          delete newQueryArgs.page;
        }
        if (newQueryArgs.search) {
          delete newQueryArgs.search;
        }
        return newQueryArgs;
      },
      merge: (currentCache, newItems, args) => {
        if (currentCache.data && Number(args.arg.page) > 1) {
          return {
            ...newItems,
            data: {
              ...newItems.data,
              list: [...newItems.data.list, ...currentCache.data.list],
            },
          };
        }
        return newItems;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    createEmployee: build.mutation<ResponseModel<null>, Omit<UpsertEmployeeModel, 'branches'>>({
      query: (args) => ({
        url: `employees`,
        method: 'POST',
        body: args,
      }),

      invalidatesTags: (result, error) => (error ? [] : [employeeApiTags.getEmployeesList]),
    }),
    updateEmployee: build.mutation<ResponseModel<null>, { employeeId: string; data: Omit<UpsertEmployeeModel, 'branches'> }>({
      query: (args) => ({
        url: `employees/${args.employeeId}`,
        method: 'PUT',
        body: {
          ...args.data,
        },
      }),
      invalidatesTags: [employeeApiTags.getEmployeesList],
    }),
    removeEmployee: build.mutation<ResponseModel<null>, string>({
      query: (employeeId) => ({
        url: `employees/${employeeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error) => (error ? [] : [employeeApiTags.getEmployeesList]),
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

export const {
  useCreateEmployeeMutation,
  useGetRolesQuery,
  useGetEmployeesQuery,
  useUpdateEmployeeMutation,
  useRemoveEmployeeMutation,
  useGetEmployeesInfiniteQuery,
} = employeeApi;
export default employeeApi;

export const selectRoles = createSelector(employeeApi.endpoints.getRoles.select(), (rolesResult) => rolesResult?.data?.data);
