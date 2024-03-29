import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MSAdal } from '@ionic-native/ms-adal';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppVersion } from '@ionic-native/app-version';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';

import { App } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AppConfigProvider } from '../providers/app-config/app-config';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { EffectsModule } from '@ngrx/effects';
import { AuthInterceptor } from '../providers/authentication/interceptor';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { UrlProvider } from '../providers/url/url';
import { Network } from '@ionic-native/network';
import { NetworkStateProvider } from '../providers/network-state/network-state';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Device } from '@ionic-native/device';
import { LogsProvider } from '../providers/logs/logs';
import { AppInfoModule } from '../modules/app-info/app-info.module';
import { AppInfoProvider } from '../providers/app-info/app-info';
import { LogsModule } from '../modules/logs/logs.module';
import { DeviceProvider } from '../providers/device/device';
import { DataStoreProvider } from '../providers/data-store/data-store';
import { SecureStorage } from '@ionic-native/secure-storage';
import { TestsModule } from '../modules/tests/tests.module';
import { DeviceAuthenticationProvider } from '../providers/device-authentication/device-authentication';
import { QuestionProvider } from '../providers/question/question';
import { Insomnia } from '@ionic-native/insomnia';
import { TestPersistenceProvider } from '../providers/test-persistence/test-persistence';
import { IonicGestureConfig } from '../gestures/ionic-gesture-config';
import { WeatherConditionProvider } from '../providers/weather-conditions/weather-condition';
import { OutcomeBehaviourMapProvider } from '../providers/outcome-behaviour-map/outcome-behaviour-map';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LogHelper } from '../providers/logs/logsHelper';
import { environment } from '../environment/environment';
import { AnalyticsProvider } from '../providers/analytics/analytics';
import { JournalModule } from '../modules/journal/journal.module';
import { SchemaValidatorProvider } from '../providers/schema-validator/schema-validator';
import {
  PassCertificateValidationProvider,
} from '../providers/pass-certificate-validation/pass-certificate-validation';
import { RemoteDevToolsProxy } from '../../ngrx-devtool-proxy/remote-devtools-proxy';
import { BikeCategoryDetailProvider } from '../providers/bike-category-detail/bike-category-detail';
import { CPCQuestionProvider } from '../providers/cpc-questions/cpc-questions';
import { SearchProvider } from '../providers/search/search';
import { TestResultProvider } from '../providers/test-result/test-result';
import { CompletedTestPersistenceProvider } from '../providers/completed-test-persistence/completed-test-persistence';
import { CategoryWhiteListProvider } from '../providers/category-whitelist/category-whitelist';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['appInfo', 'logs', 'tests', 'journal'],
    rehydrate: true,
    syncCondition: (state) => {
      const slots = state.journal.slots;
      const slotDates = Object.keys(slots);

      return !slotDates.every(date => !slots[date].length);
    },
  })(reducer);
}
const metaReducers: MetaReducer<any, any>[] = [];
const enableDevTools = environment && environment.enableDevTools;
const enableRehydrationPlugin = environment && environment.enableRehydrationPlugin;

if (enableRehydrationPlugin) {
  metaReducers.push(localStorageSyncReducer);
}

// Register our remote devtools if we're on-device and not in a browser and dev tools enabled
if (!window['devToolsExtension'] && !window['__REDUX_DEVTOOLS_EXTENSION__']
  && enableDevTools && window.hasOwnProperty('cordova')) {
  const remoteDevToolsProxy = new RemoteDevToolsProxy({
    connectTimeout: 300000, // extend for pauses during debugging
    ackTimeout: 120000, // extend for pauses during debugging
    secure: false, // dev only
  });

  // support both the legacy and new keys, for now
  window['devToolsExtension'] = remoteDevToolsProxy;
  window['__REDUX_DEVTOOLS_EXTENSION__'] = remoteDevToolsProxy;
}

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    IonicModule.forRoot(App, { mode: 'ios' }),
    StoreModule.forRoot(
      {},
      { metaReducers },
    ),
    ...(enableDevTools ? [StoreDevtoolsModule.instrument()] : []),
    EffectsModule.forRoot([]),
    AppInfoModule,
    LogsModule,
    TestsModule,
    JournalModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [App],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AppVersion,
    StatusBar,
    SplashScreen,
    MSAdal,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SecureStorage,
    DataStoreProvider,
    Network,
    NetworkStateProvider,
    GoogleAnalytics,
    Device,
    AppConfigProvider,
    AuthenticationProvider,
    InAppBrowser,
    MobileAccessibility,
    ScreenOrientation,
    UrlProvider,
    LogsProvider,
    AppInfoProvider,
    DeviceProvider,
    SecureStorage,
    DeviceAuthenticationProvider,
    QuestionProvider,
    WeatherConditionProvider,
    Insomnia,
    TestPersistenceProvider,
    { provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig },
    OutcomeBehaviourMapProvider,
    LogHelper,
    AnalyticsProvider,
    SchemaValidatorProvider,
    PassCertificateValidationProvider,
    BikeCategoryDetailProvider,
    CPCQuestionProvider,
    SearchProvider,
    TestResultProvider,
    CompletedTestPersistenceProvider,
    CategoryWhiteListProvider,
  ],
})
export class AppModule { }
