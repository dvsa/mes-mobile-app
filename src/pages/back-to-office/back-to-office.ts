import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { BackToOfficeViewDidEnter } from './back-to-office.actions';
import { TestStatusDecided } from '../../modules/tests/test-status/test-status.actions';
import { DeviceProvider } from '../../providers/device/device';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { PersistTests } from '../../modules/tests/tests.actions';

@IonicPage()
@Component({
  selector: 'page-back-to-office',
  templateUrl: 'back-to-office.html',
})
export class BackToOfficePage extends BasePageComponent {

  constructor(
    private store$: Store<StoreModel>,
    private deviceProvider: DeviceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public screenOrientation: ScreenOrientation,
    public insomnia: Insomnia,
  ) {
    super(platform, navCtrl, authenticationProvider);
  }

  ionViewDidEnter(): void {
    if (super.isIos()) {
      this.deviceProvider.disableSingleAppMode();
      this.screenOrientation.unlock();
      this.insomnia.allowSleepAgain();
    }
    this.store$.dispatch(new TestStatusDecided());
    this.store$.dispatch(new PersistTests());
    this.store$.dispatch(new BackToOfficeViewDidEnter());
  }

  popToRoot() {
    this.navCtrl.popToRoot();
  }
}
