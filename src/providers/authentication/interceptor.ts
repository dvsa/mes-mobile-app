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

import { AppConfigProvider } from '../app-config/app-config';
import { Platform } from 'ionic-angular';
import { CognitoIdentityWrapper } from './cognitoIdentityWrapper';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly region: string;
  private cognitoIdentity: CognitoIdentityCredentials;

  constructor(
    private platform: Platform,
    cognitoIdentityWrapper: CognitoIdentityWrapper,
    appConfig: AppConfigProvider) {
      this.region = appConfig.getAppConfig().aws.region;
      this.cognitoIdentity = cognitoIdentityWrapper.createIdentity();
    }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.platform.is('ios')) return next.handle(request);
    const { host, pathname } = new URL(request.url);

    return this.getCredentials()
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

  private getCredentials(): Observable<void>  {
    return from(this.cognitoIdentity.getPromise());
  }
}
