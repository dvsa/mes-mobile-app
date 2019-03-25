import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MSAdal } from '@ionic-native/ms-adal';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppVersion } from '@ionic-native/app-version';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';

import { App } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppConfigProvider } from '../providers/app-config/app-config';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
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
import { CandidateModule } from '../modules/test/candidate/candidate.module';
import { LockScreenProvider } from '../providers/lock-screen/lock-screen';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(App, { mode: 'ios' }),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    AppInfoModule,
    LogsModule,
    CandidateModule,
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
    AppConfigProvider,
    AuthenticationProvider,
    InAppBrowser,
    MobileAccessibility,
    ScreenOrientation,
    UrlProvider,
    Network,
    NetworkStateProvider,
    GoogleAnalytics,
    Device,
    LogsProvider,
    AppInfoProvider,
    DeviceProvider,
    SecureStorage,
    DataStoreProvider,
    LockScreenProvider,
  ],
})
export class AppModule {}
