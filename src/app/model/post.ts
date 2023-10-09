import { Campaign } from "./campaign";
import { Comment } from "./comment";
import { Like } from "./like";
import { User } from "./user";

export interface Post 
{
    id?:number;
    timing?:Date;
    content?:number;
    image?:string;
    user?:User;
    likes?:Like[];
    comments?:Comment[];
    campaigns?:Campaign[];
}
