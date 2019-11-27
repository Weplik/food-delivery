import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}));
export const RootPaper = props => {
  const classes = useStyles();

  return <Paper className={classes.root} {...props} />;
};
