import { type FC } from 'react';

import { FilterList, Search } from '@mui/icons-material';
import { Box, ButtonBase, InputAdornment, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface TableHeaderProps {
  title: string;
}
const TableHeader: FC<TableHeaderProps> = ({ title }) => {
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', sm: 'center' },
          m: 2,
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            placeholder={t('common.search')}
            inputProps={{
              sx: { py: 1.5 },
            }}
            InputProps={{
              sx: { borderRadius: 2 },
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <ButtonBase sx={{ bgcolor: 'secondary.300', borderRadius: 2, p: 1 }}>
            <FilterList />
          </ButtonBase>
        </Box>
      </Box>
    </>
  );
};

export default TableHeader;
