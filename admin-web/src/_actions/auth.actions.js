import { createAction } from 'redux-starter-kit';
import { authConstants } from '../_constants';
import { authService } from '../_services/auth.service';
import { history } from '../_helpers/history';

const logout = createAction('LOGOUT');

export const authActions = {
  signIn,
  info,
  logout,
};

function signIn(values) {
  const request = () => ({
    type: authConstants.SIGN_IN_REQUEST,
  });
  const success = user => ({ type: authConstants.SIGN_IN_SUCCESS, user });
  const failure = error => ({ type: authConstants.SIGN_IN_FAILURE, error });

  return async dispatch => {
    dispatch(request());

    try {
      const user = await authService.signIn(values);
      dispatch(success(user));
      history.push('/');
    } catch (err) {
      dispatch(failure(err.toString()));
      throw err;
    }
  };
}

function info() {
  const request = () => ({
    type: authConstants.INFO_REQUEST,
  });
  const success = user => ({ type: authConstants.INFO_SUCCESS, user });
  const failure = error => ({ type: authConstants.INFO_FAILURE, error });

  return async dispatch => {
    dispatch(request());

    try {
      const user = await authService.info();
      dispatch(success(user));
      history.push('/');
    } catch (err) {
      localStorage.removeItem('accessToken');
      history.push('/sign-in');
      dispatch(failure(err.toString()));
      throw err;
    }
  };
}
