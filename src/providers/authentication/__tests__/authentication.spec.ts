import { TestBed } from '@angular/core/testing';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MSAdal } from '@ionic-native/ms-adal';

import { MSAdalMock } from '../__mocks__/ms-adal.mock';
import { AuthenticationProvider } from '../authentication';
import { AppConfigProvider } from '../../app-config/app-config';
import { AppConfigProviderMock } from '../../app-config/__mocks__/app-config.mock';
import { InAppBrowserMock } from '../__mocks__/in-app-browser.mock';
import { ToastController } from 'ionic-angular';
import { ToastControllerMock } from 'ionic-mocks-jest';

describe('Authentication', () => {
  let authenticationProvider: AuthenticationProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationProvider,
        { provide: ToastController, useFactory: () => ToastControllerMock.instance() },
        { provide: MSAdal, useClass: MSAdalMock },
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        { provide: InAppBrowser, useClass: InAppBrowserMock}
      ]
    })
  });

  beforeEach(() => {
    authenticationProvider = TestBed.get(AuthenticationProvider)
  });

  describe('Provider', () => {

    it('should compile', () => {
      expect(authenticationProvider).toBeDefined;
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
      expect(authenticationProvider.getAuthenticationToken()).toEqual('SILENT AYSNC TEST TOKEN')
    });

    it('should sign in with credetials', async() => {
      await authenticationProvider.loginWithCredentials();

      expect(authenticationProvider.isAuthenticated()).toEqual(true);
      expect(authenticationProvider.getAuthenticationToken()).toEqual('AYSNC TEST TOKEN');
    });

    it('should do something when login fails', async () => {
      // TODO
    })

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
