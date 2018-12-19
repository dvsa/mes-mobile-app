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

  /**
   *  Lifecycle Method
   *    Checks that the user is authenticated before allowing them to load the page.
   */
  ionViewWillEnter() {
    if (this.loginRequired && this.isIos() && !this.authenticationProvider.isAuthenticated()) {
      this.navController.setRoot('LoginPage');
      return false;
    }
    return true
  }

  /**
   *  Method
   *    Checks if the app is running on a IOS device
   */
  isIos(): boolean {
    return this.platform.is('ios');
  }

  /**
   *  Method
   *    Logs the user out of the app and redirects them to the login page
   */
  logout() {
    if (this.isIos()) {
      this.authenticationProvider.logout()
      this.navController.setRoot('LoginPage');
    }
  }

}
