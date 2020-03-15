import { createReducer } from 'redux-starter-kit';
import { cloneDeep } from 'lodash';
import { productConstants } from '../_constants';

const initialState = {
  products: [],
  count: 0,
  activeIngredients: [],
  isCreated: false,
  isUpdated: false,
  params: {
    offset: 0,
    page: 1,
    limit: 20,
  },
};

export const product = createReducer(initialState, {
  [productConstants.PRODUCT_LIST_REQUEST]: (state, action) => ({
    ...state,
    params: action.params,
  }),
  [productConstants.PRODUCT_LIST_SUCCESS]: (state, action) => ({
    ...state,
    products: action.data.products,
    count: action.data.count,
  }),
  [productConstants.PRODUCT_LIST_FAILURE]: state => ({
    ...state,
  }),
  [productConstants.PRODUCT_DISABLE_REQUEST]: state => ({
    ...state,
  }),
  [productConstants.PRODUCT_DISABLE_SUCCESS]: (state, action) => {
    const existProduct = state.products.find(item => item.id === action.data.id);
    existProduct.isEnabled = action.data.isEnabled;
  },
  [productConstants.PRODUCT_DISABLE_FAILURE]: state => ({
    ...state,
  }),
  [productConstants.PRODUCT_ENABLE_REQUEST]: state => ({
    ...state,
  }),
  [productConstants.PRODUCT_ENABLE_SUCCESS]: (state, action) => {
    const existProduct = state.products.find(
      item => item.id === action.data.id
    );
    existProduct.isEnabled = action.data.isEnabled;
  },
  [productConstants.PRODUCT_ENABLE_FAILURE]: state => ({
    ...state,
  }),
  [productConstants.PRODUCT_CREATE_REQUEST]: state => ({
    ...state,
    isCreated: false,
  }),
  [productConstants.PRODUCT_CREATE_SUCCESS]: state => ({
    ...state,
    isCreated: true,
  }),
  [productConstants.PRODUCT_CREATE_FAILURE]: state => ({
    ...state,
  }),
  [productConstants.PRODUCT_UPDATE_REQUEST]: state => ({
    ...state,
    isUpdated: false,
  }),
  [productConstants.PRODUCT_UPDATE_SUCCESS]: (state, action) => {
    const products = cloneDeep(state.products);

    const index = products.findIndex(item => item.id === action.data.id);

    products[index] = action.data;

    return {
      ...state,
      products,
      isUpdated: true,
    };
  },
  [productConstants.PRODUCT_UPDATE_FAILURE]: state => ({
    ...state,
  }),
  [productConstants.ACTIVE_INGREDIENTS_REQUEST]: state => ({
    ...state,
  }),
  [productConstants.ACTIVE_INGREDIENTS_SUCCESS]: (state, action) => ({
    ...state,
    activeIngredients: action.data,
  }),
  [productConstants.ACTIVE_INGREDIENTS_FAILURE]: state => ({
    ...state,
  }),
});
