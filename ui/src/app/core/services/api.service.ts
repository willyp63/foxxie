import { Injectable } from '@angular/core';
import { environment } from '@env';

@Injectable({ providedIn: 'root' })
export class ApiService {
  getUrl(path: string) {
    return environment.apiUrl + path;
  }
}
