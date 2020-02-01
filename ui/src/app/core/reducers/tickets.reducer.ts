import { Action, createReducer, on } from '@ngrx/store';
import { Ticket, TicketStatus } from '@core/models/ticket.model';
import { receiveMyTicket, noTicketToPickUp, pickUpTicket, fetchMyTicket, failToRecieveMyTicket, rejectMyTicket, myTicketWasRejected, fetchAllTickets, receiveAllTickets, fetchTicket, receiveTicket, updateTicket, updateTicketSuccess } from '@core/actions/ticket.actions';
import { logout } from '@core/actions/auth.actions';

export interface State {
    isNoTicketToPickUp: boolean;
    myTicket: Ticket;
    isFetchingMyTicket: boolean;
    isRejectingMyTicket: boolean;
    allTickets: Ticket[];
    ticket: Ticket;
    isTicketUpdating: boolean;
};

export const initialState: State = {
    isNoTicketToPickUp: false,
    myTicket: null,
    isFetchingMyTicket: false,
    isRejectingMyTicket: false,
    allTickets: null,
    ticket: null,
    isTicketUpdating: false,
};

const ticketsReducer = createReducer(
    initialState,
    on(fetchMyTicket, (state) => ({ ...state, isFetchingMyTicket: true })),
    on(pickUpTicket, (state) => ({ ...state, isNoTicketToPickUp: false })),
    on(receiveMyTicket, (state, ticket) => ({ ...state, isFetchingMyTicket: false, myTicket: ticket })),
    on(failToRecieveMyTicket, (state) => ({ ...state, isFetchingMyTicket: false })),
    on(noTicketToPickUp, (state) => ({ ...state, isNoTicketToPickUp: true })),
    on(rejectMyTicket, (state) => ({ ...state, isRejectingMyTicket: true })),
    on(myTicketWasRejected, (state) => ({ ...state, isRejectingMyTicket: false, myTicket: null })),
    on(fetchAllTickets, (state) => ({ ...state, allTickets: null })),
    on(receiveAllTickets, (state, { tickets }) => ({ ...state, allTickets: tickets })),
    on(fetchTicket, (state) => ({ ...state, ticket: null })),
    on(receiveTicket, (state, ticket) => ({ ...state, ticket: ticket })),
    on(updateTicket, (state, ticket) => ({ ...state, isTicketUpdating: true })),
    on(updateTicketSuccess, (state, ticket) => ({ ...state, isTicketUpdating: false, ticket: ticket })),
    on(logout, () => initialState),
);

export function reducer(state: State | undefined, action: Action) {
    return ticketsReducer(state, action);
}

export const getMyTicket = (state: State) => state.myTicket;
export const isFetchingMyTicket = (state: State) => state.isFetchingMyTicket;
export const isNoTicketToPickUp = (state: State) => state.isNoTicketToPickUp;

export const getAllTickets = (state: State) => state.allTickets;
export const getAllTicketsWithStatus = (state: State, props) => state.allTickets
    ? state.allTickets.filter(ticket => ticket.status === props.status)
    : null;

export const getTicket = (state: State) => state.ticket;
export const isTicketUpdating = (state: State) => state.isTicketUpdating;
