import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getMyTicket, isNoTicketToPickUp, isFetchingMyTicket } from '@core/reducers';
import { fetchMyTicket, pickUpTicket } from '@core/actions/ticket.actions';

@Component({
  selector: 'fxx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myTicket$ = this.store.select(getMyTicket);
  isFetchingMyTicket$ = this.store.select(isFetchingMyTicket);
  isNoTicketToPickUp$ = this.store.select(isNoTicketToPickUp);

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(fetchMyTicket());
  }

  pickUpTicket() {
    this.store.dispatch(pickUpTicket());
  }

}
