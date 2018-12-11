import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationServiceProvider } from '../../providers/authentication-service/authentication-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authenticationService: AuthenticationServiceProvider) {}


  logout() {
    this.authenticationService.logout();
  }
}
