import { useState } from 'react';

import { Avatar, Box, TableRow, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import EmployeesAdditionalFilters from './EmployeesAdditionalFilters';
import UpsertEmployeeModal from './UpsertEmployeeModal';
import { type Languages } from '../../@types/common';
import { type EmployeeModel } from '../../@types/employee';
import { useAppDispatch } from '../../hooks/store';
import useTableFilters from '../../hooks/useTableFilters';
import { useGetEmployeesQuery, useRemoveEmployeeMutation } from '../../store/api/employeeApi';
import { closeWarningModal, setWarningModal, setWarningModalLoading } from '../../store/slices/warningModalSlice';
import { generateAvatarImage } from '../../utils/utils';
import CustomTable from '../shared/table/CustomTable';
import CustomTableBodyCell from '../shared/table/CustomTableBodyCell';
import CustomTableHeaderCell from '../shared/table/CustomTableHeaderCell';
import CustomTableMenu from '../shared/table/CustomTableMenu';
import TableHeader from '../shared/TableHeader';

const EmployeesList = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const { handleFilterChange, filters } = useTableFilters();
  const { isFetching, data: employees } = useGetEmployeesQuery({ ...filters });
  const [removeEmployee] = useRemoveEmployeeMutation();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editItem, setEditItem] = useState<EmployeeModel | null>(null);
  const lang = i18n.language as Languages;

  const handleRemove = (_id: string, name: string) => {
    dispatch(
      setWarningModal({
        open: true,
        title: t('employee.remove'),
        description: t('employee.remove_desc', {
          branch: name,
        }),
        onAgree: async () => {
          dispatch(setWarningModalLoading());
          await removeEmployee(_id);
          dispatch(closeWarningModal());
        },
      }),
    );
  };

  return (
    <>
      <UpsertEmployeeModal
        editItem={editItem}
        open={openAddModal}
        handleClose={() => {
          setOpenAddModal(false);
          setEditItem(null);
        }}
      />
      <CustomTable
        header={() => (
          <TableHeader
            title={t('employee.title')}
            handleAdd={{
              onClick: () => setOpenAddModal(true),
              title: t('employee.add'),
            }}
            onSearch={(value) => handleFilterChange('search', value)}
          />
        )}
        additionalFilters={() => <EmployeesAdditionalFilters />}
        loading={isFetching}
        renderTableHeader={() => headers.map((el) => <CustomTableHeaderCell key={el.label} align={el.align} label={t(el.label)} />)}
        renderTableBody={() =>
          employees?.data?.list?.map((item) => (
            <TableRow key={item._id} hover>
              <CustomTableBodyCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {item.avatar ? (
                    <Avatar src={generateAvatarImage(null, item.avatar)} />
                  ) : (
                    <Avatar>{`${item.firstName[lang][0]}${item.lastName[lang][0]}`}</Avatar>
                  )}
                  <Typography>{`${item.firstName[lang]} ${item.lastName[lang]} `}</Typography>
                </Box>
              </CustomTableBodyCell>
              <CustomTableBodyCell align={headers[1].align}>{t(`roles.${item.role.roleName}`)}</CustomTableBodyCell>
              <CustomTableBodyCell align={headers[2].align}>{item.email}</CustomTableBodyCell>
              <CustomTableBodyCell align={headers[3].align}>{item.phone}</CustomTableBodyCell>
              <CustomTableBodyCell align={headers[4].align}>
                <CustomTableMenu
                  onEdit={() => {
                    setEditItem(item);
                    setOpenAddModal(true);
                  }}
                  onRemove={() => handleRemove(item._id, `${item.firstName[lang]} ${item.lastName[lang]}`)}
                />
              </CustomTableBodyCell>
            </TableRow>
          ))
        }
        paginationOpts={{
          count: employees?.data.count || 0,
          limit: filters.limit,
          onPageChange: (page) => handleFilterChange('page', page),
          onLimitChange: (limit) => handleFilterChange('limit', limit),
          page: filters.page,
          visibleDataCount: employees?.data.list.length || 0,
        }}
      />
    </>
  );
};

export default EmployeesList;

const headers = [
  {
    label: 'common.employee' as const,
    align: 'left' as const,
  },
  {
    label: 'common.role' as const,
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
