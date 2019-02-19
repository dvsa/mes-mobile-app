import { Injectable } from '@angular/core';
import { MSAdal, AuthenticationContext, AuthenticationResult } from '@ionic-native/ms-adal';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { AppConfigProvider } from '../app-config/app-config';
import jwtDecode from 'jwt-decode';
import { AuthenticationError } from './authentication.constants';
import { MsAdalError } from './authentication.models';

@Injectable()
export class AuthenticationProvider {

  public authenticationSettings: any;
  private employeeIdKey: string;
  private employeeId: string;
  private isUserAuthenticated: boolean;
  public jwtDecode: any;

  constructor(
    private msAdal: MSAdal,
    private inAppBrowser: InAppBrowser,
    appConfig: AppConfigProvider) {
    this.authenticationSettings = appConfig.getAppConfig().authentication;
    this.employeeIdKey = appConfig.getAppConfig().authentication.employeeIdKey;
    this.jwtDecode = jwtDecode;
    this.isUserAuthenticated = false;
  }

  public isAuthenticated = (): boolean => {
    return this.isUserAuthenticated;
  }

  public getAuthenticationToken = async (): Promise<string> => {
    const response = await this.aquireTokenSilently();
    return response.accessToken;
  }

  public getEmployeeId = (): string => {
    return this.employeeId;
  }

  public login = () => {
    return new Promise((resolve, reject) => {
      this.aquireTokenSilently()
        .then((authResponse: AuthenticationResult) => {
          this.successfulLogin(authResponse);
          resolve();
        })
        .catch((error: any) => {
          this.aquireTokenWithCredentials()
            .then(() => resolve())
            .catch((error: AuthenticationError) => reject(error));
        });
    });
  }

  public logout = () => {
    const authenticationContext: AuthenticationContext = this.createAuthContext();
    authenticationContext.tokenCache.clear();

    this.isUserAuthenticated = false;

    const browserOptions: InAppBrowserOptions = {
      hidden: 'yes',
    };

    const browser =
      this.inAppBrowser.create(this.authenticationSettings.logoutUrl, '', browserOptions);

    browser.on('loadstop').subscribe(() => {
      browser.close();
    });
  }

  private aquireTokenSilently = async (): Promise<AuthenticationResult> => {
    const authenticationContext: AuthenticationContext = this.createAuthContext();
    return authenticationContext
      .acquireTokenSilentAsync(this.authenticationSettings.resourceUrl, this.authenticationSettings.clientId, '');
  }

  private aquireTokenWithCredentials = () => {
    const authenticationContext: AuthenticationContext = this.createAuthContext();

    return new Promise((resolve, reject) => {
      authenticationContext
        .acquireTokenAsync(
          this.authenticationSettings.resourceUrl,
          this.authenticationSettings.clientId,
          this.authenticationSettings.redirectUrl,
          '',
          '',
        )
        .then((authResponse: AuthenticationResult) => {
          this.successfulLogin(authResponse);
          resolve();
        })
        .catch((error: MsAdalError) => {
          reject(error.details.errorDescription as AuthenticationError);
        });
    });

  }

  private createAuthContext = (): AuthenticationContext => {
    return this.msAdal.createAuthenticationContext(this.authenticationSettings.context);
  }

  private successfulLogin = (authResponse: AuthenticationResult) => {
    const decodedToken = this.jwtDecode(authResponse.accessToken);
    const employeeId = decodedToken[this.employeeIdKey][0];
    this.employeeId = employeeId;

    this.isUserAuthenticated = true;
  }

}
