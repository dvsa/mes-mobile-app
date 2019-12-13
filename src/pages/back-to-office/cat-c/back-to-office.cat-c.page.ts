import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { PracticeableBasePageComponent } from '../../../shared/classes/practiceable-base-page';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { BackToOfficeViewDidEnter, DeferWriteUp } from '../back-to-office.actions';
import { DeviceProvider } from '../../../providers/device/device';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { JOURNAL_PAGE } from '../../page-names.constants';
import { Observable } from 'rxjs/Observable';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../modules/tests/tests.selector';
import { getRekeyIndicator } from '../../../modules/tests/rekey/rekey.reducer';
import { isRekey } from '../../../modules/tests/rekey/rekey.selector';
// TODO: MES-4287 Import Cat C page names
import { CAT_BE } from '../../../pages/page-names.constants';

interface BackToOfficePageState {
  isRekey$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: '.back-to-office-cat-c-page',
  templateUrl: 'back-to-office.cat-c.page.html',
})
export class BackToOfficeCatCPage extends PracticeableBasePageComponent {
  pageState: BackToOfficePageState;

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
  }

  ngOnInit(): void {
    super.ngOnInit();

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

      if (!this.isPracticeMode) {
        this.deviceProvider.disableSingleAppMode();
      }
    }

    this.store$.dispatch(new BackToOfficeViewDidEnter());
  }

  goToJournal() {
    if (this.isPracticeMode) {
      this.exitPracticeMode();
      return;
    }
    this.store$.dispatch(new DeferWriteUp());
    const journalPage = this.navController.getViews().find(view => view.id === JOURNAL_PAGE);
    this.navController.popTo(journalPage);
  }

  goToOfficePage() {
     // TODO: MES-4287 Redirect to CAT_C office page
    this.navController.push(CAT_BE.OFFICE_PAGE);
  }
}
