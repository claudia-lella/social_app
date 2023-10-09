import { CampaignService } from './../../service/campaign.service';
import { Campaign } from './../../model/campaign';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { NgForm } from '@angular/forms';
import { CampaignPattern } from 'src/app/model/campaignPattern';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign-cart',
  templateUrl: './campaign-cart.component.html',
  styleUrls: ['./campaign-cart.component.css']
})
export class CampaignCartComponent {

  @Input() post:Post|undefined;
  @Input() campaign:Campaign|undefined;
  @Input() loggedUser:User|undefined;
  @Input() selectedPostId:number|undefined;
  @Input() selectedPayment:string = "";
  @Input() patterns:CampaignPattern[]|undefined;
  campaignType:string = ""
  startDate:any;
  endDate:any;
  finalBudget:number = 0; 
  @Output() campaignCreated = new EventEmitter<Campaign>();

  constructor(private campaignService:CampaignService,
    private router:Router) {}

  formManager(form:NgForm):void {

    if(this.selectedPostId && this.loggedUser) {
      
      let campaignToAdd:Campaign = {

        post:{id:this.selectedPostId},
        user:{id:this.loggedUser.id},
        start:form.value["start"],
        end:form.value["end"],
        dailyBudget:form.value["budget"],
        payment:form.value["payment"],
        pattern:{
          id:form.value["pattern"]
        }
      };

      this.campaignService.campaignRegistration(campaignToAdd)
        .subscribe({
          next: response => {
            if(response.code == 201) {
              console.log(campaignToAdd); 
              this.campaignCreated.emit(campaignToAdd);
              this.router.navigateByUrl('/', {skipLocationChange: true})
              .then(() => this.router.navigate(['/business']));
            }
          },
          error: e => console.log(e.message)
        })
    }

  }

  campaignReview(form:NgForm):void
  {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if(new Date(form.value["start"]) >= today && new Date(form.value["end"]) > new Date(form.value["start"]))
    {
      this.startDate = form.value["start"];
      this.endDate = form.value["end"];
      let index = this.patterns?.findIndex(c => c.id == parseInt(form.value["pattern"]))
      this.campaignType = this.patterns![index!].type!;
      let campaignDays = 
        Math.ceil(
            (new Date(this.endDate).getTime() - new Date(this.startDate).getTime()) / 
              (1000 * 60 * 60 * 24)) + 1;
              
      this.finalBudget = parseInt(form.value["budget"]) * campaignDays;
    }
  }
    
}
  

