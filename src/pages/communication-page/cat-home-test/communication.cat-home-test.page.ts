import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Address, CategoryCode, CommunicationMethod, ConductedLanguage } from '@dvsa/mes-test-schema/categories/common';
import { IonicPage, Keyboard, Navbar, NavController, Platform } from 'ionic-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { DeviceAuthenticationProvider } from '../../../providers/device-authentication/device-authentication';
import { TranslateService } from '@ngx-translate/core';
import {
  CommunicationSubmitInfo,
  CommunicationSubmitInfoError, CommunicationValidationError,
  CommunicationViewDidEnter,
} from '../communication.actions';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import {
  formatDriverNumber,
  getCandidateDriverNumber, getCandidateEmailAddress,
  getCandidateName, getPostalAddress,
  getUntitledCandidateName,
} from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { map, take, tap } from 'rxjs/operators';
import { getCommunicationPreference }
  from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import {
  getCommunicationPreferenceType,
  getCommunicationPreferenceUpdatedEmail, getConductedLanguage,
} from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { merge } from 'rxjs/observable/merge';
import { configureI18N } from '../../../shared/helpers/translation.helpers';
import { Language } from '../../../modules/tests/communication-preferences/communication-preferences.model';
import { CAT_HOME_TEST } from '../../page-names.constants';
import {
  CandidateChoseEmailAsCommunicationPreference,
  CandidateChosePostAsCommunicationPreference,
} from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';

interface CommunicationPageState {
  candidateName$: Observable<string>;
  candidateUntitledName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  candidateProvidedEmail$: Observable<string>;
  communicationEmail$: Observable<string>;
  communicationType$: Observable<string>;
  candidateAddress$: Observable<Address>;
  conductedLanguage$: Observable<string>;
  categoryCode$: Observable<CategoryCode>;
}
@IonicPage()
@Component({
  selector: '.communication-cat-home-test-page',
  templateUrl: 'communication.cat-home-test.page.html',
})
export class CommunicationCatHomeTestPage extends BasePageComponent implements OnInit {

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
  categoryCode$: CategoryCode;

