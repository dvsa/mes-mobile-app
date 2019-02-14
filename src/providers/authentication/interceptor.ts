import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Platform } from 'ionic-angular';
import { AuthenticationProvider } from './authentication';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private platform: Platform,
    private authService: AuthenticationProvider) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.platform.is('ios')) return next.handle(request);

    const newRequest = request.clone({
      setHeaders: {
        Authorization: this.authService.getAuthenticationToken(),
      },
    });

    return next.handle(newRequest);
  }

}
