import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, isLoggedIn, getLoggedInUsername } from '@core/reducers';
import { logout } from '@core/actions/auth.actions';

@Component({
  selector: 'fxx-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isLoggedIn$ = this.store.select(isLoggedIn);
  username$ = this.store.select(getLoggedInUsername);

  constructor(private store: Store<AppState>) { }

  logout() {
    this.store.dispatch(logout());
  }
}
