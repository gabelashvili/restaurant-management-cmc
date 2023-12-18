import { useState } from 'react';

import { Delete, Edit, MoreVert } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, Menu } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  onEdit?: () => void;
  onRemove?: () => void;
}

const CustomTableMenu = ({ onEdit, onRemove }: Props) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          sx: {
            p: 0,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {onEdit && (
          <LoadingButton
            startIcon={<Edit />}
            size="small"
            sx={{ width: '100%', px: 2, justifyContent: 'start' }}
            onClick={() => {
              onEdit();
              setAnchorEl(null);
            }}
          >
            {t('common.edit')}
          </LoadingButton>
        )}
        {onRemove && (
          <LoadingButton
            color="error"
            startIcon={<Delete />}
            onClick={() => {
              onRemove();
              setAnchorEl(null);
            }}
            size="small"
            sx={{ width: '100%', px: 2, justifyContent: 'start', color: 'error.main' }}
          >
            {t('common.remove')}
          </LoadingButton>
        )}
      </Menu>
    </Box>
  );
};

export default CustomTableMenu;
