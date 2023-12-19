import { forwardRef, useEffect, useState } from 'react';

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
import { useTranslation } from 'react-i18next';

import { type MultiLangModel, type Languages } from '../../@types/common';
import { languages } from '../../utils/utils';

interface Props {
  label?: string;
  fullWidth?: boolean;
  variant?: TextFieldVariants;
  onChange: (value: MultiLangModel) => void;
  value: MultiLangModel;
  error?: boolean;
  ref?: any;
  required?: boolean;
}
const MultiLangTextField = forwardRef<any, Props>(({ label, fullWidth, variant, error, onChange, value, required }, ref) => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLang, setSelectedLang] = useState<Languages>(i18n.language as Languages);

  useEffect(() => {
    setSelectedLang(i18n.language as Languages);
  }, [i18n.language]);
  // Temp sol

  return (
    <>
      <TextField
        variant={variant}
        fullWidth={fullWidth}
        label={label}
        error={error}
        value={value[selectedLang]}
        required={required}
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
                {languages.map(
                  (el) =>
                    el.key !== selectedLang && (
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
                    ),
                )}
              </Menu>
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          onChange({ ...value, [selectedLang]: e.target.value });
        }}
        inputRef={ref}
      />
    </>
  );
});

export default MultiLangTextField;
