import { type MultiLangModel } from './common';

export interface RoleModel {
  roleName: string;
  roleId: number;
  _id: string;
}

export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  avatar: null | string;
  role: RoleModel | null;
  _id: string;
}

export interface AddNewUserModel {
  firstName: MultiLangModel;
  lastName: MultiLangModel;
  email: string;
  roleId: string | null;
  phone: string;
}
