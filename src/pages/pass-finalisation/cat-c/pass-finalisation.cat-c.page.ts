import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import {
  PassFinalisationViewDidEnter,
  PassFinalisationValidationError,
} from './../pass-finalisation.actions';
import {
  ProvisionalLicenseReceived,
  ProvisionalLicenseNotReceived,
  PassCertificateNumberChanged,
  Code78NotPresent,
  Code78Present,
} from '../../../modules/tests/pass-completion/pass-completion.actions';
import {
  getPassCertificateNumber,
  isProvisionalLicenseProvided,
} from '../../../modules/tests/pass-completion/pass-completion.selector';
import { Observable, Subscription, merge } from 'rxjs';
import { getCandidate } from '../../../modules/tests/journal-data/cat-c/candidate/candidate.cat-c.reducer';
import {
  getCandidateName, getCandidateDriverNumber, formatDriverNumber, getUntitledCandidateName,
} from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import {
  getApplicationReference,
} from '../../../modules/tests/journal-data/common/application-reference/application-reference.reducer';
import {
  getApplicationNumber,
} from '../../../modules/tests/journal-data/common/application-reference/application-reference.selector';
import { getCurrentTest, getJournalData, getTestOutcomeText } from '../../../modules/tests/tests.selector';
import { map } from 'rxjs/operators';
import { getTests } from '../../../modules/tests/tests.reducer';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { getVehicleDetails } from '../../../modules/tests/vehicle-details/cat-c/vehicle-details.cat-c.reducer';
import { getGearboxCategory } from '../../../modules/tests/vehicle-details/common/vehicle-details.selector';
import { GearboxCategoryChanged } from '../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { CAT_C } from '../../page-names.constants';
import { getTestSummary } from '../../../modules/tests/test-summary/common/test-summary.reducer';
import { isDebriefWitnessed, getD255 } from '../../../modules/tests/test-summary/common/test-summary.selector';
import {
  D255Yes,
  D255No,
  DebriefWitnessed,
  DebriefUnwitnessed,
} from '../../../modules/tests/test-summary/common/test-summary.actions';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../../office/office-behaviour-map.cat-c';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import {
  CandidateChoseToProceedWithTestInWelsh,
  CandidateChoseToProceedWithTestInEnglish,
} from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import {
  getCommunicationPreference,
} from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import {
  getConductedLanguage,
} from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { GearboxCategory } from '@dvsa/mes-test-schema/categories/common';
import { PASS_CERTIFICATE_NUMBER_CTRL } from '../components/pass-certificate-number/pass-certificate-number.constants';
import { TransmissionType } from '../../../shared/models/transmission-type';
import { getPassCompletion } from '../../../modules/tests/pass-completion/cat-c/pass-completion.cat-c.reducer';
import { getCode78 } from '../../../modules/tests/pass-completion/cat-c/pass-completion.cat-c.selector';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/AM2';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

interface PassFinalisationPageState {
  candidateName$: Observable<string>;
  candidateUntitledName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  testOutcomeText$: Observable<string>;
  applicationNumber$: Observable<string>;
  provisionalLicense$: Observable<boolean>;
  passCertificateNumber$: Observable<string>;
  transmission$: Observable<GearboxCategory>;
  d255$: Observable<boolean>;
  debriefWitnessed$: Observable<boolean>;
  conductedLanguage$: Observable<string>;
  code78$: Observable<boolean>;
  testCategory$: Observable<CategoryCode>;
}

@IonicPage()
@Component({
  selector: '.pass-finalisation-cat-c-page',
  templateUrl: 'pass-finalisation.cat-c.page.html',
})
export class PassFinalisationCatCPage extends BasePageComponent {
  pageState: PassFinalisationPageState;
  passCertificateCtrl: string = PASS_CERTIFICATE_NUMBER_CTRL;
  @ViewChild('passCertificateNumberInput')
  passCertificateNumberInput: ElementRef;
  inputSubscriptions: Subscription[] = [];
  testOutcome: string = ActivityCodes.PASS;
  form: FormGroup;
  merged$: Observable<string | boolean>;
  transmission: GearboxCategory;
  subscription: Subscription;
  code78Present: boolean = null;
  provisionalLicenseIsReceived: boolean;
  testCategory: TestCategory;

