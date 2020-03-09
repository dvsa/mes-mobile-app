import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Navbar, AlertController } from 'ionic-angular';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import {
  HealthDeclarationViewDidEnter,
  ContinueFromDeclaration,
  HealthDeclarationValidationError,
} from '../health-declaration.actions';
import { Observable, Subscription, merge } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { DeviceAuthenticationProvider } from '../../../providers/device-authentication/device-authentication';
import * as postTestDeclarationsActions
  from '../../../modules/tests/post-test-declarations/post-test-declarations.actions';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { getPostTestDeclarations } from '../../../modules/tests/post-test-declarations/post-test-declarations.reducer';
import {
  getHealthDeclarationStatus,
  getReceiptDeclarationStatus,
  getSignatureStatus,
} from '../../../modules/tests/post-test-declarations/post-test-declarations.selector';
import {
  getCandidateName, getCandidateDriverNumber, formatDriverNumber, getUntitledCandidateName,
} from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { map, tap } from 'rxjs/operators';
import {
  getPassCertificateNumber,
  isProvisionalLicenseProvided,
} from '../../../modules/tests/pass-completion/pass-completion.selector';
import { getPassCompletion } from '../../../modules/tests/pass-completion/pass-completion.reducer';
import { TranslateService } from 'ng2-translate';
import { ProvisionalLicenseNotReceived } from '../../../modules/tests/pass-completion/pass-completion.actions';
import {
  getCommunicationPreference,
} from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import {
  getConductedLanguage,
} from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { CAT_HOME_TEST } from '../../page-names.constants';
import { includes } from 'lodash';
import { Language } from '../../../modules/tests/communication-preferences/communication-preferences.model';
import { configureI18N } from '../../../shared/helpers/translation.helpers';
import { getCandidate } from '../../../modules/tests/journal-data/cat-home/candidate/candidate.cat-home.reducer';

interface HealthDeclarationPageState {
  healthDeclarationAccepted$: Observable<boolean>;
  receiptDeclarationAccepted$: Observable<boolean>;
  signature$: Observable<string>;
  candidateName$: Observable<string>;
  candidateUntitledName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  passCertificateNumber$: Observable<string>;
  licenseProvided$: Observable<boolean>;
  conductedLanguage$: Observable<string>;
}

@IonicPage()
@Component({
  selector: '.health-declaration-cat-home-test-page',
  templateUrl: 'health-declaration.cat-home-test.page.html',
})
export class HealthDeclarationCatHomeTestPage extends BasePageComponent {

  @ViewChild(Navbar) navBar: Navbar;

  pageState: HealthDeclarationPageState;
  form: FormGroup;
  licenseProvided: boolean;
  healthDeclarationAccepted: boolean;
  subscription: Subscription;
  inputSubscriptions: Subscription[] = [];
  merged$: Observable<boolean | string>;

  constructor(
    public store$: Store<StoreModel>,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private deviceAuthenticationProvider: DeviceAuthenticationProvider,
    private translate: TranslateService,
    public alertController: AlertController,
  ) {
    super(platform, navController, authenticationProvider);
    this.form = new FormGroup({});
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new HealthDeclarationViewDidEnter());
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

    const journalData$ = currentTest$.pipe(
      select(getJournalData),
    );

    const candidate$ = journalData$.pipe(
      select(getCandidate),
    );

    const postTestDeclarations$ = currentTest$.pipe(
      select(getPostTestDeclarations),
    );

    const passCompletion$ = currentTest$.pipe(
      select(getPassCompletion),
    );

    this.pageState = {
      healthDeclarationAccepted$: postTestDeclarations$.pipe(
        select(getHealthDeclarationStatus),
      ),
      receiptDeclarationAccepted$: postTestDeclarations$.pipe(
        select(getReceiptDeclarationStatus),
      ),
      signature$: postTestDeclarations$.pipe(
        select(getSignatureStatus),
      ),
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
      passCertificateNumber$: passCompletion$.pipe(
        select(getPassCertificateNumber),
      ),
      licenseProvided$: passCompletion$.pipe(
        map(isProvisionalLicenseProvided),
      ),
      conductedLanguage$: currentTest$.pipe(
        select(getCommunicationPreference),
        select(getConductedLanguage),
      ),
    };

    const { licenseProvided$, healthDeclarationAccepted$, conductedLanguage$ } = this.pageState;

    this.merged$ = merge(
      licenseProvided$.pipe(map(val => this.licenseProvided = val)),
      healthDeclarationAccepted$.pipe(map(val => this.healthDeclarationAccepted = val)),
      conductedLanguage$.pipe(tap(value => configureI18N(value as Language, this.translate))),
    );

  }

  ionViewWillEnter(): boolean {
    if (this.merged$) {
      this.subscription = this.merged$.subscribe();
    }

    return true;
  }

  getSignatureDrawCompleteAction(): string {
    return postTestDeclarationsActions.SIGNATURE_DATA_CHANGED;
  }

  getSignatureClearAction(): string {
    return postTestDeclarationsActions.SIGNATURE_DATA_CLEARED;
  }

  healthDeclarationChanged(): void {
    this.store$.dispatch(new postTestDeclarationsActions.ToggleHealthDeclaration());
  }

  receiptDeclarationChanged(): void {
    this.store$.dispatch(new postTestDeclarationsActions.ToggleReceiptDeclaration());
  }

  onSubmit() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      if (!this.healthDeclarationAccepted) {
        this.showConfirmHealthDeclarationModal();
      } else {
        this.persistAndNavigate(false);
      }
      return;
    }
    Object.keys(this.form.controls).forEach((controlName) => {
      if (this.form.controls[controlName].invalid) {
        this.store$.dispatch(new HealthDeclarationValidationError(`${controlName} is blank`));
      }
    });
  }

  showConfirmHealthDeclarationModal() {
    const shortMessage = 'Remind the candidate to contact DVLA';
    const extendedMessage =
      // tslint:disable-next-line:max-line-length
      `You need to give the provisional licence back to the candidate.<br/>The field 'Driver licence received' will be automatically changed to 'no'.<br/>${shortMessage}`;
    const alert = this.alertController.create({
      title: 'The candidate has not confirmed the health declaration',
      message: this.licenseProvided ? extendedMessage : shortMessage,
      cssClass: 'confirm-declaration-modal',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          },
        },
        {
          text: 'Continue',
          handler: () => this.persistAndNavigate(true),
        },
      ],
      enableBackdropDismiss: false,
    });
    alert.present();
  }

  persistAndNavigate(resetLicenseProvided: boolean) {
    this.deviceAuthenticationProvider.triggerLockScreen()
      .then(() => {
        if (this.licenseProvided && resetLicenseProvided) {
          this.store$.dispatch(new ProvisionalLicenseNotReceived());
        }
        this.store$.dispatch(new ContinueFromDeclaration());
        this.navController.push(CAT_HOME_TEST.BACK_TO_OFFICE_PAGE).then(() => {
          this.navController.getViews().forEach((view) => {
            if (includes([
              CAT_HOME_TEST.TEST_REPORT_PAGE,
              CAT_HOME_TEST.DEBRIEF_PAGE,
              CAT_HOME_TEST.PASS_FINALISATION_PAGE,
              CAT_HOME_TEST.HEALTH_DECLARATION_PAGE,
            ],
              view.id)) {
              this.navController.removeView(view);
            }
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.inputSubscriptions) {
      this.inputSubscriptions.forEach(sub => sub.unsubscribe());
    }
  }

}