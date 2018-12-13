import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { AuthenticationServiceProvider } from '../../providers/authentication-service/authentication-service';
import { BasePageComponenet } from '../../classes/base-page';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage extends BasePageComponenet {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationService: AuthenticationServiceProvider,
  ) {
    super(platform, navCtrl, authenticationService, false);
  }


  async login() {
    await this.authenticationService.login();

    if (this.authenticationService.isAuthenticated()) {
      this.navController.push('JournalPage');
    }
  }
}
