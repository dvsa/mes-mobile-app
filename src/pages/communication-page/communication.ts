import { IonicPage, Navbar, Platform, NavController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { PracticeableBasePageComponent } from '../../shared/classes/practiceable-base-page';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Observable } from 'rxjs/Observable';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { DeviceProvider } from '../../providers/device/device';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { DeviceAuthenticationProvider } from '../../providers/device-authentication/device-authentication';
import { getCurrentTest, getJournalData } from '../../modules/tests/tests.selector';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCandidate } from '../../modules/tests/candidate/candidate.reducer';
import {
  getCandidateName,
  getUntitledCandidateName,
  getCandidateDriverNumber,
  formatDriverNumber,
  getCandidateEmailAddress,
  getPostalAddress,
} from '../../modules/tests/candidate/candidate.selector';
import {
  CommunicationViewDidEnter,
} from './communication.actions';
import { map, take } from 'rxjs/operators';
import {
  getCommunicationPreference,
} from '../../modules/tests/communication-preferences/communication-preferences.reducer';
import {
  getCommunicationPreferenceUpdatedEmail, getCommunicationPreferenceType, getConductedLanguage,
} from '../../modules/tests/communication-preferences/communication-preferences.selector';
import { merge } from 'rxjs/observable/merge';
import { CommunicationMethod, Address, ConductedLanguage } from '@dvsa/mes-test-schema/categories/B';
import { Subscription } from 'rxjs/Subscription';
import {
  CandidateChoseEmailAsCommunicationPreference,
  CandidateChosePostAsCommunicationPreference,
  CandidateChoseSupportCentreAsCommunicationPreference,
  CandidateChoseToProceedWithTestInWelsh,
  CandidateChoseToProceedWithTestInEnglish,
} from '../../modules/tests/communication-preferences/communication-preferences.actions';
import { getTestSlotAttributes } from '../../modules/tests/test-slot-attributes/test-slot-attributes.reducer';
import { isWelshTest } from '../../modules/tests/test-slot-attributes/test-slot-attributes.selector';
import { TranslateService } from 'ng2-translate';
import { WAITING_ROOM_PAGE } from '../page-names.constants';

interface CommunicationPageState {
  candidateName$: Observable<string>;
  candidateUntitledName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  candidateProvidedEmail$: Observable<string>;
  communicationEmail$: Observable<string>;
  communicationType$: Observable<string>;
  candidateAddress$: Observable<Address>;
  welshTest$: Observable<boolean>;
  conductedLanguage$: Observable<string>;
}
@IonicPage()
@Component({
  selector: 'communication',
  templateUrl: 'communication.html',
})
export class CommunicationPage extends PracticeableBasePageComponent {

  static readonly providedEmail: string = 'Provided';
  static readonly updatedEmail: string = 'Updated';
  static readonly email: CommunicationMethod = 'Email';
  static readonly post: CommunicationMethod = 'Post';
  static readonly supportCentre: CommunicationMethod = 'Support Centre';
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
  communicationType: string;
  selectProvidedEmail: boolean;
  selectNewEmail: boolean;
  conductedLanguage: string;
  isBookedInWelsh: boolean;

  constructor(
    store$: Store<StoreModel>,
    public navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private deviceProvider: DeviceProvider,
    private deviceAuthenticationProvider: DeviceAuthenticationProvider,
    private screenOrientation: ScreenOrientation,
    private insomnia: Insomnia,
    private translate: TranslateService,
  ) {
    super(platform, navController, authenticationProvider, store$);
    this.form = new FormGroup(this.getFormValidation());
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new CommunicationViewDidEnter());

    if (super.isIos()) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
      this.insomnia.keepAwake();

      if (!this.isPracticeMode) {
        this.deviceProvider.enableSingleAppMode();
      }
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

    const {
      candidateProvidedEmail$,
      communicationEmail$,
      communicationType$,
      welshTest$,
      conductedLanguage$,
    } = this.pageState;

    const merged$ = merge(
      candidateProvidedEmail$.pipe(map(value => this.candidateProvidedEmail = value)),
      communicationEmail$.pipe(map(value => this.communicationEmail = value)),
      communicationType$.pipe(map(value => this.communicationType = value)),
      welshTest$.pipe(map(isWelsh => this.isBookedInWelsh = isWelsh)),
      conductedLanguage$.pipe(map(value => this.conductedLanguage = value)),
    );
    this.subscription = merged$.subscribe();

    if (this.shouldPreselectADefaultValue()) {
      this.initialiseDefaultSelections();
    }

