import { async, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { Platform, NavController } from 'ionic-angular';
import { PlatformMock, NavControllerMock } from 'ionic-mocks';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { BasePageComponent } from '../base-page';
import { LOGIN_PAGE } from '../../../pages/page-names.constants';
import { configureTestSuite } from 'ng-bullet';

describe('Base Page', () => {

  let platform: Platform;
  let navController: NavController;
  let authenticationProvider: AuthenticationProvider;

  let basePageComponent: BasePageComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
      ],
    });
  });

  beforeEach(async(() => {

    platform = TestBed.get(Platform);
    navController = TestBed.get(NavController);
    authenticationProvider = TestBed.get(AuthenticationProvider);

    class BasePageClass extends BasePageComponent {
      constructor(
        platform: Platform,
        navController: NavController,
        authenticationProvider: AuthenticationProvider,
      ) {
        super(platform, navController, authenticationProvider);
      }
    }

    basePageComponent = new BasePageClass(platform, navController, authenticationProvider);
  }));

  describe('ionViewWillEnter()', () => {
    it('should allow user access if authentication is not required', fakeAsync(() => {
      basePageComponent.loginRequired = false;
      basePageComponent.ionViewWillEnter();
      expect(basePageComponent.navController.setRoot).not.toHaveBeenCalled();
      flushMicrotasks();
    }));
    it('should allow user access if authentication is required and device is not ios', fakeAsync(() => {
      platform.is = jasmine.createSpy('platform.is').and.returnValue(false);
      basePageComponent.ionViewWillEnter();
      expect(basePageComponent.navController.setRoot).not.toHaveBeenCalled();
      flushMicrotasks();
    }));
    it('should allow user access if authenticated , is an ios device and is required', fakeAsync(() => {
      basePageComponent.ionViewWillEnter();
      expect(basePageComponent.navController.setRoot).not.toHaveBeenCalled();
      flushMicrotasks();
    }));
    // tslint:disable-next-line:max-line-length
    it('should not allow user access if user is not authenticated, authentication is required and device is ios', fakeAsync(() => {
      platform.is = jasmine.createSpy('platform.is').and.returnValue(true);
      authenticationProvider.isAuthenticated =
      jasmine.createSpy('authenticationProvider.isAuthenticated').and.returnValue(Promise.resolve(false));
      basePageComponent.loginRequired = true;
      basePageComponent.ionViewWillEnter();
      flushMicrotasks();
      expect(basePageComponent.navController.setRoot).toHaveBeenCalledWith(LOGIN_PAGE);
    }));

  });

  describe('isIos()', () => {
    it('should return true if platform is ios', () => {
      platform.is = jasmine.createSpy('platform.is').and.returnValue(true);
      expect(basePageComponent.isIos()).toBe(true);
    });
    it('should return false if platform is not ios', () => {
      platform.is = jasmine.createSpy('platform.is').and.returnValue(false);
      expect(basePageComponent.isIos()).toBe(false);
    });
  });

  describe('logout()', () => {
    it('should try to logout when platform is ios', fakeAsync(() => {
      authenticationProvider.logout =
        jasmine.createSpy('authenticationProvider.logout').and.returnValue(Promise.resolve(false));

      basePageComponent.logout();
      flushMicrotasks();

      expect(authenticationProvider.logout).toHaveBeenCalledTimes(1);
      expect(navController.setRoot).toHaveBeenCalledTimes(1);
      expect(navController.setRoot).toHaveBeenCalledWith(LOGIN_PAGE, {
        hasLoggedOut: true,
      });
    }));
    it('should not try to logout when platform is not ios', () => {
      platform.is = jasmine.createSpy('platform.is').and.returnValue(false);

      basePageComponent.logout();

      expect(authenticationProvider.logout).toHaveBeenCalledTimes(0);
      expect(navController.setRoot).toHaveBeenCalledTimes(0);
    });
  });

});
