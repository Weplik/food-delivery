import { createReducer } from 'redux-starter-kit';
import { rolesConstants } from '../_constants';

const initialState = {
  roles: [],
  count: 0,
  offset: 0,
  limit: 20,
};

export const role = createReducer(initialState, {
  [rolesConstants.ROLES_LIST_REQUEST]: (state, action) => ({
    ...state,
  }),
  [rolesConstants.ROLES_LIST_SUCCESS]: (state, action) => ({
    ...state,
    roles: action.data.roles,
    count: action.data.count,
  }),
  [rolesConstants.ROLES_LIST_FAILURE]: state => ({
    ...state,
  }),
});
