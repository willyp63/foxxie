import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  loggedInUser: any = null;

  login(username: string, password: string) {
    // TODO: standardize API response object
    return this.http.post('http://localhost:3000/api/v1/user/login', { username, password }).pipe(
      tap(user => this.loggedInUser = user),
    );
  }

  isLoggedIn() {
    return this.loggedInUser !== null;
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }
}
