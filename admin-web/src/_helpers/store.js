import { configureStore } from 'redux-starter-kit';
import { rootReducer as reducer } from '../_reducers';

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});
