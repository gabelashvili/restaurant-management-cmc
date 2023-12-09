import { Box } from '@mui/material';
import { DatePicker, DateTimePicker, LocalizationProvider, MobileDateTimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { type Control, type UseFormTrigger } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type BranchModel } from '../../../@types/bracnh';
import UpsertSectionWrapper from '../../shared/UpsertSectionWrapper';
interface Props {
  control: Control<BranchModel, any>;
  trigger: UseFormTrigger<BranchModel>;
}
const BranchExceptionDates = ({ control, trigger }: Props) => {
  const { t } = useTranslation();

  return (
    <LocalizationProvider dateLibInstance={moment} dateAdapter={AdapterMoment}>
      <UpsertSectionWrapper title={t('branch.upsert.working_hours')}>
        <Box>
          <MobileDateTimePicker ampmInClock={true} />
        </Box>
      </UpsertSectionWrapper>
    </LocalizationProvider>
  );
};

export default BranchExceptionDates;
