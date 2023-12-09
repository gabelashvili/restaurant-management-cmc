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

export interface BranchModel {
  general: {
    id: string | null;
    name: MultiLangModel;
    address: MultiLangModel;
    phone: string;
    email: string;
  };
  workingHours: BranchWorkingHoursModel;
  // exceptions: ExceptionDateModel[];
}
