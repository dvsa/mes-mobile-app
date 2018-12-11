import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthenticationErrorPage } from './authentication-error';

@NgModule({
  declarations: [
    AuthenticationErrorPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthenticationErrorPage),
  ],
})
export class AuthenticationErrorPageModule {}
