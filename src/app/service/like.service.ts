import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../model/service-response';
import { Like } from '../model/like';
import { UserService } from './user.service';

//API ENDPOINT
const LIKE_REG_API = "http://localhost:8080/social/like/reg";

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  //CONSTRUCTOR
  constructor(
    private http:HttpClient,
    private userService:UserService) { }

  //METHODS
  //like registration
  public likeRegistration(like:Like):Observable<ServiceResponse>
  {
    return this.http.post<ServiceResponse>(`${LIKE_REG_API}/${this.userService.getUserToken()}`, like)
  }
}
