import { CredentialsOptions } from 'aws-sdk/lib/credentials';
import { switchMap, map } from 'rxjs/operators';
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
      config.region = this.region;
    }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.platform.is('ios')) return next.handle(request);
    const { host, pathname } = new URL(request.url);

    return this.createCredentials()
      .pipe(
        map(() => this.sign(config.credentials, host, pathname)),
        switchMap((signature: any) => {
          const signedRequest = request.clone({
            setHeaders: {
              ...signature.headers
            }
          });
          return next.handle(signedRequest);
        })
      );
  
  }

  private sign(credentials: CredentialsOptions, host: string, path: string): any {
    const { accessKeyId, secretAccessKey, sessionToken } = credentials;
    const options = {
      host,
      path,
      region: this.region,
    }
    sign(options, { accessKeyId, secretAccessKey, sessionToken });
    return options;
  }

  private createCredentials(): Observable<void>  {
    const cognitoIdentity = new CognitoIdentityCredentials({
      IdentityPoolId: this.authenticationSettings.identityPoolId,
      Logins: {
        [this.authenticationSettings.openIdConnectUrl]: this.auth.getAuthenticationToken()
      }
    });
    config.credentials = cognitoIdentity;
    return from(cognitoIdentity.getPromise());
  }
}