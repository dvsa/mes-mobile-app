import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { AuthenticationServiceProvider } from '../../providers/authentication-service/authentication-service';
import { BasePageComponent } from '../../classes/base-page';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage extends BasePageComponent {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationService: AuthenticationServiceProvider,
  ) {
    super(platform, navCtrl, authenticationService, false);
  }


  login() {
    this.authenticationService.login()
      .then(() => {
        this.navController.setRoot('JournalPage');
      })
  }
}
