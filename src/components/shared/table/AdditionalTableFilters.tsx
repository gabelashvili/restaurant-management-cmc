import { type FC, type ReactNode } from 'react';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  children: ReactNode;
}
const AdditionalTableFilters: FC<Props> = ({ children }) => {
  const { t } = useTranslation();
  return (
    <Dialog open={false} PaperProps={{ sx: { maxWidth: 400, width: '100%' } }}>
      <DialogTitle>{t('table.additional_filters')}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', pt: 1 }}>{children}</Box>
      </DialogContent>
      <DialogActions>
        <Button>{t('common.cancel')}</Button>
        <Button>{t('common.save')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdditionalTableFilters;
