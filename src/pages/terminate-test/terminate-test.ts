import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@IonicPage()
@Component({
  selector: 'page-terminate-test',
  templateUrl: 'terminate-test.html'
})
export class TerminateTestPage extends BasePageComponent {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider
  ) {
    super(platform, navCtrl, authenticationProvider)
  }

  popToRoot() {
    this.navCtrl.popToRoot();
  }
}
