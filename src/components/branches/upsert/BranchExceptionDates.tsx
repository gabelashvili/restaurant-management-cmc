import { AddCircleRounded, Delete } from '@mui/icons-material';
import { Autocomplete, Box, Button, Divider, Skeleton, TextField } from '@mui/material';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { type Control, type UseFormTrigger, useFieldArray, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuid4 } from 'uuid';

import { ExceptionRepeatEnum, type BranchModel } from '../../../@types/branch';
import NoDatText from '../../shared/NoDatText';
import UpsertSectionWrapper from '../../shared/UpsertSectionWrapper';
interface Props {
  control: Control<BranchModel, any>;
  trigger: UseFormTrigger<BranchModel>;
  loading?: boolean;
}

const BranchExceptionDates = ({ control, trigger, loading }: Props) => {
  const { t } = useTranslation();
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'exceptions',
  });

  const handleExceptionAdd = () => {
    append({ start: '', end: '', repeat: ExceptionRepeatEnum.ONE_TIME, _id: `new-${uuid4()}` });
  };

  return (
    <LocalizationProvider dateLibInstance={moment} dateAdapter={AdapterMoment}>
      <UpsertSectionWrapper title={t('branch.upsert.exception_dates')}>
        {loading ? (
          <Skeleton variant="rounded" height={300} />
        ) : (
          <>
            {fields.length > 0 ? (
              fields.map((exception, i) => (
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
                            trigger(`exceptions.${i}`);
                          }}
                          slotProps={{
                            textField: {
                              inputRef: params.field.ref,
                              error: !!params.fieldState.error,
                              required: true,
                            },
                          }}
                          value={moment(params.field.value)}
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
                            trigger(`exceptions.${i}`);
                          }}
                          slotProps={{
                            textField: {
                              inputRef: params.field.ref,
                              error: !!params.fieldState.error,
                              required: true,
                            },
                          }}
                          value={moment(params.field.value)}
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
          </>
        )}
      </UpsertSectionWrapper>
    </LocalizationProvider>
  );
};

export default BranchExceptionDates;
