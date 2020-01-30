import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { fetchMyTicket, receiveMyTicket, pickUpTicket, noTicketToPickUp, failToRecieveMyTicket } from '@core/actions/ticket.actions';
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
 
  constructor(
    private actions$: Actions,
    private ticketService: TicketService,
  ) {}
}
