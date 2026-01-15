import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Requirement } from '../models/requirement.model';
import { apiUrl } from 'src/global';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {

  constructor(private httpClient: HttpClient) { }
  getAllRequirements(): Observable<Requirement[]> {
    return this.httpClient.get<Requirement[]>(`${apiUrl}/api/requirement`);

  }
  getRequirementById(requirementId: number): Observable<Requirement> {
    return this.httpClient.get<Requirement>(`${apiUrl}/api/requirement/${requirementId}`);
  }
  addRequirement(requirement: Requirement): Observable<Requirement> {
    return this.httpClient.post<Requirement>(`${apiUrl}/api/requirement`, requirement);
  }
  updateRequirement(requirementId: number, requirement: Requirement): Observable<Requirement> {
    return this.httpClient.put<Requirement>(`${apiUrl}/api/requirement/${requirementId}`, requirement);
  }
  getRequirementsByTrainerId(trainerId: number): Observable<Requirement[]> {
    return this.httpClient.get<Requirement[]>(`${apiUrl}/api/requirement/trainer/${trainerId}`);
  }
  deleteRequirement(requirementId: number): Observable<void> {
    return this.httpClient.delete<void>(`${apiUrl}/api/requirement/${requirementId}`);
  }

  assignTrainer(requirementId: number, trainerId: number): Observable<any> {
    return this.httpClient.put(`${apiUrl}/api/requirement/${requirementId}/trainer/${trainerId}`, {});
  }
  updateRequirementStatus(requirementId:number,status:string):Observable<Requirement>{
    return this.httpClient.put<Requirement>(`${apiUrl}/api/requirement/${requirementId}/status?status=${status}`,{});
  }
  rejectTrainer(requirementId: number) {
    return this.httpClient.put<Requirement>(`${apiUrl}/api/requirement/${requirementId}/reject-trainer`, {});
  }
  

}
