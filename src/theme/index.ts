import { createTheme, type Theme, type ThemeOptions } from '@mui/material';
import { grey } from '@mui/material/colors';
import type {} from '@mui/x-date-pickers/themeAugmentation';

import { error, info, primary, secondary, success, warning } from './themeColors';

const fontSize = 14;

const baseOptions: ThemeOptions = {
  direction: 'ltr',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary,
    secondary,
    error,
    warning,
    success,
    info,
    divider: secondary[300],
    background: { default: '#f3f4f9' },
    text: {
      primary: secondary[500],
      secondary: secondary[300],
      disabled: secondary[400],
    },
    mode: 'light',
  },
  components: {
    MuiTable: {
      styleOverrides: {
        root: { minWidth: 650 },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        fallback: {
          height: '75%',
          width: '75%',
        },
        root: {
          background: primary.main,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '4px',
          color: 'inherit',
          boxShadow: 'none',
          padding: '0.6rem 1.5rem',
        },
        outlinedPrimary: {
          // borderColor: primary.main,
          // color: primary.main,
        },
        containedPrimary: {
          color: 'white',
          '&:hover': {
            backgroundColor: primary.dark,
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          height: '100%',
          width: '100%',
        },
        body: {
          height: '100%',
        },
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
        '#root': {
          height: '100%',
        },
        '#nprogress .bar': {
          zIndex: '9999 !important',
          backgroundColor: '#61A9FF !important',
          width: '100%',
          position: 'fixed',
        },
        'input[type=number]::-webkit-outer-spin-button, input[type=number]::-webkit-inner-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          color: '#FFD600',
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {},
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#94A4C4',
          textTransform: 'none',
          fontSize: 12,
          fontWeight: 600,
          padding: 0,
          minWidth: 'auto',
          marginLeft: '1rem',
          marginRight: '1rem',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiButtonBase-root:first-of-type': {
            marginLeft: 0,
          },
          '& .MuiButtonBase-root:last-of-type': {
            marginRight: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': { backgroundColor: 'transparent' },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          '& .MuiPopover-paper': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          fontFamily: "'Montserrat', sans-serif",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& input::placeholder': {
            color: secondary[400],
            opacity: 1,
          },
          '& label': {
            color: secondary[400],
            opacity: 1,
            fontWeight: 500,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #E5EAF2',
          borderRadius: 8,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        colorPrimary: {
          color: grey[600],
        },
      },
    },
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          '& span, div, button': {
            color: secondary.main,
          },
        },
      },
    },
  },
  typography: {
    button: {
      fontWeight: 600,
    },
    fontFamily: "'Georgian', serif",
    h1: {
      fontWeight: 800,
      fontSize: '4.25rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '4rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.25rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.2rem',
    },
    overline: {
      fontWeight: 600,
    },
    body1: { fontSize },
    body2: { fontSize },
  },
};

export interface themeSettingsProps {
  theme: string;
  direction: string;
  responsiveFontSizes: boolean;
}

export const getTheme = () => {
  const theme: Theme = createTheme(baseOptions);
  // theme shadows
  theme.shadows[1] = '0px 4px 23px rgba(0, 0, 0, 0.12)';
  theme.shadows[2] = '0px 0px 21px 1px rgba(0, 0, 0, 0.07)';
  theme.shadows[3] = '0px 10px 30px rgba(0, 0, 0, 0.1)';
  theme.shadows[4] = '0px 7px 30px 3px rgba(0, 0, 0, 0.05)';

  // console.log(theme);

  return theme;
};
