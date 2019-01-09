import { Injectable } from '@angular/core';
import { MSAdal, AuthenticationContext, AuthenticationResult } from '@ionic-native/ms-adal';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { AppConfigProvider } from '../app-config/app-config';
import { ToastController } from 'ionic-angular';
import jwtDecode from 'jwt-decode';

@Injectable()
export class AuthenticationProvider {

  public authenticationSettings: any;
  private employeeIdKey: string;
  private employeeId: string;
  private authenticationToken: string;
  public jwtDecode: any;

  constructor(
    private msAdal: MSAdal,
    private inAppBrowser: InAppBrowser,
    public toastController: ToastController,
    appConfig: AppConfigProvider) {
    this.authenticationSettings = appConfig.getAppConfig().authentication;
    this.employeeIdKey = appConfig.getAppConfig().authentication.employeeIdKey;
    this.jwtDecode = jwtDecode;
  }

  isAuthenticated = (): boolean => {
    return this.authenticationToken ? true : false;
  };

  getAuthenticationToken = (): string => {
    return this.authenticationToken;
  };

  getEmployeeId = (): string => {
    return this.employeeId;
  };

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

  logout = () => {
    const authenticationContext: AuthenticationContext = this.createAuthContext();
    authenticationContext.tokenCache.clear();

    this.authenticationToken = undefined;

    const browserOptions: InAppBrowserOptions = {
      hidden: 'yes',
    };

    const browser =
      this.inAppBrowser.create(this.authenticationSettings.logoutUrl, '', browserOptions);

    browser.on('loadstop').subscribe(() => {
      browser.close();
    });
  };

  private createAuthContext = (): AuthenticationContext => {
    return this.msAdal.createAuthenticationContext(this.authenticationSettings.context);
  };

  private successfulLogin = (authResponse: AuthenticationResult) => {
    const { accessToken } = authResponse;
    const decodedToken = this.jwtDecode(accessToken);
    const employeeId = decodedToken[this.employeeIdKey][0];
    this.authenticationToken = accessToken;
    this.employeeId = employeeId;
  };

  private failedLogin = (error: any) => {
    // This is just a temporary way to display the error
    this.toastController.create({
      message: error.message,
      position: 'middle',
      dismissOnPageChange: true,
      cssClass: 'mes-toast-message-error',
      duration: 5000
    });
  };
}
