var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
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
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { AppConfigProvider } from '../providers/app-config/app-config';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { StoreModule } from '@ngrx/store';
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
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LogHelper } from '../providers/logs/logsHelper';
import { environment } from '../environment/environment';
import { AnalyticsProvider } from '../providers/analytics/analytics';
import { JournalModule } from '../modules/journal/journal.module';
import { SchemaValidatorProvider } from '../providers/schema-validator/schema-validator';
import { PassCertificateValidationProvider, } from '../providers/pass-certificate-validation/pass-certificate-validation';
import { RemoteDevToolsProxy } from '../../ngrx-devtool-proxy/remote-devtools-proxy';
import { BikeCategoryDetailProvider, } from '../providers/bike-category-detail/bike-category-detail';
import { CPCQuestionProvider } from '../providers/cpc-questions/cpc-questions';
import { SearchProvider } from '../providers/search/search';
import { TestResultProvider } from '../providers/test-result/test-result';
import { CompletedTestPersistenceProvider } from '../providers/completed-test-persistence/completed-test-persistence';
export function createTranslateLoader(http) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
export function localStorageSyncReducer(reducer) {
    return localStorageSync({
        keys: ['appInfo', 'logs', 'tests', 'journal'],
        rehydrate: true,
        syncCondition: function (state) {
            var slots = state.journal.slots;
            var slotDates = Object.keys(slots);
            return !slotDates.every(function (date) { return !slots[date].length; });
        },
    })(reducer);
}
var metaReducers = [];
var enableDevTools = environment && environment.enableDevTools;
var enableRehydrationPlugin = environment && environment.enableRehydrationPlugin;
if (enableRehydrationPlugin) {
    metaReducers.push(localStorageSyncReducer);
}
// Register our remote devtools if we're on-device and not in a browser and dev tools enabled
if (!window['devToolsExtension'] && !window['__REDUX_DEVTOOLS_EXTENSION__']
    && enableDevTools && window.hasOwnProperty('cordova')) {
    var remoteDevToolsProxy = new RemoteDevToolsProxy({
        connectTimeout: 300000,
        ackTimeout: 120000,
        secure: false, // dev only
    });
    // support both the legacy and new keys, for now
    window['devToolsExtension'] = remoteDevToolsProxy;
    window['__REDUX_DEVTOOLS_EXTENSION__'] = remoteDevToolsProxy;
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [App],
            imports: __spreadArray(__spreadArray([
                BrowserModule,
                IonicModule.forRoot(App, { mode: 'ios' }),
                StoreModule.forRoot({}, { metaReducers: metaReducers })
            ], (enableDevTools ? [StoreDevtoolsModule.instrument()] : [])), [
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
            ]),
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
            ],
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map