import { Component } from '@angular/core';
import { AuthService } from '@core/services';

@Component({
  selector: 'fxx-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(private authService: AuthService) { }

  get isLoggedIn() { return this.authService.isLoggedIn(); }
  get username() { return this.authService.getLoggedInUser().username; }
}
