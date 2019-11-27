import { createReducer } from 'redux-starter-kit';
import { rolesConstants } from '../_constants';

const initialState = {
  roles: [],
  count: 0,
};

export const role = createReducer(initialState, {
  [rolesConstants.ROLES_LIST_REQUEST]: state => ({
    ...state,
  }),
  [rolesConstants.ROLES_LIST_SUCCESS]: (state, action) => ({
    ...state,
    roles: action.data,
  }),
  [rolesConstants.ROLES_LIST_FAILURE]: state => ({
    ...state,
  }),
});
