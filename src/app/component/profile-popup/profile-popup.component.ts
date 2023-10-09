import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrls: ['./profile-popup.component.css']
})
export class ProfilePopupComponent {

  /* ------ ATTRIBUTES ------ */
  @Input() isVisible:boolean = false;
  @Input() user:User|undefined;
  @Output() leave = new EventEmitter();
  @Input() profileImage:any;

  /* ------ CONSTRUCTOR ------ */
  constructor(private userService:UserService) {}

  /* ------ METHODS ------ */

  /* form manager */
  formManager(form:NgForm):void {

    this.updateUser(form);
  }

  /* update user form */
updateUser(form: NgForm): void {
  if (this.user) {
      let image = this.profileImage ? this.profileImage : null;

      // Aggiungi la logica di verifica delle dimensioni dell'immagine
      if (image) {
          const maxSize = 5242880; // 5 MB
          if (image.size > maxSize) {
              // L'immagine supera le dimensioni consentite
              const imageSizeError = document.getElementById('imageSizeError');
              if (imageSizeError) {
                  imageSizeError.textContent = 'L\'immagine supera le dimensioni consentite (5 MB)';
                  imageSizeError.style.display = 'block';
              }
              return; // Non continuare con l'aggiornamento dell'utente
          }
      }

      this.user.name = form.value["name"];
      this.user.lastname = form.value["lastname"];
      this.user.mail = form.value["mail"];
      this.user.password = form.value["password"];
      this.user.profileImage = image;

      this.userService.userUpdate(this.user)
          .subscribe({
              next: response => {
                  if (response.code == 202) {
                      form.reset();
                      this.profileImage = undefined;
                      this.leave.emit();
                  }
              },
              error: e => console.log(e.message)
          })
  };
}

  /* leave popupo update user */
  leaveUserUpdatePopup(form:NgForm):void {

    form.reset();
    this.profileImage = undefined;
    this.leave.emit();
  }

  uploadImage(event:any):void {
    
    let file:File = event.target.files[0];
    let reader = new FileReader();
    
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.profileImage = reader.result as string;
      event.target.value = "";
    }
  }

}
