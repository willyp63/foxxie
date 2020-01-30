import { Action, createReducer, on } from '@ngrx/store';
import { Ticket } from '@core/models/ticket.model';
import { receiveMyTicket, noTicketToPickUp, pickUpTicket, fetchMyTicket, failToRecieveMyTicket } from '@core/actions/ticket.actions';
import { logout } from '@core/actions/auth.actions';

export interface State {
    isNoTicketToPickUp: boolean;
    myTicket: Ticket;
    isFetchingMyTicket: boolean;
};

export const initialState: State = {
    isNoTicketToPickUp: false,
    myTicket: null,
    isFetchingMyTicket: false,
};

const ticketsReducer = createReducer(
    initialState,
    on(fetchMyTicket, (state) => ({ ...state, isFetchingMyTicket: true })),
    on(pickUpTicket, (state) => ({ ...state, isNoTicketToPickUp: false })),
    on(receiveMyTicket, (state, ticket) => ({ ...state, isFetchingMyTicket: false, myTicket: ticket })),
    on(failToRecieveMyTicket, (state) => ({ ...state, isFetchingMyTicket: false })),
    on(noTicketToPickUp, (state) => ({ ...state, isNoTicketToPickUp: true })),
    on(logout, () => initialState),
);

export function reducer(state: State | undefined, action: Action) {
    return ticketsReducer(state, action);
}

export const getMyTicket = (state: State) => state.myTicket;
export const isFetchingMyTicket = (state: State) => state.isFetchingMyTicket;
export const isNoTicketToPickUp = (state: State) => state.isNoTicketToPickUp;
