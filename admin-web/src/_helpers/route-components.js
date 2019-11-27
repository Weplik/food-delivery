import { Map } from 'immutable';
import { LoginPage } from '../LoginPage';
import { DashboardPage } from '../DashboardPage';
import { UsersManagementPage } from '../UsersManagementPage';

export const routeComponents = Map({
  '/sign-in': LoginPage,
  '/dashboard': DashboardPage,
  '/users-management': UsersManagementPage,
});
