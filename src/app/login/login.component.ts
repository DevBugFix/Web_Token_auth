import { ResponseModel } from './../Models/responseModel';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from '../Helper/constants';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { User } from '../Models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @BlockUI('main-loader') blockUI: NgBlockUI;
  public loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  })
  constructor(private formBuilder: FormBuilder, private userServie: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log("on submit")
    this.blockUI.start();
    let email = this.loginForm.controls["email"].value;
    let password = this.loginForm.controls["password"].value;
    this.userServie.login(email, password).subscribe((data: ResponseModel) => {

      if (data.responseCode == 1) {
        localStorage.setItem(Constants.USER_KEY, JSON.stringify(data.dateSet));
        let user = data.dateSet as User;
        if (user.roles.indexOf('Admin') > -1)
          this.router.navigate(["/all-user-management"]);
        else {

          this.router.navigate(["/user-management"]);
        }
      }
      this.blockUI.stop();
      console.log("response", data);
    }, error => {
      this.blockUI.stop();
      console.log("error", error)
    })
  }

}
