import { Injectable } from '@angular/core';
import { CampaignPattern } from '../model/campaignPattern';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//api
const PATTERNS_GET_API = "http://localhost:8080/social/campaign_pattern/get";

@Injectable({
  providedIn: 'root'
})
export class CampaignPatternService {

  //CONSTRUCTOR
  constructor(
    private http:HttpClient) { }


   //get all posts for home page
   public getAllPatterns():Observable<CampaignPattern[]>
   {
     return this.http.get<CampaignPattern[]>(`${PATTERNS_GET_API}`)
   }

  }
