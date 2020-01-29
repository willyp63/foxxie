import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private apiService: ApiService, private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(this.apiService.getUrl('/user/login'), { username, password });
  }
}
