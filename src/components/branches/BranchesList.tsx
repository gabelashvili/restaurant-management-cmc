import { TableRow } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { type Languages } from '../../@types/common';
import { useAppDispatch } from '../../hooks/store';
import useTableFilters from '../../hooks/useTableFilters';
import { useGetBranchesQuery, useRemoveBranchMutation } from '../../store/api/branchApi';
import { closeWarningModal, setWarningModal, setWarningModalLoading } from '../../store/slices/warningModalSlice';
import CustomTable from '../shared/table/CustomTable';
import CustomTableBodyCell from '../shared/table/CustomTableBodyCell';
import CustomTableHeaderCell from '../shared/table/CustomTableHeaderCell';
import CustomTableMenu from '../shared/table/CustomTableMenu';
import TableHeader from '../shared/TableHeader';

const BranchesList = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language as Languages;
  const { handleFilterChange, filters } = useTableFilters();
  const { isFetching, data: branches } = useGetBranchesQuery({ ...filters });
  const [removeBranch] = useRemoveBranchMutation();

  const handleEdit = (id: string) => navigate(`edit/${id}`);

  const handleRemove = (_id: string, name: string) => {
    dispatch(
      setWarningModal({
        open: true,
        title: t('branch.upsert.remove'),
        description: t('branch.upsert.remove_desc', {
          branch: name,
        }),
        onAgree: async () => {
          dispatch(setWarningModalLoading());
          await removeBranch(_id);
          dispatch(closeWarningModal());
        },
      }),
    );
  };

  return (
    <CustomTable
      loading={isFetching}
      header={() => (
        <TableHeader
          title={t('branch.branches')}
          handleAdd={{
            title: t('branch.upsert.add'),
            onClick: () => navigate('new'),
          }}
          onSearch={(value) => handleFilterChange('search', value)}
        />
      )}
      renderTableHeader={() => headers.map((el) => <CustomTableHeaderCell key={el.label} align={el.align} label={t(el.label)} />)}
      renderTableBody={() =>
        branches?.data.list.map((item) => (
          <TableRow key={item._id} hover>
            <CustomTableBodyCell align={headers[0].align}>{item.name[lang]}</CustomTableBodyCell>
            <CustomTableBodyCell align={headers[1].align}>{item.address[lang]}</CustomTableBodyCell>
            <CustomTableBodyCell align={headers[2].align}>{item.email || '-'}</CustomTableBodyCell>
            <CustomTableBodyCell align={headers[3].align}>{item.phone || '-'}</CustomTableBodyCell>
            <CustomTableBodyCell align={headers[4].align}>
              <CustomTableMenu onEdit={() => handleEdit(item._id)} onRemove={() => handleRemove(item._id, item.name[lang])} />
            </CustomTableBodyCell>
          </TableRow>
        ))
      }
      paginationOpts={{
        count: branches?.data.count || 0,
        limit: filters.limit,
        onPageChange: (page) => handleFilterChange('page', page),
        onLimitChange: (limit) => handleFilterChange('limit', limit),
        page: filters.page,
        visibleDataCount: branches?.data.list.length || 0,
      }}
    />
  );
};

export default BranchesList;

const headers = [
  {
    label: 'branch.branch_name' as const,
    align: 'left' as const,
  },
  {
    label: 'common.address' as const,
    align: 'left' as const,
  },
  {
    label: 'common.email' as const,
    align: 'left' as const,
  },
  {
    label: 'common.phone_number' as const,
    align: 'left' as const,
  },
  {
    label: 'common.empty' as const,
    align: 'right' as const,
  },
];
