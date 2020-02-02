import { ingredientsConstants } from '../_constants';
import { ingredientsService } from '../_services';

export const ingredientsActions = {
  getList,
  disable,
  enable,
  create,
  update,
};

function getList(values) {
  const request = params => ({
    type: ingredientsConstants.INGREDIENT_LIST_REQUEST,
    params,
  });
  const success = data => ({
    type: ingredientsConstants.INGREDIENT_LIST_SUCCESS,
    data,
  });
  const failure = error => ({
    type: ingredientsConstants.INGREDIENT_LIST_FAILURE,
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

function disable(id) {
  const request = () => ({
    type: ingredientsConstants.INGREDIENT_DISABLE_REQUEST,
  });
  const success = data => ({
    type: ingredientsConstants.INGREDIENT_DISABLE_SUCCESS,
    data,
  });
  const failure = () => ({
    type: ingredientsConstants.INGREDIENT_DISABLE_FAILURE,
  });

  return async dispatch => {
    dispatch(request());

    try {
      const data = await ingredientsService.disable(id);
      dispatch(success(data));
    } catch (err) {
      dispatch(failure());
      throw err;
    }
  };
}

function enable(id) {
  const request = () => ({
    type: ingredientsConstants.INGREDIENT_ENABLE_REQUEST,
  });
  const success = data => ({
    type: ingredientsConstants.INGREDIENT_ENABLE_SUCCESS,
    data,
  });
  const failure = () => ({
    type: ingredientsConstants.INGREDIENT_ENABLE_FAILURE,
  });

  return async dispatch => {
    dispatch(request());

    try {
      const data = await ingredientsService.enable(id);
      dispatch(success(data));
    } catch (err) {
      dispatch(failure());
      throw err;
    }
  };
}

function create(value) {
  const request = () => ({
    type: ingredientsConstants.INGREDIENT_CREATE_REQUEST,
  });
  const success = () => ({
    type: ingredientsConstants.INGREDIENT_CREATE_SUCCESS,
  });
  const failure = () => ({
    type: ingredientsConstants.INGREDIENT_UPDATE_FAILURE,
  });

  return async dispatch => {
    dispatch(request());

    try {
      await ingredientsService.create(value);
      dispatch(success());
    } catch (err) {
      dispatch(failure());
      throw err;
    }
  };
}

function update(value) {
  const request = () => ({
    type: ingredientsConstants.INGREDIENT_UPDATE_REQUEST,
  });
  const success = data => ({
    type: ingredientsConstants.INGREDIENT_UPDATE_SUCCESS,
    data,
  });
  const failure = () => ({
    type: ingredientsConstants.INGREDIENT_UPDATE_FAILURE,
  });

  return async dispatch => {
    dispatch(request());

    try {
      const data = await ingredientsService.update(value);
      dispatch(success(data));
    } catch (err) {
      dispatch(failure());
      throw err;
    }
  };
}
