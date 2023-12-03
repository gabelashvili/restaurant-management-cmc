import { type FC, type Dispatch, type SetStateAction } from 'react';

import { Password, Person2 } from '@mui/icons-material';
import { Box, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { type SettingsTabModel } from '../../@types/auth';

interface Props {
  tab: SettingsTabModel;
  setTab: Dispatch<SetStateAction<SettingsTabModel>>;
}

const SettingsMenu: FC<Props> = ({ setTab, tab }) => {
  const { t } = useTranslation();
  return (
    <Paper sx={{ py: 2, height: 'fit-content' }}>
      <Box>
        <Typography sx={{ px: 2, fontWeight: 600, fontSize: 16, mb: 2 }}>{t('auth.settings.user_profile')}</Typography>
        <MenuList>
          {tabs.map((el) => (
            <MenuItem
              key={el.value}
              selected={tab === el.value}
              onClick={() => setTab(el.value)}
              sx={(theme) => ({
                py: 1.5,
                '&:hover': {
                  borderRight: `3px solid ${theme.palette.primary.main}`,
                },
                '&.Mui-selected': {
                  borderRight: `3px solid ${theme.palette.primary.main}`,
                },
              })}
            >
              <ListItemIcon>{<el.Icon fontSize="small" />}</ListItemIcon>
              <ListItemText>{t(`auth.settings.${el.label}`)}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Box>
    </Paper>
  );
};

export default SettingsMenu;

const tabs = [
  {
    label: 'update_details',
    value: 'details' as const,
    Icon: Person2,
  },
  {
    label: 'update_password',
    value: 'password' as const,
    Icon: Password,
  },
];
