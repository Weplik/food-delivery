import { createReducer } from 'redux-starter-kit';
import { authConstants } from '../_constants';
import { authActions } from '../_actions';

const initialState = {
  credentials: {},
  user: {},
};

export const auth = createReducer(initialState, {
  [authConstants.SIGN_IN_REQUEST]: (state, action) => ({
    ...state,
    credentials: action.credentials,
  }),
  [authConstants.SIGN_IN_SUCCESS]: (state, action) => ({
    ...state,
    user: action.user,
  }),
  [authConstants.SIGN_IN_FAILURE]: state => ({
    ...state,
    credentials: {},
  }),
  [authActions.logout]: state => ({
    ...state,
    credentials: {},
    user: {},
  }),
});
