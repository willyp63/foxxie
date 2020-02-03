import { createAction, props } from '@ngrx/store';
import { Ticket, TicketRejection } from '@core/models/ticket.model';

export const fetchMyTicket = createAction(
    '[Ticket] Fetch My Ticket',
);

export const receiveMyTicket = createAction(
    '[Ticket] Receive My Ticket',
    props<Ticket>(),
);

export const pickUpTicket = createAction(
    '[Ticket] Pick Up Ticket',
);

export const noTicketToPickUp = createAction(
    '[Ticket] No Ticket To Pick Up',
);

export const failToRecieveMyTicket = createAction(
    '[Ticket] Fail To Recieve My Ticket',
);

export const rejectMyTicket = createAction(
    '[Ticket] Reject My Ticket',
    props<TicketRejection>(),
);

export const myTicketWasRejected = createAction(
    '[Ticket] My Ticket Was Rejected',
);

export const fetchAllTickets = createAction(
    '[Ticket] Fetch All Tickets',
);

export const receiveAllTickets = createAction(
    '[Ticket] Receive All Tickets',
    props<{ tickets: Ticket[] }>(),
);

export const fetchTicket = createAction(
    '[Ticket] Fetch Ticket',
    props<{ ticketId: string }>(),
);

export const receiveTicket = createAction(
    '[Ticket] Receive Ticket',
    props<Ticket>(),
);

export const updateTicket = createAction(
    '[Ticket] Update Ticket',
    props<Ticket>(),
);

export const createNewTicket = createAction(
    '[Ticket] Create New Ticket',
    props<Ticket>(),
);

export const saveTicketSuccess = createAction(
    '[Ticket] Save Ticket Success',
    props<Ticket>(),
);
