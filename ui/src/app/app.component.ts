import { Component, OnInit } from '@angular/core';
import { AppState } from '@core/reducers';
import { Store } from '@ngrx/store';
import { loginFromLocalStorage } from '@core/actions/auth.actions';

@Component({
  selector: 'fxx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(loginFromLocalStorage());
  }
}
