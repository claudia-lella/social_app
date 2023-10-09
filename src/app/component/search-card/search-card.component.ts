import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/user';
import { Friendship } from 'src/app/model/friendship';
import { FriendshipService } from 'src/app/service/friendship.service';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.css']
})
export class SearchCardComponent {

  @Input() user:User|undefined;
  @Output() add = new EventEmitter();

  addFriendshipEmitter():void {
    this.add.emit(this.user);
  }

}
