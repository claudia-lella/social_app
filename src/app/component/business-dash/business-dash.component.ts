import { CampaignService } from './../../service/campaign.service';
import { Campaign } from './../../model/campaign';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Post } from 'src/app/model/post';
import { UserService } from 'src/app/service/user.service';
import { PostService } from 'src/app/service/post.service';
import { CampaignPatternService } from 'src/app/service/campaign-pattern.service';
import { CampaignPattern } from 'src/app/model/campaignPattern';


@Component({
  selector: 'app-business-dash',
  templateUrl: './business-dash.component.html',
  styleUrls: ['./business-dash.component.css']
})
export class BusinessDashComponent implements OnInit{

  user:User|undefined;
  userLogged:boolean = false;
  posts:Post[]|undefined;
  post:Post|undefined;
  selectedPost:Post|undefined;
  campaign:Campaign|undefined;
  postId:number|undefined;
  patterns:CampaignPattern[]|undefined;
  campaigns: Campaign[] = [];


  /* ------ CONSTRUCTOR ------ */
  constructor(
    private userService:UserService,
    private postService:PostService,
    private campaignPatternService:CampaignPatternService,
    private campaignService:CampaignService){}

  ngOnInit(): void {
      /* check user logged  */
    this.userLogged = this.userService.checkUserLoginState();
      
    /* get user */
    this.userService.userGet()
      .subscribe({
        next: response => this.user = response,
        error: e => console.log(e.message)
      })

    /* get posts */
    this.postService.getUserPosts()
      .subscribe({
        next: response => this.posts = response,
        error: e => console.log(e.message)
      })

    /* get patterns */
    this.campaignPatternService.getAllPatterns()
      .subscribe({
        next: response => this.patterns = response,
        error: e => console.log(e.message)
      })

      /* get campaigns */
    this.campaignService.getCampaigns()
      .subscribe({
        next: response => {
          this.campaigns = response
          if(this.campaigns){
            for (let c of this.campaigns){
            let campaignDays = 
            Math.ceil(
                (new Date(c.end!).getTime() - new Date(c.start!).getTime()) / 
                  (1000 * 60 * 60 * 24)) + 1;
                  
          c.finalBudget = c.dailyBudget! * campaignDays;
          console.log(c);
          
        }
          }
        },
        error: e => console.log(e.message)
      })
  }

  promotePost(postId:number):void {
    
    this.postId = postId;
  }

  addCampaign(campaign: Campaign): void {
    this.campaigns!.push(campaign);
  }
  
}
