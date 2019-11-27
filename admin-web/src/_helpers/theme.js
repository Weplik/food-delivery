import { createMuiTheme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey['700'],
    },
    placeholder: grey['300'],
  },
  overrides: {
    MuiContainer: { root: { padding: 16 } },
    MuiTabs: { root: { marginBottom: 16 } },
  },
  props: { MuiGrid: { wrap: 'nowrap' } },
});
