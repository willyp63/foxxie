import { createAction, props } from '@ngrx/store';
import { Ticket } from '@core/models/ticket.model';

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
