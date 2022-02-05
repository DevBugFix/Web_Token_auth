import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { Article } from 'src/app/Models/article';
import { User } from 'src/app/Models/user';
import { ArticleService } from 'src/app/services/article.service';
import { BlockUiTemplateComponent } from 'src/app/sharedModule/block-ui-template/block-ui-template.component';

@Component({
  selector: 'app-all-article-list-public',
  templateUrl: './all-article-list-public.component.html',
  styleUrls: ['./all-article-list-public.component.scss']
})
export class AllArticleListPublicComponent implements OnInit {

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
    let userId=this.isUserlogin?this.user.userId:"0";
    this.articleService.getPublishedArticles(userId).subscribe((data: Article[]) => {
      this.articleList = data;
      this.blockUI.stop();
    }, () => {
      this.blockUI.stop();
    })
  }

  get user(): User {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  }
  get isUserlogin() {
    const user = localStorage.getItem(Constants.USER_KEY);
    return user && user.length > 0;
  }

}
