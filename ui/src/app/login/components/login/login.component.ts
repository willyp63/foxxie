import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'fxx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

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
      this.router.navigate(['/']);
    }, () => {
      this.loginAttemptFailed = true;
    });
  }
}
