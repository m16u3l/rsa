import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#16A085',
      dark: '#0F705D',
      light: '#44B39D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2C3E50',
      dark: '#031828',
      light: '#57687C',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F3F3F3',
      white: '#FFFFFF',
    },
    common: {
      white: '#FFFFFF',
      grey: '#00000099',
      green: '#41C746DE',
      acceptedGreen: '#00C853',
      ligthGrey: '#00000061',
      borderGrey: '#0000001F',
      disabled: '#00000061',
      blueLink: '#3498DB',
      success: '#27AE60',
    },
  },
});

export default theme;
