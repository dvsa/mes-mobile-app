import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock, SplashScreenMock } from 'ionic-mocks-jest';

import { AppModule } from '../../../app/app.module';
import { LoginPage } from '../login';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticationError } from '../../../providers/authentication/authentication.constants';
import { By } from '@angular/platform-browser';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { OpenNativeSettingsMock } from '@ionic-native-mocks/open-native-settings';

describe('LoginPage', () => {
  let fixture: ComponentFixture<LoginPage>;
  let component: LoginPage;
  let navController: NavController;
  let splashScreen: SplashScreen;
  let authenticationProvider: AuthenticationProvider;
  let openNativeSettings: OpenNativeSettings;

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
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: OpenNativeSettings, useClass: OpenNativeSettingsMock},
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
        splashScreen = TestBed.get(SplashScreen);
        authenticationProvider = TestBed.get(AuthenticationProvider);
        openNativeSettings = TestBed.get(OpenNativeSettings);
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should login successfully', () => {

      component.login().then(() => {
        expect(navController.setRoot).toBeCalledWith('JournalPage');
        expect(component.hasUserLoggedOut).toBeFalsy();
        expect(splashScreen.hide).toBeCalledTimes(1);
      });
    });

    it('should fail to login gracefully', () => {
      authenticationProvider.login = jest.fn().mockRejectedValue(AuthenticationError.NO_INTERNET);

      component.login().catch(() => {
        expect(component.authenticationError === AuthenticationError.NO_INTERNET);
        expect(component.hasUserLoggedOut).toBeFalsy();
        expect(splashScreen.hide).toBeCalledTimes(1);
      });
    });

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
      component.authenticationError = undefined;
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

    it('should request the wifi network settings to be opened ', () => {
      openNativeSettings.open = jest.fn();
      component.openWifiSetting();
      expect(openNativeSettings.open).toBeCalledWith('wifi');
    });
  });

  describe('DOM', () => {
    it('should show the correct div if user has logged out', () => {
      component.hasUserLoggedOut = true;
      fixture.detectChanges();

      const tags = fixture.debugElement.queryAll(By.css('h2'));
      expect(tags).toHaveLength(1);
      expect((tags[0].nativeElement as HTMLElement).textContent).toContain('logged out');
    });

    it('should show the correct div if user has an internet connection error', () => {
      component.hasUserLoggedOut = false;
      component.authenticationError = AuthenticationError.NO_INTERNET;
      fixture.detectChanges();

      const tags = fixture.debugElement.queryAll(By.css('h2'));
      expect(tags).toHaveLength(1);
      expect((tags[0].nativeElement as HTMLElement).textContent).toContain('connected to the internet');
    });

    it('should show the correct div if user has an user cancelled error', () => {
      component.hasUserLoggedOut = false;
      component.authenticationError = AuthenticationError.USER_CANCELLED;
      fixture.detectChanges();

      const tags = fixture.debugElement.queryAll(By.css('h2'));
      expect(tags).toHaveLength(1);
      expect((tags[0].nativeElement as HTMLElement).textContent).toContain('User Cancelled Error Placeholder');
    });

    it('should show the correct div if user has an internet connection error', () => {
      component.hasUserLoggedOut = false;
      component.authenticationError = undefined;
      fixture.detectChanges();

      const tags = fixture.debugElement.queryAll(By.css('h2'));
      expect(tags).toHaveLength(1);
      expect((tags[0].nativeElement as HTMLElement).textContent).toContain('Unknown Error Placeholder');
    });

  });
});
