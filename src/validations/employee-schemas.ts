import * as yup from 'yup';

import { multiLangSchema } from './common-schemas';

export const upsertEmployeeSchema = yup.object().shape({
  firstName: multiLangSchema.required(),
  lastName: multiLangSchema.required(),
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
    .required(),
  roleId: yup.string().required(),
  phone: yup.string().required(),
});
