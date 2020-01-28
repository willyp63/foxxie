import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'fxx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  errorDictionary = { required: 'Required' };

  get usernameErrors() { return this.formGroup.get('username').touched ? this.formGroup.get('username').errors : null; }
  get passwordErrors() { return this.formGroup.get('password').touched ? this.formGroup.get('password').errors : null; }

  onSubmit() {
    console.log(this.formGroup.get('username').errors);
    console.log(this.formGroup.value);
  }
}