  manualMessage: string = 'A <b><em>manual</em></b> licence will be issued';
  automaticMessage: string =
    'An <b><em>automatic</em></b> licence will be issued';
  askCandidateLicenseMessage: string =
    `Check that the candidate doesn't need their driving licence (e.g CPC Mod4)`;
  constructor(
    public store$: Store<StoreModel>,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private outcomeBehaviourProvider: OutcomeBehaviourMapProvider,
  ) {
    super(platform, navController, authenticationProvider);
    this.form = new FormGroup({});
    this.outcomeBehaviourProvider.setBehaviourMap(behaviourMap);
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
      testOutcomeText$: currentTest$.pipe(select(getTestOutcomeText)),
      applicationNumber$: currentTest$.pipe(
        select(getJournalData),
        select(getApplicationReference),
        select(getApplicationNumber),
      ),
      provisionalLicense$: currentTest$.pipe(
        select(getPassCompletion),
        select(isProvisionalLicenseProvided),
      ),
      passCertificateNumber$: currentTest$.pipe(
        select(getPassCompletion),
        select(getPassCertificateNumber),
      ),
      transmission$: currentTest$.pipe(
        select(getVehicleDetails),
        select(getGearboxCategory),
      ),
      debriefWitnessed$: currentTest$.pipe(
        select(getTestSummary),
        select(isDebriefWitnessed),
      ),
      d255$: currentTest$.pipe(
        select(getTestSummary),
        select(getD255),
      ),
      conductedLanguage$: currentTest$.pipe(
        select(getCommunicationPreference),
        select(getConductedLanguage),
      ),
      code78$: currentTest$.pipe(
        select(getPassCompletion),
        select(getCode78),
      ),
      testCategory$: currentTest$.pipe(
        select(getTestCategory),
      ),
    };

    const { transmission$, code78$, provisionalLicense$, testCategory$ } = this.pageState;

    this.merged$ = merge(
      transmission$.pipe(map(value => this.transmission = value)),
      code78$.pipe(map(value => this.code78Present = value)),
      provisionalLicense$.pipe(map(value => this.provisionalLicenseIsReceived = value)),
      testCategory$.pipe(map(value => this.testCategory = value as TestCategory)),
    );
    this.subscription = this.merged$.subscribe();
  }

  ionViewDidLeave(): void {
    if (this.inputSubscriptions) {
      this.inputSubscriptions.forEach(sub => sub.unsubscribe());
    }
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new PassFinalisationViewDidEnter());
  }

  provisionalLicenseReceived(): void {
    this.store$.dispatch(new ProvisionalLicenseReceived());
  }

  provisionalLicenseNotReceived(): void {
    this.store$.dispatch(new ProvisionalLicenseNotReceived());
  }

  transmissionChanged(transmission: GearboxCategory): void {
    this.store$.dispatch(new GearboxCategoryChanged(transmission));
  }

  onCode78Present(present: boolean) {
    if (present) {
      this.store$.dispatch(new Code78Present());
    } else {
      this.store$.dispatch(new Code78NotPresent());
    }
  }

  onSubmit() {
    Object.keys(this.form.controls).forEach(controlName =>
      this.form.controls[controlName].markAsDirty(),
    );
    if (this.form.valid) {
      this.store$.dispatch(new PersistTests());
      this.navController.push(CAT_C.HEALTH_DECLARATION_PAGE);
      return;
    }
    Object.keys(this.form.controls).forEach((controlName) => {
      if (this.form.controls[controlName].invalid) {
        if (controlName === PASS_CERTIFICATE_NUMBER_CTRL) {
          this.store$.dispatch(
            new PassFinalisationValidationError(`${controlName} is invalid`),
          );
        }
        this.store$.dispatch(
          new PassFinalisationValidationError(`${controlName} is blank`),
        );
      }
    });
  }

  passCertificateNumberChanged(passCertificateNumber: string): void {
    this.store$.dispatch(
      new PassCertificateNumberChanged(passCertificateNumber),
    );
  }

  d255Changed(d255: boolean): void {
    this.store$.dispatch(d255 ? new D255Yes() : new D255No());
  }

  debriefWitnessedChanged(debriefWitnessed: boolean) {
    this.store$.dispatch(
      debriefWitnessed ? new DebriefWitnessed() : new DebriefUnwitnessed(),
    );
  }

  isWelshChanged(isWelsh: boolean) {
    this.store$.dispatch(
      isWelsh
        ? new CandidateChoseToProceedWithTestInWelsh('Cymraeg')
        : new CandidateChoseToProceedWithTestInEnglish('English'),
    );
  }

  shouldShowCode78Banner(): boolean {
    return this.code78Present !== null && this.transmission !== null && this.shouldShowCode78();
  }

  shouldShowManualBanner(): boolean {
    if (this.shouldShowCode78Banner()) {
      return (
        this.transmission === TransmissionType.Manual ||
        (this.transmission === TransmissionType.Automatic &&
          !this.code78Present)
      );
    }
    return false;
  }

  shouldShowAutomaticBanner(): boolean {
    if (this.shouldShowCode78Banner()) {
      return (
        this.code78Present && this.transmission === TransmissionType.Automatic
      );
    }
    return false;
  }

  shouldHideLicenseProvidedBanner(): boolean {
    return this.provisionalLicenseIsReceived === null;
  }

  shouldShowCandidateDoesntNeedLicenseBanner(): boolean {
    return this.provisionalLicenseIsReceived;
  }

  shouldShowCode78(): boolean {
    return this.testCategory === TestCategory.C || this.testCategory === TestCategory.CE;
  }
}
