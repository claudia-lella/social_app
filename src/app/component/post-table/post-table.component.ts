import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/model/post';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.css']
})
export class PostTableComponent {

  //ATTRIBUTES
  @Input() posts:Post[]|undefined;
  @Input() post:Post|undefined;
  @Input() comment:Comment|undefined;
  @Output() promote = new EventEmitter<number>();

  savePostId(postId:number):void {

    this.promote.emit(postId);
  }

}
