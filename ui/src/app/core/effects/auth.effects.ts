import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from '@core/services';
import { login, loginFailed, loginSuccess, logout } from '@core/actions/auth.actions';
import { Router } from '@angular/router';
import { noop } from '@core/actions/noop.actions';
 
@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ username, password }) => this.authService.login(username, password)
        .pipe(
          map(user => loginSuccess(user)),
          catchError(() => of(loginFailed()))
        )
      )
    )
  );

  redirectAfterSuccessfulLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      tap(() => this.router.navigate(['/'])),
      map(() => noop()),
    )
  );

  redirectAfterLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => this.router.navigate(['/login'])),
      map(() => noop()),
    )
  );
 
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
  ) {}
}
