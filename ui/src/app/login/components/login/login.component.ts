import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@core/services';

@Component({
  selector: 'fxx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  formGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  loginAttemptFailed = false;
  errorDictionary = { required: 'Required' };

  get username() { return this.formGroup.get('username') }
  get password() { return this.formGroup.get('password') }
  get usernameErrors() { return this.username.touched ? this.username.errors : null; }
  get passwordErrors() { return this.password.touched ? this.password.errors : null; }

  onSubmit() {
    this.authService.login(this.username.value, this.password.value).subscribe((userData) => {
      // TODO: redirect to new ticket page
      console.log(userData);
    }, () => {
      this.loginAttemptFailed = true;
    });
  }
}
