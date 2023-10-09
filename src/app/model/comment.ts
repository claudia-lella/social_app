import { Post } from "./post";
import { User } from "./user";

export interface Comment 
{
    id?:number;
    timing?:Date;
    content?:string;
    user?:User;
    post?:Post;
}
