import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeesAdditionalFiltersModel } from '../../@types/employee';
import { useAppSelector } from '../../hooks/store';
import { selectRoles } from '../../store/api/employeeApi';
import { employeesAdditionalFiltersSchema } from '../../validations/employee-schemas';

interface Props {
  closeAdditionalFilters: VoidFunction;
  handleChange: (filters: EmployeesAdditionalFiltersModel) => void;
}
const EmployeesAdditionalFilters = ({ closeAdditionalFilters, handleChange }: Props) => {
  const { t } = useTranslation();
  const roles = useAppSelector((state) => selectRoles(state));
  const {
    control,
    formState: { isDirty },
    handleSubmit,
  } = useForm<EmployeesAdditionalFiltersModel>({
    resolver: yupResolver(employeesAdditionalFiltersSchema),
    defaultValues: {
      roleId: null,
    },
  });

  const onSubmit = handleSubmit((data) => {
    handleChange(data);
    closeAdditionalFilters();
  });

  return (
    <>
      <Controller
        control={control}
        name={`roleId`}
        render={({ field, fieldState }) => (
          <Autocomplete
            fullWidth
            loading={!roles}
            options={roles || []}
            getOptionLabel={({ roleName }) => t(`roles.${roleName}`)}
            onChange={(_, val) => {
              field.onChange(val?.roleId || null);
            }}
            value={roles?.find((role) => role.roleId === Number(field.value)) || null}
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
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button onClick={() => closeAdditionalFilters()}>{t('common.cancel')}</Button>
        <Button onClick={onSubmit} disabled={!isDirty}>
          {t('common.save')}
        </Button>
      </Box>
    </>
  );
};

export default EmployeesAdditionalFilters;
