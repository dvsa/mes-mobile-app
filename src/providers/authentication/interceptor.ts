import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { switchMap } from 'rxjs/operators';

import { Platform } from 'ionic-angular';
import { AuthenticationProvider } from './authentication';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private platform: Platform,
    private authService: AuthenticationProvider) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.platform.is('ios')) return next.handle(request);

    return from(this.authService.getAuthenticationToken()).pipe(
      switchMap((token: string) => {
        if (token) {
          const newRequest = request.clone({
            setHeaders: {
              Authorization: token,
            },
          });
          return next.handle(newRequest);
        }
        return next.handle(request);
      }),
    );
  }
}
