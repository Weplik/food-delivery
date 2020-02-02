import { createReducer } from 'redux-starter-kit';
import { cloneDeep } from 'lodash';
import { rolesConstants } from '../_constants';

const initialState = {
  roles: [],
  count: 0,
  isCreated: false,
  isUpdated: false,
  params: {
    offset: 0,
    page: 1,
    limit: 20,
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
  [rolesConstants.ROLE_DISABLE_REQUEST]: state => ({
    ...state,
  }),
  [rolesConstants.ROLE_DISABLE_SUCCESS]: (state, action) => {
    const existRole = state.roles.find(item => item.id === action.data.id);
    existRole.enabled = action.data.enabled;
  },
  [rolesConstants.ROLE_DISABLE_FAILURE]: state => ({
    ...state,
  }),
  [rolesConstants.ROLE_ENABLE_REQUEST]: state => ({
    ...state,
  }),
  [rolesConstants.ROLE_ENABLE_SUCCESS]: (state, action) => {
    const existRole = state.roles.find(item => item.id === action.data.id);
    existRole.enabled = action.data.enabled;
  },
  [rolesConstants.ROLE_ENABLE_FAILURE]: state => ({
    ...state,
  }),
  [rolesConstants.ROLE_CREATE_REQUEST]: state => ({
    ...state,
    isCreated: false,
  }),
  [rolesConstants.ROLE_CREATE_SUCCESS]: state => ({
    ...state,
    isCreated: true,
  }),
  [rolesConstants.ROLE_CREATE_FAILURE]: state => ({
    ...state,
  }),
  [rolesConstants.ROLE_UPDATE_REQUEST]: state => ({
    ...state,
    isUpdated: false,
  }),
  [rolesConstants.ROLE_UPDATE_SUCCESS]: (state, action) => {
    const roles = cloneDeep(state.roles);

    const index = roles.findIndex(item => item.id === action.data.id);

    roles[index] = action.data;

    return {
      ...state,
      roles,
      isUpdated: true,
    };
  },
  [rolesConstants.ROLE_UPDATE_FAILURE]: state => ({
    ...state,
  }),
});
