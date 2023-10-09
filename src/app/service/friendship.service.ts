import { Friendship } from '../model/friendship';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../model/service-response';
import { UserService } from './user.service';

/* ------ API ENDPOINTS ------ */
const FRIENDSHIP_REG_API = "http://localhost:8080/social/friendship/reg";
const FRIENDSHIP_UPDATE_API = "http://localhost:8080/social/friendship/update";
const FRIENDSHIP_DELETE_API = "http://localhost:8080/social/friendship/delete";

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  //CONSTRUCTOR
  constructor(
    private http:HttpClient,
    private userService:UserService) { }

  /* ------ API METHODS ------ */

  /* friendship registration */
  public friendshipRegistration(friendship:Friendship):Observable<ServiceResponse> {

    return this.http.post<ServiceResponse>(`${FRIENDSHIP_REG_API}/${this.userService.getUserToken()}`, friendship)
  }

  /* friendship update */
  public friendshipUpdate(friendship:Friendship):Observable<ServiceResponse>{

    return this.http.put<ServiceResponse>(`${FRIENDSHIP_UPDATE_API}/${this.userService.getUserToken()}`, friendship)
  }

  /* friendship delete */
  public friendshipDelete(friendshipId: number): Observable<ServiceResponse> {

    return this.http.delete<ServiceResponse>(`${FRIENDSHIP_DELETE_API}/${friendshipId}/${this.userService.getUserToken()}`);
  }
  

}
