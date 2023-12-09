import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow,  } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import moment from 'moment';
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
              <TableCell align="center">
                <LocalizationProvider dateLibInstance={moment} dateAdapter={AdapterMoment}>
                  <TimeField
                    disabled={!values[day as keyof typeof values].enabled}
                    label={t('branch.upsert.start_hour')}
                    onChange={(value: moment.Moment | null) => handleValueChange(day, 'start', value ? value.format('HH:mm') : null)}
                    format="HH:mm"
                    InputProps={{ error: !!errors?.[day as keyof typeof values]?.start }}
                    InputLabelProps={{ error: !!errors?.[day as keyof typeof values]?.start }}
                  />
                </LocalizationProvider>
              </TableCell>
              <TableCell align="center">
                <LocalizationProvider dateLibInstance={moment} dateAdapter={AdapterMoment}>
                  <TimeField
                    disabled={!values[day as keyof typeof values].enabled}
                    label={t('branch.upsert.end_hour')}
                    onChange={(value: moment.Moment | null) => handleValueChange(day, 'end', value ? value.format('HH:mm') : null)}
                    format="HH:mm"
                    InputProps={{ error: !!errors?.[day as keyof typeof values]?.end }}
                    InputLabelProps={{ error: !!errors?.[day as keyof typeof values]?.end }}
                  />
                </LocalizationProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </UpsertSectionWrapper>
  );
};

export default BranchWorkingHours;
