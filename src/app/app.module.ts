import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { App } from "./app.component";
import { LoginPage } from "../pages/login/login";

@NgModule({
  declarations: [App, LoginPage],
  imports: [BrowserModule, IonicModule.forRoot(App)],
  bootstrap: [IonicApp],
  entryComponents: [App, LoginPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
