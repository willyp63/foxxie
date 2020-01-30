import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fxx-pickup-ticket',
  templateUrl: './pickup-ticket.component.html',
  styleUrls: ['./pickup-ticket.component.scss']
})
export class PickupTicketComponent {
  @Input() isNoTicketToPickUp: boolean = false;

  @Output() pickUpTicket: EventEmitter<null> = new EventEmitter<null>();
}
