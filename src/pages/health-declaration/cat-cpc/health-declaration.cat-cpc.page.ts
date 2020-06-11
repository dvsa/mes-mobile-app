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
  getReceiptDeclarationStatus,
  getSignatureStatus,
} from '../../../modules/tests/post-test-declarations/post-test-declarations.selector';
import {
  getCandidateName, getCandidateDriverNumber, formatDriverNumber, getUntitledCandidateName,
} from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { map, tap } from 'rxjs/operators';
import {
  getPassCertificateNumber,
  isProvisionalLicenseProvided,
} from '../../../modules/tests/pass-completion/pass-completion.selector';
import { getPassCompletion } from '../../../modules/tests/pass-completion/pass-completion.reducer';
import { TranslateService } from '@ngx-translate/core';
import { ProvisionalLicenseNotReceived } from '../../../modules/tests/pass-completion/pass-completion.actions';
import {
  getCommunicationPreference,
} from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import {
  getConductedLanguage,
} from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { CAT_CPC } from '../../page-names.constants';
import { includes } from 'lodash';
import { Language } from '../../../modules/tests/communication-preferences/communication-preferences.model';
import { configureI18N } from '../../../shared/helpers/translation.helpers';

interface HealthDeclarationPageState {
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
  selector: '.health-declaration-cat-cpc-page',
  templateUrl: 'health-declaration.cat-cpc.page.html',
})
export class HealthDeclarationCatCPCPage extends BasePageComponent {

  @ViewChild(Navbar) navBar: Navbar;

  pageState: HealthDeclarationPageState;
  form: FormGroup;
  licenseProvided: boolean;
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
      // TODO confirm this is working when page is linked up
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

    const { licenseProvided$, conductedLanguage$ } = this.pageState;

    this.merged$ = merge(
      licenseProvided$.pipe(map(val => this.licenseProvided = val)),
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

  receiptDeclarationChanged(): void {
    this.store$.dispatch(new postTestDeclarationsActions.ToggleReceiptDeclaration());
  }

  onSubmit() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      this.persistAndNavigate(false);
      return;
    }
    Object.keys(this.form.controls).forEach((controlName) => {
      if (this.form.controls[controlName].invalid) {
        this.store$.dispatch(new HealthDeclarationValidationError(`${controlName} is blank`));
      }
    });
  }

  persistAndNavigate(resetLicenseProvided: boolean) {
    this.deviceAuthenticationProvider.triggerLockScreen()
      .then(() => {
        if (this.licenseProvided && resetLicenseProvided) {
          this.store$.dispatch(new ProvisionalLicenseNotReceived());
        }
        this.store$.dispatch(new ContinueFromDeclaration());
        this.navController.push(CAT_CPC.BACK_TO_OFFICE_PAGE).then(() => {
          this.navController.getViews().forEach((view) => {
            if (includes([
              CAT_CPC.TEST_REPORT_PAGE,
              CAT_CPC.DEBRIEF_PAGE,
              CAT_CPC.PASS_FINALISATION_PAGE,
              CAT_CPC.HEALTH_DECLARATION_PAGE,
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
