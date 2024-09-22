import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';

export interface AuthState {
  uid: string | null;
  email: string | null;
}

export const initialState: AuthState = {
  uid: null,
  email: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { uid, email }) => ({
    ...state,
    uid,
    email,
  })),
  on(logout, () => initialState)
);
