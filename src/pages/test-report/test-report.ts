import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { BasePageComponent } from '../../shared/classes/base-page';

import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { DeviceProvider } from '../../providers/device/device';

import { StoreModel } from '../../shared/models/store.model';
import { getUntitledCandidateName } from '../../modules/tests/candidate/candidate.selector';
import { getCurrentCandidate } from '../../modules/tests/candidate/candidate.reducer';
import { TestReportViewDidEnter } from './test-report.actions';
import { getCurrentTest } from '../../modules/tests/tests.selector';

interface TestReportPageState {
  candidateUntitledName$: Observable<string>;
}

@IonicPage()
@Component({
  selector: 'page-test-report',
  templateUrl: 'test-report.html',
})
export class TestReportPage extends BasePageComponent {

  pageState: TestReportPageState;

  constructor(
    private store$: Store<StoreModel>,
    private deviceProvider: DeviceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public screenOrientation : ScreenOrientation,
    public insomnia: Insomnia,
  ) {
    super(platform, navCtrl, authenticationProvider);
  }

  ngOnInit(): void {
    this.pageState = {
      candidateUntitledName$: this.store$.pipe(
        select(getCurrentTest),
        select(getCurrentCandidate),
        select(getUntitledCandidateName),
      ),
    };
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new TestReportViewDidEnter());
    if (super.isIos()) {
      this.deviceProvider.enableSingleAppMode();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
      this.insomnia.keepAwake();
    }
  }

  ionViewDidLeave(): void {
    if (super.isIos()) {
      this.deviceProvider.disableSingleAppMode();
      this.screenOrientation.unlock();
      this.insomnia.allowSleepAgain();
    }
  }
}
