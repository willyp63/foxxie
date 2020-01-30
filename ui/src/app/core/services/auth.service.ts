import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '@core/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private apiService: ApiService, private http: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    return this.apiService.getUrl('/users/login').pipe(
      mergeMap(url => this.http.post(url, { username, password }) as Observable<User>),
    );
  }
}
