import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../model/service-response';

/* ------ API ENDPOINTS ------ */
const USER_REG_API = "http://localhost:8080/social/user/reg";
const USER_UPDATE_API = "http://localhost:8080/social/user/update";
const USER_DELETE_API = "http://localhost:8080/social/user/delete";
const USER_LOGIN_API = "http://localhost:8080/social/user/login";
const USER_LOGOUT_API = "http://localhost:8080/social/user/logout";
const USER_DATA_API = "http://localhost:8080/social/user/get";
const USER_UPGRADE_API = "http://localhost:8080/social/user/upgrade";
const USER_SEARCH_API = "http://localhost:8080/social/user/getsearch";

/* ------ LOCAL STORAGE KEYS ------ */
const USER_STORAGE_ID = "id";
const USER_STORAGE_TKN = "tkn";

let user:User|undefined;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /* ------ CONSTRUCTOR ------ */
  constructor(private http:HttpClient) { }

  /* ------ INTERNAL SERVICE METHODS ------ */
  
  /* saving user data in local storage */
  public saveUserData(id:any, token:string):void {

    localStorage.setItem(USER_STORAGE_ID, id);
    localStorage.setItem(USER_STORAGE_TKN, token);
  }

  /* get user token */
  public getUserToken():string {

    if(localStorage.getItem(USER_STORAGE_TKN))
      return localStorage.getItem(USER_STORAGE_TKN) as string;
    return "_";
  }

  /* check user login */
  public checkUserLoginState():boolean {

    return localStorage.getItem(USER_STORAGE_TKN) != null;
  }
  
  /* get user id */
  public getUserId():number {

    if(localStorage.getItem(USER_STORAGE_ID))
      return parseInt(localStorage.getItem(USER_STORAGE_ID)!);
    return 0;
  }

  /* remove user credential */
  public removeUserCredential():void {
    if(localStorage.getItem(USER_STORAGE_ID) && localStorage.getItem(USER_STORAGE_TKN)) {
      localStorage.removeItem(USER_STORAGE_ID);
      localStorage.removeItem(USER_STORAGE_TKN);
    }

  }

  /* ------ API METHODS ------ */

  /* user registration */
  public userRegistration(user:User):Observable<ServiceResponse> {

    return this.http.post<ServiceResponse>(USER_REG_API, user);
  }

  /* user login */
  public userLogin(user:User):Observable<ServiceResponse> {

    return this.http.put<ServiceResponse>(USER_LOGIN_API, user);
  }

  /* user logout */
  public userLogout():Observable<ServiceResponse> {

    return this.http.get<ServiceResponse>(USER_LOGOUT_API + "/" + this.getUserToken());
  }

  /* user update */
  public userUpdate(user:User):Observable<ServiceResponse> {

    return this.http.put<ServiceResponse>(USER_UPDATE_API + "/" + this.getUserToken(), user);
  }

  /* user delete */
  public userDelete(userId: number): Observable<ServiceResponse> {

  return this.http.delete<ServiceResponse>(`${USER_DELETE_API}/${userId}/${this.getUserToken()}`);
  }

    //remove token from local storage 
    public removeAdminToken():void
    {
      if(localStorage.getItem(USER_STORAGE_TKN))
        localStorage.removeItem(USER_STORAGE_TKN);
      if(localStorage.getItem(USER_STORAGE_ID))
      localStorage.removeItem(USER_STORAGE_ID)
    }

  /* get users */
  public userGet():Observable<User> {

    return this.http.get<User>(USER_DATA_API + "/" + this.getUserToken());
  }

  /* user upgrade */
  public userUpgrade(user:User):Observable<ServiceResponse> {

    return this.http.put<ServiceResponse>(USER_UPGRADE_API + "/" + this.getUserToken(), user);
  }

  /* user search */
  public searchUser(search:string):Observable<User[]> {
    console.log(search)
    return this.http.get<User[]>(`${USER_SEARCH_API}/${search}/${this.getUserToken()}`);
  }
}
