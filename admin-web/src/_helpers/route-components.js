import { Map } from 'immutable';
import { LoginPage } from '../LoginPage';
import { DashboardPage } from '../DashboardPage';
import { UsersManagementPage } from '../UsersManagementPage';
import { ProductsManagementPage } from '../ProductsManagementPage';
import { ClientsManagementPage } from '../ClientsManagement';

export const routeComponents = Map({
  '/sign-in': LoginPage,
  '/dashboard': DashboardPage,
  '/users-management': UsersManagementPage,
  '/products-management': ProductsManagementPage,
  '/clients-management': ClientsManagementPage,
});
