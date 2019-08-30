import { Injectable } from '@angular/core';
import { MSAdal, AuthenticationContext, AuthenticationResult } from '@ionic-native/ms-adal';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { AppConfigProvider } from '../app-config/app-config';
import jwtDecode from 'jwt-decode';
import { AuthenticationError } from './authentication.constants';
import { MsAdalError } from './authentication.models';
import { NetworkStateProvider, ConnectionStatus } from '../network-state/network-state';
import { TestPersistenceProvider } from '../test-persistence/test-persistence';

@Injectable()
export class AuthenticationProvider {

  public authenticationSettings: any;
  private employeeIdKey: string;
  private employeeId: string;
  private isUserAuthenticated: boolean;
  private inUnAuthenticatedMode: boolean;
  private employeeNameKey: string;
  private employeeName: string;
  public jwtDecode: any;

  constructor(
    private msAdal: MSAdal,
    private inAppBrowser: InAppBrowser,
    private networkState: NetworkStateProvider,
    private appConfig: AppConfigProvider,
    private testPersistenceProvider: TestPersistenceProvider,
  ) {
  }

  public initialiseAuthentication = (): void => {
    this.authenticationSettings = this.appConfig.getAppConfig().authentication;
    this.employeeIdKey = this.appConfig.getAppConfig().authentication.employeeIdKey;
    // TODO MES-2788 - get the name key correctly (will also vary between dev and production)
    this.employeeNameKey = 'name';
    this.jwtDecode = jwtDecode;
    this.isUserAuthenticated = false;
    this.inUnAuthenticatedMode = false;
  }

  public isInUnAuthenticatedMode = (): boolean => {
    return this.inUnAuthenticatedMode;
  }

  public isAuthenticated = (): boolean => {
    return this.isUserAuthenticated;
  }

  public setUnAuthenticatedMode = (mode: boolean): void => {
    this.inUnAuthenticatedMode = mode;
  }

  public determineAuthenticationMode = (): void => {
    const mode = this.networkState.getNetworkState() === ConnectionStatus.OFFLINE;
    this.setUnAuthenticatedMode(mode);
  }

  public getAuthenticationToken = async (): Promise<string> => {
    const response = await this.aquireTokenSilently();
    return response.accessToken;
  }

  public getEmployeeId = (): string => {
    return this.employeeId;
  }

  public getEmployeeName = (): string => {
    return this.employeeName;
  }

  public login = () => {
    if (this.isInUnAuthenticatedMode()) {
      return new Promise((resolve) => {
        this.isUserAuthenticated = true;
        resolve();
      });
    }
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

  public logoutEnabled = (): boolean => {
    return this.appConfig.getAppConfig().journal.enableLogoutButton;
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

    if (this.appConfig.getAppConfig().logoutClearsTestPersistence) {
      this.testPersistenceProvider.clearPersistedTests();
    }
  }

  aquireTokenSilently = async (): Promise<AuthenticationResult> => {
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
    const employeeId = decodedToken[this.employeeIdKey];
    const employeeIdClaim = Array.isArray(employeeId) ? employeeId[0] : employeeId;
    const numericEmployeeId = Number.parseInt(employeeIdClaim, 10);
    this.employeeId = numericEmployeeId.toString();
    this.employeeName = decodedToken[this.employeeNameKey];

    this.isUserAuthenticated = true;
  }

}
