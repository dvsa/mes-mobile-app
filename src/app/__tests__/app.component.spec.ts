import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { StoreModule, Store } from '@ngrx/store';
import { StatusBarMock, PlatformMock } from 'ionic-mocks';

import { App } from '../app.component';
import { LoadAppInfo } from '../../modules/app-info/app-info.actions';
import { AppInfoModel } from '../../modules/app-info/app-info.model';
import { Spied } from '../../../test/helpers/spy-generic';
import { DataStoreProvider } from '../../providers/data-store/data-store';
import { DataStoreProviderMock } from '../../providers/data-store/__mocks__/data-store.mock';
import { SecureStorage } from '@ionic-native/secure-storage';
import { SecureStorageMock } from '@ionic-native-mocks/secure-storage';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { translateServiceMock } from '../../shared/__mocks__/translate';
import { LOGIN_PAGE } from '../../pages/page-names.constants';
import { configureTestSuite } from 'ng-bullet';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;
  let statusBar: Spied<StatusBar>;
  let store$: Store<AppInfoModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [App],
      imports: [
        StoreModule.forRoot({}),
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: StatusBar, useFactory: () => StatusBarMock.instance() },
        { provide: DataStoreProvider, useClass: DataStoreProviderMock },
        { provide: SecureStorage, useClass: SecureStorageMock },
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    statusBar = TestBed.get(StatusBar);
    store$ = TestBed.get(Store);

    spyOn(store$, 'dispatch');
    spyOn(component, 'configureAccessibility');
    spyOn(component, 'configurePlatformSubscriptions');
  }));

  describe('Class', () => {

    it('should have the correct root page', () => {
      expect(component.rootPage).toBe(LOGIN_PAGE);
    });

    it('should configure the locale to be English by default', () => {
      expect(translateServiceMock.setDefaultLang).toHaveBeenCalledWith('en');
    });

    it('should configure the status bar', () => {
      expect(statusBar.styleLightContent.calls.count()).toBe(1);
      expect(statusBar.overlaysWebView.calls.count()).toBe(1);
      expect(statusBar.overlaysWebView).toHaveBeenCalledWith(false);
      expect(statusBar.backgroundColorByHexString.calls.count()).toBe(1);
      expect(statusBar.backgroundColorByHexString).toHaveBeenCalledWith('#000000');
    });

    it('should start loading the app info', () => {
      component.loadAppInfo();
      expect(store$.dispatch).toHaveBeenCalledWith(new LoadAppInfo());
    });
  });

});
