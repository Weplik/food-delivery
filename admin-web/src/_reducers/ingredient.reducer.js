import { createReducer } from 'redux-starter-kit';
import { ingredientsConstants } from '../_constants';

const initialState = {
  ingredients: [],
  count: 0,
  params: {
    offset: 0,
    page: 1,
    limit: 20,
  },
};

export const ingredient = createReducer(initialState, {
  [ingredientsConstants.INGREDIENTS_LIST_REQUEST]: (state, action) => ({
    ...state,
    params: action.params,
  }),
  [ingredientsConstants.INGREDIENTS_LIST_SUCCESS]: (state, action) => ({
    ...state,
    ingredients: action.data.ingredients,
    count: action.data.count,
  }),
  [ingredientsConstants.INGREDIENTS_LIST_FAILURE]: state => ({
    ...state,
  }),
});
