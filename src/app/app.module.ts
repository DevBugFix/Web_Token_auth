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
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddUpdateArticleComponent } from './modal-components/add-update-article/add-update-article.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MyCkEditorComponent } from './sharedModule/ck-editor-module/my-ck-editor/my-ck-editor.component';
import { StripHtmlPipe } from './sharedModule/pipes/strip-html.pipe';
import { TruncatePipe } from './sharedModule/pipes/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserManagementComponent,
    BlockUiTemplateComponent,
    AllUserManagementComponent,
    ArticleManagementComponent,
    MyCkEditorComponent,
    AddUpdateArticleComponent,
    StripHtmlPipe,
    TruncatePipe


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
    ModalModule.forRoot(),
    CKEditorModule,
  ],
  entryComponents:[BlockUiTemplateComponent,ConfirmModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
