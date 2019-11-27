import { ingredientsConstants } from '../_constants';
import { ingredientsService } from '../_services';

export const ingredientsActions = {
  getList,
};

function getList(values) {
  const request = params => ({
    type: ingredientsConstants.INGREDIENTS_LIST_REQUEST,
    params,
  });
  const success = data => ({
    type: ingredientsConstants.INGREDIENTS_LIST_SUCCESS,
    data,
  });
  const failure = error => ({
    type: ingredientsConstants.INGREDIENTS_LIST_FAILURE,
    error,
  });

  return async dispatch => {
    dispatch(request(values));

    try {
      const { limit, offset } = values;
      const data = await ingredientsService.getList({ limit, offset });
      dispatch(success(data));
    } catch (err) {
      dispatch(failure(err.toString()));
      throw err;
    }
  };
}
