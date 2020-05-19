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

@Injectable()
export class AuthenticationProvider {

  public authenticationSettings: any;
  private employeeIdKey: string;
  private employeeId: string;
  private inUnAuthenticatedMode: boolean;
  public jwtDecode: any;
  public ionicAuth: IonicAuth;

  constructor(
    private dataStoreProvider: DataStoreProvider,
    private networkState: NetworkStateProvider,
    private appConfig: AppConfigProvider,
    private testPersistenceProvider: TestPersistenceProvider,
  ) {
  }

  getAuthOptions =  (appConfig: AppConfigProvider): IonicAuthOptions => {
    const authSettings = this.appConfig.getAppConfig().authentication;
    return {
      authConfig: 'azure',
      platform: 'cordova',
      clientID: authSettings.clientId,
      discoveryUrl: `${authSettings.context}/v2.0/.well-known/openid-configuration?appid=${authSettings.clientId}`,
      redirectUri: authSettings.redirectUrl,
      scope: 'openid offline_access profile email',
      logoutUrl: authSettings.logoutUrl,
      iosWebView: 'shared',
      tokenStorageProvider: {
        getAccessToken: async () => this.getToken(Token.ACCESS),
        setAccessToken: async (token: string) => this.setToken(Token.ACCESS, token),
        getIdToken: async () => this.getToken(Token.ID),
        setIdToken: async (token: string) => this.setToken(Token.ID, token),
        getRefreshToken: async () => this.getToken(Token.REFRESH),
        setRefreshToken: async (token: string) => this.setToken(Token.REFRESH, token),
      },
    };
  }

  async getToken(tokenName: Token): Promise<string | null> {
    try {
      return JSON.parse(await this.dataStoreProvider.getItem(tokenName));
    } catch (error) {
      return Promise.resolve(null);
    }
  }

  async setToken(tokenName: Token, token: string): Promise<void> {
    await this.dataStoreProvider.setItem(tokenName, JSON.stringify(token));
    return Promise.resolve();
  }

  async clearTokens(): Promise<void> {
    await this.dataStoreProvider.removeItem(Token.ACCESS);
    await this.dataStoreProvider.removeItem(Token.ID);
    await this.dataStoreProvider.removeItem(Token.REFRESH);
  }

  public initialiseAuthentication = (): void => {
    this.authenticationSettings = this.appConfig.getAppConfig().authentication;
    this.employeeIdKey = this.appConfig.getAppConfig().authentication.employeeIdKey;
    this.jwtDecode = jwtDecode;
    this.inUnAuthenticatedMode = false;
    this.ionicAuth = new IonicAuth(this.getAuthOptions(this.appConfig));
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
    return JSON.parse(await this.dataStoreProvider.getItem(Token.ID));
  }

  public getEmployeeId = (): string => {
    return this.employeeId || null;
  }

  public loadEmployeeName = async (): Promise<string> => {
    const idToken = await this.ionicAuth.getIdToken();
    return idToken[this.appConfig.getAppConfig().authentication.employeeNameKey];
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
    await this.clearTokens();
    await this.ionicAuth.logout();
  }

  async setEmployeeId() {
    const idToken = await this.ionicAuth.getIdToken();
    const employeeId = idToken[this.employeeIdKey];
    const numericEmployeeId = Number.parseInt(employeeId, 10);
    this.employeeId = numericEmployeeId.toString();
  }

}
