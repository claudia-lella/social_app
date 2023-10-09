import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../model/service-response';
import { Post } from '../model/post';
import { UserService } from './user.service';

/* API ENDPOINTS */
const POST_REG_API = "http://localhost:8080/social/post/reg";
const POSTS_HOME_GET_API = "http://localhost:8080/social/post/get";
const POSTS_USER_GET_API = "http://localhost:8080/social/post/getmy";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  //CONSTRUCTOR
  constructor(
    private http:HttpClient,
    private userService:UserService) { }

  //METHODS
  //post registration
  public postRegistration(post:Post):Observable<ServiceResponse>
  {
    return this.http.post<ServiceResponse>(`${POST_REG_API}/${this.userService.getUserToken()}`, post)

  }

  //get all posts for home page
  public getAllPosts():Observable<Post[]>
  {
    return this.http.get<Post[]>(`${POSTS_HOME_GET_API}/${this.userService.getUserToken()}`)
  }

   //get user posts for business page
   public getUserPosts():Observable<Post[]>
   {
     return this.http.get<Post[]>(`${POSTS_USER_GET_API}/${this.userService.getUserToken()}`)
   }

}
