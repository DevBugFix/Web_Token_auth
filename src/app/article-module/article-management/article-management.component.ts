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
import { AddUpdateArticleComponent } from 'src/app/modal-components/add-update-article/add-update-article.component';

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
  constructor(private articleService: ArticleService, private modalService: BsModalService, private toastr: ToastrService) { }

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

  onAddNew() {
    const initialState: ModalOptions = {
      initialState: {
      },
      ignoreBackdropClick: true,
      backdrop: true,
      class: 'modal-lg'
    };
    const bsModalRef = this.modalService.show(AddUpdateArticleComponent, initialState);
    bsModalRef.content.modalResponse.subscribe((result) => {
      if (result) {
        this.getAllArticle();
      }
    })
  }
  onEdit(tempArticle: Article) {
    const initialState: ModalOptions = {
      initialState: {
        headerTitle: 'Update Article',
        confirmBtnTitle: 'Update',
        articleId: tempArticle.id,
        articleTitle: tempArticle.title,
        articleBody: tempArticle.body,
        articleStatus:tempArticle.status
      },
      ignoreBackdropClick: true,
      backdrop: true,
      class: 'modal-lg'
    };
    const bsModalRef = this.modalService.show(AddUpdateArticleComponent, initialState);
    bsModalRef.content.modalResponse.subscribe((result) => {
      if (result) {
        this.getAllArticle();
      }
    })
  }
  onDelete(articleId: number) {
    console.log("onDelete");
    const initialState: ModalOptions = {
      initialState: {
        message: "Do you want delete?",
        confirmTitle: "Yes",
        declineTitle: "No"
      }
    };
    const bsModalRef = this.modalService.show(ConfirmModalComponent, initialState);
    bsModalRef.content.modalResponse.subscribe((result) => {
      if (result) {
        this.blockUI.start();
        this.articleService.deleteArticle(articleId).subscribe((res) => {
          this.blockUI.stop();
          if (res.responseCode == ResponseCode.OK) {
            this.toastr.success("Article Delete successfully");
            this.getAllArticle();
          } else {
            this.toastr.error("something went wrong please try again later");
          }

        }, () => {
          this.blockUI.stop();
          this.toastr.error("something went wrong please try again later");
        })
      }
    })
  }
  onStatusChange(article:Article){
    article.status=!article.status;
    const initialState: ModalOptions = {
      initialState: {
        message: article.status?"Do you want publish?":"Do you want to unpublish?",
        confirmTitle: "Yes",
        declineTitle: "No"
      }
    };
    const bsModalRef = this.modalService.show(ConfirmModalComponent, initialState);
    bsModalRef.content.modalResponse.subscribe((result) => {
      if (result) {
        this.blockUI.start();
        this.articleService.addUpdateArticle(article.id,article.title,article.body,article.status,this.user.userId).subscribe((res) => {
          this.blockUI.stop();
          if (res.responseCode == ResponseCode.OK) {
            this.toastr.success(article.status?"Article published":"Article unpublished");

          } else {
            this.toastr.error("something went wrong please try again later");
          }

        }, () => {
          this.blockUI.stop();
          this.toastr.error("something went wrong please try again later");
        })
      }else{
        article.status=!article.status;
      }

    })

  }

}
