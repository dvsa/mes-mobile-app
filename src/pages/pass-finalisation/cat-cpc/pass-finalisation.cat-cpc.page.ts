import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/AM2';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { Observable, Subscription, merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { StoreModel } from '../../../shared/models/store.model';
import { PassFinalisationViewDidEnter, PassFinalisationValidationError } from '../pass-finalisation.actions';
import { PassCertificateNumberChanged } from '../../../modules/tests/pass-completion/pass-completion.actions';
import { getPassCertificateNumber } from '../../../modules/tests/pass-completion/pass-completion.selector';
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
import { getTests } from '../../../modules/tests/tests.reducer';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { CAT_CPC } from '../../page-names.constants';
import { getTestSummary } from '../../../modules/tests/test-summary/common/test-summary.reducer';
import { isDebriefWitnessed } from '../../../modules/tests/test-summary/common/test-summary.selector';
import { DebriefWitnessed, DebriefUnwitnessed } from '../../../modules/tests/test-summary/common/test-summary.actions';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../../office/office-behaviour-map.cat-cpc';
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
import { PASS_CERTIFICATE_NUMBER_CTRL } from '../components/pass-certificate-number/pass-certificate-number.constants';
import { getPassCompletion } from '../../../modules/tests/pass-completion/cat-cpc/pass-completion.cat-cpc.reducer';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';

interface PassFinalisationPageState {
  candidateName$: Observable<string>;
  candidateUntitledName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  testOutcomeText$: Observable<string>;
  applicationNumber$: Observable<string>;
  passCertificateNumber$: Observable<string>;
  debriefWitnessed$: Observable<boolean>;
  conductedLanguage$: Observable<string>;
  testCategory$: Observable<CategoryCode>;
}

@IonicPage()
@Component({
  selector: '.pass-finalisation-cat-cpc-page',
  templateUrl: 'pass-finalisation.cat-cpc.page.html',
})
export class PassFinalisationCatCPCPage extends BasePageComponent {

  pageState: PassFinalisationPageState;
  passCertificateCtrl: string = PASS_CERTIFICATE_NUMBER_CTRL;
  @ViewChild('passCertificateNumberInput')
  passCertificateNumberInput: ElementRef;
  inputSubscriptions: Subscription[] = [];
  testOutcome: string = ActivityCodes.PASS;
  form: FormGroup;
  merged$: Observable<string | boolean>;
  subscription: Subscription;
  testCategory: TestCategory;

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
      testOutcomeText$: currentTest$.pipe(
        select(getTestOutcomeText),
      ),
      applicationNumber$: currentTest$.pipe(
        select(getJournalData),
        select(getApplicationReference),
        select(getApplicationNumber),
      ),
      passCertificateNumber$: currentTest$.pipe(
        select(getPassCompletion),
        select(getPassCertificateNumber),
      ),
      debriefWitnessed$: currentTest$.pipe(
        select(getTestSummary),
        select(isDebriefWitnessed),
      ),
      conductedLanguage$: currentTest$.pipe(
        select(getCommunicationPreference),
        select(getConductedLanguage),
      ),
      testCategory$: currentTest$.pipe(
        select(getTestCategory),
      ),
    };

    const { testCategory$ } = this.pageState;

    this.merged$ = merge(
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

  onSubmit() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());

    if (this.form.valid) {
      this.store$.dispatch(new PersistTests());
      this.navController.push(CAT_CPC.HEALTH_DECLARATION_PAGE);
      return;
    }
    Object.keys(this.form.controls).forEach((controlName: string): void => {
      if (this.form.controls[controlName].invalid) {
        if (controlName === PASS_CERTIFICATE_NUMBER_CTRL) {
          this.store$.dispatch(new PassFinalisationValidationError(`${controlName} is invalid`));
        }
        this.store$.dispatch(new PassFinalisationValidationError(`${controlName} is blank`));
      }
    });
  }

  passCertificateNumberChanged(passCertificateNumber: string): void {
    this.store$.dispatch(new PassCertificateNumberChanged(passCertificateNumber));
  }

  debriefWitnessedChanged(debriefWitnessed: boolean): void {
    this.store$.dispatch(debriefWitnessed ? new DebriefWitnessed() : new DebriefUnwitnessed());
  }

  isWelshChanged(isWelsh: boolean): void {
    this.store$.dispatch(
      isWelsh
        ? new CandidateChoseToProceedWithTestInWelsh('Cymraeg')
        : new CandidateChoseToProceedWithTestInEnglish('English'),
    );
  }
}
