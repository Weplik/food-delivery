import { createAction } from 'redux-starter-kit';

const show = createAction('menu/show');
const hide = createAction('menu/hide');
const toggle = createAction('menu/toggle');

export const menuActions = { show, hide, toggle };
