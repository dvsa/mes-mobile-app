import { TestBed } from '@angular/core/testing';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MSAdal } from '@ionic-native/ms-adal';

import { MSAdalMock } from '../__mocks__/ms-adal.mock';
import { AuthenticationProvider } from '../authentication';
import { AppConfigProvider } from '../../app-config/app-config';
import { AppConfigProviderMock } from '../../app-config/__mocks__/app-config.mock';
import { InAppBrowserMock } from '../__mocks__/in-app-browser.mock';

describe('Authentication', () => {
  let authenticationProvider: AuthenticationProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationProvider,
        { provide: MSAdal, useClass: MSAdalMock },
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        { provide: InAppBrowser, useClass: InAppBrowserMock}
      ]
    })
  });

  beforeEach(() => {
    authenticationProvider = TestBed.get(AuthenticationProvider)
    authenticationProvider.jwtDecode = () => ({
      'local-employeeIdKey': ['a']
    });
  });

  describe('Provider', () => {

    it('should compile', () => {
      expect(authenticationProvider).toBeDefined();
    });

    it('isAuthenticated() should return false when no login has happened', () => {
      expect(authenticationProvider.isAuthenticated()).toEqual(false);
    });

    it('getAuthenticationToken() should return undefined if no login has happened', () => {
      expect(authenticationProvider.getAuthenticationToken()).toEqual(undefined);
    })

    it('should silently login successfully', async () => {
      await authenticationProvider.login();

      expect(authenticationProvider.isAuthenticated()).toEqual(true);
      expect(authenticationProvider.getAuthenticationToken()).toEqual('U0lMRU5UIEFZU05DIFRFU1QgVE9LRU4')
    });

    it('should sign in with credetials', async() => {
      await authenticationProvider.loginWithCredentials();

      expect(authenticationProvider.isAuthenticated()).toEqual(true);
      expect(authenticationProvider.getAuthenticationToken()).toEqual('QVlTTkMgVEVTVCBUT0tFTg==');
    });

    it('should set the correct employeeId', async() => {
      await authenticationProvider.login();

      expect(authenticationProvider.isAuthenticated()).toEqual(true);
      expect(authenticationProvider.getEmployeeId()).toEqual('a');
    });

    it('should logout successfully', async () => {
      await authenticationProvider.login();

      expect(authenticationProvider.getAuthenticationToken()).toBeDefined();
      expect(authenticationProvider.isAuthenticated()).toEqual(true);

      await authenticationProvider.logout();

      expect(authenticationProvider.isAuthenticated()).toEqual(false);
      expect(authenticationProvider.getAuthenticationToken()).toBeUndefined();

    })

  });
});
