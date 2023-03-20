import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import readTokenFromStorage from './utils/readTokenFromStorage';

@Injectable()
export class AppGuardInterceptor implements HttpInterceptor {
  authService= inject(AuthService)
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token= readTokenFromStorage()
    if(token){
      const headerClone= request.clone({

        headers: request.headers.set("Authorization","Bearer "+token)
      })
      return next.handle(headerClone);
    }

    else
    return next.handle(request);
  }
}