  constructor(
    public store$: Store<StoreModel>,
    public navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private deviceAuthenticationProvider: DeviceAuthenticationProvider,
    private translate: TranslateService,
    public keyboard: Keyboard,
  ) {
    super(platform, navController, authenticationProvider);
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
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    const candidate$ = currentTest$.pipe(
      select(getJournalData),
      select(getCandidate),
    );
    this.pageState = {
      candidateName$: candidate$.pipe(
        select(getCandidateName),
      ),
      candidateUntitledName$: candidate$.pipe(
        select(getUntitledCandidateName),
      ),
      candidateDriverNumber$: candidate$.pipe(
        select(getCandidateDriverNumber),
        map(formatDriverNumber),
      ),
      candidateProvidedEmail$: candidate$.pipe(
        select(getCandidateEmailAddress),
        take(1),
      ),
      communicationEmail$: currentTest$.pipe(
        select(getCommunicationPreference),
        select(getCommunicationPreferenceUpdatedEmail),
      ),
      communicationType$: currentTest$.pipe(
        select(getCommunicationPreference),
        select(getCommunicationPreferenceType),
      ),
      candidateAddress$: candidate$.pipe(
        select(getPostalAddress),
      ),
      conductedLanguage$: currentTest$.pipe(
        select(getCommunicationPreference),
        select(getConductedLanguage),
      ),
      categoryCode$: currentTest$.pipe(
        select(getTestCategory),
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
      conductedLanguage$.pipe(tap(value => configureI18N(value as Language, this.translate))),
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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      this.deviceAuthenticationProvider.triggerLockScreen()
        .then(() => {
          this.store$.dispatch(new CommunicationSubmitInfo());
          this.navController.push(CAT_HOME_TEST.WAITING_ROOM_TO_CAR_PAGE)
            .then(() => {
              const waitingRoomPage = this.navController.getViews()
                .find(view => view.id === CAT_HOME_TEST.WAITING_ROOM_PAGE);
              if (waitingRoomPage) {
                this.navController.removeView(waitingRoomPage);
              }
              const communicationPage =
                this.navController.getViews().find(view => view.id === CAT_HOME_TEST.COMMUNICATION_PAGE);
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
    this.setCommunicationType(CommunicationCatHomeTestPage.email, CommunicationCatHomeTestPage.providedEmail);
    this.store$.dispatch(
      new CandidateChoseEmailAsCommunicationPreference(
        this.candidateProvidedEmail, CommunicationCatHomeTestPage.email),
    );
  }

  dispatchCandidateChoseNewEmail(communicationEmail: string): void {
    this.store$.dispatch(
      new CandidateChoseEmailAsCommunicationPreference(
        communicationEmail, CommunicationCatHomeTestPage.email),
    );
  }

  setCommunicationType(communicationChoice: CommunicationMethod, emailType: string = null) {
    this.communicationType = communicationChoice;
    this.emailType = emailType;
    this.verifyNewEmailFormControl(communicationChoice);
  }

  isProvidedEmailSelected() {
    return (this.communicationType === CommunicationCatHomeTestPage.email
      && this.emailType === CommunicationCatHomeTestPage.providedEmail);
  }

  isNewEmailSelected() {
    return (this.communicationType === CommunicationCatHomeTestPage.email
      && this.emailType === CommunicationCatHomeTestPage.updatedEmail);
  }

  isPostSelected() {
    return this.communicationType === CommunicationCatHomeTestPage.post;
  }

  dispatchCandidateChosePost(): void {
    this.setCommunicationType(CommunicationCatHomeTestPage.post);
    this.store$.dispatch(
      new CandidateChosePostAsCommunicationPreference(CommunicationCatHomeTestPage.post),
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
    if (this.communicationType === CommunicationCatHomeTestPage.email) {
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
      this.emailType = CommunicationCatHomeTestPage.providedEmail;
    }

    if (this.candidateProvidedEmail !== this.communicationEmail) {
      this.selectNewEmail = true;
      this.selectProvidedEmail = false;
      this.emailType = CommunicationCatHomeTestPage.updatedEmail;
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
    this.communicationType = CommunicationCatHomeTestPage.email;
    if (this.candidateProvidedEmail) {
      this.emailType = CommunicationCatHomeTestPage.providedEmail;
      this.selectProvidedEmail = true;
      this.form.controls['radioCtrl'].setValue(true);
      this.dispatchCandidateChoseProvidedEmail();
    }

    if (!this.candidateProvidedEmail) {
      this.emailType = CommunicationCatHomeTestPage.updatedEmail;
      this.selectNewEmail = true;
      this.selectProvidedEmail = false;
      this.form.controls['radioCtrl'].setValue(true);
    }
  }

  verifyNewEmailFormControl(communicationChoice: string) {
    const newEmailCtrl = this.form.get('newEmailCtrl');
    if (newEmailCtrl !== null) {
      if (communicationChoice !== CommunicationCatHomeTestPage.email
        || this.emailType === CommunicationCatHomeTestPage.providedEmail) {
        newEmailCtrl.clearValidators();
      } else {
        newEmailCtrl.setValidators(Validators.email);
      }
      newEmailCtrl.updateValueAndValidity();
    }
  }

  shouldPreselectADefaultValue(): boolean {
    return this.communicationType === CommunicationCatHomeTestPage.notProvided;
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
    this.setCommunicationType(CommunicationCatHomeTestPage.email, CommunicationCatHomeTestPage.updatedEmail);

    if (this.isNewEmailSelected() && this.communicationEmail !== '') {
      this.dispatchCandidateChoseNewEmail(this.communicationEmail);
    }
  }

  getNewEmailAddressValue() {
    return this.candidateProvidedEmail === this.communicationEmail ? '' : this.communicationEmail;
  }
}
