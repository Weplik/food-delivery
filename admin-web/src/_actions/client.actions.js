import { clientsConstants } from '../_constants';
import { clientsService } from '../_services';

export const clientActions = { getList };

function getList(values) {
  const request = params => ({
    type: clientsConstants.CLIENT_LIST_REQUEST,
    params,
  });
  const success = data => ({
    type: clientsConstants.CLIENT_LIST_SUCCESS,
    data,
  });
  const failure = () => ({ type: clientsConstants.CLIENT_LIST_FAILURE });

  return async dispatch => {
    dispatch(request(values));

    try {
      const { limit, offset } = values;
      const data = await clientsService.getList({ limit, offset });
      dispatch(success(data));
    } catch (err) {
      dispatch(failure(err.toString()));
      throw err;
    }
  };
}
