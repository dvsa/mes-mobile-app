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
import { LoginPage } from '../pages/login/login';

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
        { provide: Globalization, useValue: globalizationStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create the App component', () => {
    expect(component).toBeDefined();
  });

  it('should have LoginPage as the root page', () => {
    expect(component.rootPage).toBe(LoginPage);
  });

  it('should call the styleDefault method on statusBar', () => {
    expect(platformStub.ready).toBeCalled();
    expect(statusBarStub.overlaysWebView).toBeCalledWith(false);
  });

  it('should call the hide method on splashScreen', () => {
    expect(splashScreenStub.hide).toBeCalled();
  });
});
