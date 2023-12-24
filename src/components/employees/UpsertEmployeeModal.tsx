import { useEffect, type FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type UpsertEmployeeModel } from '../../@types/employee';
import { useCreateEmployeeMutation, useGetRolesQuery } from '../../store/api/employeeApi';
import { upsertEmployeeSchema } from '../../validations/employee-schemas';
import MultiLangTextField from '../shared/MultiLangTextField';

interface Props {
  open: boolean;
  handleClose: () => void;
}
const UpsertEmployeeModal: FC<Props> = ({ open, handleClose }) => {
  const { t } = useTranslation();
  const [createEmployee, { isLoading: createEmployeeLoading }] = useCreateEmployeeMutation();
  const { isFetching: rolesIsFetching, data: roles } = useGetRolesQuery();

  const { control, getValues, reset } = useForm<UpsertEmployeeModel>({
    defaultValues: {
      email: '',
      firstName: {
        ka: '',
        en: '',
      },
      lastName: {
        ka: '',
        en: '',
      },
      roleId: '',
      phone: '',
    },
    resolver: yupResolver(upsertEmployeeSchema),
  });

  const onSubmit = async () => {
    await createEmployee(getValues());
    handleClose();
  };

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

  return (
    <Dialog open={open} PaperProps={{ sx: { maxWidth: 500, width: '100%' } }}>
      <DialogTitle>{t('employee.add')}</DialogTitle>
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
          defaultValue={''}
          render={(params) => (
            <TextField
              required
              variant="filled"
              fullWidth
              label={t('common.phone_number')}
              error={!!params.fieldState.error}
              inputProps={{ ...params.field, value: params.field.value }}
              onChange={(e) => params.field.onChange(e.target.value)}
            />
          )}
        />
        <Controller
          control={control}
          name={`email`}
          defaultValue={''}
          render={(params) => (
            <TextField
              required
              variant="filled"
              fullWidth
              label={t('common.email')}
              error={!!params.fieldState.error}
              inputProps={{ ...params.field, value: params.field.value }}
              onChange={(e) => params.field.onChange(e.target.value)}
            />
          )}
        />
        <Controller
          control={control}
          name={`roleId`}
          defaultValue={''}
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
                <TextField variant="filled" label={t('common.role')} required error={!!fieldState.error} {...params} />
              )}
            />
          )}
        />
      </DialogContent>
      <Divider sx={{ my: 2 }} />
      <DialogActions>
        <Button onClick={handleClose} color="error">
          {t('common.cancel')}
        </Button>
        <LoadingButton color="success" onClick={onSubmit} loading={createEmployeeLoading}>
          {t('common.add')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default UpsertEmployeeModal;
