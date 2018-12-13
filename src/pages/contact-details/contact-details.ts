import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponenet } from '../../classes/base-page';
import { AuthenticationServiceProvider } from '../../providers/authentication-service/authentication-service';

@IonicPage()
@Component({
  selector: 'page-contact-details',
  templateUrl: 'contact-details.html'
})
export class ContactDetailsPage extends BasePageComponenet {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationService: AuthenticationServiceProvider
  ) {
    super(platform, navCtrl, authenticationService)
  }
}
