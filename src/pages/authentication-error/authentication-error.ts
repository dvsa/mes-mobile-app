import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-authentication-error',
  templateUrl: 'authentication-error.html',
})
export class AuthenticationErrorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
