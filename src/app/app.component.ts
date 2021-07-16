import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Constants } from './Helper/constants';
import { User } from './Models/user';
import { BlockUiTemplateComponent } from './sharedModule/block-ui-template/block-ui-template.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @BlockUI('main-loader') blockUI: NgBlockUI;
  public blockUiTemplateComponent = BlockUiTemplateComponent;
  public loaderMessage: string = "loading test";
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

  get user(): User {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  }

  get isAdmin(): boolean {
    return this.user.roles.indexOf('Admin') > -1;
  }
  get isUser(): boolean {
    return this.user.roles.indexOf('User') > -1 && !this.isAdmin;
  }
}
