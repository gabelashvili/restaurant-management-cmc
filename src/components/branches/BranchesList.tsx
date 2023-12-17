import { Avatar, Box, TableRow, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { type Languages } from '../../@types/common';
import useTableFilters from '../../hooks/useTableFilters';
import { useGetBranchesQuery } from '../../store/api/branchApi';
import CustomTable from '../shared/CustomTable';
import CustomTableBodyCell from '../shared/CustomTableBodyCell';
import CustomTableHeaderCell from '../shared/CustomTableHeaderCell';
import TableHeader from '../shared/TableHeader';

const BranchesList = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Languages;
  const { handleFilterChange, filters } = useTableFilters();
  const { isFetching, data: branches } = useGetBranchesQuery({ ...filters });

  return (
    <CustomTable
      loading={isFetching}
      header={() => (
        <TableHeader
          title={t('branch.branches')}
          handleAdd={{
            title: 'add',
            onClick: () => {},
          }}
        />
      )}
      renderTableHeader={() => headers.map((el) => <CustomTableHeaderCell key={el.label} align={el.align} label={t(el.label)} />)}
      renderTableBody={() =>
        branches?.data.list.map((item, i) => (
          <TableRow key={item._id} hover>
            <CustomTableBodyCell align={headers[0].align} width={'10%'}>{`${i + 1 < 10 ? `0${i + 1}` : i + 1}`}</CustomTableBodyCell>
            <CustomTableBodyCell align={headers[1].align}>{item.name[lang]}</CustomTableBodyCell>
            <CustomTableBodyCell align={headers[2].align}>{item.name[lang]}</CustomTableBodyCell>
            <CustomTableBodyCell align={headers[3].align}>{item.name[lang]}</CustomTableBodyCell>
            <CustomTableBodyCell align={headers[4].align}>{item.address[lang]}</CustomTableBodyCell>
          </TableRow>
        ))
      }
      dataCount={branches?.data.list.length || 0}
      paginationOpts={{
        count: branches?.data.count || 0,
        limit: filters.limit,
        onPageChange: (page) => handleFilterChange('page', page),
        onLimitChange: (limit) => handleFilterChange('limit', limit),
        page: filters.page,
      }}
    />
  );
};

export default BranchesList;

const headers = [
  {
    label: 'common.number_sign' as const,
    align: 'left' as const,
  },
  {
    label: 'branch.branch_name' as const,
    align: 'left' as const,
  },
  {
    label: 'common.address' as const,
    align: 'center' as const,
  },
  {
    label: 'common.email' as const,
    align: 'center' as const,
  },
  {
    label: 'common.phone_number' as const,
    align: 'center' as const,
  },
];
