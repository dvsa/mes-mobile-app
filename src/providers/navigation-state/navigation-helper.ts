import { Injectable } from '@angular/core';
import { App, NavController } from 'ionic-angular';

@Injectable()
export class NavigationHelper {

  constructor(private app: App) {}

  public getNav = (): NavController => this.app.getRootNavs()[0];

  public getActive = () => this.getNav().getActive();

}
