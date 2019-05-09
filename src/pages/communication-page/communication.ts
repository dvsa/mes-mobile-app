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
import { getCurrentTest } from '../../modules/tests/tests.selector';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCandidate } from '../../modules/tests/candidate/candidate.reducer';
import {
  getCandidateName,
  getUntitledCandidateName,
  getCandidateDriverNumber,
  formatDriverNumber,
  getCandidateEmailAddress,
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
import { CommunicationMethod } from '@dvsa/mes-test-schema/categories/B';
import { Subscription } from 'rxjs/Subscription';
import {
  CandidateChoseEmailAsCommunicationPreference,
} from '../../modules/tests/communication-preferences/communication-preferences.actions';

interface CommunicationPageState {
  candidateName$: Observable<string>;
  candidateUntitledName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  candidateProvidedEmail$: Observable<string>;
  communicationEmail$: Observable<string>;
  communicationType$: Observable<string>;
}
@IonicPage()
@Component({
  selector: 'communication',
  templateUrl: 'communication.html',
})
export class CommunicationPage extends BasePageComponent {

  readonly providedEmail = 'providedEmail';
  readonly newEmail = 'newEmail';

  @ViewChild(Navbar)
  navBar: Navbar;

  form: FormGroup;
  subscription: Subscription;
  communicationChoice: string;
  pageState: CommunicationPageState;
  communicationMethodForEmail: CommunicationMethod;
  communicationMethodForPost: CommunicationMethod;
  communicationMethodForSupportCentre: CommunicationMethod;
  candidateProvidedEmail: string;
  communicationEmail: string;

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
        select(getCandidate),
        select(getCandidateName),
      ),
      candidateUntitledName$: currentTest$.pipe(
        select(getCandidate),
        select(getUntitledCandidateName),
      ),
      candidateDriverNumber$: currentTest$.pipe(
        select(getCandidate),
        select(getCandidateDriverNumber),
        map(formatDriverNumber),
      ),
      candidateProvidedEmail$: currentTest$.pipe(
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
    };

    const {
      candidateProvidedEmail$,
      communicationEmail$,
    } = this.pageState;

    const merged$ = merge(
      candidateProvidedEmail$.pipe(map(value => this.candidateProvidedEmail = value)),
      communicationEmail$.pipe(map(value => this.communicationEmail = value)),
    );
    this.subscription = merged$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this.navController.push('WaitingRoomPage');
  }

  dispatchCandidateChoseProvidedEmail(emailType: string) {
    this.setCommunicationType(emailType);
    this.store$.dispatch(
      new CandidateChoseEmailAsCommunicationPreference(this.candidateProvidedEmail, this.communicationMethodForEmail),
    );
  }

  dispatchCandidateChoseNewEmail(newEmail: string): void {
    this.store$.dispatch(
      new CandidateChoseEmailAsCommunicationPreference(newEmail, this.communicationMethodForEmail),
    );
  }

  setCommunicationType(communicationChoice: string) {
    this.communicationChoice = communicationChoice;
  }

  isSelected(communicationChoice: string) {
    return (this.communicationChoice === communicationChoice);
  }

  getFormValidation(): { [key: string]: FormControl } {
    return {
      communicationChoiceCtrl: new FormControl('', [Validators.required]),
    };
  }

  isCtrlDirtyAndInvalid(controlName: string): boolean {
    return !this.form.value[controlName] && this.form.get(controlName).dirty;
  }

  verifyCandidateChoseProvidedEmail() {
    return (this.communicationEmail === '') || (this.communicationEmail === this.candidateProvidedEmail);
  }
}
