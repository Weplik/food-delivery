import { List } from 'immutable';

export const routes = List([
  {
    path: '/sign-in',
    title: 'Авторизация',
    hidden: true,
    isPublic: true,
  },
  {
    path: '/dashboard',
    title: 'Статистика',
    accessRights: [],
    isPublic: true,
  },
  {
    path: '/clients-management',
    title: 'Управление клиентами',
    accessRights: ['clients_management'],
  },
  {
    path: '/products-management',
    title: 'Управление продуктами',
    accessRights: ['products_management'],
  },
  {
    path: '/users-management',
    title: 'Управление пользователями',
    accessRights: ['users_management'],
  },
]);
