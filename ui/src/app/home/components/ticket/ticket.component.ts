import { Component, Input } from '@angular/core';
import { Ticket } from '@core/models/ticket.model';

@Component({
  selector: 'fxx-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {
  @Input() ticket: Ticket;
}
