import { Injectable } from '@angular/core';
import { MSAdal, AuthenticationContext, AuthenticationResult } from '@ionic-native/ms-adal';

@Injectable()
export class AuthenticationServiceProvider {
  // TODO - Load from config
  private context: string = 'https://login.windows.net/common';
  private resourceUrl: string = 'https://graph.windows.net';
  private clientId: string = '09fdd68c-4f2f-45c2-be55-dd98104d4f74';
  private redirectUrl: string =
    'x-msauth-uk-gov-dvsa-mobile-examiner-services://uk.gov.dvsa.mobile-examiner-services';

  private authenticationToken: string;

  constructor(private msAdal: MSAdal) { }

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

    authenticationContext
      .acquireTokenSilentAsync(this.resourceUrl, this.clientId, '')
      .then(this.successfulLogin)
      .catch((error: any) => {
        console.log('we should call login with credentials');
        this.loginWithCredentials();
      });
  };

  loginWithCredentials = () => {
    const authenticationContext: AuthenticationContext = this.createAuthContext();

    authenticationContext
      .acquireTokenAsync(
        this.resourceUrl,
        this.clientId,
        this.redirectUrl,
        '',
        ''
      )
      .then(this.successfulLogin, this.failedLogin)
      .catch((error: any) => error);
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
    return this.msAdal.createAuthenticationContext(this.context);
  };

  /*
    Method deals with a successful login.
      Gets the authenticationToken and stores it in the service.
  */
  private successfulLogin = (authResponse: AuthenticationResult) => {
    console.log('setting the authenticationToken', authResponse.accessToken);
    this.authenticationToken = authResponse.accessToken;
  };

  /*
    Method deals with a failed login
  */
  private failedLogin = (error: any) => {
    // Not sure what to do here
  };
}
