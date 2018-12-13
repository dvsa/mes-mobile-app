import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// import { HighlightModule } from 'ngx-highlightjs';

// import typescript from 'highlight.js/lib/languages/typescript';

import { App } from './app.component';
import { HomePage } from '../pages/home/home';

import { ComponentsModule } from '../components/components.module';

// function hljsLanguages() {
//   return [
//     { name: 'typescript', func: function() { return null; } },
//   ];
// }

@NgModule({
  declarations: [
    App,
    HomePage
  ],
  imports: [
    BrowserModule,
    // HighlightModule.forRoot({
    //   languages: hljsLanguages
    // }),
    IonicModule.forRoot(App , { mode: 'ios' }),
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
