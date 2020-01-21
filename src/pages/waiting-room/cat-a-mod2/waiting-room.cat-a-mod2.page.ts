import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, Platform, Navbar, ModalController } from 'ionic-angular';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import * as waitingRoomActions from '../waiting-room.actions';
import { Observable } from 'rxjs/Observable';
import {
   getPreTestDeclarations,
} from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.reducer';
import * as preTestDeclarationsActions
  from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.actions';
import {
  getInsuranceDeclarationStatus,
  getResidencyDeclarationStatus,
  getSignatureStatus,
} from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.selector';

import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import {
  getCandidateName, getCandidateDriverNumber, formatDriverNumber, getUntitledCandidateName,
} from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { map, tap } from 'rxjs/operators';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { DeviceAuthenticationProvider } from '../../../providers/device-authentication/device-authentication';
import { getTests } from '../../../modules/tests/tests.reducer';
import { TranslateService } from 'ng2-translate';
import { merge } from 'rxjs/observable/merge';
import { Subscription } from 'rxjs/Subscription';
import {
  getTestSlotAttributes,
} from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.reducer';
import { isWelshTest }
  from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.selector';
import {
  getCommunicationPreference,
} from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import {
  getConductedLanguage,
} from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { CAT_A_MOD2, ERROR_PAGE, LOGIN_PAGE } from '../../page-names.constants';
import {
  CandidateChoseToProceedWithTestInWelsh,
  CandidateChoseToProceedWithTestInEnglish,
} from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { Language } from '../../../modules/tests/communication-preferences/communication-preferences.model';
import { Insomnia } from '@ionic-native/insomnia';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { DeviceProvider } from '../../../providers/device/device';
import { configureI18N } from '../../../shared/helpers/translation.helpers';
import { BasePageComponent } from '../../../shared/classes/base-page';

// TODO - PREP-AMOD2 - Implement category specific schema
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { isEmpty } from 'lodash';
import { ErrorTypes } from '../../../shared/models/error-message';
import { App } from '../../../app/app.component';

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
  selector: '.waiting-room-cat-a-mod2-page',
  templateUrl: 'waiting-room.cat-a-mod2.page.html',
})
export class WaitingRoomCatAMod2Page extends BasePageComponent implements OnInit {

  @ViewChild(Navbar) navBar: Navbar;

  pageState: WaitingRoomPageState;

  formGroup: FormGroup;

  subscription: Subscription;

  // TODO - PREP-AMOD2 - Implement category specific schema
  merged$: Observable<boolean | string | CatBEUniqueTypes.JournalData>;

  constructor(
    public store$: Store<StoreModel>,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private deviceAuthenticationProvider: DeviceAuthenticationProvider,
    private deviceProvider: DeviceProvider,
    private screenOrientation: ScreenOrientation,
    private insomnia: Insomnia,
    private translate: TranslateService,
    private modalController: ModalController,
    private app: App,
  ) {
    super(platform, navController, authenticationProvider);
    this.formGroup = new FormGroup({});
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new waitingRoomActions.WaitingRoomViewDidEnter());

    if (super.isIos()) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
      this.insomnia.keepAwake();
      this.deviceProvider.enableSingleAppMode();
    }

    this.navBar.backButtonClick = (e: UIEvent) => {
      this.clickBack();
    };
  }

  clickBack(): void {
    this.deviceAuthenticationProvider.triggerLockScreen()
      .then(() => {
        this.navController.pop();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnInit(): void {
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
    const { welshTest$, conductedLanguage$ } = this.pageState;
    this.merged$ = merge(
      currentTest$.pipe(
        select(getJournalData),
        // TODO - PREP-AMOD2 - Impement category specific schema
        tap((journalData: CatBEUniqueTypes.JournalData) => {
          if (this.isJournalDataInvalid(journalData)) {
            this.showCandidateDataMissingError();
          }
        }),
      ),
      welshTest$,
      conductedLanguage$.pipe(tap(value => configureI18N(value as Language, this.translate))),
    );
  }

  ionViewWillEnter(): boolean {
    if (this.merged$) {
      this.subscription = this.merged$.subscribe();
    }

    return true;
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // TODO - PREP-AMOD2 - Implement category specific schema
  isJournalDataInvalid = (journalData: CatBEUniqueTypes.JournalData): boolean => {
    return isEmpty(journalData.examiner.staffNumber) ||
      (isEmpty(journalData.candidate.candidateName) && isEmpty(journalData.candidate.driverNumber));
  }

  getSignatureDrawCompleteAction() : string {
    return preTestDeclarationsActions.SIGNATURE_DATA_CHANGED;
  }

  getSignatureClearAction(): string {
    return preTestDeclarationsActions.SIGNATURE_DATA_CLEARED;
  }

  insuranceDeclarationChanged(): void {
    this.store$.dispatch(new preTestDeclarationsActions.ToggleInsuranceDeclaration());
  }

  residencyDeclarationChanged(): void {
    this.store$.dispatch(new preTestDeclarationsActions.ToggleResidencyDeclaration());
  }

  dispatchCandidateChoseToProceedInWelsh() {
    this.store$.dispatch(new CandidateChoseToProceedWithTestInWelsh(Language.CYMRAEG));
  }

  dispatchCandidateChoseToProceedInEnglish() {
    this.store$.dispatch(new CandidateChoseToProceedWithTestInEnglish(Language.ENGLISH));
  }

  onSubmit() {
    Object.keys(this.formGroup.controls).forEach(controlName => this.formGroup.controls[controlName].markAsDirty());
    if (this.formGroup.valid) {
      this.navController.push(CAT_A_MOD2.COMMUNICATION_PAGE);
    } else {
      Object.keys(this.formGroup.controls).forEach((controlName) => {
        if (this.formGroup.controls[controlName].invalid) {
          this.store$.dispatch(new waitingRoomActions.WaitingRoomValidationError(`${controlName} is blank`));
        }
      });
    }
  }

  showCandidateDataMissingError() {
    // Modals are at the same level as the ion-nav so are not getting the zoom level class,
    // this needs to be passed in the create options.
    const zoomClass = `modal-fullscreen ${this.app.getTextZoomClass()}`;

    const errorModal = this.modalController.create(
      ERROR_PAGE,
      { type: ErrorTypes.JOURNAL_DATA_MISSING },
      { cssClass: zoomClass });
    errorModal.present();
    errorModal.onDidDismiss(() => this.navController.setRoot(LOGIN_PAGE));
  }
}
