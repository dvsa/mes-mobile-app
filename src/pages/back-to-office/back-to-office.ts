import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { PracticeableBasePageComponent } from '../../shared/classes/practiceable-base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { BackToOfficeViewDidEnter, DeferWriteUp } from './back-to-office.actions';
import { DeviceProvider } from '../../providers/device/device';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../modules/tests/tests.selector';
import { getRekeyIndicator } from '../../modules/tests/rekey/rekey.reducer';
import { isRekey } from '../../modules/tests/rekey/rekey.selector';
import { REKEY_REASON_PAGE } from '../page-names.constants';

@IonicPage()
@Component({
  selector: 'page-back-to-office',
  templateUrl: 'back-to-office.html',
})
export class BackToOfficePage extends PracticeableBasePageComponent {

  private isRekey: boolean;

  constructor(
    store$: Store<StoreModel>,
    private deviceProvider: DeviceProvider,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public screenOrientation: ScreenOrientation,
    public insomnia: Insomnia,
  ) {
    super(platform, navController, authenticationProvider, store$);
    this.setupIsRekey();
  }

  ionViewDidEnter(): void {
    if (super.isIos()) {
      this.screenOrientation.unlock();
      this.insomnia.allowSleepAgain();

      if (!this.isPracticeMode) {
        this.deviceProvider.disableSingleAppMode();
      }
    }

    this.store$.dispatch(new BackToOfficeViewDidEnter());
  }

  goToReasonForRekey() {
    this.navController.push(REKEY_REASON_PAGE);
  }

  goToJournal() {
    if (this.isPracticeMode) {
      this.exitPracticeMode();
      return;
    }
    this.store$.dispatch(new DeferWriteUp());
    this.navController.popToRoot();
  }

  setupIsRekey() {
    this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getRekeyIndicator),
      select(isRekey),
    ).subscribe((rekey) => {
      this.isRekey = rekey;
    });
  }

  getRekey() {
    return this.isRekey;
  }
}
