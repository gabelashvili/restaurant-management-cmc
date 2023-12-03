export interface RoleModel {
  roleName: string;
  roleId: number;
  id: string;
}

export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  avatar: null | string;
  role: RoleModel;
  id: string;
}
