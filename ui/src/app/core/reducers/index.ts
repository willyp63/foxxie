import { createSelector } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import * as auth from './auth.reducer';
import * as tickets from './tickets.reducer';

export interface AppState {
    auth: auth.State;
    tickets: tickets.State;
}

export const reducers = {
    auth: auth.reducer,
    tickets: tickets.reducer,
    router: routerReducer,
};

export const getAuthState = (state: AppState) => state.auth;
export const isLoggedIn = createSelector(getAuthState, auth.isLoggedIn);
export const getLoggedInUsername = createSelector(getAuthState, auth.getLoggedInUsername);
export const getLoggedInUserId = createSelector(getAuthState, auth.getLoggedInUserId);
export const hasFailedLogin = createSelector(getAuthState, auth.hasFailedLogin);

export const getTicketState = (state: AppState) => state.tickets;
export const getMyTicket = createSelector(getTicketState, tickets.getMyTicket);
export const isFetchingMyTicket = createSelector(getTicketState, tickets.isFetchingMyTicket);
export const isNoTicketToPickUp = createSelector(getTicketState, tickets.isNoTicketToPickUp);
