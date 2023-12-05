import { useState } from 'react';

import { Box, IconButton, ListItemButton, ListItemIcon, ListItemText, Menu } from '@mui/material';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { useTranslation } from 'react-i18next';

const SelectLanguage = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Box>
      <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Box sx={{ fontSize: 22 }}>{languages.find((el) => el.key === i18n.language)?.icon}</Box>
      </IconButton>
      <Menu MenuListProps={{ sx: { p: 0 } }} anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
        {languages.map((el) => (
          <ListItemButton
            key={el.key}
            onClick={() => {
              i18n.changeLanguage(el.key);
              setAnchorEl(null);
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, color: 'inherit', mr: 1.5, fontSize: 18 }}>{el.icon}</ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: 14 }}>{el.label}</ListItemText>
          </ListItemButton>
        ))}
      </Menu>
    </Box>
  );
};

export default SelectLanguage;

const languages = [
  {
    label: 'ქართული',
    key: 'ge',
    icon: getUnicodeFlagIcon('GEO'),
  },
  {
    label: 'English',
    key: 'en',
    icon: getUnicodeFlagIcon('GB'),
  },
];
