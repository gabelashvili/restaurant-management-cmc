import { type MouseEvent, useState } from 'react';

import { MoreVert } from '@mui/icons-material';
import { Box, Checkbox, IconButton, Menu, MenuItem, Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import moment from 'moment';
import { type Control, Controller, type UseFormTrigger, type UseFormGetValues, type UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuid4 } from 'uuid';

import { type BranchWorkingHoursModel, type BranchModel } from '../../../@types/branch';
import UpsertSectionWrapper from '../../shared/UpsertSectionWrapper';
interface Props {
  control: Control<BranchModel, any>;
  trigger: UseFormTrigger<BranchModel>;
  getValues: UseFormGetValues<BranchModel>;
  setValue: UseFormSetValue<BranchModel>;
  loading?: boolean;
}
const BranchWorkingHours = ({ control, trigger, getValues, setValue, loading }: Props) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openItemId, setOpenItemId] = useState<null | string>(null);

  const handleOpen = (e: MouseEvent<HTMLButtonElement>, id?: string) => {
    if (!id) {
      return;
    }
    setAnchorEl(e.currentTarget);
    setOpenItemId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenItemId(null);
  };

  const removeItem = (day: keyof BranchWorkingHoursModel, id?: string) => {
    if (!id) {
      return;
    }
    setValue(
      `workingHours.${day}.data`,
      getValues('workingHours')[day].data.filter((el) => el._id !== id),
      { shouldDirty: true },
    );
    trigger(`workingHours.${day}`);
  };

  const insertNewDate = (index: number, day: keyof BranchWorkingHoursModel) => {
    const data = [...getValues(`workingHours.${day}.data`)];

    data.splice(index + 1, 0, {
      _id: `new-${uuid4()}`,
      end: null,
      start: null,
    });
    console.log(data);
    setValue(`workingHours.${day}.data`, data, { shouldDirty: true });
    trigger(`workingHours.${day}`);
  };

  return (
    <LocalizationProvider dateLibInstance={moment} dateAdapter={AdapterMoment}>
      <UpsertSectionWrapper title={t('branch.working_hours')}>
        {loading ? (
          <Skeleton variant="rounded" height={300} />
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={(theme) => ({ '& th': { borderBottom: `1px solid ${theme.palette.divider}` } })}>
                <TableCell width={'10%'}></TableCell>
                <TableCell align="left">{t('week_days.title')}</TableCell>
                <TableCell align="center">{t('branch.start')}</TableCell>
                <TableCell align="center">{t('branch.end')}</TableCell>
                <TableCell width={'1%'} align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={(theme) => ({
                '& td': {
                  borderBottom: `1px solid ${theme.palette.divider}`,
                },
                '& > :last-child td': { border: 0 },
              })}
            >
              {[
                'monday' as const,
                'tuesday' as const,
                'wednesday' as const,
                'thursday' as const,
                'friday' as const,
                'saturday' as const,
                'sunday' as const,
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
                    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                      {getValues('workingHours')[day].data.map((workingHour, workingHourI) => (
                        <Controller
                          control={control}
                          key={`${workingHour._id} - start`}
                          name={`workingHours.${day}.data.${workingHourI}.start`}
                          render={({ field, fieldState }) => (
                            <TimeField
                              disabled={!getValues('workingHours')[day].enabled}
                              label={t('branch.start_hour')}
                              sx={{ width: '100%' }}
                              required={getValues('workingHours')[day].enabled}
                              format="HH:mm"
                              InputProps={{ error: !!fieldState.error }}
                              InputLabelProps={{ error: !!fieldState.error }}
                              onChange={(value: moment.Moment | null) => {
                                field.onChange(value ? value.format('HH:mm') : null);
                                trigger(`workingHours.${day}.data.${workingHourI}`);
                              }}
                              inputRef={field.ref}
                              defaultValue={moment(field.value, 'HH:mm')}
                            />
                          )}
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                      {getValues('workingHours')[day].data.map((workingHour, workingHourI) => (
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 2,
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'center',
                            position: 'relative',
                          }}
                          key={`${workingHour._id} - end`}
                        >
                          <Controller
                            control={control}
                            name={`workingHours.${day}.data.${workingHourI}.end`}
                            render={({ field, fieldState }) => (
                              <TimeField
                                sx={{ width: 'calc(100%)' }}
                                disabled={!getValues('workingHours')[day].enabled}
                                label={t('branch.end_hour')}
                                required={getValues('workingHours')[day].enabled}
                                format="HH:mm"
                                InputProps={{ error: !!fieldState.error }}
                                InputLabelProps={{ error: !!fieldState.error }}
                                onChange={(value: moment.Moment | null) => {
                                  field.onChange(value ? value.format('HH:mm') : null);
                                  trigger(`workingHours.${day}.data.${workingHourI}`);
                                }}
                                inputRef={field.ref}
                                name={field.name}
                                defaultValue={moment(field.value, 'HH:mm')}
                              />
                            )}
                          />

                          <IconButton
                            sx={{ position: 'absolute', right: 0, transform: 'translate(120%, -50%)', top: '50%' }}
                            onClick={(e) => handleOpen(e, workingHour._id)}
                          >
                            <MoreVert />
                          </IconButton>
                          <Menu anchorEl={anchorEl} open={!!anchorEl && openItemId === workingHour._id} onClose={handleMenuClose}>
                            <MenuItem
                              sx={{ color: 'error.main' }}
                              onClick={() => {
                                removeItem(day, workingHour._id);
                                handleMenuClose();
                              }}
                            >
                              {t('common.remove')}
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                insertNewDate(workingHourI, day);
                                handleMenuClose();
                              }}
                            >
                              {t('common.add')}
                            </MenuItem>
                          </Menu>
                        </Box>
                      ))}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </UpsertSectionWrapper>
    </LocalizationProvider>
  );
};

export default BranchWorkingHours;
