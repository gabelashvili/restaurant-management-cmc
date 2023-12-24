import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type UpsertEmployeeModel } from '../../@types/employee';
import { useCreateEmployeeMutation } from '../../store/api/employeeApi';
import { upsertEmployeeSchema } from '../../validations/employee-schemas';
import MultiLangTextField from '../shared/MultiLangTextField';

const UpsertEmployeeModal = () => {
  const { t } = useTranslation();
  const [createEmployee, { isLoading: createEmployeeLoading }] = useCreateEmployeeMutation();

  const { handleSubmit, control } = useForm<UpsertEmployeeModel>({
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

  const onSubmit = handleSubmit((data) => {
    createEmployee(data);
  });

  return (
    <Dialog open={true} PaperProps={{ sx: { maxWidth: 500, width: '100%' } }}>
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
              options={[]}
              // getOptionLabel={(opt) => t(`roles.${opt.toLowerCase() as const}`)}
              renderInput={(params) => <TextField variant="filled" label={t('common.role')} error={!!fieldState.error} {...params} />}
            />
          )}
        />
      </DialogContent>
      <Divider sx={{ my: 2 }} />
      <DialogActions>
        <Button color="error">{t('common.cancel')}</Button>
        <LoadingButton color="success" onClick={onSubmit} loading={createEmployeeLoading}>
          {t('common.add')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default UpsertEmployeeModal;
