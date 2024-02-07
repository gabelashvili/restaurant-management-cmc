import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Divider, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { type ProductModel } from '../../@types/product';
import { upsertProductSchema } from '../../validations/product-schemas';
import Container from '../shared/Container';
import EditorToolbar, { formats, modules } from '../shared/EditorToolbar';
import ImageUpload from '../shared/ImageUpload';
import MultiLangTextField from '../shared/MultiLangTextField';
import UpsertSectionWrapper from '../shared/UpsertSectionWrapper';

type UpsertProductModel = Omit<ProductModel, 'price' | 'category'> & { price: number | null; categoryId: string | null };

const defaultValues: UpsertProductModel = {
  _id: null,
  name: {
    en: '',
    ka: '',
  },
  price: null,
  categoryId: null,
  description: null,
  image: null,
};

const UpsertProduct = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
    watch,
    setValue,
  } = useForm<UpsertProductModel>({
    defaultValues,
    resolver: yupResolver(upsertProductSchema),
  });

  return (
    <Container title={'sata'} centerTitle sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <UpsertSectionWrapper title={t('product.general_info')}>
        <Box sx={{ display: 'grid', gap: 6, width: '100%', gridTemplateColumns: '1fr 180px' }}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', width: '100%' }}>
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
              name={`price`}
              render={(params) => (
                <TextField
                  variant="filled"
                  fullWidth
                  label={t('product.price')}
                  error={!!params.fieldState.error}
                  inputProps={{ ...params.field, value: params.field.value || '' }}
                  onChange={(e) => params.field.onChange(e.target.value || null)}
                  required
                />
              )}
            />
            <Controller
              control={control}
              name={`categoryId`}
              render={(params) => (
                <TextField
                  variant="filled"
                  fullWidth
                  label={t('product_categories.category')}
                  error={!!params.fieldState.error}
                  inputProps={{ ...params.field, value: params.field.value || '' }}
                  onChange={(e) => params.field.onChange(e.target.value || null)}
                  required
                />
              )}
            />
          </Box>
          <Box sx={{ width: '100%', height: '100%' }}>
            <ImageUpload file={file} setFile={setFile} url={null} />
          </Box>
        </Box>
      </UpsertSectionWrapper>
      <UpsertSectionWrapper title={t('product.description')}>
        <div className="text-editor">
          <EditorToolbar />
          <ReactQuill
            style={{ wordBreak: 'break-all', minHeight: 150 }}
            theme="snow"
            value={watch('description') || ''}
            onChange={(value) =>
              setValue('description', value === '<p><br></p>' ? null : value, { shouldValidate: true, shouldDirty: true })
            }
            modules={modules}
            formats={formats}
          />
        </div>
      </UpsertSectionWrapper>
      <Divider />
      <LoadingButton
        // loading={createBranchIsLoading || updateBranchIsLoading}
        variant="contained"
        sx={{ ml: 'auto', display: 'flex', width: 'fit-content' }}
        // onClick={onSubmit}
        disabled={!isDirty}
      >
        {t(false ? `common.update` : `common.add`)}
      </LoadingButton>
    </Container>
  );
};

export default UpsertProduct;
