import { type BranchWorkingHoursModel, type BranchModel } from '../@types/branch';

export const removeIdsFromBranchUpsert = (data: Partial<BranchModel>) => {
  const values: Record<string, any> = {};

  if (data.general) {
    values.general = data.general;
  }

  if (data.exceptions) {
    values.exceptions = data.exceptions.map((el) => (el._id?.includes('new') ? { start: el.start, end: el.end, repeat: el.repeat } : el));
  }
  if (data.workingHours) {
    values.workingHours = Object.keys(data.workingHours).reduce((acc, cur) => {
      const workingDayDetails = data?.workingHours?.[cur as keyof BranchWorkingHoursModel];
      if (workingDayDetails) {
        return {
          ...acc,
          [cur]: {
            ...workingDayDetails,
            data: workingDayDetails.data.map((el) => (el._id?.includes('new') ? { start: el.start, end: el.end } : el)),
          },
        };
      }
      return {
        ...acc,
      };
    }, {});
  }
  return values;
};
