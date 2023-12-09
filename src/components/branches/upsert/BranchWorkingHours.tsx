import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import moment from 'moment';
import { type Control, Controller, type UseFormTrigger, type UseFormGetValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type BranchModel } from '../../../@types/bracnh';
import UpsertSectionWrapper from '../../shared/UpsertSectionWrapper';
interface Props {
  control: Control<BranchModel, any>;
  trigger: UseFormTrigger<BranchModel>;
  getValues: UseFormGetValues<BranchModel>;
}
const BranchWorkingHours = ({ control, trigger, getValues }: Props) => {
  const { t } = useTranslation();

  return (
    <LocalizationProvider dateLibInstance={moment} dateAdapter={AdapterMoment}>
      <UpsertSectionWrapper title={t('branch.upsert.working_hours')}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={(theme) => ({ '& th': { borderBottom: `1px solid ${theme.palette.divider}` } })}>
              <TableCell width={'10%'}></TableCell>
              <TableCell align="left">{t('week_days.title')}</TableCell>
              <TableCell align="center">{t('branch.upsert.start')}</TableCell>
              <TableCell align="center">{t('branch.upsert.end')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={(theme) => ({ '& td': { borderBottom: `1px solid ${theme.palette.divider}` } })}>
            {[
              'monday' as const,
              'sunday' as const,
              'tuesday' as const,
              'wednesday' as const,
              'thursday' as const,
              'friday' as const,
              'saturday' as const,
            ].map((day) => (
              <TableRow key={day}>
                <TableCell align="left">
                  <Controller
                    control={control}
                    name={`workingHours.${day}.enabled`}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                          trigger(`workingHours.${day}`);
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell align="left">{t(`week_days.${day}`)}</TableCell>
                <TableCell align="center">
                  <Controller
                    control={control}
                    name={`workingHours.${day}.start`}
                    render={({ field, fieldState }) => (
                      <TimeField
                        disabled={!getValues('workingHours')[day].enabled}
                        label={t('branch.upsert.start_hour')}
                        format="HH:mm"
                        InputProps={{ error: !!fieldState.error }}
                        InputLabelProps={{ error: !!fieldState.error }}
                        onChange={(value: moment.Moment | null) => {
                          field.onChange(value ? value.format('HH:mm') : null);
                          trigger(`workingHours.${day}.end`);
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell align="center">
                  <Controller
                    control={control}
                    name={`workingHours.${day}.end`}
                    render={({ field, fieldState }) => (
                      <TimeField
                        disabled={!getValues('workingHours')[day].enabled}
                        label={t('branch.upsert.end_hour')}
                        format="HH:mm"
                        InputProps={{ error: !!fieldState.error }}
                        InputLabelProps={{ error: !!fieldState.error }}
                        onChange={(value: moment.Moment | null) => {
                          field.onChange(value ? value.format('HH:mm') : null);
                          trigger(`workingHours.${day}.start`);
                        }}
                      />
                    )}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </UpsertSectionWrapper>
    </LocalizationProvider>
  );
};

export default BranchWorkingHours;
