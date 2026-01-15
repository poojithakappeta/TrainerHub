import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/global';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private httpClient:HttpClient) { }
  sendFeedback(userId:number,trainerId:number,feedback:Feedback):Observable<Feedback>{
    return this.httpClient.post<Feedback>(`${apiUrl}/api/feedback/${userId}/${trainerId}`,feedback);
  }
  getAllFeedbacksByUserId(userId:number):Observable<Feedback[]>{
    return this.httpClient.get<Feedback[]>(`${apiUrl}/api/feedback/user/${userId}`);
  }
  deleteFeedback(feedbackId:number):Observable<void>{
    return this.httpClient.delete<void>(`${apiUrl}/api/feedback/${feedbackId}`);
  }
  getFeedbacks():Observable<Feedback[]>{
    return this.httpClient.get<Feedback[]>(`${apiUrl}/api/feedback`);
  }
  getUserById(id:number):Observable<User>{
    return this.httpClient.get<User>(`${apiUrl}/api/${id}`);
  }
  getFeedBackByTrainerId(id:number):Observable<Feedback[]>{
    return this.httpClient.get<Feedback[]>(`${apiUrl}/api/feedback/trainer/${id}`);
  }
}
