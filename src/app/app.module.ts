import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MSAdal } from '@ionic-native/ms-adal';

import { App } from './app.component';
import { JournalProvider } from '../providers/journal/journal';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigProvider } from '../providers/app-config/app-config';
import { AuthenticationServiceProvider } from '../providers/authentication-service/authentication-service';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(App , {mode: 'ios'})],
  bootstrap: [IonicApp],
  entryComponents: [App],
  providers: [
    StatusBar,
    SplashScreen,
    MSAdal,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    JournalProvider,
    AppConfigProvider,
    AuthenticationServiceProvider,
  ]
})
export class AppModule {}
