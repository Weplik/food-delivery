import { List } from 'immutable';

export const ACCESS_RIGHTS = List([
  {
    code: 'users_management',
    title: 'Доступ к разделу "Управление пользователями"',
  },
  {
    code: 'products_management',
    title: 'Доступ к разделу "Управление продуктами"',
  },
  {
    code: 'clients_management',
    title: 'Доступ к разделу "Управление клиентами"',
  },
]);
