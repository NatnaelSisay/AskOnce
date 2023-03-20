import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import readTokenFromStorage from 'src/app/utils/readTokenFromStorage';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = readTokenFromStorage();
    return next.handle(
      httpRequest.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    );
  }
}
