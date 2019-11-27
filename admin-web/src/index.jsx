import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import DateFnsLocale from 'date-fns/locale/ru';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { store, theme } from './_helpers';
import { App } from './App';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={DateFnsLocale}>
        <App />
      </MuiPickersUtilsProvider>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
