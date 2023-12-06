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
import { useTranslation } from 'react-i18next';

import { languages } from '../../utils/utils';

interface Props {
  label?: string;
  onChange: (lang: string, value: string) => void;
  fullWidth?: boolean;
  variant?: TextFieldVariants;
}
const MultiLangTextField = ({ onChange, label, fullWidth, variant }: Props) => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  return (
    <TextField
      variant={variant}
      fullWidth={fullWidth}
      label={label}
      onChange={(e) => onChange(languages.length === 1 ? languages[0].key : selectedLang, e.target.value)}
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
    />
  );
};

export default MultiLangTextField;
