import { ConfirmModalComponent } from './modal-components/confirm-modal/confirm-modal.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { BlockUiTemplateComponent } from './sharedModule/block-ui-template/block-ui-template.component'
import { BlockUIModule } from 'ng-block-ui';
import { AllUserManagementComponent } from './all-user-management/all-user-management.component';
import { ToastrModule } from 'ngx-toastr';
import { ArticleManagementComponent } from './article-module/article-management/article-management.component';
import { AddUpdateArticleComponent } from './article-module/add-update-article/add-update-article.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserManagementComponent,
    BlockUiTemplateComponent,
    AllUserManagementComponent,
    ArticleManagementComponent,
    AddUpdateArticleComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BlockUIModule.forRoot({
      template: BlockUiTemplateComponent
    }),
    ModalModule.forRoot()
  ],
  entryComponents:[BlockUiTemplateComponent,ConfirmModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
