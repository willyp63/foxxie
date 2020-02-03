import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { fetchMyTicket, receiveMyTicket, pickUpTicket, noTicketToPickUp, failToRecieveMyTicket, rejectMyTicket, myTicketWasRejected, fetchAllTickets, receiveAllTickets, fetchTicket, receiveTicket, updateTicket, saveTicketSuccess, createNewTicket, deleteTicket } from '@core/actions/ticket.actions';
import { TicketService } from '@core/services/ticket.service';
import { noop } from '@core/actions/noop.actions';
 
@Injectable()
export class TicketEffects {
  fetchMyTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchMyTicket),
      mergeMap(() => this.ticketService.getMyTicket()
        .pipe(
          map(ticket => ticket ? receiveMyTicket(ticket) : failToRecieveMyTicket()),
          catchError(() => of(noop() /** TODO */))
        )
      )
    )
  );

  pickUpTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pickUpTicket),
      mergeMap(() => this.ticketService.pickUpTicket()
        .pipe(
          map(ticket => ticket ? receiveMyTicket(ticket) : noTicketToPickUp()),
          catchError(() => of(noop() /** TODO */))
        )
      )
    )
  );

  rejectMyTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rejectMyTicket),
      mergeMap((rejection) => this.ticketService.rejectMyTicket(rejection)
        .pipe(
          map(() => myTicketWasRejected()),
          catchError(() => of(noop() /** TODO */))
        )
      )
    )
  );

  fetchAllTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAllTickets),
      mergeMap(() => this.ticketService.fetchAllTickets()
        .pipe(
          map((tickets) => receiveAllTickets({ tickets })),
          catchError(() => of(noop() /** TODO */))
        )
      )
    )
  );

  rejectTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchTicket),
      mergeMap(({ ticketId }) => this.ticketService.fetchTicket(ticketId)
        .pipe(
          map((ticket) => receiveTicket(ticket)),
          catchError(() => of(noop() /** TODO */))
        )
      )
    )
  );

  updateTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTicket),
      mergeMap((ticket) => this.ticketService.updateTicket(ticket)
        .pipe(
          map(() => saveTicketSuccess()),
          catchError(() => of(noop() /** TODO */))
        )
      )
    )
  );

  createNewTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createNewTicket),
      mergeMap((ticket) => this.ticketService.createNewTicket(ticket)
        .pipe(
          map(() => saveTicketSuccess()),
          catchError(() => of(noop() /** TODO */))
        )
      )
    )
  );

  deleteTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTicket),
      mergeMap((ticket) => this.ticketService.deleteTicket(ticket)
        .pipe(
          map(() => saveTicketSuccess()),
          catchError(() => of(noop() /** TODO */))
        )
      )
    )
  );
 
  constructor(
    private actions$: Actions,
    private ticketService: TicketService,
  ) {}
}
