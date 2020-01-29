import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    // TODO: standardize API response object
    return this.http.post(environment.apiUrl + '/user/login', { username, password });
  }
}
