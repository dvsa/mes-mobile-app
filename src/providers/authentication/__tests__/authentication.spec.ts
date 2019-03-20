import { TestBed, async } from '@angular/core/testing';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MSAdal } from '@ionic-native/ms-adal';

import { MSAdalMock } from '../__mocks__/ms-adal.mock';
import { AuthenticationProvider } from '../authentication';
import { AppConfigProvider } from '../../app-config/app-config';
import { AppConfigProviderMock } from '../../app-config/__mocks__/app-config.mock';
import { InAppBrowserMock } from '../__mocks__/in-app-browser.mock';
import { NetworkStateProvider, ConnectionStatus } from '../../network-state/network-state';
import { NetworkStateProviderMock } from '../../network-state/__mocks__/network-state.mock';

describe('Authentication', () => {
  let authenticationProvider: AuthenticationProvider;
  let networkStateProvider: NetworkStateProvider;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationProvider,
        { provide: MSAdal, useClass: MSAdalMock },
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        { provide: InAppBrowser, useClass: InAppBrowserMock },
        { provide: NetworkStateProvider, useClass: NetworkStateProviderMock },
      ],
    });

    networkStateProvider = TestBed.get(NetworkStateProvider);
    authenticationProvider = TestBed.get(AuthenticationProvider);
    authenticationProvider.initialiseAuthentication();
    authenticationProvider.jwtDecode = () => ({
      'local-employeeIdKey': ['a'],
    });
  }));

  describe('Provider', () => {

    it('should compile', () => {
      expect(authenticationProvider).toBeDefined();
    });

    it('determineAuthenticationMode() should set unauthenticated mode to true if offline', async () => {
      spyOn(networkStateProvider, 'getNetworkState').and.returnValue(ConnectionStatus.OFFLINE);
      authenticationProvider.determineAuthenticationMode();
      expect(authenticationProvider.isInUnAuthenticatedMode()).toEqual(true);
    });

    it('determineAuthenticationMode() should set unauthenticated mode to flase if online', async () => {
      spyOn(networkStateProvider, 'getNetworkState').and.returnValue(ConnectionStatus.ONLINE);
      authenticationProvider.determineAuthenticationMode();
      expect(authenticationProvider.isInUnAuthenticatedMode()).toEqual(false);
    });

    it('isAuthenticated() should return false when no login has happened', () => {
      expect(authenticationProvider.isAuthenticated()).toEqual(false);
    });

    it('getAuthenticationToken() should return a token', async () => {
      const token: string = await authenticationProvider.getAuthenticationToken();

      expect(token).toEqual('U0lMRU5UIEFZU05DIFRFU1QgVE9LRU4');
    });

    it('should login successfully', async () => {
      await authenticationProvider.login();

      expect(authenticationProvider.isAuthenticated()).toEqual(true);
    });

    it('should login without authenticating in unauthenticated mode', async () => {
      spyOn(authenticationProvider, 'isInUnAuthenticatedMode').and.returnValue(true);
      spyOn(authenticationProvider, 'aquireTokenSilently').and.callThrough();
      await authenticationProvider.login();
      expect(authenticationProvider.aquireTokenSilently).toHaveBeenCalledTimes(0);
    });

    it('should login without authenticating in unauthenticated mode', async () => {
      spyOn(authenticationProvider, 'isInUnAuthenticatedMode').and.returnValue(false);
      spyOn(authenticationProvider, 'aquireTokenSilently').and.callThrough();
      await authenticationProvider.login();
      expect(authenticationProvider.aquireTokenSilently).toHaveBeenCalledTimes(1);
    });

    it('should set the correct employeeId', async () => {
      await authenticationProvider.login();

      expect(authenticationProvider.isAuthenticated()).toEqual(true);
      expect(authenticationProvider.getEmployeeId()).toEqual('a');
    });

    it('should logout successfully', async () => {
      await authenticationProvider.login();

      expect(authenticationProvider.isAuthenticated()).toEqual(true);

      await authenticationProvider.logout();

      expect(authenticationProvider.isAuthenticated()).toEqual(false);
    });

  });
});