    this.configureI18N(this.conductedLanguage === CommunicationPage.welshLanguage);
    this.restoreRadiosFromState();
    this.restoreRadioValidators();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscription.unsubscribe();
  }

  configureI18N(isWelsh: boolean): void {
    if (this.isBookedInWelsh && isWelsh) {
      this.translate.use('cy');
    } else {
      this.translate.use('en');
    }
  }

  onSubmit() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      this.navController.push(WAITING_ROOM_PAGE);
    }
  }

  dispatchCandidateChoseProvidedEmail() {
    this.setCommunicationType(CommunicationPage.email, CommunicationPage.providedEmail);
    this.store$.dispatch(
      new CandidateChoseEmailAsCommunicationPreference(
        this.candidateProvidedEmail, CommunicationPage.email),
    );
  }

  dispatchCandidateChoseNewEmail(communicationEmail: string): void {
    this.store$.dispatch(
      new CandidateChoseEmailAsCommunicationPreference(
        communicationEmail, CommunicationPage.email),
    );
  }

  setCommunicationType(communicationChoice: string, emailType: string = null) {
    this.communicationType = communicationChoice;
    this.emailType = emailType;
    this.verifyNewEmailFormControl(communicationChoice);
  }

  isProvidedEmailSelected() {
    return this.communicationType === CommunicationPage.email && this.emailType === CommunicationPage.providedEmail;
  }

  isNewEmailSelected() {
    return this.communicationType === CommunicationPage.email && this.emailType === CommunicationPage.updatedEmail;
  }

  isPostSelected() {
    return this.communicationType === CommunicationPage.post;
  }

  dispatchCandidateChosePost(): void {
    this.setCommunicationType(CommunicationPage.post);
    this.store$.dispatch(
      new CandidateChosePostAsCommunicationPreference(CommunicationPage.post),
    );
  }

  dispatchCandidateChoseSupportCentre(): void {
    this.setCommunicationType(CommunicationPage.supportCentre);
    this.store$.dispatch(
      new CandidateChoseSupportCentreAsCommunicationPreference(CommunicationPage.supportCentre),
    );
  }

  isSupportCentreSelected() {
    return this.communicationType === CommunicationPage.supportCentre;
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
    if (this.communicationType === CommunicationPage.email) {
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
      this.emailType = CommunicationPage.providedEmail;
    }

    if (this.candidateProvidedEmail !== this.communicationEmail) {
      this.selectNewEmail = true;
      this.selectProvidedEmail = false;
      this.emailType = CommunicationPage.updatedEmail;
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
    this.communicationType = CommunicationPage.email;
    if (this.candidateProvidedEmail) {
      this.emailType = CommunicationPage.providedEmail;
      this.selectProvidedEmail = true;
      this.form.controls['radioCtrl'].setValue(true);
      this.dispatchCandidateChoseProvidedEmail();
    }

    if (!this.candidateProvidedEmail) {
      this.emailType = CommunicationPage.updatedEmail;
      this.selectNewEmail = true;
      this.selectProvidedEmail = false;
      this.form.controls['radioCtrl'].setValue(true);
    }

    if (this.isBookedInWelsh && this.conductedLanguage !== CommunicationPage.englishLanguage) {
      this.dispatchCandidateChoseToProceedInWelsh();
    } else {
      this.dispatchCandidateChoseToProceedInEnglish();
    }
  }

  verifyNewEmailFormControl(communicationChoice: string) {
    const newEmailCtrl = this.form.get('newEmailCtrl');
    if (newEmailCtrl !== null) {
      if (communicationChoice !== CommunicationPage.email
        || this.emailType === CommunicationPage.providedEmail) {
        newEmailCtrl.clearValidators();
      } else {
        newEmailCtrl.setValidators(Validators.email);
      }
      newEmailCtrl.updateValueAndValidity();
    }
  }

  shouldPreselectADefaultValue() {
    return this.communicationType === null;
  }

  /**
   * Function to conditionally dispatch 'dispatchCandidateChoseNewEmail' action
   * to cover edge case candidate action.
   *
   * Candidate selects new email -> app crashes -> candidate selects Post/Support Centre ->
   * app crashes -> candidate selects new email (previous state value exists so examiner clicks continue)
   *
   * As state change for new email happens on text input, the expected action
   * (CandidateChoseEmailAsCommunicationPreference) would not be dispatched.
   */
  conditionalDispatchCandidateChoseNewEmail() {
    this.setCommunicationType(CommunicationPage.email, CommunicationPage.updatedEmail);

    if (this.isNewEmailSelected() && this.communicationEmail !== '') {
      this.dispatchCandidateChoseNewEmail(this.communicationEmail);
    }
  }

  getNewEmailAddressValue() {
    return this.candidateProvidedEmail === this.communicationEmail ? '' : this.communicationEmail;
  }

  dispatchCandidateChoseToProceedInWelsh() {
    this.store$.dispatch(new CandidateChoseToProceedWithTestInWelsh(CommunicationPage.welshLanguage));
    this.configureI18N(this.conductedLanguage === CommunicationPage.welshLanguage);
  }

  dispatchCandidateChoseToProceedInEnglish() {
    this.store$.dispatch(new CandidateChoseToProceedWithTestInEnglish(CommunicationPage.englishLanguage));
    this.configureI18N(this.conductedLanguage === CommunicationPage.welshLanguage);
  }
}
