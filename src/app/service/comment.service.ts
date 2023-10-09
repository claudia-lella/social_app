import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../model/service-response';
import { Comment } from '../model/comment';
import { UserService } from './user.service';

//API ENDPOINT
const COMMENT_REG_API = "http://localhost:8080/social/comment/reg";


@Injectable({
  providedIn: 'root'
})
export class CommentService {

 //CONSTRUCTOR
  constructor(
  private http:HttpClient,
  private userService:UserService) { }

  //METHODS
  //comment registration
  public commentRegistration(comment:Comment):Observable<ServiceResponse>
  {
    return this.http.post<ServiceResponse>(`${COMMENT_REG_API}/${this.userService.getUserToken()}`, comment)

  }
}
