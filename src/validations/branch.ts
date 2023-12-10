import moment from 'moment';
import * as yup from 'yup';

import { ExceptionRepeatEnum } from '../@types/bracnh';

const optionalDateSchema = yup.array().of(
  yup.object().shape({
    id: yup.string().required(),
    start: yup.string().required().nullable().notOneOf(['Invalid date']),
    end: yup.string().required().nullable().notOneOf(['Invalid date']),
  }),
);

const requiredDateSchema = yup.array().of(
  yup.object().shape({
    id: yup.string().required(),
    start: yup.string().nullable().required().notOneOf(['Invalid date']),
    // .test('dateValidation', 'Start date should be always lower than end date', function () {
    //   const { start, end } = this.parent;
    //   const startTime = moment(start, 'HH:mm');
    //   const endTime = moment(end, 'HH:mm');
    //   if (startTime?.isValid() && endTime?.isValid() && startTime.isSameOrAfter(endTime)) {
    //     return false;
    //   }
    //   return true;
    // }),
    end: yup.string().nullable().required().notOneOf(['Invalid date']),
    // .test('dateValidation', 'End date should be always greater than start date', function () {
    //   const { start, end } = this.parent;
    //   const startTime = moment(start, 'HH:mm');
    //   const endTime = moment(end, 'HH:mm');
    //   console.log('aqaa', start, end, endTime.isSameOrBefore(startTime));

    //   if (startTime?.isValid() && endTime?.isValid() && endTime.isSameOrBefore(startTime)) {
    //     return false;
    //   }
    //   return true;
    // }),
  }),
);

const weekDaySchema = yup.object().shape({
  id: yup.string().required(),
  enabled: yup.boolean().required(),
  data: yup
    .array()
    .when('enabled', {
      is: true,
      then: () => requiredDateSchema,
    })
    .when('enabled', {
      is: false,
      then: () => optionalDateSchema,
    })
    .required(),
});

const exceptionSchema = yup.object().shape({
  id: yup.string().required(),
  start: yup
    .string()
    .required()
    .notOneOf(['Invalid date'])
    .test('dateValidation', 'Start date should be always lower than end date', function () {
      const { start, end } = this.parent;
      const startTime = moment(start);
      const endTime = moment(end);
      if (startTime?.isValid() && endTime?.isValid() && startTime.isSameOrAfter(endTime)) {
        return false;
      }
      return true;
    }),
  end: yup
    .string()
    .required()
    .notOneOf(['Invalid date'])
    .test('dateValidation', 'End date should be always greater than start date', function () {
      const { start, end } = this.parent;
      const startTime = moment(start);
      const endTime = moment(end);
      if (startTime?.isValid() && endTime?.isValid() && endTime.isSameOrBefore(startTime)) {
        return false;
      }
      return true;
    }),
  repeat: yup.string().required().oneOf([ExceptionRepeatEnum.ANNUALLY, ExceptionRepeatEnum.ONE_TIME]),
});

export const upsertBranchSchema = yup.object().shape({
  id: yup.string().required().nullable(),
  general: yup
    .object()
    .shape({
      name: yup
        .object()
        .shape({
          ka: yup.string().required(),
          en: yup.string().required(),
        })
        .required(),
      address: yup.object().shape({
        ka: yup.string().required(),
        en: yup.string().required(),
      }),
      email: yup.string().required(),
      phone: yup.string().required(),
    })
    .required(),
  workingHours: yup.object().shape({
    monday: weekDaySchema,
    tuesday: weekDaySchema,
    wednesday: weekDaySchema,
    thursday: weekDaySchema,
    friday: weekDaySchema,
    saturday: weekDaySchema,
    sunday: weekDaySchema,
  }),
  exceptions: yup.array().of(exceptionSchema).required(),
});
