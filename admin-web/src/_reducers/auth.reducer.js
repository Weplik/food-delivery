import { createReducer } from 'redux-starter-kit';
import { authConstants } from '../_constants';
import { authActions } from '../_actions';

const initialState = {
  user: {},
};

export const auth = createReducer(initialState, {
  [authConstants.SIGN_IN_REQUEST]: state => ({
    ...state,
  }),
  [authConstants.SIGN_IN_SUCCESS]: (state, action) => ({
    ...state,
    user: action.user,
  }),
  [authConstants.SIGN_IN_FAILURE]: state => ({
    ...state,
  }),
  [authConstants.INFO_REQUEST]: state => ({
    ...state,
  }),
  [authConstants.INFO_SUCCESS]: (state, action) => ({
    ...state,
    user: action.user,
  }),
  [authConstants.INFO_FAILURE]: state => ({
    ...state,
  }),
  [authActions.logout]: state => ({
    ...state,
    user: {},
  }),
});
