import { createMuiTheme } from '@material-ui/core/styles';
import { faIR } from '@material-ui/core/locale';

// Create a theme instance.
export const lightTheme = createMuiTheme(
  {
    typography: {
      fontFamily: [
        'persian-font',
        'Arial',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    palette: {
      type: 'light',
    },
    direction: 'rtl',
  },
  faIR
);
export const darkTheme = createMuiTheme(
  {
    typography: {
      fontFamily: [
        'persian-font',
        'Arial',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    palette: {
      type: 'dark',
    },
  },
  faIR
);
