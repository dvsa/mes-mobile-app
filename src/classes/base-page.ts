import { Platform, NavController } from 'ionic-angular';
import { AuthenticationServiceProvider } from '../providers/authentication-service/authentication-service';

export abstract class BasePageComponenet {

  constructor(
    public platform: Platform,
    public navController: NavController,
    public authenticationService: AuthenticationServiceProvider,
    public loginRequired: boolean = true
  ) {

  }

  /**
   *  Lifecycle Method
   *    Checks that the user is authenticated before allowing them to load the page.
   */
  ionViewWillEnter() {
    if (this.loginRequired && this.platform.is('ios') && !this.authenticationService.isAuthenticated()) {
      this.navController.setRoot('LoginPage')
      return false;
    }
    return true
  }

  /**
   *  Method
   *    Allows user to log out of the app
   */
  logout() {
    this.authenticationService.logout()
  }

}
