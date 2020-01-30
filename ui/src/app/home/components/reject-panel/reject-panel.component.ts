import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@core/reducers';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'fxx-reject-panel',
  templateUrl: './reject-panel.component.html',
  styleUrls: ['./reject-panel.component.scss']
})
export class RejectPanelComponent {
  constructor(private store: Store<AppState>) {}

  formGroup = new FormGroup({
    reason: new FormControl(null, [Validators.required]),
    details: new FormControl('', [Validators.required]),
  });

  errorDictionary = { required: 'Required' };

  get reason() { return this.formGroup.get('reason') }
  get details() { return this.formGroup.get('details') }
  get reasonErrors() { return this.reason.touched ? this.reason.errors : null; }
  get detailsErrors() { return this.details.touched ? this.details.errors : null; }

  rejectReasons = [
    "Not enough money",
    "AC not clear",
    "Really long option that will likely overlap the chevron",
  ];

  onReject() {
    if (this.formGroup.valid) {
      console.log(this.reason.value);
      console.log(this.details.value);
      // this.store.dispatch(login({ username: this.username.value, password: this.password.value }));
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
