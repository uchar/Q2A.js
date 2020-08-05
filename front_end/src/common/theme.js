import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { faIR } from '@material-ui/core/locale';

const typography = {
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
  h1: {
    fontSize: '1.4rem',
  },
  h2: {
    fontSize: '1.3rem',
  },
  h3: {
    fontSize: '1.2rem',
  },
  h4: {
    fontSize: '1.1rem',
  },
  h5: {
    fontSize: '1rem',
  },
  h6: {
    fontSize: '0.9rem',
  },
  title: { fontSize: '1.5rem' },
  subtitle1: {
    fontSize: '1rem',
  },
  subtitle2: {
    fontSize: '0.8rem',
  },
  body1: {
    fontSize: '1rem',
  },
  body2: {
    fontSize: '0.8rem',
  },
  button: {
    fontSize: '0.75rem',
  },
  caption: {
    fontSize: '0.8rem',
  },
};
// Create a theme instance.
export const lightTheme = responsiveFontSizes(
  createMuiTheme(
    {
      typography,
      palette: {
        type: 'light',
      },
      direction: 'rtl',
      spacing: 5,
    },
    faIR
  )
);
export const darkTheme = responsiveFontSizes(
  createMuiTheme(
    {
      typography,
      palette: {
        type: 'dark',
      },
      spacing: 5,
    },
    faIR
  )
);
