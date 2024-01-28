import { type MultiLangModel } from './common';

export enum ProductCategoryTypeEnum {
  drink = 'drink',
  dish = 'dish',
}

export interface ProductCategoryModel {
  _id: string;
  name: MultiLangModel;
  type: ProductCategoryTypeEnum;
}
