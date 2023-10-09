import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-business-popup',
  templateUrl: './business-popup.component.html',
  styleUrls: ['./business-popup.component.css']
})
export class BusinessPopupComponent {

  @Input() businessPopupVisible: boolean = false;
  @Output() upgradeConfirmed = new EventEmitter();
  @Output() upgradeCancelled = new EventEmitter();


  confirmUpgrade() {
    this.upgradeConfirmed.emit();
  }

  cancelUpgrade() {
    this.upgradeCancelled.emit();
  }

}
