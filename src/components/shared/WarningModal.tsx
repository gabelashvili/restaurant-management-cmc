import { LoadingButton } from '@mui/lab';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { closeWarningModal } from '../../store/slices/warningModalSlice';

const WarningModal = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { open, loading, agreeText, description, disagreeText, title, onAgree } = useAppSelector((state) => state.warningModal);

  return (
    <Dialog open={!!open}>
      <DialogTitle>{title || t('common.warning')}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'secondary.main' }}>{description || t('common.warning_desc')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton loading={loading} onClick={() => dispatch(closeWarningModal())}>
          {disagreeText || t('common.no')}
        </LoadingButton>
        <LoadingButton
          loading={loading}
          onClick={() => {
            if (onAgree) {
              onAgree();
            } else {
              dispatch(closeWarningModal());
            }
          }}
        >
          {agreeText || t('common.yes')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default WarningModal;
