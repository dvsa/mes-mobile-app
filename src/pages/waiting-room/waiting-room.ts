import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicPage, NavController, NavParams, Platform, Navbar } from 'ionic-angular';
import { PracticeableBasePageComponent } from '../../shared/classes/practiceable-base-page';
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
import { getCurrentTest, getJournalData } from '../../modules/tests/tests.selector';
import { DeviceAuthenticationProvider } from '../../providers/device-authentication/device-authentication';
import { getTests } from '../../modules/tests/tests.reducer';
import { TranslateService } from 'ng2-translate';
import { merge } from 'rxjs/observable/merge';
import { Subscription } from 'rxjs/Subscription';
import { getTestSlotAttributes } from '../../modules/tests/test-slot-attributes/test-slot-attributes.reducer';
import { isWelshTest } from '../../modules/tests/test-slot-attributes/test-slot-attributes.selector';
import {
  getCommunicationPreference,
} from '../../modules/tests/communication-preferences/communication-preferences.reducer';
import { getConductedLanguage } from '../../modules/tests/communication-preferences/communication-preferences.selector';
import { COMMUNICATION_PAGE, WAITING_ROOM_PAGE, WAITING_ROOM_TO_CAR_PAGE } from '../page-names.constants';

interface WaitingRoomPageState {
  insuranceDeclarationAccepted$: Observable<boolean>;
  residencyDeclarationAccepted$: Observable<boolean>;
  signature$: Observable<string>;
  candidateName$: Observable<string>;
  candidateUntitledName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  welshTest$: Observable<boolean>;
  conductedLanguage$: Observable<string>;
}

@IonicPage()
@Component({
  selector: 'page-waiting-room',
  templateUrl: 'waiting-room.html',
})
export class WaitingRoomPage extends PracticeableBasePageComponent implements OnInit, OnDestroy {

  static readonly welshLanguage: string = 'Cymraeg';

  @ViewChild(SignatureAreaComponent)
  signatureArea: SignatureAreaComponent;

  @ViewChild(Navbar) navBar: Navbar;

  pageState: WaitingRoomPageState;

  form: FormGroup;

  subscription: Subscription;

  isBookedInWelsh: boolean;

  conductedLanguage: string;

  constructor(
    store$: Store<StoreModel>,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private deviceAuthenticationProvider: DeviceAuthenticationProvider,
    private translate: TranslateService,
  ) {
    super(platform, navController, authenticationProvider, store$);
    this.form = new FormGroup(this.getFormValidation());
  }
  ionViewDidEnter(): void {
    this.store$.dispatch(new waitingRoomActions.WaitingRoomViewDidEnter());

    this.navBar.backButtonClick = (e: UIEvent) => {
      this.clickBack();
    };
  }

  clickBack(): void {
    this.navController.pop();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.signatureArea.drawCompleteAction = preTestDeclarationsActions.SIGNATURE_DATA_CHANGED;
    this.signatureArea.clearAction = preTestDeclarationsActions.SIGNATURE_DATA_CLEARED;

    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.pageState = {
      insuranceDeclarationAccepted$: currentTest$.pipe(
        select(getPreTestDeclarations),
        select(getInsuranceDeclarationStatus),
      ),
      residencyDeclarationAccepted$: currentTest$.pipe(
        select(getPreTestDeclarations),
        select(getResidencyDeclarationStatus),
      ),
      signature$: currentTest$.pipe(
        select(getPreTestDeclarations),
        select(getSignatureStatus),
      ),
      candidateName$: currentTest$.pipe(
        select(getJournalData),
        select(getCandidate),
        select(getCandidateName),
      ),
      candidateUntitledName$: currentTest$.pipe(
        select(getJournalData),
        select(getCandidate),
        select(getUntitledCandidateName),
      ),
      candidateDriverNumber$: currentTest$.pipe(
        select(getJournalData),
        select(getCandidate),
        select(getCandidateDriverNumber),
        map(formatDriverNumber),
      ),
      welshTest$: currentTest$.pipe(
        select(getJournalData),
        select(getTestSlotAttributes),
        select(isWelshTest),
      ),
      conductedLanguage$: currentTest$.pipe(
        select(getCommunicationPreference),
        select(getConductedLanguage),
      ),
    };
    this.rehydrateFields();

    const { welshTest$, conductedLanguage$ } = this.pageState;
    const merged$ = merge(
      welshTest$.pipe(map(isWelsh => this.isBookedInWelsh = isWelsh)),
      conductedLanguage$.pipe(map(language => this.conductedLanguage = language)),
      );

    this.configureI18N(this.conductedLanguage === WaitingRoomPage.welshLanguage);
    this.subscription = merged$.subscribe();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscription.unsubscribe();
  }

  rehydrateFields(): void {
    this.pageState.insuranceDeclarationAccepted$
      .subscribe((val) => {
        this.form.controls['insuranceCheckboxCtrl'].setValue(val);
      });
    this.pageState.residencyDeclarationAccepted$
      .subscribe((val) => {
        this.form.controls['residencyCheckboxCtrl'].setValue(val);
      });
    this.pageState.signature$
      .subscribe((val) => {
        this.form.controls['signatureAreaCtrl'].setValue(val);
      });
  }

  configureI18N(isWelsh: boolean): void {
    if (this.isBookedInWelsh && isWelsh) {
      this.translate.use('cy');
    }
  }

  insuranceDeclarationChanged(): void {
    this.store$.dispatch(new preTestDeclarationsActions.ToggleInsuranceDeclaration());
  }

  residencyDeclarationChanged(): void {
    this.store$.dispatch(new preTestDeclarationsActions.ToggleResidencyDeclaration());
  }

  onSubmit() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      this.deviceAuthenticationProvider.triggerLockScreen()
        .then(() => {
          this.store$.dispatch(new waitingRoomActions.SubmitWaitingRoomInfo());
          this.navController.push(WAITING_ROOM_TO_CAR_PAGE).then(() => {
            const communicationPage = this.navController.getViews().find(view => view.name === COMMUNICATION_PAGE);
            if (communicationPage) {
              this.navController.removeView(communicationPage);
            }
            this.navController.removeView(
              this.navController.getViews().find(view => view.name === WAITING_ROOM_PAGE),
            );
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  getFormValidation(): { [key: string]: FormControl } {
    return {
      insuranceCheckboxCtrl: new FormControl('', [Validators.requiredTrue]),
      residencyCheckboxCtrl: new FormControl('', [Validators.requiredTrue]),
      signatureAreaCtrl: new FormControl(null, [Validators.required]),
    };
  }
  isCtrlDirtyAndInvalid(controlName: string): boolean {
    return !this.form.value[controlName] && this.form.get(controlName).dirty;
  }
}
