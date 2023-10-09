import { User } from './../../model/user';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  //ATTRIBUTES
  @Output() logout = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() post = new EventEmitter();
  @Input() user:User|undefined;
  @Input() position:any;
  @Output() search = new EventEmitter<string>();
  @Output() searchStarted = new EventEmitter();
  

  deletePopupVisible = false;
  logoutPopupVisible = false;
  postPopupVisible = false;

  constructor(private userService:UserService) { }

  activateDeletePopup():void{
    this.delete.emit();
  }

  activateLogoutPopup():void{
    this.logout.emit();
  }

  closeLogoutPopup(): void {
    this.logoutPopupVisible = false;
  }

  activatePostPopup():void
  {
    this.post.emit();
  }

  searchEmitter(form:NgForm):void {
    
    this.searchStarted.emit();
    this.search.emit(form.value["search"]);
    form.reset();
  }
}
