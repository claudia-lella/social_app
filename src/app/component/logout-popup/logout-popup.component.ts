import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-popup',
  templateUrl: './logout-popup.component.html',
  styleUrls: ['./logout-popup.component.css']
})
export class LogoutPopupComponent {

  //constructure
  constructor(
    private userService:UserService,
    private router:Router) {}

  @Output() leavePopup = new EventEmitter();
  @Input() isVisible: boolean = false;
  logoutPopupVisible: boolean = false;
  @Output() leaveConfirm = new EventEmitter();
  @Output() logout = new EventEmitter();

  logoutUser(): void {
    this.userService.userLogout()
      .subscribe({
        next: response => {
          this.userService.removeAdminToken();

          // Chiudi il popup
          this.logoutPopupVisible = false;

          this.logout.emit();
          this.router.navigate([""])
        },
        error: e => console.log(e)
      });
  }

  leaveLogoutPopup(form:NgForm): void {
    this.isVisible = false;
    this.leavePopup.emit();
    this.logoutPopupVisible = false;
  }

}
