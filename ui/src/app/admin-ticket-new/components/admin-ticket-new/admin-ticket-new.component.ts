import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, isTicketSaving } from '@core/reducers';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TicketStatus } from '@core/models/ticket.model';
import { createNewTicket } from '@core/actions/ticket.actions';

@Component({
  selector: 'fxx-admin-ticket-new',
  templateUrl: './admin-ticket-new.component.html',
  styleUrls: ['./admin-ticket-new.component.scss']
})
export class AdminTicketNewComponent {
  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {}

  ticketId: string;

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    status: new FormControl(TicketStatus.NotReady, [Validators.required]),
    itMust: new FormControl(''),
  });

  errorDictionary = { required: 'Required' };

  statuses = [
    TicketStatus.NotReady,
    TicketStatus.Ready,
    TicketStatus.Done,
  ];

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

  onSave() {
    if (this.formGroup.valid) {
      this.store.dispatch(createNewTicket({
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
