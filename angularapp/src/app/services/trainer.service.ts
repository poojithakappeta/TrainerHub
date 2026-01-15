import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/global';
import { Trainer } from '../models/trainer.model';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  constructor(private httpClient:HttpClient) { }
  getAllTrainers():Observable<Trainer[]>{
    return this.httpClient.get<Trainer[]>(`${apiUrl}/api/trainer`);
  }
  getTrainerById(trainerId:number):Observable<Trainer>{
    return this.httpClient.get<Trainer>(`${apiUrl}/api/trainer/${trainerId}`);
  }
  // addTrainer(trainer:Trainer):Observable<Trainer>{
  //   return this.httpClient.post<Trainer>(`${apiUrl}/api/trainer`,trainer);
  // }
  addTrainer(trainer: Trainer, resumeFile: File): Observable<Trainer> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(trainer));
    formData.append('file', resumeFile);
  
    return this.httpClient.post<Trainer>(`${apiUrl}/api/trainer/fileUpload`, formData);
  }
  

  // updateTrainer(trainerId:number,trainer:Trainer):Observable<Trainer>{
  //   return this.httpClient.put<Trainer>(`${apiUrl}/api/trainer/${trainerId}`,trainer);
  // }
  updateTrainer(trainerId: number, trainer: Trainer, resumeFile?: File): Observable<Trainer> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(trainer));
  
    if (resumeFile) {
      formData.append('file', resumeFile);
    }
  
    return this.httpClient.put<Trainer>(`${apiUrl}/api/trainer/fileUpload/${trainerId}`, formData);
  }

  deleteTrainer(trainerId:number):Observable<void>{
    return this.httpClient.delete<void>(`${apiUrl}/api/trainer/${trainerId}`);
  }
  updateTrainerStatus(trainerId: number): Observable<Trainer> {
    return this.httpClient.put<Trainer>(`${apiUrl}/api/trainer/${trainerId}`, {});
  }
}
