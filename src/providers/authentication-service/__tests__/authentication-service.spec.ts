import { TestBed } from '@angular/core/testing';

import { MSAdal } from '@ionic-native/ms-adal';

import { MSAdalMock } from '../../../mocks/ms-adal.mock';

import { AuthenticationServiceProvider } from '../authentication-service';

describe('Authentication Service', () => {
  let authenticationService: AuthenticationServiceProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationServiceProvider,
        { provide: MSAdal, useClass: MSAdalMock },
      ]
    })
  });

  beforeEach(() => {
    authenticationService = TestBed.get(AuthenticationServiceProvider)
  });

  describe('Provider', () => {

    it('should compile', () => {
      expect(authenticationService).toBeDefined;
    });

    it('isAuthenticated() should return false when no login has happened', () => {
      expect(authenticationService.isAuthenticated()).toEqual(false);
    });

    it('getAuthenticationToken() should return undefined if no login has happened', () => {
      expect(authenticationService.getAuthenticationToken()).toEqual(undefined);
    })

    it('should silently login successfully', async () => {
      await authenticationService.login();

      expect(authenticationService.isAuthenticated()).toEqual(true);
      expect(authenticationService.getAuthenticationToken()).toEqual('SILENT AYSNC TEST TOKEN')
    });

    it('should sign in with credetials', async() => {
      await authenticationService.loginWithCredentials();

      expect(authenticationService.isAuthenticated()).toEqual(true);
      expect(authenticationService.getAuthenticationToken()).toEqual('AYSNC TEST TOKEN');
    });

    it('should do something when login fails', async () => {
      // TODO
    })

    it('should logout successfully', async () => {
      await authenticationService.login();

      expect(authenticationService.getAuthenticationToken()).toBeDefined();
      expect(authenticationService.isAuthenticated()).toEqual(true);

      await authenticationService.logout();

      expect(authenticationService.isAuthenticated()).toEqual(false);
      expect(authenticationService.getAuthenticationToken()).toBeUndefined();

    })

  });
});
