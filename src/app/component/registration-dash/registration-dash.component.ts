import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-registration-dash',
  templateUrl: './registration-dash.component.html',
  styleUrls: ['./registration-dash.component.css']
})
export class RegistrationDashComponent {

  duplicate:any;
  serverError:any;

  constructor(
    private userService:UserService,
    private router:Router) { }

  //METHODS

  //formManager

  formManager(form:NgForm):void
  {
    let user:User ={
      name:form.value["name"],
      lastname:form.value["lastname"],
      mail:form.value["mail"],
      nickname:form.value["nickname"],
      password:form.value["password"]
    };
    this.userService.userRegistration(user)
    .subscribe({
      next: response =>{
        if(response.code == 201)
        {
          form.reset();
          this.router.navigate([""]);
        }
      },
      error: e =>{
        if(e.status == 406)
          this.duplicate = "Username Occupato"
        else
          this.serverError = "Problemi con il server"
      }
    });

  }

}
