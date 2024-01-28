import * as yup from 'yup';

import { multiLangSchema } from './common-schemas';
import { ProductCategoryTypeEnum } from '../@types/product-category';

export const upsertProductCategorySchema = yup
  .object()
  .shape({
    name: multiLangSchema.required(),
    type: yup.string().oneOf([ProductCategoryTypeEnum.dish, ProductCategoryTypeEnum.drink]).required().nullable(),
    // .transform((val) => (val === null ? undefined : val)),
  })
  .required();
