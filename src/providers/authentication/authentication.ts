import { Injectable } from '@angular/core';
import { AppConfigProvider } from '../app-config/app-config';
import jwtDecode from 'jwt-decode';
import { NetworkStateProvider, ConnectionStatus } from '../network-state/network-state';
import { TestPersistenceProvider } from '../test-persistence/test-persistence';
import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';
import { DataStoreProvider } from '../data-store/data-store';

export enum Token {
  ID = 'idToken',
  ACCESS = 'accessToken',
  REFRESH = 'refreshToken',
}

const adConfig: IonicAuthOptions = {
  // new dev
  authConfig: 'azure',
  platform: 'cordova',
  clientID: '923b07d4-80ee-4524-8f38-c1230aefe151',
  // @ts-ignore
  discoveryUrl: 'https://login.microsoftonline.com/6c448d90-4ca1-4caf-ab59-0a2aa67d7801/v2.0/.well-known/openid-configuration?appid=923b07d4-80ee-4524-8f38-c1230aefe151',
  redirectUri: 'mesmobileappscheme://callback',
  scope: 'openid offline_access profile email',
  logoutUrl: 'mesmobileappscheme://login?logout=true',
  // logoutUrl: 'mesmobileappscheme://callback?logout=true',
  iosWebView: 'shared',
};

@Injectable()
export class AuthenticationProvider {

  public authenticationSettings: any;
  private employeeIdKey: string;
  private employeeId: string;
  private inUnAuthenticatedMode: boolean;
  public jwtDecode: any;
  private ionicAuth: IonicAuth;

  constructor(
    private dataStoreProvider: DataStoreProvider,
    private networkState: NetworkStateProvider,
    private appConfig: AppConfigProvider,
    private testPersistenceProvider: TestPersistenceProvider,
  ) {
    this.ionicAuth = new IonicAuth(this.getAuthOptions());
  }

  getAuthOptions = (): IonicAuthOptions => ({
    ...adConfig,
    tokenStorageProvider: {
      getAccessToken: async () => JSON.parse(await this.dataStoreProvider.getItem(Token.ACCESS)),
      setAccessToken: async (token: string) => {
        await this.dataStoreProvider.setItem(Token.ACCESS, JSON.stringify(token));
        return Promise.resolve();
      },
      getIdToken: async () => JSON.parse(await this.dataStoreProvider.getItem(Token.ID)),
      setIdToken: async (token: string) => {
        await this.dataStoreProvider.setItem(Token.ID, JSON.stringify(token));
        return Promise.resolve();
      },
      getRefreshToken: async () => JSON.parse(await this.dataStoreProvider.getItem(Token.REFRESH)),
      setRefreshToken: async (token: string) => {
        await this.dataStoreProvider.setItem(Token.REFRESH, JSON.stringify(token));
        return Promise.resolve();
      },
    },
  });

  public initialiseAuthentication = (): void => {
    this.authenticationSettings = this.appConfig.getAppConfig().authentication;
    this.employeeIdKey = this.appConfig.getAppConfig().authentication.employeeIdKey;
    this.jwtDecode = jwtDecode;
    this.inUnAuthenticatedMode = false;
  }

  public isInUnAuthenticatedMode = (): boolean => {
    return this.inUnAuthenticatedMode;
  }

  async isAuthenticated(): Promise<boolean> {
    return await this.ionicAuth.isAuthenticated();
  }

  public setUnAuthenticatedMode = (mode: boolean): void => {
    this.inUnAuthenticatedMode = mode;
  }

  public determineAuthenticationMode = (): void => {
    const mode = this.networkState.getNetworkState() === ConnectionStatus.OFFLINE;
    this.setUnAuthenticatedMode(mode);
  }

  public getAuthenticationToken = async (): Promise<string> => {
    // const response = await this.aquireTokenSilently();
    // return response.accessToken;
    return JSON.parse(await this.dataStoreProvider.getItem(Token.ID));
  }

  public getEmployeeId = (): string => {
    return this.employeeId || null;
  }

  public loadEmployeeName = async (): Promise<string> => {
    const idToken = await this.ionicAuth.getIdToken();
    // @TODO - change to get name key from config
    // return idToken[this.appConfig.getAppConfig().authentication.employeeNameKey];
    return idToken['name'];
  }

  async login(): Promise<void> {
    await this.ionicAuth.login();
  }

  public logoutEnabled = (): boolean => {
    return this.appConfig.getAppConfig().journal.enableLogoutButton;
  }

  async logout(): Promise<void> {
    if (this.appConfig.getAppConfig().logoutClearsTestPersistence) {
      await this.testPersistenceProvider.clearPersistedTests();
    }
    await this.dataStoreProvider.removeItem(Token.ACCESS);
    await this.dataStoreProvider.removeItem(Token.ID);
    await this.dataStoreProvider.removeItem(Token.REFRESH);
    await this.ionicAuth.logout();
  }

  async setEmployeeId() {
    const idToken = await this.ionicAuth.getIdToken();
    const employeeId = idToken[this.employeeIdKey];
    const numericEmployeeId = Number.parseInt(employeeId, 10);
    this.employeeId = numericEmployeeId.toString();
  }

}
