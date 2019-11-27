import { createReducer } from 'redux-starter-kit';
import { usersConstants } from '../_constants';

const initialState = {
  users: [],
  count: 0,
  params: {
    offset: 0,
    page: 1,
    limit: 20,
  },
};

export const user = createReducer(initialState, {
  [usersConstants.USERS_LIST_REQUEST]: (state, action) => ({
    ...state,
    params: action.params,
  }),
  [usersConstants.USERS_LIST_SUCCESS]: (state, action) => ({
    ...state,
    users: action.data.users,
    count: action.data.count,
  }),
  [usersConstants.USERS_LIST_FAILURE]: state => ({
    ...state,
  }),
});
