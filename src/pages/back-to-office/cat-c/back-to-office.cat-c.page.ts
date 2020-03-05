import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { BackToOfficeViewDidEnter, DeferWriteUp } from '../back-to-office.actions';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { JOURNAL_PAGE } from '../../page-names.constants';
import { Observable } from 'rxjs';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../modules/tests/tests.selector';
import { getRekeyIndicator } from '../../../modules/tests/rekey/rekey.reducer';
import { isRekey } from '../../../modules/tests/rekey/rekey.selector';
import { CAT_C } from '../../../pages/page-names.constants';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { DeviceProvider } from '../../../providers/device/device';

interface BackToOfficePageState {
  isRekey$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: '.back-to-office-cat-c-page',
  templateUrl: 'back-to-office.cat-c.page.html',
})
export class BackToOfficeCatCPage extends BasePageComponent {
  pageState: BackToOfficePageState;

  constructor(
    private store$: Store<StoreModel>,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public screenOrientation: ScreenOrientation,
    public insomnia: Insomnia,
    public deviceProvider: DeviceProvider,
  ) {
    super(platform, navController, authenticationProvider);
  }

  ngOnInit(): void {

    this.pageState = {
      isRekey$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getRekeyIndicator),
        select(isRekey),
      ),
    };
  }

  ionViewDidEnter(): void {
    if (super.isIos()) {
      this.screenOrientation.unlock();
      this.insomnia.allowSleepAgain();
      this.deviceProvider.disableSingleAppMode();
    }

    this.store$.dispatch(new BackToOfficeViewDidEnter());
  }

  goToJournal() {
    this.store$.dispatch(new DeferWriteUp());
    const journalPage = this.navController.getViews().find(view => view.id === JOURNAL_PAGE);
    this.navController.popTo(journalPage);
  }

  goToOfficePage() {
    this.navController.push(CAT_C.OFFICE_PAGE);
  }
}
