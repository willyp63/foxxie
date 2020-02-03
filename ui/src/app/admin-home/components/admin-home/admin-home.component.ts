import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getAllTicketsWithStatus, isTicketSaving } from '@core/reducers';
import { fetchAllTickets, deleteTicket } from '@core/actions/ticket.actions';
import { TicketStatus, Ticket } from '@core/models/ticket.model';

@Component({
  selector: 'fxx-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  notReadyTickets$ = this.store.select(getAllTicketsWithStatus, { status: TicketStatus.NotReady });
  readyTickets$ = this.store.select(getAllTicketsWithStatus, { status: TicketStatus.Ready });
  assignedTickets$ = this.store.select(getAllTicketsWithStatus, { status: TicketStatus.Assigned });
  doneTickets$ = this.store.select(getAllTicketsWithStatus, { status: TicketStatus.Done });

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(fetchAllTickets());
  }

  delete(ticket: Ticket) {
    this.store.dispatch(deleteTicket(ticket));

    // TODO: unsubscribe
    this.store.select(isTicketSaving).subscribe((isSaving) => {
      if (!isSaving) {
        this.store.dispatch(fetchAllTickets());
      }
    });
  }
}
