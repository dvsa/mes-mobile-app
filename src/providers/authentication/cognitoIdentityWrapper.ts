import { CredentialsOptions } from 'aws-sdk/lib/credentials';
import { Injectable } from '@angular/core';
import { config, CognitoIdentityCredentials } from 'aws-sdk';

import { AuthenticationProvider } from './authentication';
import { AppConfigProvider } from '../app-config/app-config';
import { from } from 'rxjs/Observable/from';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class CognitoIdentityWrapper {

  private readonly authenticationSettings: any;
  private readonly region: string;
  private cognitoIdentity: CognitoIdentityCredentials;

  constructor(
    private auth: AuthenticationProvider,
    appConfig: AppConfigProvider
  ) {
    this.authenticationSettings = appConfig.getAppConfig().authentication;
    this.region = appConfig.getAppConfig().aws.region;
  }

  createIdentity(): CognitoIdentityCredentials {
    // Let the aws-sdk config know what region to operate in
    config.region = this.region;
    // Obtain temporary IAM credentials from cognito using the token from login
    this.cognitoIdentity = new CognitoIdentityCredentials({
      IdentityPoolId: this.authenticationSettings.identityPoolId,
      Logins: {
        [this.authenticationSettings.openIdConnectUrl]: this.auth.getAuthenticationToken()
      }
    });
    // Set credentials in aws-sdk config
    config.credentials = this.cognitoIdentity;
    return this.cognitoIdentity;
  }

  getCredentials(): Observable<CredentialsOptions>  {
    return from(this.cognitoIdentity.getPromise())
      .pipe(
        map(() => config.credentials)
      );
  }
}
