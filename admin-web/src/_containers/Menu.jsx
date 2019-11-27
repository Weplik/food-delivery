import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListItemText, ListItemIcon, makeStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import MuiLink from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';
import { ExitToApp } from '@material-ui/icons';
import { intersection } from 'lodash';
import { menuActions } from '../_actions/menu.actions';
import { routes } from '../_helpers';
import { authActions } from '../_actions';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  link: { color: theme.palette.contrastText },
}));

const MenuContainer = props => {
  const { dispatch, isVisible, user } = props;

  const classes = useStyles();

  const accessRights = user && user.role ? user.role.accessRights : [];
  const username = user ? user.username : '';

  return (
    <Drawer open={isVisible} onClose={() => dispatch(menuActions.hide())}>
      <div className={classes.list}>
        <List>
          {routes
            .filter(
              route =>
                route.isPublic ||
                intersection(route.accessRights, accessRights).length
            )
            .filter(route => !route.hidden)
            .map(({ path, title }) => (
              <MuiLink
                component={Link}
                className={classes.link}
                style={{ textDecoration: 'none' }}
                key={path}
                to={path}
                onClick={() => dispatch(menuActions.hide())}
              >
                <ListItem button key={path} variant="middle">
                  <ListItemText primary={title} />
                </ListItem>
              </MuiLink>
            ))}
          <MuiLink
            className={classes.link}
            style={{ textDecoration: 'none' }}
            onClick={() => dispatch(authActions.logout())}
          >
            <ListItem button>
              <ListItemIcon>
                <ExitToApp className={classes.link} fontSize="small" />
              </ListItemIcon>
              <ListItemText
                className={classes.link}
                primary={`Выйти | ${username}`}
              />
            </ListItem>
          </MuiLink>
        </List>
      </div>
    </Drawer>
  );
};

const mapStateToProps = state => {
  const { isVisible } = state.menu;
  const { user } = state.auth;

  return { isVisible, user };
};
export const Menu = connect(mapStateToProps)(MenuContainer);
