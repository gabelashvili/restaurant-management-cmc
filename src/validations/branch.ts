import * as yup from 'yup';

const weekDaySchema = yup.object().shape({
  enabled: yup.boolean().required(),
  start: yup
    .string()
    .required()
    .when('enabled', {
      is: false,
      then: (schema) => schema.nullable(),
    }),
  end: yup
    .string()
    .required()
    .when('enabled', {
      is: false,
      then: (schema) => schema.nullable(),
    }),
});

export const upsertBranchSchema = yup.object().shape({
  general: yup.object().shape({
    id: yup.string().nullable().required(),
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
