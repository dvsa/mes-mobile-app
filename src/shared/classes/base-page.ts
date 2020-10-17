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
    if (this.loginRequired && this.isIos()) {
      this.authenticationProvider.hasValidToken().then(async(hasValidToken) => {
        this.authenticationProvider.determineAuthenticationMode();
        if (!hasValidToken && !this.authenticationProvider.isInUnAuthenticatedMode()) {
          await this.navController.setRoot(LOGIN_PAGE);
        }
      });
    }
  }

  isIos(): boolean {
    return this.platform.is('ios');
  }

  async logout() {
    if (this.isIos()) {
      try {
        await this.authenticationProvider.logout();
      } catch (error) {
        console.error(error);
      } finally {
        await this.navController.setRoot(LOGIN_PAGE, {
          hasLoggedOut: true,
        });
      }
    }
  }
}
