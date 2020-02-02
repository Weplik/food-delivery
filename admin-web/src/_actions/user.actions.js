import { usersConstants } from '../_constants';
import { usersService } from '../_services';

export const usersActions = {
  getList,
  disable,
  enable,
  getActiveRoles,
  create,
  update,
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

function disable(username) {
  const request = () => ({ type: usersConstants.USER_DISABLE_REQUEST });
  const success = data => ({ type: usersConstants.USER_DISABLE_SUCCESS, data });
  const failure = () => ({ type: usersConstants.USER_DISABLE_FAILURE });

  return async dispatch => {
    dispatch(request());

    try {
      const data = await usersService.disable(username);
      dispatch(success(data));
    } catch (err) {
      dispatch(failure());
      throw err;
    }
  };
}

function enable(username) {
  const request = () => ({ type: usersConstants.USER_ENABLE_REQUEST });
  const success = data => ({ type: usersConstants.USER_ENABLE_SUCCESS, data });
  const failure = () => ({ type: usersConstants.USER_ENABLE_FAILURE });

  return async dispatch => {
    dispatch(request());

    try {
      const data = await usersService.enable(username);
      dispatch(success(data));
    } catch (err) {
      dispatch(failure());
      throw err;
    }
  };
}

function getActiveRoles() {
  const request = () => ({ type: usersConstants.ACTIVE_ROLES_REQUEST });
  const success = data => ({ type: usersConstants.ACTIVE_ROLES_SUCCESS, data });
  const failure = () => ({ type: usersConstants.ACTIVE_ROLES_FAILURE });

  return async dispatch => {
    dispatch(request());

    try {
      const data = await usersService.getActiveRoles();
      dispatch(success(data));
    } catch (err) {
      dispatch(failure());
      throw err;
    }
  };
}

function create(value) {
  const request = () => ({ type: usersConstants.USER_CREATE_REQUEST });
  const success = () => ({ type: usersConstants.USER_CREATE_SUCCESS });
  const failure = () => ({ type: usersConstants.USER_UPDATE_FAILURE });

  return async dispatch => {
    dispatch(request());

    try {
      await usersService.create(value);
      dispatch(success());
    } catch (err) {
      dispatch(failure());
      throw err;
    }
  };
}

function update(value) {
  const request = () => ({ type: usersConstants.USER_UPDATE_REQUEST });
  const success = data => ({ type: usersConstants.USER_UPDATE_SUCCESS, data });
  const failure = () => ({ type: usersConstants.USER_UPDATE_FAILURE });

  return async dispatch => {
    dispatch(request());

    try {
      const data = await usersService.update(value);
      dispatch(success(data));
    } catch (err) {
      dispatch(failure());
      throw err;
    }
  };
}
