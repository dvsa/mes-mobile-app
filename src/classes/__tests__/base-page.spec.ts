import { TestBed } from '@angular/core/testing';
import { Platform, NavController } from 'ionic-angular';
import { PlatformMock, NavControllerMock } from 'ionic-mocks';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../providers/authentication/__mocks__/authentication.mock';
import { BasePageComponent } from '../base-page';

describe('Base Page', () => {

  let platform: Platform;
  let navController: NavController;
  let authenticationProvider: AuthenticationProvider;

  let basePageComponent: BasePageComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
      ],
    }).compileComponents();

    platform = TestBed.get(Platform)
    navController = TestBed.get(NavController)
    authenticationProvider = TestBed.get(AuthenticationProvider)

    class BasePageClass extends BasePageComponent {
      constructor(
        platform: Platform,
        navController: NavController,
        authenticationProvider: AuthenticationProvider
      ) {
        super(platform, navController, authenticationProvider)
      }
    }

    basePageComponent = new BasePageClass(platform, navController, authenticationProvider);
  });

  describe('ionViewWillEnter()', () => {
    it('should allow user access if authentication is not required', () => {
      basePageComponent.loginRequired = false;
      expect(basePageComponent.ionViewWillEnter()).toBe(true);
    });
    it('should allow user access if authentication is required and device is not ios', () => {
      platform.is = jasmine.createSpy().and.returnValue(false);
      expect(basePageComponent.ionViewWillEnter()).toBe(true);
    });
    it('should allow user access if authenticated , is an ios device and is required', () => {
      expect(basePageComponent.ionViewWillEnter()).toBe(true);
    });
    it('should not allow user access if user is not authenticated, authentication is required and device is ios', () => {
      authenticationProvider.isAuthenticated = jasmine.createSpy().and.returnValue(false);
      expect(basePageComponent.ionViewWillEnter()).toBe(false);
    });

  });

  describe('isIos()', () => {
    it('should return true if platform is ios', () => {
      platform.is = jasmine.createSpy().and.returnValue(true);
      expect(basePageComponent.isIos()).toBe(true)
    });
    it('should return false if platform is not ios', () => {
      platform.is = jasmine.createSpy().and.returnValue(false);
      expect(basePageComponent.isIos()).toBe(false)
    });
  });

  describe('logout()', () => {
    it('should try to logout when platform is ios', () => {
      basePageComponent.logout();

      expect(authenticationProvider.logout).toHaveBeenCalledTimes(1)
      expect(navController.setRoot).toHaveBeenCalledTimes(1);
      expect(navController.setRoot).toHaveBeenCalledWith('LoginPage', {
        hasLoggedOut: true
      });
    });
    it('should not try to logout when platform is not ios', () => {
      platform.is = jasmine.createSpy().and.returnValue(false);

      basePageComponent.logout();

      expect(authenticationProvider.logout).toHaveBeenCalledTimes(0)
      expect(navController.setRoot).toHaveBeenCalledTimes(0);
    });
  });

});
