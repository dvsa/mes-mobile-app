import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock, SplashScreenMock } from 'ionic-mocks';

import { AppModule } from '../../../app/app.module';
import { LoginPage } from '../login';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticationError } from '../../../providers/authentication/authentication.constants';
import { By } from '@angular/platform-browser';

describe('LoginPage', () => {
  let fixture: ComponentFixture<LoginPage>;
  let component: LoginPage;
  let navController: NavController;
  let splashScreen: SplashScreen;
  let authenticationProvider: AuthenticationProvider;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule, AppModule],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: SplashScreen, useFactory: () => SplashScreenMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock }]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
        splashScreen = TestBed.get(SplashScreen);
        authenticationProvider = TestBed.get(AuthenticationProvider);
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should login successfully', fakeAsync(() => {
      component.platform.ready = jasmine.createSpy().and.returnValue(Promise.resolve());
      component.authenticationProvider.login = jasmine.createSpy().and.returnValue(Promise.resolve());
      component.login();
      tick()
      expect(navController.setRoot).toHaveBeenCalledWith('JournalPage');
      expect(component.hasUserLoggedOut).toBeFalsy();
      expect(splashScreen.hide).toHaveBeenCalledTimes(1);
    }));

    it('should fail to login gracefully', fakeAsync(() => {
      component.platform.ready = jasmine.createSpy().and.returnValue(Promise.resolve());
      authenticationProvider.login =
        jasmine.createSpy().and.returnValue(Promise.reject(AuthenticationError.NO_INTERNET));
      component.login();
      tick();
      expect(component.authenticationError === AuthenticationError.NO_INTERNET);
      expect(component.hasUserLoggedOut).toBeFalsy();
      expect(splashScreen.hide).toHaveBeenCalledTimes(1);
    }));

    it('should return true for isInternetConnectError when criteria is met', () => {
      component.authenticationError = AuthenticationError.NO_INTERNET;
      component.hasUserLoggedOut = false;

      expect(component.isInternetConnectionError()).toBeTruthy();
    });

    it('should return false for isInternetConnectError when criteria is not met', () => {
      component.authenticationError = AuthenticationError.NO_INTERNET;
      component.hasUserLoggedOut = true;

      expect(component.isInternetConnectionError()).toBeFalsy();

      component.authenticationError = undefined;
      component.hasUserLoggedOut = false;

      expect(component.isInternetConnectionError()).toBeFalsy();
    });

    it('should return true for isUserCancelledError when criteria is met', () => {
      component.authenticationError = AuthenticationError.USER_CANCELLED;
      component.hasUserLoggedOut = false;

      expect(component.isUserCancelledError()).toBeTruthy();
    });

    it('should return false for isUserCancelledError when criteria is not met', () => {
      component.authenticationError = AuthenticationError.USER_CANCELLED;
      component.hasUserLoggedOut = true;

      expect(component.isUserCancelledError()).toBeFalsy();

      component.authenticationError = undefined;
      component.hasUserLoggedOut = false;

      expect(component.isUserCancelledError()).toBeFalsy();
    });

    it('should return true for isUnknownError when criteria is met', () => {
      component.authenticationError = AuthenticationError.NO_RESPONSE;
      component.hasUserLoggedOut = false;

      expect(component.isUnknownError()).toBeTruthy();
    });

    it('should return false for isUnknownError when criteria is not met', () => {
      component.authenticationError = AuthenticationError.USER_CANCELLED;
      component.hasUserLoggedOut = false;

      expect(component.isUnknownError()).toBeFalsy();

      component.authenticationError = undefined;
      component.hasUserLoggedOut = true;

      expect(component.isUnknownError()).toBeFalsy();
    });
  });

  describe('DOM', () => {
    it('should show the correct div if user has logged out', () => {
      component.hasUserLoggedOut = true;
      fixture.detectChanges();

      const tags = fixture.debugElement.queryAll(By.css('h2'));
      expect(tags.length).toBe(1);
      expect((tags[0].nativeElement as HTMLElement).textContent).toContain('signed out');
    });

    it('should show the correct div if user has an internet connection error', () => {
      component.hasUserLoggedOut = false;
      component.authenticationError = AuthenticationError.NO_INTERNET;
      fixture.detectChanges();

      const tags = fixture.debugElement.queryAll(By.css('h2'));
      expect(tags.length).toBe(1);
      expect((tags[0].nativeElement as HTMLElement).textContent).toContain('offline');
    });

    it('should show the correct div if user has an user cancelled error', () => {
      component.hasUserLoggedOut = false;
      component.authenticationError = AuthenticationError.USER_CANCELLED;
      fixture.detectChanges();

      const tags = fixture.debugElement.queryAll(By.css('h2'));
      expect(tags.length).toBe(1);
      expect((tags[0].nativeElement as HTMLElement).textContent).toContain('cancelled sign in');
    });

    it('should show the correct div if user has an internet connection error', () => {
      component.hasUserLoggedOut = false;
      component.authenticationError = AuthenticationError.NO_RESPONSE;
      fixture.detectChanges();

      const tags = fixture.debugElement.queryAll(By.css('h2'));
      expect(tags.length).toBe(1);
      expect((tags[0].nativeElement as HTMLElement).textContent).toContain('Sorry, something went wrong');
    });

  });
});
