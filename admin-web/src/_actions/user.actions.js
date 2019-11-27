import { usersConstants } from '../_constants';
import { usersService } from '../_services';

export const usersActions = {
  getList,
};

function getList(values) {
  const request = params => ({
    type: usersConstants.USERS_LIST_REQUEST,
    params,
  });
  const success = data => ({ type: usersConstants.USERS_LIST_SUCCESS, data });
  const failure = error => ({ type: usersConstants.USERS_LIST_FAILURE, error });

  return async dispatch => {
    dispatch(request(values));

    try {
      const { limit, offset } = values;
      const data = await usersService.getList({ limit, offset });
      dispatch(success(data));
    } catch (err) {
      dispatch(failure(err.toString()));
      throw err;
    }
  };
}
