import moment from 'moment';
import * as yup from 'yup';

import { ExceptionRepeatEnum } from '../@types/branch';

const optionalDateSchema = yup.array().of(
  yup.object().shape({
    _id: yup.string().required(),
    start: yup.string().required().nullable().notOneOf(['Invalid date']),
    end: yup.string().required().nullable().notOneOf(['Invalid date']),
  }),
);

const requiredDateSchema = yup.array().of(
  yup.object().shape({
    _id: yup.string().required(),
    start: yup
      .string()
      .nullable()
      .required()
      .notOneOf(['Invalid date'])
      .test('dateValidation', 'Start date should be always lower than end date', function () {
        const { start, end } = this.parent;
        const startTime = moment(start, 'HH:mm');
        const endTime = moment(end, 'HH:mm');
        if (startTime?.isValid() && endTime?.isValid() && startTime.isSameOrAfter(endTime)) {
          return false;
        }
        return true;
      }),
    end: yup
      .string()
      .nullable()
      .required()
      .notOneOf(['Invalid date'])
      .test('dateValidation', 'End date should be always greater than start date', function () {
        const { start, end } = this.parent;
        const startTime = moment(start, 'HH:mm');
        const endTime = moment(end, 'HH:mm');

        if (startTime?.isValid() && endTime?.isValid() && endTime.isSameOrBefore(startTime)) {
          return false;
        }
        return true;
      }),
  }),
);

const weekDaySchema = yup.object().shape({
  enabled: yup.boolean().required(),
  data: yup
    .array()
    .when('enabled', {
      is: true,
      then: () => requiredDateSchema.min(1),
    })
    .when('enabled', {
      is: false,
      then: () => optionalDateSchema,
    })
    .required(),
});

const exceptionSchema = yup.object().shape({
  _id: yup.string(),
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
      email: yup
        .string()
        .required()
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
        .nullable(),
      phone: yup.string().required().nullable(),
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
