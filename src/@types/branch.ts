import { type MultiLangModel } from './common';

export interface WorkingHourModel {
  enabled: boolean;
  data: Array<{
    _id?: string;
    start: string | null;
    end: string | null;
  }>;
}

export enum ExceptionRepeatEnum {
  ANNUALLY = 'annually',
  ONE_TIME = 'one_time',
}
export interface ExceptionDateModel {
  _id?: string;
  start: string;
  end: string;
  repeat: ExceptionRepeatEnum;
}

export interface BranchWorkingHoursModel {
  monday: WorkingHourModel;
  tuesday: WorkingHourModel;
  wednesday: WorkingHourModel;
  thursday: WorkingHourModel;
  friday: WorkingHourModel;
  saturday: WorkingHourModel;
  sunday: WorkingHourModel;
}

export interface BranchGeneralInfoModel {
  name: MultiLangModel;
  address: MultiLangModel;
  phone: string | null;
  email: string | null;
  managers: Array<{
    firstName: MultiLangModel;
    lastName: MultiLangModel;
    _id: string;
  }>;
}

export interface BranchModel {
  _id?: string;
  createdAt?: Date;
  general: BranchGeneralInfoModel;
  workingHours: BranchWorkingHoursModel;
  exceptions: ExceptionDateModel[];
}

export type GetAllBranchesModel = Array<{
  _id: string;
  name: MultiLangModel;
  address: MultiLangModel;
  email: string | null;
  phone: string | null;
}>;
