import { useEffect, type FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type Languages } from '../../@types/common';
import { ProductCategoryTypeEnum, type ProductCategoryModel } from '../../@types/product-category';
import { useCreateProductCategoriesMutation, useUpdateProductCategoriesMutation } from '../../store/api/productCategoryApi';
import { upsertProductCategorySchema } from '../../validations/prduct-category-schemas';
import MultiLangTextField from '../shared/MultiLangTextField';

interface Props {
  open: boolean;
  handleClose: () => void;
  editItem: ProductCategoryModel | null;
}

const defaultValues = {
  name: {
    ka: '',
    en: '',
  },
  type: null,
};

const UpsertPoductCategoryModal: FC<Props> = ({ open, handleClose, editItem }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Languages;
  const [createProductCategory, { isLoading: createProductCategoryLoading }] = useCreateProductCategoriesMutation();
  const [updateProductCategory, { isLoading: updateProductCategoryLoading }] = useUpdateProductCategoriesMutation();

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<Omit<ProductCategoryModel, 'type' | '_id'> & { type: null | ProductCategoryTypeEnum }>({
    defaultValues,
    resolver: yupResolver(upsertProductCategorySchema),
  });
  console.log(errors, 2213);

  const onClose = () => {
    handleClose();
    reset(defaultValues);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (editItem) {
      try {
        const response = await updateProductCategory({ ...(data as ProductCategoryModel), _id: editItem._id }).unwrap();
        if (response.success) {
          onClose();
        }
      } catch (error) {}
    } else {
      try {
        const response = await createProductCategory({ ...(data as ProductCategoryModel) }).unwrap();
        if (response.success) {
          onClose();
        }
      } catch (error) {}
    }
  });

  useEffect(() => {
    if (editItem) {
      reset({
        name: editItem.name,
        type: editItem.type,
      });
    }
  }, [editItem]);

  return (
    <Dialog open={open} PaperProps={{ sx: { maxWidth: 500, width: '100%' } }}>
      <DialogTitle>{editItem ? editItem.name[lang] : t('product_categories.add')}</DialogTitle>
      <Divider />
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Controller
          control={control}
          name={`name`}
          render={(params) => (
            <MultiLangTextField
              variant="filled"
              fullWidth
              label={t('common.name')}
              required
              onChange={params.field.onChange}
              value={params.field.value}
              error={!!params.fieldState.error}
              ref={params.field.ref}
            />
          )}
        />
        <Controller
          control={control}
          name={`type`}
          render={({ field, fieldState }) => (
            <Autocomplete
              fullWidth
              disablePortal
              disableClearable={!field.value}
              options={Object.keys(ProductCategoryTypeEnum)}
              getOptionLabel={(val) => t(`product_categories.${val as ProductCategoryTypeEnum}`)}
              onChange={(_, val) => {
                field.onChange(val || null);
              }}
              value={field.value}
              renderInput={(params) => (
                <TextField
                  variant="filled"
                  label={t('common.type')}
                  required
                  error={!!fieldState.error}
                  {...params}
                  InputLabelProps={{ ...params.InputLabelProps, children: null }}
                />
              )}
            />
          )}
        />
      </DialogContent>
      <Divider sx={{ my: 2 }} />
      <DialogActions>
        <LoadingButton onClick={onClose} color="error" loading={createProductCategoryLoading || updateProductCategoryLoading}>
          {t('common.cancel')}
        </LoadingButton>
        <LoadingButton
          color="success"
          onClick={onSubmit}
          loading={createProductCategoryLoading || updateProductCategoryLoading}
          disabled={!isDirty}
        >
          {t(`common.${editItem?._id ? 'edit' : 'add'}`)}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default UpsertPoductCategoryModal;
