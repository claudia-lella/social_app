import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent {

  /* ------ ATTRIBUTES ------ */
  @Input() user:User|undefined;
  @Input() userLogged:boolean = false;
  @Output() profilePopup = new EventEmitter();
  @Input() upgradeVisible:boolean = false;
  @Input() updateVisible:boolean = false;
  businessPopupVisible = false;
  @Output() upgrade = new EventEmitter();

  constructor(
    private router:Router) { }

  activateProfilePopup():void {

    this.profilePopup.emit();
  }

  goToBusiness():void
  {
    this.router.navigate(["business"])
  }

  openBusinessPopup(): void {
    this.businessPopupVisible = true;
    this.upgrade.emit();
  }

  cancelUpgrade(): void {
    this.businessPopupVisible = false;
  }
  


}
