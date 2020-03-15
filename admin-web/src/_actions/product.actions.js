import { productConstants } from '../_constants';
import { productService } from '../_services';

export const productActions = {
  getList,
  disable,
  enable,
  create,
  update,
  getActiveIngredients,
};

function getList(values) {
  const request = params => ({
    type: productConstants.PRODUCT_LIST_REQUEST,
    params,
  });
  const success = data => ({
    type: productConstants.PRODUCT_LIST_SUCCESS,
    data,
  });
  const failure = () => ({ type: productConstants.PRODUCT_LIST_FAILURE });

  return async dispatch => {
    dispatch(request(values));

    try {
      const { limit, offset } = values;
      const data = await productService.getList({ limit, offset });
      dispatch(success(data));
    } catch (err) {
      dispatch(failure(err.toString()));
      throw err;
    }
  };
}

function disable(id) {
  const request = () => ({ type: productConstants.PRODUCT_DISABLE_REQUEST });
  const success = data => ({
    type: productConstants.PRODUCT_DISABLE_SUCCESS,
    data,
  });
  const failure = () => ({ type: productConstants.PRODUCT_DISABLE_FAILURE });

  return async dispatch => {
    dispatch(request());

    try {
      const data = await productService.disable(id);
      dispatch(success(data));
    } catch (err) {
      dispatch(failure());
      throw err;
    }
  };
}

function enable(id) {
  const request = () => ({ type: productConstants.PRODUCT_ENABLE_REQUEST });
  const success = data => ({
    type: productConstants.PRODUCT_ENABLE_SUCCESS,
    data,
  });
  const failure = () => ({ type: productConstants.PRODUCT_ENABLE_FAILURE });

  return async dispatch => {
    dispatch(request());

    try {
      const data = await productService.enable(id);
      dispatch(success(data));
    } catch (err) {
      dispatch(failure());
      throw err;
    }
  };
}

function create(value) {
  const request = () => ({ type: productConstants.PRODUCT_CREATE_REQUEST });
  const success = () => ({ type: productConstants.PRODUCT_CREATE_SUCCESS });
  const failure = () => ({ type: productConstants.PRODUCT_UPDATE_FAILURE });

  return async dispatch => {
    dispatch(request());

    try {
      await productService.create(value);
      dispatch(success());
    } catch (err) {
      dispatch(failure());
      throw err;
    }
  };
}

function update(value) {
  const request = () => ({ type: productConstants.PRODUCT_UPDATE_REQUEST });
  const success = data => ({
    type: productConstants.PRODUCT_UPDATE_SUCCESS,
    data,
  });
  const failure = () => ({ type: productConstants.PRODUCT_UPDATE_FAILURE });

  return async dispatch => {
    dispatch(request());

    try {
      const data = await productService.update(value);
      dispatch(success(data));
    } catch (err) {
      dispatch(failure());
      throw err;
    }
  };
}

function getActiveIngredients() {
  const request = () => ({ type: productConstants.ACTIVE_INGREDIENTS_REQUEST });
  const success = data => ({
    type: productConstants.ACTIVE_INGREDIENTS_SUCCESS,
    data,
  });
  const failure = () => ({ type: productConstants.ACTIVE_INGREDIENTS_FAILURE });

  return async dispatch => {
    dispatch(request());

    try {
      const data = await productService.getActiveIngredients();
      dispatch(success(data));
    } catch (err) {
      dispatch(failure());
      throw err;
    }
  };
}
