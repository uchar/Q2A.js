import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { faIR } from '@material-ui/core/locale';

// Create a theme instance.
const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: '#504e68',
      },
      secondary: {
        main: '#19857b',
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
