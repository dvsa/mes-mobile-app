import { Platform, NavController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { LOGIN_PAGE } from '../../pages/page-names.constants';

export abstract class BasePageComponent {

  constructor(
    public platform: Platform,
    public navController: NavController,
    public authenticationProvider: AuthenticationProvider,
    public loginRequired: boolean = true,
  ) {

  }

  ionViewWillEnter() {
    if (this.loginRequired && this.isIos() && !this.authenticationProvider.isAuthenticated()) {
      this.navController.setRoot(LOGIN_PAGE);
      return false;
    }
    return true;
  }

  isIos(): boolean {
    return this.platform.is('ios');
  }

  logout() {
    if (this.isIos()) {
      this.authenticationProvider.logout();
      this.navController.setRoot(LOGIN_PAGE, {
        hasLoggedOut: true,
      });
    }
  }

}
