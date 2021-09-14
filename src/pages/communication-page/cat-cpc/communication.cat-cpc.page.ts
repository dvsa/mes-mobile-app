import { IonicPage, Navbar, Platform, NavController, Keyboard } from 'ionic-angular';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, merge, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map, take, tap } from 'rxjs/operators';

import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { StoreModel } from '../../../shared/models/store.model';
import { DeviceAuthenticationProvider } from '../../../providers/device-authentication/device-authentication';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import {
  getCandidateName,
  getUntitledCandidateName,
  getCandidateDriverNumber,
  formatDriverNumber,
  getCandidateEmailAddress,
  getPostalAddress,
} from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import {
  CommunicationViewDidEnter, CommunicationValidationError, CommunicationSubmitInfo, CommunicationSubmitInfoError,
} from '../communication.actions';
import {
  getCommunicationPreference,
} from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import {
  getCommunicationPreferenceUpdatedEmail, getCommunicationPreferenceType, getConductedLanguage,
} from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { CommunicationMethod, Address, ConductedLanguage, CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import {
  CandidateChoseEmailAsCommunicationPreference,
  CandidateChosePostAsCommunicationPreference,
} from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { TranslateService } from '@ngx-translate/core';
import { CAT_CPC } from '../../page-names.constants';
import { Language } from '../../../modules/tests/communication-preferences/communication-preferences.model';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { configureI18N } from '../../../shared/helpers/translation.helpers';
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
  selector: '.communication-cat-cpc-page',
  templateUrl: 'communication.cat-cpc.page.html',
})
export class CommunicationCatCPCPage extends BasePageComponent implements OnInit {

  static readonly providedEmail: string = 'Provided';
  static readonly updatedEmail: string = 'Updated';
  static readonly email: CommunicationMethod = 'Email';
  static readonly post: CommunicationMethod = 'Post';
  static readonly notProvided: CommunicationMethod = 'Not provided';
  static readonly welshLanguage: ConductedLanguage = Language.CYMRAEG;
  static readonly englishLanguage: ConductedLanguage = Language.ENGLISH;

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
          this.navController.push(CAT_CPC.WAITING_ROOM_TO_CAR_PAGE)
            .then(() => {
              const waitingRoomPage =
                this.navController.getViews().find(view => view.id === CAT_CPC.WAITING_ROOM_PAGE);
              if (waitingRoomPage) {
                this.navController.removeView(waitingRoomPage);
              }
              const communicationPage =
                this.navController.getViews().find(view => view.id === CAT_CPC.COMMUNICATION_PAGE);
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
    this.setCommunicationType(CommunicationCatCPCPage.email, CommunicationCatCPCPage.providedEmail);
    this.store$.dispatch(
      new CandidateChoseEmailAsCommunicationPreference(
        this.candidateProvidedEmail, CommunicationCatCPCPage.email),
    );
  }

  dispatchCandidateChoseNewEmail(communicationEmail: string): void {
    this.store$.dispatch(
      new CandidateChoseEmailAsCommunicationPreference(
        communicationEmail, CommunicationCatCPCPage.email),
    );
  }

  setCommunicationType(communicationChoice: CommunicationMethod, emailType: string = null) {
    this.communicationType = communicationChoice;
    this.emailType = emailType;
    this.verifyNewEmailFormControl(communicationChoice);
  }

  isProvidedEmailSelected() {
    return (this.communicationType === CommunicationCatCPCPage.email
      && this.emailType === CommunicationCatCPCPage.providedEmail);
  }

  isNewEmailSelected() {
    return (this.communicationType === CommunicationCatCPCPage.email
      && this.emailType === CommunicationCatCPCPage.updatedEmail);
  }

  isPostSelected() {
    return this.communicationType === CommunicationCatCPCPage.post;
  }

  dispatchCandidateChosePost(): void {
    this.setCommunicationType(CommunicationCatCPCPage.post);
    this.store$.dispatch(
      new CandidateChosePostAsCommunicationPreference(CommunicationCatCPCPage.post),
    );
  }

  getFormValidation(): { [key: string]: FormControl } {
    return {
      radioCtrl: new FormControl('', Validators.required),
    };
  }

  restoreRadiosFromState() {
    if (this.communicationType === CommunicationCatCPCPage.email) {
      this.assertEmailType();
    }
  }

  assertEmailType() {
    if (this.candidateProvidedEmail !== '' && this.candidateProvidedEmail === this.communicationEmail) {
      this.selectProvidedEmail = true;
      this.selectNewEmail = false;
      this.emailType = CommunicationCatCPCPage.providedEmail;
    }

    if (this.candidateProvidedEmail !== this.communicationEmail) {
      this.selectNewEmail = true;
      this.selectProvidedEmail = false;
      this.emailType = CommunicationCatCPCPage.updatedEmail;
    }
  }

  restoreRadioValidators() {
    this.form.controls['radioCtrl'].setValue(true);
  }

  initialiseDefaultSelections() {
    this.communicationType = CommunicationCatCPCPage.email;
    if (this.candidateProvidedEmail) {
      this.emailType = CommunicationCatCPCPage.providedEmail;
      this.selectProvidedEmail = true;
      this.form.controls['radioCtrl'].setValue(true);
      this.dispatchCandidateChoseProvidedEmail();
    }

    if (!this.candidateProvidedEmail) {
      this.emailType = CommunicationCatCPCPage.updatedEmail;
      this.selectNewEmail = true;
      this.selectProvidedEmail = false;
      this.form.controls['radioCtrl'].setValue(true);
    }
  }

  verifyNewEmailFormControl(communicationChoice: string) {
    const newEmailCtrl = this.form.get('newEmailCtrl');
    if (newEmailCtrl !== null) {
      if (communicationChoice !== CommunicationCatCPCPage.email
        || this.emailType === CommunicationCatCPCPage.providedEmail) {
        newEmailCtrl.clearValidators();
      } else {
        newEmailCtrl.setValidators(Validators.email);
      }
      newEmailCtrl.updateValueAndValidity();
    }
  }

  shouldPreselectADefaultValue(): boolean {
    return this.communicationType === CommunicationCatCPCPage.notProvided;
  }

  conditionalDispatchCandidateChoseNewEmail() {
    this.setCommunicationType(CommunicationCatCPCPage.email, CommunicationCatCPCPage.updatedEmail);

    if (this.isNewEmailSelected() && this.communicationEmail !== '') {
      this.dispatchCandidateChoseNewEmail(this.communicationEmail);
    }
  }

  getNewEmailAddressValue() {
    return this.candidateProvidedEmail === this.communicationEmail ? '' : this.communicationEmail;
  }
}
