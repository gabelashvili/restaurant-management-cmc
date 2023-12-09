import moment from 'moment';
import * as yup from 'yup';

const weekDaySchema = yup.object().shape({
  enabled: yup.boolean().required(),
  start: yup
    .string()
    .required()
    .notOneOf(['Invalid date'])
    .when('enabled', {
      is: false,
      then: (schema) => schema.nullable(),
    })
    .test('dateValidation', 'Start date should be always lower than end date', function () {
      const { start, end, enabled } = this.parent;
      const startTime = moment(start, 'HH:mm');
      const endTime = moment(end, 'HH:mm');
      if (enabled && startTime?.isValid() && endTime?.isValid() && startTime.isSameOrAfter(endTime)) {
        return false;
      }
      return true;
    }),
  end: yup
    .string()
    .required()
    .notOneOf(['Invalid date'])
    .when('enabled', {
      is: false,
      then: (schema) => schema.nullable(),
    })
    .test('dateValidation', 'End date should be always greater than start date', function () {
      const { start, end, enabled } = this.parent;
      const startTime = moment(start, 'HH:mm');
      const endTime = moment(end, 'HH:mm');
      if (enabled && startTime?.isValid() && endTime?.isValid() && endTime.isSameOrBefore(startTime)) {
        return false;
      }
      return true;
    }),
});

export const upsertBranchSchema = yup.object().shape({
  id: yup.string().nullable().required(),
  general: yup.object().shape({
    name: yup.object().shape({
      ge: yup.string().required(),
      en: yup.string().required(),
    }),
    address: yup.object().shape({
      ge: yup.string().required(),
      en: yup.string().required(),
    }),
    email: yup.string().required(),
    phone: yup.string().required(),
  }),
  workingHours: yup.object().shape({
    monday: weekDaySchema,
    tuesday: weekDaySchema,
    wednesday: weekDaySchema,
    thursday: weekDaySchema,
    friday: weekDaySchema,
    saturday: weekDaySchema,
    sunday: weekDaySchema,
  }),
  //   exceptions: yup.array(),
});
