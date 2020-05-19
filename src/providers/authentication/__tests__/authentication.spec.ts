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
import { TestPersistenceProvider } from '../../test-persistence/test-persistence';
import { TestPersistenceProviderMock } from '../../test-persistence/__mocks__/test-persistence.mock';
import { AppConfig } from '../../app-config/app-config.model';
import { configureTestSuite } from 'ng-bullet';
import { DataStoreProvider } from '../../data-store/data-store';
import { DataStoreProviderMock } from '../../data-store/__mocks__/data-store.mock';

fdescribe('Authentication', () => {
  let authenticationProvider: AuthenticationProvider;
  let networkStateProvider: NetworkStateProvider;
  let appConfigProvider: AppConfigProvider;
  let testPersistenceProvider: TestPersistenceProvider;
  let dataStoreProvider: DataStoreProvider;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationProvider,
        { provide: MSAdal, useClass: MSAdalMock },
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        { provide: InAppBrowser, useClass: InAppBrowserMock },
        { provide: NetworkStateProvider, useClass: NetworkStateProviderMock },
        { provide: TestPersistenceProvider, useClass: TestPersistenceProviderMock },
        { provide: DataStoreProvider, useClass: DataStoreProviderMock },
      ],
    });
  });

  beforeEach(async(() => {
    networkStateProvider = TestBed.get(NetworkStateProvider);
    authenticationProvider = TestBed.get(AuthenticationProvider);
    appConfigProvider = TestBed.get(AppConfigProvider);
    testPersistenceProvider = TestBed.get(TestPersistenceProvider);
    dataStoreProvider = TestBed.get(DataStoreProvider);
    authenticationProvider.initialiseAuthentication();
    authenticationProvider.jwtDecode = () => ({
      'local-employeeIdKey': ['12345678'],
    });
  }));

  describe('Provider', () => {

    fit('should compile', () => {
      expect(authenticationProvider).toBeDefined();
    });

    fit('determineAuthenticationMode() should set unauthenticated mode to true if offline', async () => {
      spyOn(networkStateProvider, 'getNetworkState').and.returnValue(ConnectionStatus.OFFLINE);
      authenticationProvider.determineAuthenticationMode();
      expect(authenticationProvider.isInUnAuthenticatedMode()).toEqual(true);
    });

    fit('determineAuthenticationMode() should set unauthenticated mode to false if online', async () => {
      spyOn(networkStateProvider, 'getNetworkState').and.returnValue(ConnectionStatus.ONLINE);
      authenticationProvider.determineAuthenticationMode();
      expect(authenticationProvider.isInUnAuthenticatedMode()).toEqual(false);
    });

    fit('isAuthenticated() should return false when no login has happened', async () => {
      spyOn(authenticationProvider.ionicAuth, 'isAuthenticated').and.returnValue(Promise.resolve(false));
      const isAuthenticated = await authenticationProvider.isAuthenticated();
      expect(isAuthenticated).toEqual(false);
    });

    fit('getAuthenticationToken() should return a token', async () => {
      spyOn(dataStoreProvider, 'getItem').and.returnValue(Promise.resolve('{"employeeid": "123456"}'));
      const token = await authenticationProvider.getAuthenticationToken();

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
      // expect(authenticationProvider.aquireTokenSilently).toHaveBeenCalledTimes(0);
    });

    it('should login with authenticating in unauthenticated mode', async () => {
      spyOn(authenticationProvider, 'isInUnAuthenticatedMode').and.returnValue(false);
      spyOn(authenticationProvider, 'aquireTokenSilently').and.callThrough();
      await authenticationProvider.login();
      // expect(authenticationProvider.aquireTokenSilently).toHaveBeenCalledTimes(1);
    });

    it('should set the correct employeeId when it is an array', async () => {
      await authenticationProvider.login();

      expect(authenticationProvider.isAuthenticated()).toEqual(true);
      expect(authenticationProvider.getEmployeeId()).toEqual('12345678');
    });

    it('should set the correct employeeId when it is a string', async () => {
      authenticationProvider.jwtDecode = () => ({
        'local-employeeIdKey': '12345678',
      });
      await authenticationProvider.login();

      expect(authenticationProvider.isAuthenticated()).toEqual(true);
      expect(authenticationProvider.getEmployeeId()).toEqual('12345678');
    });

    it('should strip leading zeroes from the employeeId', async () => {
      authenticationProvider.jwtDecode = () => ({
        'local-employeeIdKey': '00123456',
      });
      await authenticationProvider.login();

      expect(authenticationProvider.isAuthenticated()).toEqual(true);
      expect(authenticationProvider.getEmployeeId()).toEqual('123456');
    });

    describe('logout', () => {
      it('should logout successfully', async () => {
        await authenticationProvider.login();

        expect(authenticationProvider.isAuthenticated()).toEqual(true);

        await authenticationProvider.logout();

        expect(authenticationProvider.isAuthenticated()).toEqual(false);
        expect(testPersistenceProvider.clearPersistedTests).not.toHaveBeenCalled();
      });
      it('should clear the persisted tests when the configuration to do so is enabled', async () => {
        const configWithPersistenceClearing: AppConfig = {
          ...appConfigProvider.getAppConfig(),
          logoutClearsTestPersistence: true,
        };
        spyOn(appConfigProvider, 'getAppConfig').and.returnValue(configWithPersistenceClearing);

        await authenticationProvider.logout();

        expect(testPersistenceProvider.clearPersistedTests).toHaveBeenCalled();
      });
    });

  });
});
