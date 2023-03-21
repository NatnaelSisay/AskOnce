import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth/auth.service';
import readTokenFromStorage from './utils/readTokenFromStorage';
import { Router } from '@angular/router';

@Injectable()
export class AppGuardInterceptor implements HttpInterceptor {
  authService = inject(AuthService);
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = readTokenFromStorage();

    const headerClone = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token),
    });
    return next.handle(headerClone).pipe(
      tap({
        next: (event) => {},
        error: (error) => {
          if (error.status === 401) {
            this.authService.logout();
            this.router.navigateByUrl('/auth');
          }
        },
      })
    );
  }
}
