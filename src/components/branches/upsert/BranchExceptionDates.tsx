import { AddCircleRounded, Delete, Remove } from '@mui/icons-material';
import { Autocomplete, Box, Button, Divider, IconButton, TextField } from '@mui/material';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from 'moment';
import { type UseFormSetValue, type Control, type UseFormTrigger, type UseFormGetValues, useFieldArray, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { ExceptionRepeatEnum, type BranchModel } from '../../../@types/bracnh';
import NoDatText from '../../shared/NoDatText';
import UpsertSectionWrapper from '../../shared/UpsertSectionWrapper';
interface Props {
  control: Control<BranchModel, any>;
  trigger: UseFormTrigger<BranchModel>;
  getValues: UseFormGetValues<BranchModel>;
}

const BranchExceptionDates = ({ control, trigger, getValues }: Props) => {
  const { t } = useTranslation();
  const { append, remove } = useFieldArray({
    control,
    name: 'exceptions',
  });

  const handleExceptionAdd = () => {
    append({ start: '', end: '', repeat: ExceptionRepeatEnum.ONE_TIME, id: uuidv4() });
  };

  return (
    <LocalizationProvider dateLibInstance={moment} dateAdapter={AdapterMoment}>
      <UpsertSectionWrapper title={t('branch.upsert.exception_dates')}>
        {getValues('exceptions').length > 0 ? (
          getValues('exceptions').map((exception, i) => (
            <Box sx={{ width: '100%', display: 'flex', gap: 3, flexDirection: 'column' }} key={exception.id}>
              <Box sx={{ width: '100%', display: 'flex', gap: 2 }}>
                <Controller
                  control={control}
                  name={`exceptions.${i}.start`}
                  render={(params) => (
                    <MobileDateTimePicker
                      sx={{ width: '100%' }}
                      ampmInClock={true}
                      onChange={(value: moment.Moment | null) => {
                        params.field.onChange(value ? value.toISOString() : null);
                        trigger(`exceptions.${i}.end`);
                      }}
                      slotProps={{
                        textField: {
                          inputRef: params.field.ref,
                          error: !!params.fieldState.error,
                          required: true,
                        },
                      }}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`exceptions.${i}.end`}
                  render={(params) => (
                    <MobileDateTimePicker
                      sx={{ width: '100%' }}
                      ampmInClock={true}
                      onChange={(value: moment.Moment | null) => {
                        params.field.onChange(value ? value.toISOString() : null);
                        trigger(`exceptions.${i}.start`);
                      }}
                      slotProps={{
                        textField: {
                          inputRef: params.field.ref,
                          error: !!params.fieldState.error,
                          required: true,
                        },
                      }}
                    />
                  )}
                />
              </Box>
              <Controller
                control={control}
                name={`exceptions.${i}.repeat`}
                render={(params) => (
                  <Autocomplete
                    fullWidth
                    disablePortal
                    options={Object.values(ExceptionRepeatEnum)}
                    getOptionLabel={(opt) => t(`branch.upsert.${opt}`)}
                    onChange={(_, val) => params.field.onChange(val)}
                    filterSelectedOptions
                    value={params.field.value}
                    renderInput={(inputParams) => (
                      <TextField
                        {...inputParams}
                        variant="outlined"
                        label={t('branch.upsert.exception_date_type')}
                        inputRef={params.field.ref}
                        error={!!params.fieldState.error}
                      />
                    )}
                  />
                )}
              />
              <Button sx={{ ml: 'auto' }} startIcon={<Delete />} onClick={() => remove(i)}>
                {t('common.remove')}
              </Button>
              <Divider />
            </Box>
          ))
        ) : (
          <NoDatText text={t('branch.upsert.no_exception_dates')} />
        )}

        <Button sx={{ width: 'fit-content' }} startIcon={<AddCircleRounded />} onClick={handleExceptionAdd}>
          გამონაკლისი თარიღის დამატება
        </Button>
      </UpsertSectionWrapper>
    </LocalizationProvider>
  );
};

export default BranchExceptionDates;
