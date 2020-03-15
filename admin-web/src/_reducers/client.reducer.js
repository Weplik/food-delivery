import { createReducer } from 'redux-starter-kit';
import { clientsConstants } from '../_constants';

const initialState = {
  clients: [],
  count: 0,
  params: {
    offset: 0,
    page: 1,
    limit: 20,
  },
};

export const client = createReducer(initialState, {
  [clientsConstants.CLIENT_LIST_REQUEST]: (state, action) => ({
    ...state,
    params: action.params,
  }),
  [clientsConstants.CLIENT_LIST_SUCCESS]: (state, action) => ({
    ...state,
    clients: action.data.clients,
    count: action.data.count,
  }),
  [clientsConstants.CLIENT_LIST_FAILURE]: (state, action) => ({
    ...state,
  }),
});
