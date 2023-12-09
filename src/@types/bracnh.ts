import { type MultiLangModel } from './common';

export interface WorkingHourModel {
  enabled: boolean;
  start: string | null;
  end: string | null;
}

enum RepeatExceptions {
  onetime,
  annually,
}

export interface ExceptionDateModel {
  start: string;
  end: string;
  repeat: RepeatExceptions;
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
  phone: string;
  email: string;
}

export interface BranchModel {
  id: string | null;
  general: BranchGeneralInfoModel;
  workingHours: BranchWorkingHoursModel;
  // exceptions: ExceptionDateModel[];
}
