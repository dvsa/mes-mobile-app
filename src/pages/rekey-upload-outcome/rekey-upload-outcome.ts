import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { RekeyUploadOutcomeViewDidEnter } from './rekey-upload-outcome.actions';
import { DeviceProvider } from '../../providers/device/device';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { Observable, Subscription } from 'rxjs';
import { getRekeyReasonState } from './../rekey-reason/rekey-reason.reducer';
import { map } from 'rxjs/operators';
import { getUploadStatus } from './../rekey-reason/rekey-reason.selector';
import { EndRekey } from '../../modules/tests/rekey/rekey.actions';
import { REKEY_SEARCH_PAGE, JOURNAL_PAGE } from '../page-names.constants';

interface RekeyUploadOutcomePageState {
  duplicateUpload$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: 'page-rekey-upload-outcome',
  templateUrl: 'rekey-upload-outcome.html',
})
export class RekeyUploadOutcomePage extends BasePageComponent {

  pageState: RekeyUploadOutcomePageState;
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
      duplicateUpload$: this.store$.pipe(
        select(getRekeyReasonState),
        select(getUploadStatus),
        map(uploadStatus => uploadStatus.isDuplicate),
      ),
    };
  }

  ionViewDidEnter(): void {
    if (super.isIos()) {
      this.screenOrientation.unlock();
      this.insomnia.allowSleepAgain();
      this.deviceProvider.disableSingleAppMode();
    }

    this.store$.dispatch(new RekeyUploadOutcomeViewDidEnter());
  }

  goToJournal() {
    const rekeySearchPage = this.navController.getViews().find(view => view.id === REKEY_SEARCH_PAGE);
    const journalPage = this.navController.getViews().find(view => view.id === JOURNAL_PAGE);
    if (rekeySearchPage) {
      this.navController.popTo(rekeySearchPage);
    } else {
      this.navController.popTo(journalPage);
    }
    this.store$.dispatch(new EndRekey());
  }
}
