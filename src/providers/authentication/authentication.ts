import { Injectable } from '@angular/core';
import { AppConfigProvider } from '../app-config/app-config';
import jwtDecode from 'jwt-decode';
import { NetworkStateProvider, ConnectionStatus } from '../network-state/network-state';
import { TestPersistenceProvider } from '../test-persistence/test-persistence';
import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';
import { DataStoreProvider } from '../data-store/data-store';

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
export class AuthenticationProvider extends IonicAuth {

  public authenticationSettings: any;
  private employeeIdKey: string;
  private employeeId: string;
  private inUnAuthenticatedMode: boolean;
  public jwtDecode: any;

  // @ts-ignore
  constructor(
    private dataStoreProvider: DataStoreProvider,
    private networkState: NetworkStateProvider,
    private appConfig: AppConfigProvider,
    private testPersistenceProvider: TestPersistenceProvider,
  ) {
    adConfig.tokenStorageProvider = {
      async getAccessToken() {
        return JSON.parse(await dataStoreProvider.getItem('accessToken'));
      },
      async setAccessToken(token) {
        await dataStoreProvider.setItem('accessToken', JSON.stringify(token));
        return Promise.resolve();
      },
      async getIdToken() {
        return JSON.parse(await dataStoreProvider.getItem('idToken'));
      },
      async setIdToken(token) {
        await dataStoreProvider.setItem('idToken', JSON.stringify(token));
        return Promise.resolve();
      },
      async getRefreshToken() {
        return JSON.parse(await this.dataStoreProvider.getItem('refreshToken'));
      },
      async setRefreshToken(token) {
        await dataStoreProvider.setItem('refreshToken', JSON.stringify(token));
        return Promise.resolve();
      },
    };
    super(adConfig);
  }

  public initialiseAuthentication = (): void => {
    this.authenticationSettings = this.appConfig.getAppConfig().authentication;
    this.employeeIdKey = this.appConfig.getAppConfig().authentication.employeeIdKey;
    this.jwtDecode = jwtDecode;
    this.inUnAuthenticatedMode = false;
  }

  public isInUnAuthenticatedMode = (): boolean => {
    return this.inUnAuthenticatedMode;
  }

  async isAuthenticated (): Promise<boolean> {
    return await super.isAuthenticated();
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
    return JSON.parse(await this.dataStoreProvider.getItem('idToken'));
  }

  public getEmployeeId = (): string => {
    return this.employeeId || null;
  }

  public loadEmployeeName = async(): Promise<string> => {
    const idToken = await this.getIdToken();
    // @TODO - change to get name key from config
    // return idToken[this.appConfig.getAppConfig().authentication.employeeNameKey];
    return idToken['name'];
  }

  async login(): Promise<void> {
    await super.login();
  }

  public logoutEnabled = (): boolean => {
    return this.appConfig.getAppConfig().journal.enableLogoutButton;
  }

  async logout(): Promise<void> {
    if (this.appConfig.getAppConfig().logoutClearsTestPersistence) {
      await this.testPersistenceProvider.clearPersistedTests();
    }
    await this.dataStoreProvider.removeItem('accessToken');
    await this.dataStoreProvider.removeItem('idToken');
    await this.dataStoreProvider.removeItem('refreshToken');
    await super.logout();

  }

  async setEmployeeId() {
    const idToken = await this.getIdToken();
    const employeeId = idToken[this.employeeIdKey];
    console.log(employeeId);
    const employeeIdClaim = Array.isArray(employeeId) ? employeeId[0] : employeeId;
    const numericEmployeeId = Number.parseInt(employeeIdClaim, 10);
    this.employeeId = numericEmployeeId.toString();
  }

}
