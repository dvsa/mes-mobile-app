import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MSAdal } from '@ionic-native/ms-adal';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { App } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigProvider } from '../providers/app-config/app-config';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

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
    StatusBar,
    SplashScreen,
    MSAdal,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppConfigProvider,
    AuthenticationProvider,
    InAppBrowser,
  ]
})
export class AppModule {
}
