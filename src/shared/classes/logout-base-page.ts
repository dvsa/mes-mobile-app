import { AlertController, NavController, Platform } from 'ionic-angular';
import { AuthenticationProvider } from 'src/providers/authentication/authentication';
import { BasePageComponent } from './base-page';

export abstract class LogoutBasePageComponent extends BasePageComponent {

  constructor(
    public platform: Platform,
    public navController: NavController,
    public authenticationProvider: AuthenticationProvider,
    public alertController: AlertController,
    public loginRequired: boolean = true,
  ) {
    super(platform, navController, authenticationProvider, loginRequired);
  }

  openLogoutModal() {
    const alert = this.alertController.create({
      title: 'Are you sure you want to logout?',
      cssClass: 'logout-modal',
      buttons: [
        {
          text: 'Cancel',
          handler: () => { },
        },
        {
          text: 'Logout',
          handler: () => this.logout(),
        },
      ],
    });
    alert.present();
  }

}
