import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { faIR } from '@material-ui/core/locale';

// Create a theme instance.
const theme = createMuiTheme(
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
      primary: {
        main: '#f72865',
      },
      secondary: {
        main: '#000000',
      },
      error: {
        main: red.A400,
      },
      background: {
        default: '#fff',
      },
      direction: 'rtl',
    },
  },
  faIR
);

export default theme;
