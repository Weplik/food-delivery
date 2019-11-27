import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { intersection, isEmpty } from 'lodash';
import { routes } from '../_helpers';
import { routeComponents } from '../_helpers/route-components';
import { PrivateRoute } from '../_components';

const RouterSwitch = ({ user }) => {
  return (
    <>
      <Switch>
        {routes
          .filter(
            route =>
              !isEmpty(user) &&
              !route.isPublic &&
              route.accessRights &&
              intersection(route.accessRights, user.role.accessRights)
          )
          .map(route => (
            <PrivateRoute
              key={route.path}
              exact
              path={route.path}
              component={routeComponents.get(route.path)}
            />
          ))}
        {routes
          .filter(route => route.isPublic)
          .map(route => (
            <Route
              key={route.path}
              path={route.path}
              component={routeComponents.get(route.path)}
            />
          ))}
      </Switch>

      {!isEmpty(user) && <Redirect from="/sign-in" to="/dashboard" />}
      {!isEmpty(user) && <Redirect from="/" to="/dashboard" />}
      {isEmpty(user) && <Redirect from="/users-management" to="/sign-in" />}
    </>
  );
};

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

export default connect(mapStateToProps)(RouterSwitch);
