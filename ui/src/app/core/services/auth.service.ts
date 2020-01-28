import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
    const storedUserData = localStorage.getItem('loggedInUser');
    if (storedUserData) {
      this.loggedInUser = JSON.parse(storedUserData);
    }
  }

  loggedInUser: any = null;

  login(username: string, password: string) {
    // TODO: standardize API response object
    return this.http.post('http://localhost:3000/api/v1/user/login', { username, password }).pipe(
      tap(user => {
        this.loggedInUser = user;
        localStorage.setItem('loggedInUser', JSON.stringify(user));
      }),
    );
  }

  logout() {
    this.loggedInUser = null;
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.loggedInUser !== null;
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }
}
