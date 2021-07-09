import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

export const getAuthState = (state: AppState) => state.auth;

export const getUser = createSelector(
  getAuthState,
  auth => auth.user
);

export const getIsLoggedIn = createSelector(
  getAuthState,
  auth => auth.isLoggedIn
);

export const getIsLoading = createSelector(
  getAuthState,
  auth => auth.isLoading
);

export const getIsAdmin = createSelector(
  getAuthState,
  auth => auth.isAdmin
);
export const getToken = createSelector(
  getUser,
  auth =>auth && auth.token  
);
export const getId = createSelector(
  getUser,
  auth =>auth && auth.uid  
);
export const getpercent = createSelector(
  getUser,
  auth =>auth && auth.storpercent  
);
export const getemail = createSelector(
  getUser,
  auth =>auth && auth.email  
);
export const getError = createSelector(
  getAuthState,
  auth => auth.error
);
