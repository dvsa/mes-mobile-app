import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { App } from '../app.component';
import { MSAdal } from '@ionic-native/ms-adal';
import { MSAdalMock } from '../../providers/authentication/__mocks__/ms-adal.mock';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../providers/app-config/__mocks__/app-config.mock';
import { StatusBarMock, PlatformMock } from 'ionic-mocks-jest';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [App],
      providers: [
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: StatusBar, useFactory: () => StatusBarMock.instance() },
        { provide: MSAdal, useClass: MSAdalMock },
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
      ],
    }).compileComponents();
    // By default we set the app to be running on a non-ios device
    const platform: Platform = TestBed.get(Platform);
    platform.is = jest.fn().mockReturnValue(false);

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create the App component', () => {
    expect(component).toBeDefined();
  });
});
