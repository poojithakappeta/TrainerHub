import { Trainer } from "./trainer.model";
import { User } from "./user.model";

export interface Feedback{
    feedbackId?:number;
    userId:number;
    trainerId:number;
    category:string;
    feedbackText:string;
    date:Date
    ratings: number;
    user?:User;
    trainer?:Trainer;
}