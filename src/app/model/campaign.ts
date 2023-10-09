import { CampaignPattern } from "./campaignPattern";
import { Post } from "./post";
import { User } from "./user";

export interface Campaign 
{
    id?:number;
    start?:Date;
    end?:Date;
    dailyBudget?:number;
    status?:string;
    payment?:string;
    user?:User;
    post?:Post;
    pattern?:CampaignPattern;
    finalBudget?:number;
}
