import { type Dispatch, type SetStateAction } from 'react';

import { useMediaQuery, useTheme } from '@mui/material';

import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

interface Props {
  openMobileNav: boolean;
  setOpenMobileNav: Dispatch<SetStateAction<boolean>>;
}

const Navigation = (props: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  return matches ? <DesktopNav /> : <MobileNav open={props.openMobileNav} setOpen={props.setOpenMobileNav} />;
};

export default Navigation;
