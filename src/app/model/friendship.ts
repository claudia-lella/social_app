import { User } from "./user";

export interface Friendship 
{
    id?:number;
    timing?:Date;
    status?:string;
    applicant?:User;
    requested?:User;
}
