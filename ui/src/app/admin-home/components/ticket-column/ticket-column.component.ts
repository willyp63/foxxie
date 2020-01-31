import { Component, Input } from '@angular/core';
import { Ticket } from '@core/models/ticket.model';

@Component({
  selector: 'fxx-ticket-column',
  templateUrl: './ticket-column.component.html',
  styleUrls: ['./ticket-column.component.scss']
})
export class TicketColumnComponent {
  @Input() title: string;
  @Input() tickets: Ticket[];
}
