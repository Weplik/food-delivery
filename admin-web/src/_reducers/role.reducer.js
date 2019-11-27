import { createReducer } from 'redux-starter-kit';
import { rolesConstants } from '../_constants';

const initialState = {
  roles: [],
  count: 0,
  params: {
    offset: 0,
    page: 1,
    limit: 1,
  },
};

export const role = createReducer(initialState, {
  [rolesConstants.ROLES_LIST_REQUEST]: (state, action) => ({
    ...state,
    params: action.params,
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
