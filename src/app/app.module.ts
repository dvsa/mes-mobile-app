import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MSAdal } from '@ionic-native/ms-adal';

import { App } from './app.component';
import { AuthenticationServiceProvider } from '../providers/authentication-service/authentication-service';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, IonicModule.forRoot(App)],
  bootstrap: [IonicApp],
  entryComponents: [App],
  providers: [
    StatusBar,
    SplashScreen,
    MSAdal,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ,
    AuthenticationServiceProvider
  ]
})
export class AppModule {}
