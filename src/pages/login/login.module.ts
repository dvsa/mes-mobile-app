import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { LoginPage } from './login';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';


@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    ComponentsModule,
  ],
  providers: [
    OpenNativeSettings
  ]
})
export class LoginPageModule {}
