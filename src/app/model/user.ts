import { Campaign } from "./campaign";
import { Comment } from "./comment";
import { Friendship } from "./friendship";
import { Like } from "./like";
import { Post } from "./post";

export interface User 
{
    id?:number;
    entryDate?:Date;
    name?:string;
    lastname?:string;
    mail?:string;
    nickname?:string;
    password?:string;
    profileImage?:string;
    profileType?:string;
    authToken?:string;
    posts?:Post[];
    comments?:Comment[];
    receivedFriendships?:Friendship[];
    requestedFriendships?:Friendship[];
    campaigns?:Campaign[];
    likes?:Like[];

}
