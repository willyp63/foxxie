import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getAllTicketsWithStatus, getAllTickets } from '@core/reducers';
import { fetchAllTickets } from '@core/actions/ticket.actions';
import { TicketStatus } from '@core/models/ticket.model';

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

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(fetchAllTickets());
  }
}
