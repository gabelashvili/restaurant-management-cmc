import { type MultiLangModel } from './common';

export interface RoleModel {
  roleName: 'admin' | 'manager' | 'waiter';
  roleId: number;
  _id: string;
}

export interface EmployeeModel {
  firstName: MultiLangModel;
  lastName: MultiLangModel;
  email: string;
  avatar: null | string;
  role: RoleModel;
  phone: string;
  _id: string;
  branches: Array<{
    name: MultiLangModel;
    _id: string;
  }>;
}

export interface UpsertEmployeeModel extends Omit<EmployeeModel, 'role' | '_id' | 'avatar'> {
  roleId: number;
}

export interface EmployeesAdditionalFiltersModel {
  roleId: number | null;
}
