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
    fontSize: '1.3rem',
  },
  h2: {
    fontSize: '1.2rem',
  },
  h3: {
    fontSize: '1.1rem',
  },
  h4: {
    fontSize: '1rem',
  },
  h5: {
    fontSize: '0.9rem',
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
    textTransform: 'none',
  },
  caption: {
    fontSize: '0.8rem',
  },
};
const themeSettingsLight = {
  typography,
  spacing: 5,
  palette: {
    mode: 'light',
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#67775f',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#ff0000',
      // dark: will be calculated from palette.secondary.main,
      // contrastText: '#ffcc00',
    },
    textPrimary: {
      main: '#ff0000',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
};
// make a deep copy of light theme
const themeSettingsDark = JSON.parse(JSON.stringify(themeSettingsLight));
themeSettingsDark.palette.mode = 'dark';

export const lightTheme = responsiveFontSizes(createMuiTheme(themeSettingsLight, faIR));
export const darkTheme = responsiveFontSizes(createMuiTheme(themeSettingsDark, faIR));
