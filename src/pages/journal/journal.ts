import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponenet } from '../../classes/base-page';
import { AuthenticationServiceProvider } from '../../providers/authentication-service/authentication-service';

@IonicPage()
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})
export class JournalPage extends BasePageComponenet {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationService: AuthenticationServiceProvider
  ) {
    super(platform, navCtrl, authenticationService)
  }
}
