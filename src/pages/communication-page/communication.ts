import { IonicPage, Navbar, Platform, NavController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { BasePageComponent } from '../../shared/classes/base-page';
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
  getCommunicationPreferenceUpdatedEmail, getCommunicationPreferenceType,
} from '../../modules/tests/communication-preferences/communication-preferences.selector';
import { merge } from 'rxjs/observable/merge';
import { CommunicationMethod, Address } from '@dvsa/mes-test-schema/categories/B';
import { Subscription } from 'rxjs/Subscription';
import {
  CandidateChoseEmailAsCommunicationPreference, CandidateChosePostAsCommunicationPreference,
} from '../../modules/tests/communication-preferences/communication-preferences.actions';

interface CommunicationPageState {
  candidateName$: Observable<string>;
  candidateUntitledName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  candidateProvidedEmail$: Observable<string>;
  communicationEmail$: Observable<string>;
  communicationType$: Observable<string>;
  candidateAddress$: Observable<Address>;
}
@IonicPage()
@Component({
  selector: 'communication',
  templateUrl: 'communication.html',
})
export class CommunicationPage extends BasePageComponent {

  static readonly providedEmail: string = 'Provided';
  static readonly updatedEmail: string = 'Updated';

  @ViewChild(Navbar)
  navBar: Navbar;

  form: FormGroup;
  subscription: Subscription;
  emailType: string;
  pageState: CommunicationPageState;
  communicationMethodForEmail: CommunicationMethod;
  communicationMethodForPost: CommunicationMethod;
  communicationMethodForSupportCentre: CommunicationMethod;
  candidateProvidedEmail: string;
  communicationEmail: string;
  communicationType: string;
  selectProvidedEmail: boolean;
  selectNewEmail: boolean;

  constructor(
    private store$: Store<StoreModel>,
    public navCtrl: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private deviceProvider: DeviceProvider,
    private deviceAuthenticationProvider: DeviceAuthenticationProvider,
    private screenOrientation: ScreenOrientation,
    private insomnia: Insomnia,
  ) {
    super(platform, navCtrl, authenticationProvider);
    this.form = new FormGroup(this.getFormValidation());
    this.communicationMethodForEmail = 'Email';
    this.communicationMethodForPost = 'Post';
    this.communicationMethodForSupportCentre = 'Support Centre';
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new CommunicationViewDidEnter());

    if (super.isIos()) {
      this.deviceProvider.enableSingleAppMode();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
      this.insomnia.keepAwake();
    }

    this.navBar.backButtonClick = (e: UIEvent) => {
      this.clickBack();
    };
  }

  clickBack(): void {
    this.deviceAuthenticationProvider.triggerLockScreen()
      .then(() => {
        this.navCtrl.pop();
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
    };

    const {
      candidateProvidedEmail$,
      communicationEmail$,
      communicationType$,
    } = this.pageState;

    const merged$ = merge(
      candidateProvidedEmail$.pipe(map(value => this.candidateProvidedEmail = value)),
      communicationEmail$.pipe(map(value => this.communicationEmail = value)),
      communicationType$.pipe(map(value => this.communicationType = value)),
    );
    this.subscription = merged$.subscribe();

    this.initialiseDefaultSelections();
    this.restoreRadiosFromState();
    this.restoreRadioValidators();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      this.navController.push('WaitingRoomPage');
    }
  }

  dispatchCandidateChoseProvidedEmail() {
    this.setCommunicationType('Email', CommunicationPage.providedEmail);
    this.store$.dispatch(
      new CandidateChoseEmailAsCommunicationPreference(this.candidateProvidedEmail, this.communicationMethodForEmail),
    );
  }

  dispatchCandidateChoseNewEmail(communicationEmail: string): void {
    this.store$.dispatch(
      new CandidateChoseEmailAsCommunicationPreference(communicationEmail, this.communicationMethodForEmail),
    );
  }

  setCommunicationType(communicationChoice: string, emailType: string = null) {
    this.communicationType = communicationChoice;
    this.emailType = emailType;
    this.verifyNewEmailFormControl(communicationChoice);
  }

  isProvidedEmailSelected() {
    return this.communicationType === 'Email' && this.emailType === CommunicationPage.providedEmail;
  }

  isNewEmailSelected() {
    return this.communicationType === 'Email' && this.emailType === CommunicationPage.updatedEmail;
  }

  isPostSelected() {
    return this.communicationType === 'Post';
  }

  dispatchCandidateChosePost(): void {
    this.setCommunicationType(this.communicationMethodForPost);
    this.store$.dispatch(
      new CandidateChosePostAsCommunicationPreference(this.communicationMethodForPost),
    );
  }

  isSupportCentreSelected() {
    return this.communicationType === 'Support Centre';
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
    if (this.communicationType === 'Email') {
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
      this.emailType = CommunicationPage.providedEmail;
    }

    if (this.candidateProvidedEmail === '' && this.communicationEmail !== '') {
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
   * If there is a candidate email provided at the time of booking, this will be chosen as
   * the default selection. If there is not then the new email radio selection will be chosen
   * as the default selection.
   */
  initialiseDefaultSelections() {
    this.communicationType = 'Email';
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
  }

  verifyNewEmailFormControl(communicationChoice: string) {
    const newEmailCtrl = this.form.get('newEmailCtrl');
    if (newEmailCtrl !== null) {
      if (communicationChoice !== 'Email') {
        newEmailCtrl.clearValidators();
      } else {
        newEmailCtrl.setValidators(Validators.email);
      }
      newEmailCtrl.updateValueAndValidity();
    }
  }
}
