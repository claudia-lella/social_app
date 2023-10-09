import { CommentService } from './../../service/comment.service';
import { Comment } from './../../model/comment';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { PostService } from 'src/app/service/post.service';
import { Like } from 'src/app/model/like';
import { LikeService } from 'src/app/service/like.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit{

  //ATTRIBUTES
  @Input() post:Post|undefined;
  @Input() comment:Comment|undefined;
  @Input() loggedUser:User|undefined;
  @Output() addComment = new EventEmitter();

  comments:Comment[]|undefined;
  showComments:boolean = false;
  showLike:boolean = false;
  likedByUser:boolean = false;

  constructor(
    private postService:PostService,
    private likeService:LikeService,
    private commentService:CommentService
  ) {}

  ngOnInit(): void {    
    // verifica post in like per utente loggato
    if(this.post && this.loggedUser && this.post.likes)
      for(let like of this.post.likes)
        if(like.user?.id == this.loggedUser.id) {
          this.likedByUser = true;
          break;
        }
  }

  showPostComments() {
    this.showComments = !this.showComments;
  }

  // showPostLikes() {
  //   this.showLike = !this.showLike;
  // }

  formManager(form:NgForm):void
  {

    if(this.post && this.loggedUser)  {

      let comment:Comment ={
        content:form.value["content"],
        post:{id:this.post?.id},
        user:{id:this.loggedUser.id}
      };
      this.commentService.commentRegistration(comment)
      .subscribe({
        next: response =>{
          if(response.code == 201)
          {
            form.reset();
            this.addComment.emit();
          }
        },
        error: e => console.log(e.message)

      });
    }
  }

  addLike():void {

    if(this.post && !this.likedByUser && this.loggedUser) {
      
      let like:Like = {

        post:{id:this.post.id},
        user:{id:this.loggedUser.id}
      };

      this.likeService.likeRegistration(like)
        .subscribe({
          next: response => {
            if(response.code == 201) {
              this.post?.likes?.push(like);
              this.likedByUser = true;
            }
          },
          error: e => console.log(e.message)
        })
    }

  }

}