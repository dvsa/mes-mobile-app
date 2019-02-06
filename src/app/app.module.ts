import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MSAdal } from '@ionic-native/ms-adal';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
import { AnalyticsProvider } from '../providers/analytics/analytics';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { LoggingProvider } from '../providers/logging/logging';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(App, { mode: 'ios' }),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
  ],
  bootstrap: [IonicApp],
  entryComponents: [App],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    StatusBar,
    SplashScreen,
    MSAdal,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppConfigProvider,
    AuthenticationProvider,
    InAppBrowser,
    ScreenOrientation,
    UrlProvider,
    Network,
    NetworkStateProvider,
    GoogleAnalytics,
    AnalyticsProvider,
    LoggingProvider,
    
  ]
})
export class AppModule {
}
