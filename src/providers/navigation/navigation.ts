import { Injectable } from '@angular/core';
import { App, NavController } from 'ionic-angular';

/**
 * Ionic will not allow the navigation controller to be injected at the root
 * level, so this alternative approach gets the nav from the app.
 *
 * This provider allows the navigation controller to be mocked during testing.
 */

@Injectable()
export class NavigationProvider {

  constructor(private app: App) {}

  public getNav = (): NavController => this.app.getRootNavs()[0];

  public getActive = () => this.getNav().getActive();

}
