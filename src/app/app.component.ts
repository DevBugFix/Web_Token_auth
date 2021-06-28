import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from './Helper/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webAuth';
  constructor(private router: Router) {
    if (this.isUserlogin) {
      this.router.navigate(["/user-management"]);
    }

  }
  onLogout() {
    localStorage.removeItem(Constants.USER_KEY);

  }
  get isUserlogin() {
    const user = localStorage.getItem(Constants.USER_KEY);
    return user && user.length > 0;
  }
}
