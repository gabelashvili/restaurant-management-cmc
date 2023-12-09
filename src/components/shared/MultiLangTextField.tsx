import { useState } from 'react';

import {
  Box,
  IconButton,
  InputAdornment,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  TextField,
  type TextFieldVariants,
} from '@mui/material';
import { type UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type Languages } from '../../@types/common';
import { languages } from '../../utils/utils';

interface Props {
  label?: string;
  fullWidth?: boolean;
  variant?: TextFieldVariants;
  error?: boolean;
  register: UseFormRegister<any>;
  name: string;
}
const MultiLangTextField = ({ label, fullWidth, variant, error, name, register }: Props) => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLang, setSelectedLang] = useState<Languages>(i18n.language as Languages);

  // Temp sol
  return (
    <>
      {['ge', 'en'].map((lng) => (
        <TextField
          sx={{ display: selectedLang === lng ? 'block' : 'none' }}
          key={lng}
          variant={variant}
          fullWidth={fullWidth}
          label={label}
          error={error}
          InputProps={{
            sx: {
              pr: 0,
            },
            endAdornment: languages.length > 1 && (
              <InputAdornment position="start" sx={{ m: 0, marginTop: '0 !important' }}>
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <Box sx={{ fontSize: 22 }}>{languages.find((el) => el.key === selectedLang)?.icon}</Box>
                </IconButton>
                <Menu MenuListProps={{ sx: { p: 0 } }} anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
                  {languages.map((el) => (
                    <ListItemButton
                      selected={el.key === selectedLang}
                      key={el.key}
                      onClick={() => {
                        setSelectedLang(el.key);
                        setAnchorEl(null);
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 0, color: 'inherit', mr: 1.5, fontSize: 18 }}>{el.icon}</ListItemIcon>
                      <ListItemText primaryTypographyProps={{ fontSize: 14 }}>{el.label}</ListItemText>
                    </ListItemButton>
                  ))}
                </Menu>
              </InputAdornment>
            ),
          }}
          {...register(`${name}.${lng}`)}
        />
      ))}
    </>
  );
};

export default MultiLangTextField;
