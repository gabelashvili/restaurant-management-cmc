import { type SetStateAction, type FC, type ReactNode, type Dispatch } from 'react';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const AdditionalTableFilters: FC<Props> = ({ children, open, setOpen }) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} PaperProps={{ sx: { maxWidth: 400, width: '100%' } }} onClose={() => setOpen(false)}>
      <DialogTitle>{t('table.additional_filters')}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', pt: 1 }}>{children}</Box>
      </DialogContent>
    </Dialog>
  );
};

export default AdditionalTableFilters;
