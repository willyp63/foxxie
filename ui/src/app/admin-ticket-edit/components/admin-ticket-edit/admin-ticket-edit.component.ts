import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, getTicket, isTicketSaving } from '@core/reducers';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { fetchTicket, updateTicket } from '@core/actions/ticket.actions';
import { Ticket, TicketStatus } from '@core/models/ticket.model';

@Component({
  selector: 'fxx-admin-ticket-edit',
  templateUrl: './admin-ticket-edit.component.html',
  styleUrls: ['./admin-ticket-edit.component.scss']
})
export class AdminTicketEditComponent implements OnInit {
  ticket$ = this.store.select(getTicket);

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
  ) {}

  ticketId: string;

  formGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    priority: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
    status: new FormControl(null, [Validators.required]),
    itMust: new FormControl(null),
  });

  errorDictionary = { required: 'Required' };

  statuses = [];

  get name() { return this.formGroup.get('name') }
  get price() { return this.formGroup.get('price') }
  get priority() { return this.formGroup.get('priority') }
  get description() { return this.formGroup.get('description') }
  get status() { return this.formGroup.get('status') }
  get itMust() { return this.formGroup.get('itMust') }

  get nameErrors() { return this.name.touched ? this.name.errors : null; }
  get priceErrors() { return this.price.touched ? this.price.errors : null; }
  get priorityErrors() { return this.priority.touched ? this.priority.errors : null; }
  get descriptionErrors() { return this.description.touched ? this.description.errors : null; }
  get statusErrors() { return this.status.touched ? this.status.errors : null; }
  get itMustErrors() { return this.itMust.touched ? this.itMust.errors : null; }

  ngOnInit() {
    // TODO: unsubscribe
    this.route.paramMap.pipe(take(1)).subscribe((params: ParamMap) => {
      this.ticketId = params.get('ticketId');
      this.store.dispatch(fetchTicket({ ticketId: this.ticketId }));
    });

    // TODO: unsubscribe
    this.ticket$.subscribe((ticket: Ticket) => {
      if (!ticket) { return; }

      this.statuses = ticket.status === TicketStatus.Assigned
        ? [
            TicketStatus.NotReady,
            TicketStatus.Ready,
            TicketStatus.Assigned,
            TicketStatus.Done,
          ]
        : [
            TicketStatus.NotReady,
            TicketStatus.Ready,
            TicketStatus.Done,
          ];

      this.name.setValue(ticket.name);
      this.price.setValue(ticket.price);
      this.priority.setValue(ticket.priority);
      this.status.setValue(ticket.status);
      this.description.setValue(ticket.description);
      this.itMust.setValue(ticket.itMust.join('\n'));
    });
  }

  onSave() {
    if (this.formGroup.valid) {
      this.store.dispatch(updateTicket({
        _id: this.ticketId,
        name: this.name.value,
        price: this.price.value,
        priority: this.priority.value,
        status: this.status.value,
        description: this.description.value,
        itMust: this.itMust.value.trim().split('\n'),
      }));

      // TODO: unsubscribe
      this.store.select(isTicketSaving).subscribe((isSaving) => {
        if (!isSaving) {
          this.router.navigate(['/admin']);
        }
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
