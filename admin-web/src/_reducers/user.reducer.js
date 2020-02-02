import { createReducer } from 'redux-starter-kit';
import { cloneDeep } from 'lodash';
import { usersConstants } from '../_constants';

const initialState = {
  users: [],
  count: 0,
  activeRoles: [],
  isCreated: false,
  isUpdated: false,
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
  [usersConstants.USER_DISABLE_REQUEST]: state => ({
    ...state,
  }),
  [usersConstants.USER_DISABLE_SUCCESS]: (state, action) => {
    const existUser = state.users.find(
      item => item.username === action.data.username
    );
    existUser.enabled = action.data.enabled;
  },
  [usersConstants.USER_DISABLE_FAILURE]: state => ({
    ...state,
  }),
  [usersConstants.USER_ENABLE_REQUEST]: state => ({
    ...state,
  }),
  [usersConstants.USER_ENABLE_SUCCESS]: (state, action) => {
    const existUser = state.users.find(
      item => item.username === action.data.username
    );
    existUser.enabled = action.data.enabled;
  },
  [usersConstants.USER_ENABLE_FAILURE]: state => ({
    ...state,
  }),
  [usersConstants.ACTIVE_ROLES_REQUEST]: state => ({
    ...state,
  }),
  [usersConstants.ACTIVE_ROLES_SUCCESS]: (state, action) => ({
    ...state,
    activeRoles: action.data,
  }),
  [usersConstants.ACTIVE_ROLES_FAILURE]: state => ({
    ...state,
  }),
  [usersConstants.USER_CREATE_REQUEST]: state => ({
    ...state,
    isCreated: false,
  }),
  [usersConstants.USER_CREATE_SUCCESS]: state => ({
    ...state,
    isCreated: true,
  }),
  [usersConstants.USER_CREATE_FAILURE]: state => ({
    ...state,
  }),
  [usersConstants.USER_UPDATE_REQUEST]: state => ({
    ...state,
    isUpdated: false,
  }),
  [usersConstants.USER_UPDATE_SUCCESS]: (state, action) => {
    const users = cloneDeep(state.users);

    const index = users.findIndex(
      item => item.username === action.data.username
    );

    users[index] = action.data;

    return {
      ...state,
      users,
      isUpdated: true,
    };
  },
  [usersConstants.USER_UPDATE_FAILURE]: state => ({
    ...state,
  }),
});
