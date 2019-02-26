import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { TerminateTestViewDidEnter } from './terminate-test.actions';

@IonicPage()
@Component({
  selector: 'page-terminate-test',
  templateUrl: 'terminate-test.html',
})
export class TerminateTestPage extends BasePageComponent {

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
    this.store$.dispatch(new TerminateTestViewDidEnter());
  }

  popToRoot() {
    this.navCtrl.popToRoot();
  }
}
