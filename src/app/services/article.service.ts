import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ResponseCode } from '../enums/responseCode';
import { Constants } from '../Helper/constants';
import { Article } from '../Models/article';
import { ResponseModel } from '../Models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) { }

  public deleteArticle(articleId: number) {

    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userInfo?.token}`
    });
    const body = {
      Id: articleId
    }
    return this.httpClient.post<ResponseModel>(Constants.BASE_URL + "Article/DeleteArticle", body, { headers: headers });

  }

  public addUpdateArticle(articleId: number,title:string ,articleBody:string,publish:boolean,userId:string) {

    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userInfo?.token}`
    });
    const body = {
      Id: articleId,
      Title:title,
      Body:articleBody,
      Publish:publish,
      AppUserId:userId

    }
    return this.httpClient.post<ResponseModel>(Constants.BASE_URL + "Article/AddUpdateArticle", body, { headers: headers });

  }

  public getArticlesByAuthorId(authorId: string) {
    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userInfo?.token}`
    });

    return this.httpClient.get<ResponseModel>(Constants.BASE_URL + "Article/GetArticleListForAdmin?AuthorId=" + authorId, { headers: headers }).pipe(map(res => {
      let articleList = new Array<Article>();
      if (res.responseCode == ResponseCode.OK) {

        if (res.dateSet) {
          res.dateSet.map((x: any) => {
            articleList.push(new Article(x.id, x.title, x.body, x.publish,new Date(x.createdDate), new Date(x.modifiedDate)));
          })
        }
      }
      return articleList;
    }));
  }

  public getPublishedArticles(authorId: string) {
    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY));
    const headers = new HttpHeaders({

    });

    return this.httpClient.get<ResponseModel>(Constants.BASE_URL + "Article/GetArticleList?AuthorId=" + authorId, { headers: headers }).pipe(map(res => {
      let articleList = new Array<Article>();
      if (res.responseCode == ResponseCode.OK) {

        if (res.dateSet) {
          res.dateSet.map((x: any) => {
            articleList.push(new Article(x.id, x.title, x.body, x.publish,new Date(x.createdDate), new Date(x.modifiedDate)));
          })
        }
      }
      return articleList;
    }));
  }

  public getArticleById(articleId: number) {
    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY));
    const headers = new HttpHeaders({

    });

    return this.httpClient.get<ResponseModel>(Constants.BASE_URL + "Article/GetArticleById?Id=" + articleId, { headers: headers }).pipe(map(res => {
      let article = new Article();
      if (res.responseCode == ResponseCode.OK) {

        if (res.dateSet) {
          let x = res.dateSet;
          article = new Article(x.id, x.title, x.body, x.publish, new Date(x.createdDate), new Date(x.modifiedDate))

        }
      }
      return article;
    }));
  }

}
