import { omit } from 'lodash';

import { type BranchWorkingHoursModel, type BranchModel } from '../../@types/bracnh';

export const branchUpsertReqObject = (data: Partial<BranchModel>) => {
  const formattedData = { ...data };
  if (formattedData.exceptions) {
    formattedData.exceptions.forEach((el) => (el._id.includes('new') ? omit(el, '_id') : el));
  }

  if (formattedData.workingHours) {
    Object.keys(formattedData.workingHours).forEach((day) => {
      formattedData?.workingHours?.[day as keyof BranchWorkingHoursModel].data.map((el) => (el._id.includes('new') ? omit(el, '_id') : el));
    });
  }

  return formattedData;
};
