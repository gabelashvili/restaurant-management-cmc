import { Fragment, useState } from 'react';

import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Avatar, Box, Collapse, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { type Languages } from '../../../@types/common';
import routes from '../../../helpers/routes';
import { useAppSelector } from '../../../hooks/store';
import { generateAvatarImage } from '../../../utils/utils';
import Logo from '../../shared/Logo';

const NavigationList = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Languages;
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);
  const [openNavPath, setOpenNavPath] = useState<string | null>(null);
  const currentPath = () => {
    let path = location.pathname;
    if (path.startsWith('/')) {
      path = path.slice(1);
    }
    if (path.endsWith('/')) {
      path = path.slice(0, path.length - 1);
    }
    return path;
  };
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ px: 2, pt: 1 }}>
        <Logo />
      </Box>
      <Box sx={{ my: 5, display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'secondary.200', p: 2, borderRadius: 2 }}>
        <Avatar src={generateAvatarImage(null, user?.avatar)} />
        <Typography>{`${user?.firstName[lang]} ${user?.lastName[lang]}`}</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {Object.values(routes).map((route) => (
          <Fragment key={route.path}>
            <ListItemButton
              selected={!route.children && currentPath() === route.path}
              disableRipple
              sx={{ display: 'flex', gap: 2, borderRadius: 2 }}
              onClick={() => {
                if (route.children) {
                  setOpenNavPath(openNavPath === route.path ? null : route.path);
                } else {
                  navigate(route.path);
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <route.Icon
                  fontSize="medium"
                  sx={{
                    color: !route.children && currentPath() === route.path ? 'primary.main' : 'secondary.400',
                  }}
                />
              </ListItemIcon>
              <ListItemText>{t(`routes.${route.title}`)}</ListItemText>
              {route.children && (
                <ListItemIcon sx={{ minWidth: 0 }}>{openNavPath === route.path ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</ListItemIcon>
              )}
            </ListItemButton>
            <Collapse in={openNavPath === route.path} sx={{ ml: 3 }}>
              {route.children &&
                Object.values(route.children).map((childRoute) => (
                  <ListItemButton
                    key={route.path + childRoute.path}
                    selected={currentPath() === `${route.path}${childRoute.path === '' ? '' : `/${childRoute.path}`}`}
                    disableRipple
                    sx={{ display: 'flex', gap: 2, borderRadius: 2 }}
                    onClick={() => navigate(`${route.path}/${childRoute.path}`)}
                  >
                    <ListItemIcon sx={{ minWidth: 0 }}>
                      <childRoute.Icon
                        fontSize="medium"
                        sx={{
                          color:
                            currentPath() === `${route.path}${childRoute.path === '' ? '' : `/${childRoute.path}`}`
                              ? 'primary.main'
                              : 'secondary.400',
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText>{t(`routes.${childRoute.title}`)}</ListItemText>
                  </ListItemButton>
                ))}
            </Collapse>
          </Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default NavigationList;
