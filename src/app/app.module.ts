import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { App } from './app.component';
import { JournalProvider } from '../providers/journal/journal';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, IonicModule.forRoot(App , {mode: 'ios'})],
  bootstrap: [IonicApp],
  entryComponents: [App],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    JournalProvider
  ]
})
export class AppModule {}
