import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { App } from './app.component';
import { JournalProvider } from '../providers/journal/journal';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigProvider } from '../providers/app-config/app-config';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(App , {mode: 'ios'})],
  bootstrap: [IonicApp],
  entryComponents: [App],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    JournalProvider,
    AppConfigProvider
  ]
})
export class AppModule {}
