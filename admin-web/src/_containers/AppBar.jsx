import React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { isEmpty } from 'lodash';
import { menuActions } from '../_actions';
import { routes } from '../_helpers';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const AppBarContainer = ({ dispatch, location, user }) => {
  const classes = useStyles();

  const handleClick = () => {
    dispatch(menuActions.show());
  };
  const currentRoute = routes.find(route => route.path === location.pathname);

  return !isEmpty(user) ? (
    <MuiAppBar position="sticky">
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={handleClick}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {currentRoute ? currentRoute.title : ''}
        </Typography>
      </Toolbar>
    </MuiAppBar>
  ) : null;
};

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

export const AppBar = connect(mapStateToProps)(withRouter(AppBarContainer));
