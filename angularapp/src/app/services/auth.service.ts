import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiUrl } from 'src/global';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ======================
  // REGISTER
  // ======================
  addUser(user: User): Observable<any> {
    return this.http.post(`${apiUrl}/api/register`, user, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // ======================
  // LOGIN
  // ======================
  login(email: string, password: string): Observable<any> {
    return this.http
      .post<{ token: string }>(`${apiUrl}/api/login`, { email, password })
      .pipe(
        map(response => {
          const token = response.token;
          localStorage.setItem('token', `Bearer ${token}`);
          this.isLoggedInSubject.next(true);

          const decoded = this.decodeToken(token);

          return {
            token,
            role: decoded.role,
            email: decoded.sub,
            userId: decoded.userId
          };
        })
      );
  }

  // ======================
  // TOKEN HELPERS
  // ======================
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getAuthenticatedUser(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const decoded = this.decodeToken(token.split(' ')[1]);
    return decoded.sub || null;
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const decoded = this.decodeToken(token.split(' ')[1]);
    return decoded.role || null;
  }

  getUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;
    const decoded = this.decodeToken(token.split(' ')[1]);
    return decoded.userId || null;
  }

  // ======================
  // ROLE CHECKS
  // ======================
  isAdmin(): boolean {
    return this.getRole() === 'Manager';
  }

  isCustomer(): boolean {
    return this.getRole() === 'Coordinator';
  }

  isUserLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ======================
  // LOGOUT
  // ======================
  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  // ======================
  // PRIVATE HELPERS
  // ======================
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return {};
    }
  }
}
