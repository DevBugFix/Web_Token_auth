import { ArticleService } from './../../services/article.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockUiTemplateComponent } from 'src/app/sharedModule/block-ui-template/block-ui-template.component';
import { ToastrService } from 'ngx-toastr';
import { Article } from 'src/app/Models/article';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  public articleId:number=0;
  @BlockUI('user-loader') blockUI: NgBlockUI;
  public blockUiTemplateComponent = BlockUiTemplateComponent;
  public loaderMessage: string = "loading test";
  public article:Article=new Article();
  constructor(private activatedRoute:ActivatedRoute,private articleService:ArticleService,private toastr: ToastrService) { }

  ngOnInit(): void {
   this.activatedRoute.queryParams.subscribe((params)=>{
     this.articleId=params['id'];
      if(this.articleId>0)
      {
        this.getArticleById(this.articleId);
      }
    })
  }

  getArticleById(id:number){
    this.blockUI.start();
     this.articleService.getArticleById(id).subscribe((data)=>{
        this.blockUI.stop();
      this.article=data;
     },()=>{
     this.blockUI.stop();
       this.toastr.error("Something went please try again")

     })

  }

}
