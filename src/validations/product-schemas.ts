import * as yup from 'yup';

import { multiLangSchema } from './common-schemas';

export const upsertProductSchema = yup
  .object()
  .shape({
    _id: yup.string().required().nullable(),
    name: multiLangSchema.required(),
    price: yup
      .number()
      .required()
      .nullable()
      .transform((val) => (val === null ? '' : val)),
    categoryId: yup
      .string()
      .required()
      .nullable()
      .transform((val) => (val === null ? '' : val)),
    description: yup.string().required().nullable(),
    image: yup.string().required().nullable(),
  })
  .required();
