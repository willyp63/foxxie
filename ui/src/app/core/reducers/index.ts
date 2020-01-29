import { createSelector } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import * as auth from './auth.reducer';

export interface AppState {
    auth: auth.State;
}

export const reducers = {
    auth: auth.reducer,
    router: routerReducer,
};

export const getAuthState = (state: AppState) => state.auth;
export const isLoggedIn = createSelector(getAuthState, auth.isLoggedIn);
export const getLoggedInUsername = createSelector(getAuthState, auth.getLoggedInUsername);
export const hasFailedLogin = createSelector(getAuthState, auth.hasFailedLogin);
