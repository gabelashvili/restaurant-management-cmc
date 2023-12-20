import { type MultiLangModel } from './common';

export interface RoleModel {
  roleName: string;
  roleId: number;
  _id: string;
}

export interface EmployeeModel {
  firstName: MultiLangModel;
  lastName: MultiLangModel;
  email: string;
  avatar: null | string;
  role: RoleModel | null;
  phone: string;
  _id: string;
}

export interface UpsertEmployeeModel extends Omit<EmployeeModel, 'role' | '_id' | 'avatar'> {
  roleId: string;
}
