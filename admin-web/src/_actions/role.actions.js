import { rolesConstants } from '../_constants/role.constans';
import { roleService } from '../_services';

export const rolesActions = {
  getList,
};

function getList(values) {
  const request = params => ({
    type: rolesConstants.ROLES_LIST_REQUEST,
    params,
  });
  const success = data => ({ type: rolesConstants.ROLES_LIST_SUCCESS, data });
  const failure = error => ({ type: rolesConstants.ROLES_LIST_FAILURE, error });

  return async dispatch => {
    dispatch(request(values));

    try {
      const data = await roleService.getList(values);
      dispatch(success(data));
    } catch (err) {
      dispatch(failure(err.toString()));
      throw err;
    }
  };
}
