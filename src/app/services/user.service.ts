import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../Models/responseModel';
import {map} from 'rxjs/operators'
import { ResponseCode } from '../enums/responseCode';
import { User } from '../Models/user';
import { Constants } from '../Helper/constants';
import { Role } from '../Models/role';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient,private toastr: ToastrService) { }

   public login(email:string , password:string)
   {
     const body={
       Email:email,
       Password:password
     }
    return this.httpClient.post<ResponseModel>(Constants.BASE_URL+"user/Login",body);
   }

   public register(fullname:string,email:string , password:string,roles:string[])
   {

     const body={
       FullName:fullname,
       Email:email,
       Password:password,
       Roles:roles
     }
    return this.httpClient.post<ResponseModel>(Constants.BASE_URL+"user/RegisterUser",body);
   }

   public getAllUser()
   {
     let userInfo=JSON.parse(localStorage.getItem(Constants.USER_KEY));
    const headers=new HttpHeaders({
'Authorization':`Bearer ${userInfo?.token }`
    });

    return this.httpClient.get<ResponseModel>(Constants.BASE_URL+"user/GetAllUser",{headers:headers}).pipe(map(res=>{
      let userList=new Array<User>();
      if(res.responseCode==ResponseCode.OK)
      {
           if(res.dateSet)
           {
           res.dateSet.map((x:User)=>{
               userList.push(new User(x.userId,x.fullName,x.email,x.userName,x.roles));
           })
           }
          }
          return userList;
    }));
   }
   public getUserList()
   {
     let userInfo=JSON.parse(localStorage.getItem(Constants.USER_KEY));
    const headers=new HttpHeaders({
'Authorization':`Bearer ${userInfo?.token }`
    });

    return this.httpClient.get<ResponseModel>(Constants.BASE_URL+"user/GetUserList",{headers:headers}).pipe(map(res=>{
      let userList=new Array<User>();
      if(res.responseCode==ResponseCode.OK)
      {
           if(res.dateSet)
           {
           res.dateSet.map((x:User)=>{
               userList.push(new User(x.userId,x.fullName,x.email,x.userName,x.roles));
           })
           }
          }else{
            this.toastr.error(res.responseMessage);
          }
          return userList;
    }));
   }
   public getAllRole()
   {
     let userInfo=JSON.parse(localStorage.getItem(Constants.USER_KEY));
    const headers=new HttpHeaders({
'Authorization':`Bearer ${userInfo?.token }`
    });

    return this.httpClient.get<ResponseModel>(Constants.BASE_URL+"user/GetRoles",{headers:headers}).pipe(map(res=>{
      let roleList=new Array<Role>();
      if(res.responseCode==ResponseCode.OK)
      {
           if(res.dateSet)
           {
           res.dateSet.map((x:string)=>{
               roleList.push(new Role(x));
           })
           }
          }
          return roleList;
    }));
   }

}
