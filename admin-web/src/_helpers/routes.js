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
    path: '/users-management',
    title: 'Управление пользователями',
    accessRights: ['users_management'],
    isPublic: true,
  },
]);
