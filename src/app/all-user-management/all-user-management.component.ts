import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { User } from '../Models/user';
import { UserService } from '../services/user.service';
import { BlockUiTemplateComponent } from '../sharedModule/block-ui-template/block-ui-template.component';

@Component({
  selector: 'app-all-user-management',
  templateUrl: './all-user-management.component.html',
  styleUrls: ['./all-user-management.component.scss']
})
export class AllUserManagementComponent implements OnInit {
  @BlockUI('user-loader') blockUI: NgBlockUI;
  public blockUiTemplateComponent = BlockUiTemplateComponent;
  public loaderMessage: string = "loading test";
  public userList: User[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.blockUI.start();
    this.userService.getAllUser().subscribe((data: User[]) => {
      this.userList = data;
      this.blockUI.stop();
    }, () => {
      this.blockUI.stop();
    })
  }

}
