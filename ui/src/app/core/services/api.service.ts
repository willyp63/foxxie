import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Store } from '@ngrx/store';
import { AppState } from '@core/reducers';
import { getLoggedInUserId } from '@core/reducers';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  userId$ = this.store.select(getLoggedInUserId);

  constructor(private store: Store<AppState>) { }

  getUrl(path: string): Observable<string> {
    return this.userId$.pipe(
      map(userId => environment.apiUrl + path + (userId ? `?userId=${userId}` : '')),
      take(1),
    );
  }
}
