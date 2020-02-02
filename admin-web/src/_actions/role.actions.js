import { rolesConstants } from '../_constants';
import { rolesService } from '../_services';

export const rolesActions = {
  getList,
  disable,
  enable,
  create,
  update,
};

function getList(values) {
  const request = params => ({
    type: rolesConstants.ROLES_LIST_REQUEST,
    params,
  });
  const success = data => ({ type: rolesConstants.ROLES_LIST_SUCCESS, data });
  const failure = () => ({ type: rolesConstants.ROLES_LIST_FAILURE });

  return async dispatch => {
    dispatch(request(values));

    try {
      const { limit, offset } = values;
      const data = await rolesService.getList({ limit, offset });
      dispatch(success(data));
    } catch (err) {
      dispatch(failure(err.toString()));
      throw err;
    }
  };
}

function disable(id) {
  const request = () => ({ type: rolesConstants.ROLE_DISABLE_REQUEST });
  const success = data => ({ type: rolesConstants.ROLE_DISABLE_SUCCESS, data });
  const failure = () => ({ type: rolesConstants.ROLE_DISABLE_FAILURE });

  return async dispatch => {
    dispatch(request());

    try {
      const data = await rolesService.disable(id);
      dispatch(success(data));
    } catch (err) {
      dispatch(failure());
      throw err;
    }
  };
}

function enable(id) {
  const request = () => ({ type: rolesConstants.ROLE_ENABLE_REQUEST });
  const success = data => ({ type: rolesConstants.ROLE_ENABLE_SUCCESS, data });
  const failure = () => ({ type: rolesConstants.ROLE_ENABLE_FAILURE });

  return async dispatch => {
    dispatch(request());

    try {
      const data = await rolesService.enable(id);
      dispatch(success(data));
    } catch (err) {
      dispatch(failure());
      throw err;
    }
  };
}

function create(value) {
  const request = () => ({ type: rolesConstants.ROLE_CREATE_REQUEST });
  const success = () => ({ type: rolesConstants.ROLE_CREATE_SUCCESS });
  const failure = () => ({ type: rolesConstants.ROLE_UPDATE_FAILURE });

  return async dispatch => {
    dispatch(request());

    try {
      await rolesService.create(value);
      dispatch(success());
    } catch (err) {
      dispatch(failure());
      throw err;
    }
  };
}

function update(value) {
  const request = () => ({ type: rolesConstants.ROLE_UPDATE_REQUEST });
  const success = data => ({ type: rolesConstants.ROLE_UPDATE_SUCCESS, data });
  const failure = () => ({ type: rolesConstants.ROLE_UPDATE_FAILURE });

  return async dispatch => {
    dispatch(request());

    try {
      const data = await rolesService.update(value);
      dispatch(success(data));
    } catch (err) {
      dispatch(failure());
      throw err;
    }
  };
}
