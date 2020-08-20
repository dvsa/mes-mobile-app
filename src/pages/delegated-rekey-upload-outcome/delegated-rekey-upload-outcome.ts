import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import {
  Store,
  select,
} from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { DelegatedRekeyUploadOutcomeViewDidEnter } from './delegated-rekey-upload-outcome.actions';
import { DeviceProvider } from '../../providers/device/device';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { Observable, Subscription } from 'rxjs';
import { DASHBOARD_PAGE, DELEGATED_REKEY_SEARCH_PAGE } from '../page-names.constants';
import { getDelegatedRekeyUploadOutcomeState } from './delegated-rekey-upload-outcome.reducer';
import { getDelegatedUploadStatus } from './delegated-rekey-upload-outcome.selector';
import { SendCurrentTest } from '../../modules/tests/tests.actions';

// interface DelegatedRekeyUploadOutcomePageState {
//   uploadSuccessful$: Observable<boolean>;
// }

@IonicPage()
@Component({
  selector: 'page-delegated-rekey-upload-outcome',
  templateUrl: 'delegated-rekey-upload-outcome.html',
})
export class DelegatedRekeyUploadOutcomePage extends BasePageComponent {

  pageState: { uploadSuccessful$: Observable<boolean> };
  subscription: Subscription = Subscription.EMPTY;

  constructor(
    private store$: Store<StoreModel>,
    private deviceProvider: DeviceProvider,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public screenOrientation: ScreenOrientation,
    public insomnia: Insomnia,
  ) {
    super(platform, navController, authenticationProvider);
  }

  ngOnInit(): void {
    this.pageState = {
      uploadSuccessful$: this.store$.pipe(
        select(getDelegatedRekeyUploadOutcomeState),
        select(getDelegatedUploadStatus),
      ),
    };
  }

  ionViewDidEnter(): void {
    if (super.isIos()) {
      this.screenOrientation.unlock();
      this.insomnia.allowSleepAgain();
      this.deviceProvider.disableSingleAppMode();
    }

    this.store$.dispatch(new DelegatedRekeyUploadOutcomeViewDidEnter());
  }

  retryUpload() {
    this.store$.dispatch(new SendCurrentTest());
  }

  goToDashboard() {
    const dashboardPage =
      this.navController.getViews().find(view => view.id === DASHBOARD_PAGE);
    this.navController.popTo(dashboardPage);
  }

  goToDelegatedSearch() {
    const delegatedExaminerRekeySearchPage =
      this.navController.getViews().find(view => view.id === DELEGATED_REKEY_SEARCH_PAGE);
    this.navController.popTo(delegatedExaminerRekeySearchPage);
  }
}
