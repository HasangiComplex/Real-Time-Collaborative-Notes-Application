import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ uid: string; email: string }>()
);

export const logout = createAction(
  '[Auth] Logout',
  props<{ uid: string }>()
);
