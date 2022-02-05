import { ArticleService } from './../../services/article.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Subject } from 'rxjs';
import { Constants } from 'src/app/Helper/constants';
import { User } from 'src/app/Models/user';
import { ResponseCode } from 'src/app/enums/responseCode';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { BlockUiTemplateComponent } from 'src/app/sharedModule/block-ui-template/block-ui-template.component';

@Component({
  selector: 'app-add-update-article',
  templateUrl: './add-update-article.component.html',
  styleUrls: ['./add-update-article.component.scss']
})
export class AddUpdateArticleComponent implements OnInit {

  public headerTitle:string='Add Article'
  public confirmBtnTitle:string='Add';
  public articleId:number=0;
  public articleTitle:string='';
  public articleStatus:boolean=false;
  public articleBody:string='';
  public modalResponse:Subject<boolean>;
  public addUpdateArticleForm:FormGroup;
  @BlockUI('user-loader') blockUI: NgBlockUI;
  public blockUiTemplateComponent = BlockUiTemplateComponent;
  public loaderMessage: string = "Saving Please Wait";
  constructor(private bsModalRef: BsModalRef,private formBuilder:FormBuilder,private articleService:ArticleService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.modalResponse=new Subject();

    this.addUpdateArticleForm=this.formBuilder.group({
      title:['',[Validators.required]],
      body:['',[Validators.required]]

    });
  }
  confirm() {
    console.log("on Confirm title",this.articleTitle,"body =>",this.articleBody)
    this.blockUI.start();
    this.articleService.addUpdateArticle(this.articleId,this.articleTitle,this.articleBody,this.articleStatus,this.user.userId).subscribe((res)=>{
      this.blockUI.stop();
      if(res.responseCode==ResponseCode.OK)
      {
        if(this.articleId>0){

          this.toastr.success("Article updated successfully");
        }else{

          this.toastr.success("Article saved successfully");
        }
        this.bsModalRef.hide();
        this.modalResponse.next(true);
      }else{
        this.toastr.error("Something went wrong");
      }
    },()=>{
      this.blockUI.stop();
      this.toastr.error("Something went wrong");
    })

  }
  decline() {
    this.bsModalRef.hide();
    this.modalResponse.next(false);
  }
  get user(): User {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  }

  getFormControl(controlName){
    return this.addUpdateArticleForm.controls[controlName];
  }

}
