import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import * as waitingRoomActions from './waiting-room.actions';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { SignatureAreaComponent } from './../../components/signature-area/signature-area';
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
  signaturePad: SignatureAreaComponent;
  pageState: WaitingRoomPageState;

  constructor(
    private store$: Store<StoreModel>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
  ) {
    super(platform, navCtrl, authenticationProvider);
  }
  ionViewDidEnter(): void {
    this.store$.dispatch(new waitingRoomActions.WaitingRoomViewDidEnter());
  }

  ngOnInit(): void {
    this.signaturePad.retryImage = '/assets/imgs/waiting-room/retry.png';
    this.signaturePad.signHereImage = '/assets/imgs/waiting-room/sign-here.png';
    this.signaturePad.signHereText = 'Sign here';
    this.signaturePad.retryButtonText = 'Retry';
    this.signaturePad.notValidHeaderText = 'Enter a signature';
    this.signaturePad.required = true;
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

  signatureDataChanged($event: any) {
    this.store$.dispatch(new preTestDeclarationsActions.SignatureDataChanged($event));
  }

  signatureDataCleared($event: any) {
    this.store$.dispatch(new preTestDeclarationsActions.SignatureDataCleared());
  }

}
