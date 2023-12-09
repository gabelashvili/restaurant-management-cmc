import { AddCircleRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { type Control, type UseFormTrigger } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type BranchModel } from '../../../@types/bracnh';
import NoDatText from '../../shared/NoDatText';
import UpsertSectionWrapper from '../../shared/UpsertSectionWrapper';
interface Props {
  control: Control<BranchModel, any>;
  trigger: UseFormTrigger<BranchModel>;
}
const BranchExceptionDates = ({ control, trigger }: Props) => {
  const { t } = useTranslation();

  return (
    <LocalizationProvider dateLibInstance={moment} dateAdapter={AdapterMoment}>
      <UpsertSectionWrapper title={t('branch.upsert.exception_dates')}>
        {/* <Box sx={{ width: '100%', display: 'flex', gap: 3, flexDirection: 'column' }}>
          <Box sx={{ width: '100%', display: 'flex', gap: 2 }}>
            <MobileDateTimePicker sx={{ width: '100%' }} ampmInClock={true} />
            <MobileDateTimePicker sx={{ width: '100%' }} ampmInClock={true} />
          </Box>
          <Autocomplete
            fullWidth
            disablePortal
            options={Object.values(ExceptionRepeatEnum)}
            getOptionLabel={(opt) => t(`branch.upsert.${opt}`)}
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} variant="outlined" label={t('branch.upsert.exception_date_type')} />}
          />
        </Box> */}
        <NoDatText text={t('branch.upsert.no_exception_dates')} />
        <Button sx={{ width: 'fit-content' }} startIcon={<AddCircleRounded />}>
          გამონაკლისი თარიღის დამატება
        </Button>
      </UpsertSectionWrapper>
    </LocalizationProvider>
  );
};

export default BranchExceptionDates;
