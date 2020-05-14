import { Injectable } from '@angular/core';
import { AppConfigProvider } from '../app-config/app-config';
import jwtDecode from 'jwt-decode';
import { NetworkStateProvider, ConnectionStatus } from '../network-state/network-state';
import { TestPersistenceProvider } from '../test-persistence/test-persistence';
import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';



@Injectable()
export class AuthenticationProvider extends IonicAuth {

  public authenticationSettings: any;
  private employeeIdKey: string;
  private employeeId: string;
  private inUnAuthenticatedMode: boolean;
  public jwtDecode: any;

  constructor(
    private networkState: NetworkStateProvider,
    private appConfig: AppConfigProvider,
    private testPersistenceProvider: TestPersistenceProvider,
  ) {
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
    await this.isAuthenticated();
    return await JSON.parse(localStorage.getItem('idToken'));
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

  async onLoginSuccess() {
    // do some work here
    alert(`successfully logged in!`);
    const token = await this.getIdToken();
    alert(JSON.stringify(token));
  }

  public logoutEnabled = (): boolean => {
    return this.appConfig.getAppConfig().journal.enableLogoutButton;
  }

  async logout(): Promise<void> {
    await super.logout();
    if (this.appConfig.getAppConfig().logoutClearsTestPersistence) {
      await this.testPersistenceProvider.clearPersistedTests();
    }
    localStorage.clear();
  }

  async setEmployeeId() {
    const idToken = await this.getIdToken();
    alert(idToken[this.employeeIdKey]);
    const employeeId = idToken[this.employeeIdKey];
    console.log(employeeId);
    const employeeIdClaim = Array.isArray(employeeId) ? employeeId[0] : employeeId;
    const numericEmployeeId = Number.parseInt(employeeIdClaim, 10);
    this.employeeId = numericEmployeeId.toString();
  }

}
