import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/service/post.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-post-popup',
  templateUrl: './post-popup.component.html',
  styleUrls: ['./post-popup.component.css']
})
export class PostPopupComponent {

  @Input() isVisible: boolean = false;
  @Input() image:any;
  @Output() leave = new EventEmitter();
  @Input() user:User|undefined;


  constructor(private postService:PostService) {}

  formManager(form:NgForm):void {

    this.registerPost(form);
  }

  registerPost(form:NgForm): void {

      let postImage = this.image ? this.image : null;
      let post:Post = {
        content:form.value["content"],
        image:postImage,
        user:{
          id:this.user?.id
        }
      }
      this.postService.postRegistration(post)
        .subscribe({
          next: response => {
            if(response.code == 201){
              form.reset();
              this.image = undefined;
              this.leave.emit();
            }
          },
          error: e => console.log(e.message)
        })
      
  }

  leavePostPopup(form:NgForm):void{

    form.reset();
    this.image = undefined;
    this.leave.emit();
  }

  uploadImage(event:any):void {
    
    let file:File = event.target.files[0];
    let reader = new FileReader();
    
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.image = reader.result as string;
      event.target.value = "";
    }
  }

}
