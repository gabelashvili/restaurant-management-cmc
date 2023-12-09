import { Autocomplete, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { type UseFormClearErrors, type FieldErrors, type UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type WorkingHourModel, type BranchModel, type BranchWorkingHoursModel } from '../../../@types/bracnh';
import UpsertSectionWrapper from '../../shared/UpsertSectionWrapper';

interface Props {
  values: BranchWorkingHoursModel;
  setValue: UseFormSetValue<BranchModel>;
  errors?: FieldErrors<BranchWorkingHoursModel>;
  clearErrors: UseFormClearErrors<BranchModel>;
}
const BranchWorkingHours = ({ values, setValue, errors, clearErrors }: Props) => {
  const { t } = useTranslation();

  const handleValueChange = (day: string, field: keyof WorkingHourModel, value: any) => {
    setValue(`workingHours.${day as keyof typeof values}.${field}`, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
    if (field === 'enabled' && !value) {
      clearErrors(`workingHours.${day as keyof typeof values}`);
    }
  };

  return (
    <UpsertSectionWrapper title="სამუშაო საათები">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={(theme) => ({ '& th': { borderBottom: `1px solid ${theme.palette.divider}` } })}>
            <TableCell width={'10%'}></TableCell>
            <TableCell align="left">კვირის დღე</TableCell>
            <TableCell align="center">დაწყება</TableCell>
            <TableCell align="center">დასრულება</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={(theme) => ({ '& td': { borderBottom: `1px solid ${theme.palette.divider}` } })}>
          {Object.keys(values).map((day) => (
            <TableRow key={day}>
              <TableCell align="left">
                <Checkbox
                  checked={values[day as keyof typeof values].enabled}
                  onChange={(e) => handleValueChange(day, 'enabled', e.target.checked)}
                />
              </TableCell>
              <TableCell align="left">{t(`week_days.${day}`)}</TableCell>
              <TableCell align="left">
                <Autocomplete
                  value={values[day as keyof typeof values].start}
                  size="small"
                  options={[]}
                  renderInput={(params) => <TextField {...params} error={!!errors?.[day as keyof typeof values]} />}
                  onChange={() =>
                    setValue(`workingHours.${day as keyof typeof values}.start`, null, { shouldValidate: true, shouldDirty: true })
                  }
                />
              </TableCell>
              <TableCell align="left">
                <Autocomplete
                  value={values[day as keyof typeof values].end}
                  size="small"
                  options={[]}
                  renderInput={(params) => <TextField {...params} error={!!errors?.[day as keyof typeof values]} />}
                  onChange={() =>
                    setValue(`workingHours.${day as keyof typeof values}.end`, null, { shouldValidate: true, shouldDirty: true })
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </UpsertSectionWrapper>
  );
};

export default BranchWorkingHours;
