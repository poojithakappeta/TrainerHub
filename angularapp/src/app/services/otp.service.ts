import { Injectable } from '@angular/core';
 
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
 
@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private baseUrl = 'http://localhost:8080/api/otp';
 
  constructor(private http: HttpClient) {}
 
  sendOtp(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/send`, { email });
  }
 
  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify`, { email, otp });
  }
}
 