import { ResponseModel } from './../Models/responseModel';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Role } from '../Models/role';
import { UserService } from '../services/user.service';
import { ResponseCode } from '../enums/responseCode';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

   public roles:Role[]=[];
  public registerForm;
  constructor(private router:Router,private formBuilder:FormBuilder,private userServie:UserService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerForm=this.formBuilder.group({
      fullName:['',[Validators.required]],
      email:['',[Validators.email,Validators.required]],
      password:['',Validators.required]
    });
    this.getAllRoles();
  }
  onSubmit()
  {

    let fullName=this.registerForm.controls["fullName"].value;
    let email=this.registerForm.controls["email"].value;
    let password=this.registerForm.controls["password"].value;
    this.userServie.register(fullName,email,password,this.roles.filter(x=>x.isSelected).map(x=>x.role)).subscribe((data:ResponseModel)=>{
       if(data.responseCode==ResponseCode.OK)
       {
        this.registerForm.controls["fullName"].setValue("");
        this.registerForm.controls["email"].setValue("");
        this.registerForm.controls["password"].setValue("");
        this.roles.forEach(x=>x.isSelected=false);
        this.toastr.success("You have created account please login");
        this.router.navigate(["login"]);

       }else{
         this.toastr.error(data.dateSet[0]);
       }
     console.log("response",data);
    },error=>{
      console.log("error",error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
getAllRoles()
{
  this.userServie.getAllRole().subscribe(roles=>{
   this.roles=roles;
  });
}
onRoleChange(role:string)
{
this.roles.forEach(x=>{
  if(x.role==role)
  {
    x.isSelected=!x.isSelected;
  }

})
}

get isRoleSelected()
{
  return this.roles.filter(x=>x.isSelected).length>0;
}

}
