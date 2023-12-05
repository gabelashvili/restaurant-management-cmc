import { type Dispatch, type SetStateAction } from 'react';

import { Menu } from '@mui/icons-material';
import { AppBar, Box, IconButton, Toolbar, useMediaQuery, useTheme } from '@mui/material';

import SelectLanguage from './SelectLanguage';
import UserMenu from './UserMenu';

interface Props {
  openMobileNav: boolean;
  setOpenMobileNav: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ openMobileNav, setOpenMobileNav }: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {!matches && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              setOpenMobileNav(!openMobileNav);
            }}
          >
            <Menu />
          </IconButton>
        )}
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
          <SelectLanguage />
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
