import { IonicPage, Navbar, Platform, NavController } from 'ionic-angular';
import { Component, ViewChild, OnInit } from '@angular/core';
import { PracticeableBasePageComponent } from '../../../shared/classes/practiceable-base-page';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Observable } from 'rxjs/Observable';
import { StoreModel } from '../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { DeviceAuthenticationProvider } from '../../../providers/device-authentication/device-authentication';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getCandidate } from '../../../modules/tests/candidate/candidate.reducer';
import {
  getCandidateName,
  getUntitledCandidateName,
  getCandidateDriverNumber,
  formatDriverNumber,
  getCandidateEmailAddress,
  getPostalAddress,
} from '../../../modules/tests/candidate/candidate.selector';
import {
  CommunicationViewDidEnter, CommunicationValidationError, CommunicationSubmitInfo, CommunicationSubmitInfoError,
} from '../communication.actions';
import { map, take, tap } from 'rxjs/operators';
import {
  getCommunicationPreference,
} from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import {
  getCommunicationPreferenceUpdatedEmail, getCommunicationPreferenceType, getConductedLanguage,
} from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { merge } from 'rxjs/observable/merge';
import { CommunicationMethod, Address, ConductedLanguage } from '@dvsa/mes-test-schema/categories/B';
import { Subscription } from 'rxjs/Subscription';
import {
  CandidateChoseEmailAsCommunicationPreference,
  CandidateChosePostAsCommunicationPreference,
} from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { TranslateService } from 'ng2-translate';
import { CAT_BE } from '../../page-names.constants';
import { Language } from '../../../modules/tests/communication-preferences/communication-preferences.model';

interface CommunicationPageState {
  candidateName$: Observable<string>;
  candidateUntitledName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  candidateProvidedEmail$: Observable<string>;
  communicationEmail$: Observable<string>;
  communicationType$: Observable<string>;
  candidateAddress$: Observable<Address>;

  conductedLanguage$: Observable<string>;
}
@IonicPage()
@Component({
  selector: 'communication-cat-be-page',
  templateUrl: 'communication.cat-be.page.html',
})
export class CommunicationCatBEPage extends PracticeableBasePageComponent implements OnInit {

  static readonly providedEmail: string = 'Provided';
  static readonly updatedEmail: string = 'Updated';
  static readonly email: CommunicationMethod = 'Email';
  static readonly post: CommunicationMethod = 'Post';
  static readonly notProvided: CommunicationMethod = 'Not provided';
  static readonly welshLanguage: ConductedLanguage = 'Cymraeg';
  static readonly englishLanguage: ConductedLanguage = 'English';

  @ViewChild(Navbar)
  navBar: Navbar;

  form: FormGroup;
  subscription: Subscription;
  emailType: string;
  pageState: CommunicationPageState;
  candidateProvidedEmail: string;
  communicationEmail: string;
  communicationType: CommunicationMethod;
  selectProvidedEmail: boolean;
  selectNewEmail: boolean;
  merged$: Observable<string | boolean>;

  constructor(
    store$: Store<StoreModel>,
    public navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private deviceAuthenticationProvider: DeviceAuthenticationProvider,
    private translate: TranslateService,
  ) {
    super(platform, navController, authenticationProvider, store$);
    this.form = new FormGroup(this.getFormValidation());
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new CommunicationViewDidEnter());

