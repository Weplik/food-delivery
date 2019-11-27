import { createAction } from 'redux-starter-kit';
import { authConstants } from '../_constants';
import { authService } from '../_services/auth.service';
import { history } from '../_helpers/history';

const logout = createAction('LOGOUT');

export const authActions = {
  signIn,
  logout,
};

function signIn(values) {
  const request = credentials => ({
    type: authConstants.SIGN_IN_REQUEST,
    credentials,
  });
  const success = user => ({ type: authConstants.SIGN_IN_SUCCESS, user });
  const failure = error => ({ type: authConstants.SIGN_IN_FAILURE, error });

  return async dispatch => {
    dispatch(request(values));

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
