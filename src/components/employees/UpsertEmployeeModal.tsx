import { useEffect, type FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type Languages } from '../../@types/common';
import { type EmployeeModel, type UpsertEmployeeModel } from '../../@types/employee';
import { useCreateEmployeeMutation, useGetRolesQuery, useUpdateEmployeeMutation } from '../../store/api/employeeApi';
import { upsertEmployeeSchema } from '../../validations/employee-schemas';
import MultiLangTextField from '../shared/MultiLangTextField';

interface Props {
  open: boolean;
  handleClose: () => void;
  editItem: EmployeeModel | null;
}

const defaultValues = {
  email: '',
  firstName: {
    ka: '',
    en: '',
  },
  lastName: {
    ka: '',
    en: '',
  },
  roleId: 0,
  phone: '',
};

const UpsertEmployeeModal: FC<Props> = ({ open, handleClose, editItem }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Languages;

  const [createEmployee, { isLoading: createEmployeeLoading }] = useCreateEmployeeMutation();
  const [updateEmployee, { isLoading: updateEmployeeLoading }] = useUpdateEmployeeMutation();
  const { isFetching: rolesIsFetching, data: roles } = useGetRolesQuery();

  const { control, reset, handleSubmit } = useForm<UpsertEmployeeModel>({
    defaultValues,
    resolver: yupResolver(upsertEmployeeSchema),
  });

  const onClose = () => {
    handleClose();
    reset(defaultValues);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (editItem) {
      const response = await updateEmployee({ data: { ...data }, employeeId: editItem._id }).unwrap();
      if (response.success) {
        onClose();
      }
    } else {
      const response = await createEmployee({ ...data }).unwrap();
      if (response.success) {
        onClose();
      }
    }
  });

  useEffect(() => {
    if (editItem) {
      reset({
        firstName: editItem.firstName,
        lastName: editItem.lastName,
        email: editItem.email,
        phone: editItem.phone,
        roleId: editItem.role.roleId,
      });
    }
  }, [editItem]);

  return (
    <Dialog open={open} PaperProps={{ sx: { maxWidth: 500, width: '100%' } }}>
      <DialogTitle>{editItem ? `${editItem.firstName[lang]} ${editItem.lastName[lang]}` : t('employee.add')}</DialogTitle>
      <Divider />
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Controller
          control={control}
          name={`firstName`}
          render={(params) => (
            <MultiLangTextField
              variant="filled"
              fullWidth
              label={t('common.first_name')}
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
          name={`lastName`}
          render={(params) => (
            <MultiLangTextField
              variant="filled"
              fullWidth
              label={t('common.last_name')}
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
          name={`phone`}
          render={(params) => (
            <TextField
              required
              variant="filled"
              fullWidth
              label={t('common.phone_number')}
              error={!!params.fieldState.error}
              inputProps={{ ...params.field }}
            />
          )}
        />
        <Controller
          control={control}
          name={`email`}
          render={(params) => (
            <TextField
              required
              variant="filled"
              fullWidth
              label={t('common.email')}
              error={!!params.fieldState.error}
              inputProps={{ ...params.field }}
            />
          )}
        />
        <Controller
          control={control}
          name={`roleId`}
          render={({ field, fieldState }) => (
            <Autocomplete
              fullWidth
              disablePortal
              disableClearable={!field.value}
              loading={rolesIsFetching}
              options={roles?.data ? [...roles.data].sort((a, b) => a.roleId - b.roleId) : []}
              getOptionLabel={({ roleName }) => t(`roles.${roleName}`)}
              onChange={(_, val) => {
                field.onChange(val?.roleId || null);
              }}
              value={roles?.data.find((role) => role.roleId === Number(field.value)) || null}
              renderInput={(params) => (
                <TextField
                  variant="filled"
                  label={t('common.role')}
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
        <LoadingButton onClick={onClose} color="error" loading={createEmployeeLoading || updateEmployeeLoading}>
          {t('common.cancel')}
        </LoadingButton>
        <LoadingButton color="success" onClick={onSubmit} loading={createEmployeeLoading || updateEmployeeLoading}>
          {t(`common.${editItem?._id ? 'edit' : 'add'}`)}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default UpsertEmployeeModal;
