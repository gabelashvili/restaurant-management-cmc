import { useState } from 'react';

import { TableRow } from '@mui/material';
import { useTranslation } from 'react-i18next';

import UpsertPoductCategoryModal from './UpsertPoductCategoryModal';
import { type Languages } from '../../@types/common';
import { type ProductCategoryModel } from '../../@types/product-category';
import { useAppDispatch } from '../../hooks/store';
import useTableFilters from '../../hooks/useTableFilters';
import { useGetProductCategoriesQuery, useRemoveProductCategoryMutation } from '../../store/api/productCategoryApi';
import { closeWarningModal, setWarningModal, setWarningModalLoading } from '../../store/slices/warningModalSlice';
import CustomTable from '../shared/table/CustomTable';
import CustomTableBodyCell from '../shared/table/CustomTableBodyCell';
import CustomTableHeaderCell from '../shared/table/CustomTableHeaderCell';
import CustomTableMenu from '../shared/table/CustomTableMenu';
import TableHeader from '../shared/TableHeader';

const initialFilters = {
  page: 1,
  limit: 10,
  search: null,
  sortDir: null,
  sortBy: null,
};

const ProductCategoriesList = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Languages;
  const { handleFilterChange, selectedFilters, queryParams, handleMultipleFiltersChange } = useTableFilters(initialFilters);
  const { data: productCategories, isFetching } = useGetProductCategoriesQuery(queryParams);
  const [removeProductCategory] = useRemoveProductCategoryMutation();

  const [openUpsertModal, setOpenUpsertModal] = useState(false);
  const [editItem, setEditItem] = useState<ProductCategoryModel | null>(null);

  const handleRemove = (_id: string, name: string) => {
    dispatch(
      setWarningModal({
        open: true,
        title: t('product_categories.remove'),
        description: t('product_categories.remove_desc', {
          category: name,
        }),
        onAgree: async () => {
          dispatch(setWarningModalLoading());
          await removeProductCategory(_id);
          dispatch(closeWarningModal());
        },
      }),
    );
  };

  return (
    <>
      <UpsertPoductCategoryModal
        editItem={editItem}
        open={openUpsertModal}
        handleClose={() => {
          setOpenUpsertModal(false);
          setEditItem(null);
        }}
      />
      <CustomTable
        header={() => (
          <TableHeader
            title={t('product_categories.title')}
            handleAdd={{
              onClick: () => setOpenUpsertModal(true),
              title: t('product_categories.add'),
            }}
            onSearch={(value) => handleFilterChange('search', value || null)}
          />
        )}
        loading={isFetching}
        renderTableHeader={() =>
          getTableHeaders(lang).map(({ label, ...el }) => (
            <CustomTableHeaderCell
              key={label}
              label={t(label)}
              {...el}
              sortDir={selectedFilters.sortBy === el.sortKey ? selectedFilters.sortDir : null}
              handleOrder={(val) => {
                if (el.sortKey) {
                  handleMultipleFiltersChange({
                    sortBy: el.sortKey,
                    sortDir: val,
                  });
                }
              }}
            />
          ))
        }
        renderTableBody={() =>
          productCategories?.data?.list?.map((item) => (
            <TableRow key={item._id} hover>
              <CustomTableBodyCell align={getTableHeaders(lang)[0].align}>{item.name[lang]}</CustomTableBodyCell>
              <CustomTableBodyCell align={getTableHeaders(lang)[1].align}>
                <CustomTableMenu
                  onEdit={() => {
                    setEditItem(item);
                    setOpenUpsertModal(true);
                  }}
                  onRemove={() => handleRemove(item._id, item.name[lang])}
                />
              </CustomTableBodyCell>
            </TableRow>
          ))
        }
        paginationOpts={{
          count: productCategories?.data.count || 0,
          limit: selectedFilters.limit,
          onPageChange: (page) => handleFilterChange('page', page),
          onLimitChange: (limit) => handleFilterChange('limit', limit),
          page: selectedFilters.page,
          visibleDataCount: productCategories?.data.list.length || 0,
        }}
      />
    </>
  );
};

export default ProductCategoriesList;

const getTableHeaders = (selectedLang: string) => [
  {
    label: 'common.name' as const,
    align: 'left' as const,
    sortKey: `name.${selectedLang}`,
  },
  {
    label: 'common.empty' as const,
    align: 'right' as const,
  },
];
