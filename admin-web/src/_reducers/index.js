import { auth } from './auth.reducer';
import { menu } from './menu.reducer';
import { role } from './role.reducer';
import { user } from './user.reducer';
import { ingredient } from './ingredient.reducer';

export const rootReducer = {
  auth,
  menu,
  role,
  user,
  ingredient,
};
