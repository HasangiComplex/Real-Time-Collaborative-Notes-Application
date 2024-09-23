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
  // on(logout, () => initialState)
  // Update logout to check for user ID
  on(logout, (state, { uid }) => {
    // If the userId matches the currently logged-in user, reset the state
    if (state.uid === uid) {
      return initialState;
    } else {
      return state; // Keep the state as is if it's a different user
    }
  })
);
