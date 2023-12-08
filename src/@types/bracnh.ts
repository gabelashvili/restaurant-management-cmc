import { type MultiLangModel } from './common';

export interface WorkingHourModel {
  start: string;
  end: string;
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

export interface BranchModel {
  id: string;
  name: MultiLangModel;
  address: MultiLangModel;
  phone: string;
  email: string;
  managers: any[];
  workingHours: {
    monday: WorkingHourModel;
    tuesday: WorkingHourModel;
    wednesday: WorkingHourModel;
    thursday: WorkingHourModel;
    friday: WorkingHourModel;
    saturday: WorkingHourModel;
    sunday: WorkingHourModel;
  };
  exceptions: ExceptionDateModel[];
}
