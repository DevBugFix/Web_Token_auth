import { ConfirmModalComponent } from './../../modal-components/confirm-modal/confirm-modal.component';
import { ArticleService } from './../../services/article.service';
import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Article } from 'src/app/Models/article';
import { User } from 'src/app/Models/user';
import { BlockUiTemplateComponent } from 'src/app/sharedModule/block-ui-template/block-ui-template.component';
import { Constants } from 'src/app/Helper/constants';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ResponseCode } from 'src/app/enums/responseCode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-article-management',
  templateUrl: './article-management.component.html',
  styleUrls: ['./article-management.component.scss']
})
export class ArticleManagementComponent implements OnInit {

  @BlockUI('user-loader') blockUI: NgBlockUI;
  public blockUiTemplateComponent = BlockUiTemplateComponent;
  public loaderMessage: string = "loading test";
  public articleList: Article[] = [];
  constructor(private articleService: ArticleService,private modalService: BsModalService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllArticle();
  }

  getAllArticle() {
    this.blockUI.start();
    this.articleService.getArticlesByAuthorId(this.user.userId).subscribe((data: Article[]) => {
      this.articleList = data;
      this.blockUI.stop();
    }, () => {
      this.blockUI.stop();
    })
  }

  get user(): User {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  }

  onAddNew()
  {
  console.log("on Add new")
  }
  onEdit(id:number)
  {
  console.log("on Edit Id",id);
  }
  onDelete(articleId:number){
    console.log("onDelete");
    const initialState: ModalOptions = {
      initialState: {
         message:"Do you want delete?",
         confirmTitle:"Yes",
         declineTitle: "No"
      }
    };
    const bsModalRef = this.modalService.show(ConfirmModalComponent, initialState);
    bsModalRef.content.modalResponse.subscribe((result)=>{
      if(result)
      {
        this.blockUI.start();
         this.articleService.deleteArticle(articleId).subscribe((res)=>{
            this.blockUI.stop();
           if(res.responseCode==ResponseCode.OK)
           {
           this.toastr.success("Article Delete successfully");
           this.getAllArticle();
           }else{
           this.toastr.error("something went wrong please try again later");
           }

         },()=>{
           this.blockUI.stop();
           this.toastr.error("something went wrong please try again later");
         })
      }


    })

  }

}
