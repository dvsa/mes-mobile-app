import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { BasePageComponent } from '../../classes/base-page';

@IonicPage()
@Component({
  selector: 'page-health-declaration',
  templateUrl: 'health-declaration.html'
})
export class HealthDeclarationPage extends BasePageComponent {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider
  ) {
    super(platform, navCtrl, authenticationProvider)
  }

}
