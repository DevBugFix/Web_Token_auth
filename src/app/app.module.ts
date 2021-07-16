import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { BlockUiTemplateComponent } from './sharedModule/block-ui-template/block-ui-template.component'
import { BlockUIModule } from 'ng-block-ui';
import { AllUserManagementComponent } from './all-user-management/all-user-management.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserManagementComponent,
    BlockUiTemplateComponent,
    AllUserManagementComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BlockUIModule.forRoot({
      template: BlockUiTemplateComponent
    })
  ],
  entryComponents:[BlockUiTemplateComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
