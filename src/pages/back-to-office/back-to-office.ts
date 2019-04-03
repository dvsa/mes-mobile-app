import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { BackToOfficeViewDidEnter } from './back-to-office.actions';

@IonicPage()
@Component({
  selector: 'page-back-to-office',
  templateUrl: 'back-to-office.html',
})
export class BackToOfficePage extends BasePageComponent {

  constructor(
    private store$: Store<StoreModel>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
  ) {
    super(platform, navCtrl, authenticationProvider);
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new BackToOfficeViewDidEnter());
  }

  popToRoot() {
    this.navCtrl.popToRoot();
  }
}
