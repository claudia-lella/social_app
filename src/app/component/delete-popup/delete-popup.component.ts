import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent {

  constructor(
    private userService:UserService,
    private router:Router) {}

  @Input() isVisible:boolean = false;
  deletePopupVisible:boolean = false;
  @Output() delete = new EventEmitter<User>();
  @Input() user:User|undefined;
  @Output() leaveConfirm = new EventEmitter();

  deleteUser(): void {
    this.userService.userDelete(this.user?.id!).subscribe({
      next: (response) => {
        this.delete.emit(this.user); // Emetti l'evento delete dopo l'eliminazione
      },
      error: (e) => console.log(e),
    });
    this.userService.removeAdminToken();
    this.router.navigate([""]);
    this.deletePopupVisible = false;
  }

  leaveDeletePopup(form:NgForm):void
  {
    form.reset();
    this.leaveConfirm.emit();
  }

}
