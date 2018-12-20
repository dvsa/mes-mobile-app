import { Platform, NavController } from 'ionic-angular';
import { AuthenticationProvider } from '../providers/authentication/authentication';

export abstract class BasePageComponent {

  constructor(
    public platform: Platform,
    public navController: NavController,
    public authenticationProvider: AuthenticationProvider,
    public loginRequired: boolean = true
  ) {

  }

  ionViewWillEnter() {
    if (this.loginRequired && this.isIos() && !this.authenticationProvider.isAuthenticated()) {
      this.navController.setRoot('LoginPage');
      return false;
    }
    return true
  }

  isIos(): boolean {
    return this.platform.is('ios');
  }

  logout() {
    if (this.isIos()) {
      this.authenticationProvider.logout()
      this.navController.setRoot('LoginPage');
    }
  }

}
