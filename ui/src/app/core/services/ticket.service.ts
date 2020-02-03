import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { mergeMap } from 'rxjs/operators';
import { Ticket, TicketRejection } from '@core/models/ticket.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
  ) { }

  getMyTicket(): Observable<Ticket> {
    return this.apiService.getUrl('/tickets/mine').pipe(
      mergeMap(url => this.http.get(url) as Observable<Ticket>),
    );
  }

  pickUpTicket(): Observable<Ticket> {
    return this.apiService.getUrl('/tickets/pickup').pipe(
      mergeMap(url => this.http.post(url, {}) as Observable<Ticket>),
    );
  }

  rejectMyTicket(rejection: TicketRejection): Observable<null> {
    return this.apiService.getUrl('/tickets/reject').pipe(
      mergeMap(url => this.http.post(url, rejection) as Observable<null>),
    );
  }

  fetchAllTickets(): Observable<Ticket[]> {
    return this.apiService.getUrl('/tickets').pipe(
      mergeMap(url => this.http.get(url) as Observable<Ticket[]>),
    );
  }

  fetchTicket(ticketId: string): Observable<Ticket> {
    return this.apiService.getUrl(`/tickets/${ticketId}`).pipe(
      mergeMap(url => this.http.get(url) as Observable<Ticket>),
    );
  }

  updateTicket(ticket: Ticket): Observable<null> {
    return this.apiService.getUrl(`/tickets/${ticket._id}`).pipe(
      mergeMap(url => this.http.post(url, ticket) as Observable<null>),
    );
  }

  createNewTicket(ticket: Ticket): Observable<null> {
    return this.apiService.getUrl('/tickets').pipe(
      mergeMap(url => this.http.post(url, ticket) as Observable<null>),
    );
  }
}
