import moment from 'moment';
import * as yup from 'yup';

import { ExceptionRepeatEnum } from '../@types/bracnh';

const weekDaySchema = yup.object().shape({
  id: yup.string(),
  enabled: yup.boolean().required(),
  start: yup
    .string()
    .required()
    .nullable()
    .notOneOf(['Invalid date'])
    .when('enabled', {
      is: true,
      then: () => yup.string().required(),
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
    .nullable()
    .notOneOf(['Invalid date'])
    .when('enabled', {
      is: true,
      then: () => yup.string().required(),
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
      console.log(startTime.isValid());

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
          ge: yup.string().required(),
          en: yup.string().required(),
        })
        .required(),
      address: yup.object().shape({
        ge: yup.string().required(),
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