    this.navBar.backButtonClick = (e: UIEvent) => {
      this.clickBack();
    };
  }

  clickBack(): void {
    this.navController.pop();
  }

  ngOnInit(): void {
    super.ngOnInit();
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.pageState = {
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
      candidateProvidedEmail$: currentTest$.pipe(
        select(getJournalData),
        select(getCandidate),
        select(getCandidateEmailAddress),
        take(1),
      ),
      communicationEmail$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getCommunicationPreference),
        select(getCommunicationPreferenceUpdatedEmail),
      ),
      communicationType$: currentTest$.pipe(
        select(getCommunicationPreference),
        select(getCommunicationPreferenceType),
      ),
      candidateAddress$: currentTest$.pipe(
        select(getJournalData),
        select(getCandidate),
        select(getPostalAddress),
      ),
      conductedLanguage$: currentTest$.pipe(
        select(getCommunicationPreference),
        select(getConductedLanguage),
      ),
    };

    const {
      candidateProvidedEmail$,
      communicationEmail$,
      communicationType$,
      conductedLanguage$,
    } = this.pageState;

    this.merged$ = merge(
      candidateProvidedEmail$.pipe(map(value => this.candidateProvidedEmail = value)),
      communicationEmail$.pipe(map(value => this.communicationEmail = value)),
      communicationType$.pipe(map(value => this.communicationType = value as CommunicationMethod)),
      conductedLanguage$.pipe(tap(this.configureI18N)),
    );

    this.subscription = this.merged$.subscribe();

    if (this.shouldPreselectADefaultValue()) {
      this.initialiseDefaultSelections();
    }

    this.restoreRadiosFromState();
    this.restoreRadioValidators();
  }

  ionViewWillEnter(): boolean {
    if (this.subscription.closed && this.merged$) {
      this.subscription = this.merged$.subscribe();
    }

    return true;
  }

  ionViewDidLeave(): void {
    super.ionViewDidLeave();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  configureI18N = (language: Language): void => {
    if (language === Language.CYMRAEG) {
      this.translate.use('cy');
    } else {
      this.translate.use('en');
    }
  }

  onSubmit() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      this.deviceAuthenticationProvider.triggerLockScreen()
        .then(() => {
          this.store$.dispatch(new CommunicationSubmitInfo());
          this.navController.push(CAT_BE.WAITING_ROOM_TO_CAR_PAGE)
            .then(() => {
              const waitingRoomPage = this.navController.getViews().find(view => view.id === CAT_BE.WAITING_ROOM_PAGE);
              if (waitingRoomPage) {
                this.navController.removeView(waitingRoomPage);
              }
              const communicationPage =
                this.navController.getViews().find(view => view.id === CAT_BE.COMMUNICATION_PAGE);
              if (communicationPage) {
                this.navController.removeView(communicationPage);
              }
            });
        })
        .catch((err) => {
          this.store$.dispatch(new CommunicationSubmitInfoError(err));
        });
    } else {
      Object.keys(this.form.controls).forEach((controlName) => {
        if (this.form.controls[controlName].invalid) {
          this.store$.dispatch(new CommunicationValidationError(`${controlName} is blank`));
        }
      });
    }
  }

  dispatchCandidateChoseProvidedEmail() {
    this.setCommunicationType(CommunicationCatBEPage.email, CommunicationCatBEPage.providedEmail);
    this.store$.dispatch(
      new CandidateChoseEmailAsCommunicationPreference(
        this.candidateProvidedEmail, CommunicationCatBEPage.email),
    );
  }

  dispatchCandidateChoseNewEmail(communicationEmail: string): void {
    this.store$.dispatch(
      new CandidateChoseEmailAsCommunicationPreference(
        communicationEmail, CommunicationCatBEPage.email),
    );
  }

  setCommunicationType(communicationChoice: CommunicationMethod, emailType: string = null) {
    this.communicationType = communicationChoice;
    this.emailType = emailType;
    this.verifyNewEmailFormControl(communicationChoice);
  }

  isProvidedEmailSelected() {
    return (this.communicationType === CommunicationCatBEPage.email
     && this.emailType === CommunicationCatBEPage.providedEmail);
  }

  isNewEmailSelected() {
    return (this.communicationType === CommunicationCatBEPage.email
      && this.emailType === CommunicationCatBEPage.updatedEmail);
  }

  isPostSelected() {
    return this.communicationType === CommunicationCatBEPage.post;
  }

  dispatchCandidateChosePost(): void {
    this.setCommunicationType(CommunicationCatBEPage.post);
    this.store$.dispatch(
      new CandidateChosePostAsCommunicationPreference(CommunicationCatBEPage.post),
    );
  }

  getFormValidation(): { [key: string]: FormControl } {
    return {
      radioCtrl: new FormControl('', Validators.required),
    };
  }

  /**
   * Facade function which dictates which radio value to reselect when rehydrating from state.
   *
   * No current schema properties allow for the capture of radio selection for emails on the communication page.
   */
  restoreRadiosFromState() {
    if (this.communicationType === CommunicationCatBEPage.email) {
      this.assertEmailType();
    }
  }

  /**
   * Called by restoreRadiosFromState() when communicationType is 'Email'.
   *
   * If candidate provided an email at time of booking and this email is the same as the 'updatedEmail' in the
   * 'CommunicationPreferences' object stored in state then we select the relevant properties, to ensure that the
   * appropriate radio button is rehydrated.
   *
   * If the candidate did not provided an email at the time of booking and the 'CommunicationPreferences' object
   * contains one in state, we select the relevant properties, to ensure that the appropriate radio button is
   * rehydrated.
   */
  assertEmailType() {
    if (this.candidateProvidedEmail !== '' && this.candidateProvidedEmail === this.communicationEmail) {
      this.selectProvidedEmail = true;
      this.selectNewEmail = false;
      this.emailType = CommunicationCatBEPage.providedEmail;
    }

    if (this.candidateProvidedEmail !== this.communicationEmail) {
      this.selectNewEmail = true;
      this.selectProvidedEmail = false;
      this.emailType = CommunicationCatBEPage.updatedEmail;
    }
  }

  restoreRadioValidators() {
    this.form.controls['radioCtrl'].setValue(true);
  }

  /**
   * Initialise a default radio selection on the communication page
   *
   * If 'communicationEmail' it implies the candidate is entering the form for the first time and
   * setting default values will not impact rehydration.
   *
   * If there is a candidate email provided at the time of booking, this will be chosen as
   * the default selection. If there is not then the new email radio selection will be chosen
   * as the default selection.
   *
   */
  initialiseDefaultSelections() {
    this.communicationType = CommunicationCatBEPage.email;
    if (this.candidateProvidedEmail) {
      this.emailType = CommunicationCatBEPage.providedEmail;
      this.selectProvidedEmail = true;
      this.form.controls['radioCtrl'].setValue(true);
      this.dispatchCandidateChoseProvidedEmail();
    }

    if (!this.candidateProvidedEmail) {
      this.emailType = CommunicationCatBEPage.updatedEmail;
      this.selectNewEmail = true;
      this.selectProvidedEmail = false;
      this.form.controls['radioCtrl'].setValue(true);
    }
  }

  verifyNewEmailFormControl(communicationChoice: string) {
    const newEmailCtrl = this.form.get('newEmailCtrl');
    if (newEmailCtrl !== null) {
      if (communicationChoice !== CommunicationCatBEPage.email
        || this.emailType === CommunicationCatBEPage.providedEmail) {
        newEmailCtrl.clearValidators();
      } else {
        newEmailCtrl.setValidators(Validators.email);
      }
      newEmailCtrl.updateValueAndValidity();
    }
  }

  shouldPreselectADefaultValue(): boolean {
    return this.communicationType === CommunicationCatBEPage.notProvided;
  }

  /**
   * Function to conditionally dispatch 'dispatchCandidateChoseNewEmail' action
   * to cover edge case candidate action.
   *
   * Candidate selects new email -> app crashes -> candidate selects Post ->
   * app crashes -> candidate selects new email (previous state value exists so examiner clicks continue)
   *
   * As state change for new email happens on text input, the expected action
   * (CandidateChoseEmailAsCommunicationPreference) would not be dispatched.
   */
  conditionalDispatchCandidateChoseNewEmail() {
    this.setCommunicationType(CommunicationCatBEPage.email, CommunicationCatBEPage.updatedEmail);

    if (this.isNewEmailSelected() && this.communicationEmail !== '') {
      this.dispatchCandidateChoseNewEmail(this.communicationEmail);
    }
  }

  getNewEmailAddressValue() {
    return this.candidateProvidedEmail === this.communicationEmail ? '' : this.communicationEmail;
  }
}
