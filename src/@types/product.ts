import { type MultiLangModel } from './common';
import { type ProductCategoryModel } from './product-category';

export interface ProductModel {
  _id: string | null;
  name: MultiLangModel;
  price: number;
  category: ProductCategoryModel | null;
  image: string | null;
  description: string | null;
}
