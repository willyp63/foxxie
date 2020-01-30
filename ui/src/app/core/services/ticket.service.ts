import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { mergeMap } from 'rxjs/operators';
import { Ticket } from '@core/models/ticket.model';
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
}