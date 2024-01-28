import baseApi from './baseApi';
import { type WithPaginationModel, type ResponseModel } from '../../@types/common';
import { type ProductCategoryModel } from '../../@types/product-category';

const productCategoryApiTags = {
  getProductCategories: 'GET_PRODUCT_CATEGORIES',
};

const productCategoryApi = baseApi.enhanceEndpoints({ addTagTypes: [...Object.values(productCategoryApiTags)] }).injectEndpoints({
  endpoints: (build) => ({
    getProductCategories: build.query<ResponseModel<WithPaginationModel<ProductCategoryModel[]>>, Record<string, string>>({
      query: (args) => ({
        url: `product-categories`,
        method: 'GET',
        params: { ...args },
      }),
      providesTags: [productCategoryApiTags.getProductCategories],
    }),
    createProductCategories: build.mutation<ResponseModel<ProductCategoryModel>, Omit<ProductCategoryModel, '_id'>>({
      query: (args) => ({
        url: `product-categories`,
        method: 'POST',
        body: args,
      }),
      invalidatesTags: (result, error) => (error ? [] : [productCategoryApiTags.getProductCategories]),
    }),
    updateProductCategories: build.mutation<ResponseModel<ProductCategoryModel>, ProductCategoryModel>({
      query: ({ _id, ...data }) => ({
        url: `product-categories/${_id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : [productCategoryApiTags.getProductCategories]),
    }),
    removeProductCategory: build.mutation<ResponseModel<null>, string>({
      query: (productCategoryId) => ({
        url: `product-categories/${productCategoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error) => (error ? [] : [productCategoryApiTags.getProductCategories]),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductCategoriesQuery,
  useUpdateProductCategoriesMutation,
  useCreateProductCategoriesMutation,
  useRemoveProductCategoryMutation,
} = productCategoryApi;
export default productCategoryApi;
