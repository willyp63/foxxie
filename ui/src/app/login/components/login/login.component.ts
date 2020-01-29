import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, hasFailedLogin } from '@core/reducers';
import { login } from '@core/actions/auth.actions';

@Component({
  selector: 'fxx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hasFailedLogin$ = this.store.select(hasFailedLogin);

  constructor(private store: Store<AppState>) {}

  formGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  errorDictionary = { required: 'Required' };

  get username() { return this.formGroup.get('username') }
  get password() { return this.formGroup.get('password') }
  get usernameErrors() { return this.username.touched ? this.username.errors : null; }
  get passwordErrors() { return this.password.touched ? this.password.errors : null; }

  onSubmit() {
    this.store.dispatch(login({ username: this.username.value, password: this.password.value }));
  }
}
