import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login-dash',
  templateUrl: './login-dash.component.html',
  styleUrls: ['./login-dash.component.css']
})
export class LoginDashComponent implements OnInit  {

  //-------ATTRIBUTES-------
  serverError:any;
  @Output() loginChecked = new EventEmitter();
  userLogged:boolean = false;

  //---------CONSTRUCTOR---------
  constructor(
    private userService:UserService,
    private router:Router) { }


  /* initialization */
  ngOnInit():void {

    if(this.userService.checkUserLoginState())
      this.router.navigate(["home"])
    else
      this.router.navigate([""])
  }


  //METHODS

  //login
  formManager(form:NgForm):void
  {
    let user:User = {
      nickname:form.value["nickname"],
      password:form.value["password"]
    };

    this.userService.userLogin(user)
      .subscribe({
        next: response =>{
            this.userService.saveUserData(response.code, response.message);
            this.router.navigate(["home"]);
            this.serverError = undefined;
            form.reset();
            this.loginChecked.emit();
        },
        error: e=>{
          if(e.status == 401)
            this.serverError = "Accesso Negato";
          else
            this.serverError = e.message;
        }
      });
  }

  // leave login 
  leaveLogin(form:NgForm):void {

    this.router.navigate(["reg"])
  }
}
