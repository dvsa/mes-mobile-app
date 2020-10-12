import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import {
  Store,
  select,
} from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { DeviceProvider } from '../../providers/device/device';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { Observable } from 'rxjs';
import { DASHBOARD_PAGE, DELEGATED_REKEY_SEARCH_PAGE } from '../page-names.constants';
import { SendCurrentTest } from '../../modules/tests/tests.actions';
import { getDelegatedRekeySearchState } from '../delegated-rekey-search/delegated-rekey-search.reducer';
import { map } from 'rxjs/operators';
import { getIsLoading } from '../delegated-rekey-search/delegated-rekey-search.selector';
import { TestStatus } from '../../modules/tests/test-status/test-status.model';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTestStatus } from '../../modules/tests/tests.selector';

@IonicPage()
@Component({
  selector: 'page-delegated-rekey-upload-outcome',
  templateUrl: 'delegated-rekey-upload-outcome.html',
})
export class DelegatedRekeyUploadOutcomePage extends BasePageComponent {

  bookedTestSlotId: any;
  pageState: {
    testStatus$: Observable<TestStatus>
    isUploading$: Observable<boolean>,
  };

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
      testStatus$: this.store$.pipe(
        select(getTests),
        map(tests => getCurrentTestStatus(tests)),
      ),
      isUploading$: this.store$.pipe(
        select(getDelegatedRekeySearchState),
        map(getIsLoading),
      ),
    };
  }

  ionViewDidEnter(): void {
    if (super.isIos()) {
      this.screenOrientation.unlock();
      this.insomnia.allowSleepAgain();
      this.deviceProvider.disableSingleAppMode();
    }
  }

  retryUpload() {
    this.store$.dispatch(new SendCurrentTest());
  }

  isStatusSubmitted(status): boolean {
    return status === TestStatus.Submitted;
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
