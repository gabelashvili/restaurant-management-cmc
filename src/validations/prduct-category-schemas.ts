import * as yup from 'yup';

import { multiLangSchema } from './common-schemas';

export const upsertProductCategorySchema = yup
  .object()
  .shape({
    name: multiLangSchema.required(),
  })
  .required();
