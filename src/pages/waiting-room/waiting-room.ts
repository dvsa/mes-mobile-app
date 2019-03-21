import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import * as waitingRoomActions from './waiting-room.actions';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { getPreTestDeclarationsState } from '../../modules/test/pre-test-declarations/pre-test-declarations.reducer';
import * as preTestDeclarationsActions from '../../modules/test/pre-test-declarations/pre-test-declarations.actions';
import {
  getInsuranceDeclarationStatus,
  getResidencyDeclarationStatus,
} from '../../modules/test/pre-test-declarations/pre-test-declarations.selector';
import { getCurrentCandidate } from '../../modules/test/candidate/candidate.reducer';
import {
  getCandidateName, getCandidateDriverNumber, formatDriverNumber, getUntitledCandidateName,
} from '../../modules/test/candidate/candidate.selector';
import { map } from 'rxjs/operators';
import { DeviceProvider } from '../../providers/device/device';

interface WaitingRoomPageState {
  insuranceDeclarationAccepted$: Observable<boolean>;
  residencyDeclarationAccepted$: Observable<boolean>;
  signature$: Observable<string>;
  candidateName$: Observable<string>;
  candidateUntitledName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
}

@IonicPage()
@Component({
  selector: 'page-waiting-room',
  templateUrl: 'waiting-room.html',
})
export class WaitingRoomPage extends BasePageComponent {

  pageState: WaitingRoomPageState;

  constructor(
    private store$: Store<StoreModel>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private deviceProvider: DeviceProvider,
  ) {
    super(platform, navCtrl, authenticationProvider);
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new waitingRoomActions.WaitingRoomViewDidEnter());
    if (super.isIos()) {
      this.deviceProvider.enableSingleAppMode();
    }
  }

  ionViewDidLeave(): void {
    if (super.isIos()) {
      this.deviceProvider.disableSingleAppMode();
    }
  }

  clickContinue = async (): Promise<boolean> => {

    const returnVal =  await this.deviceProvider.triggerLockScreen();
    console.log(returnVal);
    return returnVal;

    //   .then(() => {
    //     console.log('click continue resolved');
    //     this.navCtrl.push('WaitingRoomToCarPage');
    //     return resolve(true);
    //   })
    //   .catch(() => {
    //     console.log('catched ...');
    //     return reject(false);
    //   });
    // });
  }

  ngOnInit(): void {
    this.pageState = {
      insuranceDeclarationAccepted$: this.store$.pipe(
        select(getPreTestDeclarationsState),
        select(getInsuranceDeclarationStatus),
      ),
      residencyDeclarationAccepted$: this.store$.pipe(
        select(getPreTestDeclarationsState),
        select(getResidencyDeclarationStatus),
      ),
      signature$: of(''),
      candidateName$: this.store$.pipe(
        select(getCurrentCandidate),
        select(getCandidateName),
      ),
      candidateUntitledName$: this.store$.pipe(
        select(getCurrentCandidate),
        select(getUntitledCandidateName),
      ),
      candidateDriverNumber$: this.store$.pipe(
        select(getCurrentCandidate),
        select(getCandidateDriverNumber),
        map(formatDriverNumber),
      ),
    };
  }

  insuranceDeclarationChanged(): void {
    this.store$.dispatch(new preTestDeclarationsActions.ToggleInsuranceDeclaration());
  }

  residencyDeclarationChanged(): void {
    this.store$.dispatch(new preTestDeclarationsActions.ToggleResidencyDeclaration());
  }

}
