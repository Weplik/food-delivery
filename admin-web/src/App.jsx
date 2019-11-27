import React from 'react';
import { makeStyles, Box } from '@material-ui/core';
import { Router } from 'react-router-dom';
import { history } from './_helpers';
import RouterSwitch from './_containers/RouterSwitch';
import { AppBar, Menu } from './_containers';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
  },
}));

export const App = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Router history={history}>
        <Menu />
        <AppBar />
        <RouterSwitch />
      </Router>
    </Box>
  );
};
