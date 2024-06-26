import * as yup from 'yup';

import { multiLangSchema } from './common-schemas';

export const signInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const updateDetailSchema = yup.object().shape({
  firstName: multiLangSchema,
  lastName: multiLangSchema,
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
    .required(),
  phone: yup.string().required(),
});

export const updatePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required(),
  newPassword: yup
    .string()
    .required()
    .min(8)
    .when('currentPassword', (currentPassword, schema) => {
      if (currentPassword.length > 0) {
        return schema.notOneOf([yup.ref('currentPassword')], 'password_already_used');
      }
      return schema;
    }),
  repeatNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')])
    .required(),
});
