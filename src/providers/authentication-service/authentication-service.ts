import { Injectable } from '@angular/core';
import { MSAdal, AuthenticationContext, AuthenticationResult } from '@ionic-native/ms-adal';
import { AppConfigProvider } from '../app-config/app-config';

@Injectable()
export class AuthenticationServiceProvider {

  public authenticationSettings: any;

  private authenticationToken: string;

  constructor(
    private msAdal: MSAdal, appConfig: AppConfigProvider) {
    this.authenticationSettings = appConfig.getAppConfig().authentication;
  }

  /*
    Method returns if user is authenticated
  */
  isAuthenticated = (): boolean => {
    return this.authenticationToken ? true : false;
  };

  /*
    Method returns authentication token
  */
  getAuthenticationToken = (): string => {
    return this.authenticationToken;
  };

  /*
    Method to log in a user via Authenticator.
      Tries to login the user silently.
      If that fails, tries to login the user asking them for credentials
  */
  login = () => {
    const authenticationContext: AuthenticationContext = this.createAuthContext();

    return new Promise((resolve, reject) => {
      authenticationContext
        .acquireTokenSilentAsync(
          this.authenticationSettings.resourceUrl,
          this.authenticationSettings.clientId,
          ''
        )
        .then((authResponse: AuthenticationResult) => {
          this.successfulLogin(authResponse);
          resolve();
        })
        .catch((error: any) => {
          this.loginWithCredentials()
            .then(() => resolve())
            .catch(() => reject());
        });
    });
  };

  loginWithCredentials = () => {
    const authenticationContext: AuthenticationContext = this.createAuthContext();

    return new Promise((resolve, reject) => {
      authenticationContext
        .acquireTokenAsync(
          this.authenticationSettings.resourceUrl,
          this.authenticationSettings.clientId,
          this.authenticationSettings.redirectUrl,
          '',
          ''
        )
        .then((authResponse: AuthenticationResult) => {
          this.successfulLogin(authResponse);
          resolve();
        })
        .catch((error: any) => {
          this.failedLogin(error);
          reject();
        });
    });

  };

  /*
    Method to logout a user
      Removes the stored authentication token
      Clears the token cache
  */
  logout = () => {
    const authenticationContext: AuthenticationContext = this.createAuthContext();
    authenticationContext.tokenCache.clear();

    this.authenticationToken = undefined;

    // TODO - Part 2 of logging out
  };

  /*
    Method which generates an Authentication Context
  */
  private createAuthContext = (): AuthenticationContext => {
    return this.msAdal.createAuthenticationContext(this.authenticationSettings.context);
  };

  /*
    Method deals with a successful login.
      Gets the authenticationToken and stores it in the service.
  */
  private successfulLogin = (authResponse: AuthenticationResult) => {
    this.authenticationToken = authResponse.accessToken;
  };

  /*
    Method deals with a failed login
  */
  private failedLogin = (error: any) => {
    // Not sure what to do here
  };
}
