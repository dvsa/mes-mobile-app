import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import * as waitingRoomActions from './waiting-room.actions';
import { Observable } from 'rxjs/Observable';
import { SignatureAreaComponent } from './../../components/signature-area/signature-area';
import { getPreTestDeclarations } from '../../modules/tests/pre-test-declarations/pre-test-declarations.reducer';
import * as preTestDeclarationsActions from '../../modules/tests/pre-test-declarations/pre-test-declarations.actions';
import {
  getInsuranceDeclarationStatus,
  getResidencyDeclarationStatus,
  getSignatureStatus,
} from '../../modules/tests/pre-test-declarations/pre-test-declarations.selector';
import { getCandidate } from '../../modules/tests/candidate/candidate.reducer';
import {
  getCandidateName, getCandidateDriverNumber, formatDriverNumber, getUntitledCandidateName,
} from '../../modules/tests/candidate/candidate.selector';
import { map } from 'rxjs/operators';
import { DeviceProvider } from '../../providers/device/device';
import { getCurrentTest } from '../../modules/tests/tests.selector';

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
  @ViewChild(SignatureAreaComponent)
  signatureArea: SignatureAreaComponent;
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

  ngOnInit(): void {
    this.signatureArea.drawCompleteAction = preTestDeclarationsActions.SIGNATURE_DATA_CHANGED;
    this.signatureArea.clearAction = preTestDeclarationsActions.SIGNATURE_DATA_CLEARED;
    this.signatureArea.signHereText = 'Sign here';
    this.signatureArea.retryButtonText = 'Retry';
    this.signatureArea.notValidHeaderText = 'Enter a signature';

    this.pageState = {
      insuranceDeclarationAccepted$: this.store$.pipe(
        select(getCurrentTest),
        select(getPreTestDeclarations),
        select(getInsuranceDeclarationStatus),
      ),
      residencyDeclarationAccepted$: this.store$.pipe(
        select(getCurrentTest),
        select(getPreTestDeclarations),
        select(getResidencyDeclarationStatus),
      ),
      signature$: this.store$.pipe(
        select(getCurrentTest),
        select(getPreTestDeclarations),
        select(getSignatureStatus),
      ),
      candidateName$: this.store$.pipe(
        select(getCurrentTest),
        select(getCandidate),
        select(getCandidateName),
      ),
      candidateUntitledName$: this.store$.pipe(
        select(getCurrentTest),
        select(getCandidate),
        select(getUntitledCandidateName),
      ),
      candidateDriverNumber$: this.store$.pipe(
        select(getCurrentTest),
        select(getCandidate),
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
