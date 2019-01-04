import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/Observable/from';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { CognitoIdentityCredentials, config } from 'aws-sdk';
import { sign } from 'aws4';

import { AuthenticationProvider } from './authentication';
import { AppConfigProvider } from '../app-config/app-config';
import { Platform } from 'ionic-angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly authenticationSettings: any;
  private readonly region: string;

  constructor(
    private auth: AuthenticationProvider,
    private platform: Platform,
    appConfig: AppConfigProvider) {
      this.authenticationSettings = appConfig.getAppConfig().authentication;
      this.region = appConfig.getAppConfig().aws.region;
    }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.platform.is('ios')) return next.handle(request);
    const { host, pathname } = new URL(request.url);

    return this.createCredentials().pipe(
      map(creds => this.sign(creds, host, pathname)),
      switchMap((signature) => {
        const signedRequest = request.clone({
          setHeaders: {
            ...signature
          }
        });
        return next.handle(signedRequest);  
      })
    );
  
  }

  private sign(credentials: void, host: string, path: string) {
    const options = {
      host,
      path,
      region: this.region,
    }
    return sign(options, credentials);
  }

  private createCredentials(): Observable<void>  {
    config.region = this.region;
    const cognitoIdentity = new CognitoIdentityCredentials({
      IdentityPoolId: this.authenticationSettings.identityPoolId,
      Logins: {
        [this.authenticationSettings.openIdConnectUrl]: this.auth.getAuthenticationToken()
      }
    });
    return from(cognitoIdentity.getPromise());
  }
}