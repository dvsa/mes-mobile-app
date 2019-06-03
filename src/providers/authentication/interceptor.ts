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
import { UrlProvider } from '../url/url';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private platform: Platform,
    private authService: AuthenticationProvider,
    public urlProvider: UrlProvider) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.platform.is('ios')) return next.handle(request);

    const logUrl = new URL(request.url);

    if (logUrl.pathname.endsWith('/logs')) {
      const newRequest = request.clone({
        setHeaders: {
          'x-api-key': this.urlProvider.getLogsServiceApiKey(),
        },
      });
      return next.handle(newRequest);
    }
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
