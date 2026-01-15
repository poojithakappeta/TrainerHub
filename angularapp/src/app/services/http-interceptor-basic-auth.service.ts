import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor{

  constructor(private authService : AuthService) { }
 
  intercept(request: HttpRequest<any>, next: HttpHandler) {
 
    let basicAuthHeaderString = this.authService.getToken();
        let username = this.authService.getAuthenticatedUser();
        if (basicAuthHeaderString && username) {
            request = request.clone({
                setHeaders: {
                    Authorization: basicAuthHeaderString
                }
            })
        }
        return next.handle(request);
    }
}
