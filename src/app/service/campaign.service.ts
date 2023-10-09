import { Campaign } from './../model/campaign';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../model/service-response';
import { UserService } from './user.service';

//API ENDPOINT
const CAMPAIGN_REG_API = "http://localhost:8080/social/campaign/reg";
const CAMPAIGN_GET_API = "http://localhost:8080/social/campaign/get";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  //CONSTRUCTOR
  constructor(
    private http:HttpClient,
    private userService:UserService) { }

  //METHODS
  //campaign registration
  public campaignRegistration(campaign:Campaign):Observable<ServiceResponse>
  {
    return this.http.post<ServiceResponse>(`${CAMPAIGN_REG_API}/${this.userService.getUserToken()}`, campaign)

  }

  //campaigns get
  public getCampaigns():Observable<Campaign[]>
  {
    return this.http.get<Campaign[]>(`${CAMPAIGN_GET_API}/${this.userService.getUserToken()}`)
  }
}
