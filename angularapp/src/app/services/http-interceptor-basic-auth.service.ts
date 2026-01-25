import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    // ❌ Do NOT attach token for public APIs
    if (
      request.url.includes('/api/otp') ||
      request.url.includes('/api/login') ||
      request.url.includes('/api/register')
    ) {
      return next.handle(request);
    }

    const token = this.authService.getToken();

    if (token && token.startsWith('Bearer ')) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }

    return next.handle(request);
  }
}
