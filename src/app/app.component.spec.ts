import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from 'ng2-translate';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { Globalization } from '@ionic-native/globalization';

import { App } from './app.component';
import { WelcomePage } from '../pages/welcome-page/welcome-page';
import { Device } from '@ionic-native/device';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AppConfigProvider } from '../providers/app-config/app-config';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  const platformStub = {
    ready: jest.fn().mockResolvedValue('ready'),
    is: jest.fn().mockResolvedValue(true)
  };
  const statusBarStub = {
    styleDefault: jest.fn((): void => undefined),
    overlaysWebView: jest.fn(),
    backgroundColorByName: jest.fn()
  };
  const splashScreenStub = {
    hide: jest.fn()
  };
  const translateServiceStub = {
    getBrowserLang: jest.fn(),
    use: jest.fn(),
    setDefaultLang: jest.fn()
  };
  const screenOrientationStub = {
    lock: jest.fn(),
    ORIENTATIONS: { PORTRAIT_PRIMARY: '' }
  };
  const insomniaStub = {
    keepAwake: jest.fn()
  };
  const globalizationStub = {
    getPreferredLanguage: jest.fn().mockResolvedValue({ value: 'en' })
  };
  const deviceStub = {
    uuid: 'Random string'
  };
  const googleAnalyticsStub = {
    startTrackerWithId: jest.fn(),
    setUserId: jest.fn(),
    addCustomDimension: jest.fn(),
    trackEvent: jest.fn()
  };
  const appConfigStub = {
    getGoogleAnalyticsKey: jest.fn(),
    getGoogleAnalyticsUserIdDimension: jest.fn()
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [App],
      providers: [
        { provide: Platform, useValue: platformStub },
        { provide: StatusBar, useValue: statusBarStub },
        { provide: SplashScreen, useValue: splashScreenStub },
        { provide: TranslateService, useValue: translateServiceStub },
        { provide: ScreenOrientation, useValue: screenOrientationStub },
        { provide: Insomnia, useValue: insomniaStub },
        { provide: Globalization, useValue: globalizationStub },
        { provide: Device, useValue: deviceStub },
        { provide: GoogleAnalytics, useValue: googleAnalyticsStub },
        { provide: AppConfigProvider, useValue: appConfigStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create the App component', () => {
    expect(component).toBeDefined();
  });

  it('should have WelcomePage as the root page', () => {
    expect(component.rootPage).toBe(WelcomePage);
  });

  it('should call the styleDefault method on statusBar', () => {
    expect(platformStub.ready).toBeCalled();
    expect(statusBarStub.overlaysWebView).toBeCalledWith(false);
  });

  it('should call the hide method on splashScreen', () => {
    expect(splashScreenStub.hide).toBeCalled();
  });
});
