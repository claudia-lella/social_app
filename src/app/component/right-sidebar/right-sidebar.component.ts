import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/service/post.service';
import { User } from 'src/app/model/user';
import { Friendship } from 'src/app/model/friendship';
import { FriendshipService } from 'src/app/service/friendship.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css']
})
export class RightSidebarComponent {

@Input() user:User|undefined;
@Output() confirm = new EventEmitter();
@Output() reject = new EventEmitter();
@Output() delete = new EventEmitter();
@Input() pendingReceivedFriendShips:Friendship[]|undefined;
@Input() pendingSendedFriendShips:Friendship[]|undefined;
@Input() confirmedFriendIds:number[]|undefined;
@Input() friendship:Friendship|undefined;

constructor(private friendshipService:FriendshipService) { }

confirmFriendship(friendship:Friendship):void{
  this.confirm.emit(friendship);
}

rejectFriendship(friendshipId: number): void {
  this.reject.emit({ id: friendshipId } as Friendship);
}

deleteFriendship(friendshipId: number): void {
  this.delete.emit({ id: friendshipId } as Friendship);
}

}
