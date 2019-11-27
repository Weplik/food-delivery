import { createReducer } from 'redux-starter-kit';
import { menuActions } from '../_actions/menu.actions';

export const menu = createReducer(
  {
    isVisible: false,
  },
  {
    [menuActions.hide]: () => ({ isVisible: false }),
    [menuActions.show]: () => ({ isVisible: true }),
    [menuActions.toggle]: state => ({ isVisible: !state.isVisible }),
  }
);
