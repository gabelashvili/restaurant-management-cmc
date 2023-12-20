import { type TokensModel } from './common';
import { type EmployeeModel } from './employee';

export interface SignInModel {
  email: string;
  password: string;
}

export interface SignInRespModel {
  userId: string;
  tokens: TokensModel | null;
}

export interface AuthStoreModel {
  state: 'pending' | 'authorized' | 'not-authorized';
  userId: null | string;
  user: EmployeeModel | null;
}

export type UpdateDetailModel = Omit<EmployeeModel, 'id' | 'role' | 'avatar'>;

export interface UpdatePasswordModel {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}

export type SettingsTabModel = 'details' | 'password';
