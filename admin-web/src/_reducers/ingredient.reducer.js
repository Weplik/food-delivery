import { createReducer } from 'redux-starter-kit';
import { cloneDeep } from 'lodash';
import { ingredientsConstants } from '../_constants';

const initialState = {
  ingredients: [],
  count: 0,
  isCreated: false,
  isUpdated: false,
  params: {
    offset: 0,
    page: 1,
    limit: 20,
  },
};

export const ingredient = createReducer(initialState, {
  [ingredientsConstants.INGREDIENT_LIST_REQUEST]: (state, action) => ({
    ...state,
    params: action.params,
  }),
  [ingredientsConstants.INGREDIENT_LIST_SUCCESS]: (state, action) => ({
    ...state,
    ingredients: action.data.ingredients,
    count: action.data.count,
  }),
  [ingredientsConstants.INGREDIENT_LIST_FAILURE]: state => ({
    ...state,
  }),
  [ingredientsConstants.INGREDIENT_DISABLE_REQUEST]: state => ({
    ...state,
  }),
  [ingredientsConstants.INGREDIENT_DISABLE_SUCCESS]: (state, action) => {
    const existIngredient = state.ingredients.find(
      item => item.id === action.data.id
    );
    existIngredient.isEnabled = action.data.isEnabled;
  },
  [ingredientsConstants.INGREDIENT_DISABLE_FAILURE]: state => ({
    ...state,
  }),
  [ingredientsConstants.INGREDIENT_ENABLE_REQUEST]: state => ({
    ...state,
  }),
  [ingredientsConstants.INGREDIENT_ENABLE_SUCCESS]: (state, action) => {
    const existIngredient = state.ingredients.find(
      item => item.id === action.data.id
    );
    existIngredient.isEnabled = action.data.isEnabled;
  },
  [ingredientsConstants.INGREDIENT_ENABLE_FAILURE]: state => ({
    ...state,
  }),
  [ingredientsConstants.INGREDIENT_CREATE_REQUEST]: state => ({
    ...state,
    isCreated: false,
  }),
  [ingredientsConstants.INGREDIENT_CREATE_SUCCESS]: state => ({
    ...state,
    isCreated: true,
  }),
  [ingredientsConstants.INGREDIENT_CREATE_FAILURE]: state => ({
    ...state,
  }),
  [ingredientsConstants.INGREDIENT_UPDATE_REQUEST]: state => ({
    ...state,
    isUpdated: false,
  }),
  [ingredientsConstants.INGREDIENT_UPDATE_SUCCESS]: (state, action) => {
    const ingredients = cloneDeep(state.ingredients);

    const index = ingredients.findIndex(item => item.id === action.data.id);

    ingredients[index] = action.data;

    return {
      ...state,
      ingredients,
      isUpdated: true,
    };
  },
  [ingredientsConstants.INGREDIENT_UPDATE_FAILURE]: state => ({
    ...state,
  }),
});
