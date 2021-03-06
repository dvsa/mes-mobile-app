import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  ToastController,
  Toast,
  Keyboard,
  AlertController,
} from 'ionic-angular';
import { Component } from '@angular/core';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';
import { StoreModel } from '../../../shared/models/store.model';
import {
  OfficeViewDidEnter,
  CompleteTest,
  SavingWriteUpForLater,
  OfficeValidationError,
  TestStartDateChanged,
} from '../office.actions';
import { merge, Observable, Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import {
  getCurrentTest,
  getTestOutcome,
  isTestOutcomeSet,
  isPassed,
  getTestOutcomeText,
  getActivityCode,
  getJournalData,
} from '../../../modules/tests/tests.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import {
  getCandidateDescription,
  getAdditionalInformation,
  getIdentification, isDebriefWitnessed,
} from '../../../modules/tests/test-summary/common/test-summary.selector';
import { getTestSummary } from '../../../modules/tests/test-summary/common/test-summary.reducer';
import {
  IdentificationUsedChanged,
  CandidateDescriptionChanged,
  AdditionalInformationChanged, DebriefWitnessed, DebriefUnwitnessed,
} from '../../../modules/tests/test-summary/common/test-summary.actions';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import {
  getCandidateName,
  getCandidateDriverNumber,
  formatDriverNumber,
} from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import {
  getTestSlotAttributes,
} from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.reducer';
import { getTestDate, getTestStartDateTime, getTestTime }
  from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.selector';
import { PersistTests, SendCurrentTest } from '../../../modules/tests/tests.actions';
import {
  Identification,
} from '@dvsa/mes-test-schema/categories/common';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../office-behaviour-map.cat-cpc';
import { ActivityCodeModel, getActivityCodeOptions } from '../components/activity-code/activity-code.constants';
import { getRekeyIndicator } from '../../../modules/tests/rekey/rekey.reducer';
import { isRekey } from '../../../modules/tests/rekey/rekey.selector';
import { CAT_CPC, DELEGATED_REKEY_UPLOAD_OUTCOME_PAGE, JOURNAL_PAGE } from '../../page-names.constants';

import { AssessmentReportChanged } from '../../../modules/tests/test-summary/cat-cpc/test-summary.cat-cpc.actions';
import { getAssessmentReport } from '../../../modules/tests/test-summary/cat-cpc/test-summary.cat-cpc.selector';
import {
  getCombination, getTotalPercent,
  getQuestion1, getQuestion2, getQuestion3, getQuestion4, getQuestion5,
} from '../../../modules/tests/test-data/cat-cpc/test-data.cat-cpc.selector';
import { getTestData } from '../../../modules/tests/test-data/cat-cpc/test-data.cat-cpc.reducer';
import { CombinationCodes, Question, Question5 } from '@dvsa/mes-test-schema/categories/CPC';
import { getTestOutcome as getTestOutcomeDebrief } from '../../debrief/debrief.selector';
import {
  Combination,
  questionCombinations,
} from '../../../shared/constants/cpc-questions/cpc-question-combinations.constants';
import { TestOutcome } from '../../../shared/models/test-outcome';
import { AppConfigProvider } from '../../../providers/app-config/app-config';
import { ExaminerRole } from '../../../providers/app-config/constants/examiner-role.constants';
import { getDelegatedTestIndicator } from '../../../modules/tests/delegated-test/delegated-test.reducer';
import { isDelegatedTest } from '../../../modules/tests/delegated-test/delegated-test.selector';
import { getApplicationReference }
 from '../../../modules/tests/journal-data/common/application-reference/application-reference.reducer';
import { getApplicationNumber }
 from '../../../modules/tests/journal-data/common/application-reference/application-reference.selector';
import {
  CandidateChoseToProceedWithTestInEnglish,
  CandidateChoseToProceedWithTestInWelsh,
} from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { Language } from '../../../modules/tests/communication-preferences/communication-preferences.model';
import { PassCertificateNumberChanged } from '../../../modules/tests/pass-completion/pass-completion.actions';
import * as postTestDeclarationsActions
  from '../../../modules/tests/post-test-declarations/post-test-declarations.actions';
import { getPassCompletion } from '../../../modules/tests/pass-completion/pass-completion.reducer';
import { getPassCertificateNumber } from '../../../modules/tests/pass-completion/pass-completion.selector';
import { getPostTestDeclarations } from '../../../modules/tests/post-test-declarations/post-test-declarations.reducer';
import { getReceiptDeclarationStatus }
 from '../../../modules/tests/post-test-declarations/post-test-declarations.selector';
import { SetActivityCode } from '../../../modules/tests/activity-code/activity-code.actions';
import { get } from 'lodash';
import { SetRekeyDate } from '../../../modules/tests/rekey-date/rekey-date.actions';
import { SetStartDate }
  from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.actions';
import { getNewTestStartTime } from '../../../shared/helpers/test-start-time';

interface OfficePageState {
  activityCode$: Observable<ActivityCodeModel>;
  applicationNumber$: Observable<string>;
  startTime$: Observable<string>;
  startDate$: Observable<string>;
  startDateTime$: Observable<string>;
  testOutcome$: Observable<string>;
  testOutcomeText$: Observable<string>;
  isPassed$: Observable<boolean>;
  isTestOutcomeSet$: Observable<boolean>;
  candidateName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  displayCandidateDescription$: Observable<boolean>;
  candidateDescription$: Observable<string>;
  displayIdentification$: Observable<boolean>;
  identification$: Observable<Identification>;
  combination$: Observable<string>;
  displayAdditionalInformation$: Observable<boolean>;
  additionalInformation$: Observable<string>;
  assessmentReport$: Observable<string>;
  overallScore$: Observable<number>;
  question1$: Observable<Question>;
  question2$: Observable<Question>;
  question3$: Observable<Question>;
  question4$: Observable<Question>;
  question5$: Observable<Question5>;
  testResult$: Observable<string>;
  isRekey$: Observable<boolean>;
  delegatedTest$: Observable<boolean>;
  debriefWitnessed$: Observable<boolean>;
  passCertificateNumber$: Observable<string>;
  passCertificateNumberReceived$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: '.office-cat-cpc-page',
  templateUrl: 'office.cat-cpc.page.html',
})
export class OfficeCatCPCPage extends BasePageComponent {
  pageState: OfficePageState;
  form: FormGroup;
  toast: Toast;
  subscription: Subscription;
  isDelegated: boolean;
  conductedLanguage: string = Language.ENGLISH;
  startDateTime: string;
  isValidStartDateTime: boolean = true;

  public outcome: TestOutcome;
  combinationCode: CombinationCodes;

  activityCodeOptions: ActivityCodeModel[];

  constructor(
    private store$: Store<StoreModel>,
    public toastController: ToastController,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public keyboard: Keyboard,
    private outcomeBehaviourProvider: OutcomeBehaviourMapProvider,
    public alertController: AlertController,
    public appConfig: AppConfigProvider,
  ) {
    super(platform, navController, authenticationProvider);
    this.form = new FormGroup({});
    this.outcomeBehaviourProvider.setBehaviourMap(behaviourMap);
    this.activityCodeOptions = getActivityCodeOptions(this.appConfig.getAppConfig().role === ExaminerRole.DLG);
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new OfficeViewDidEnter());
  }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );
    this.pageState = {
      activityCode$: currentTest$.pipe(
        select(getActivityCode),
      ),
      startTime$: currentTest$.pipe(
        select(getJournalData),
        select(getTestSlotAttributes),
        select(getTestTime),
      ),
      startDate$: currentTest$.pipe(
        select(getJournalData),
        select(getTestSlotAttributes),
        select(getTestDate),
      ),
      startDateTime$: currentTest$.pipe(
        select(getJournalData),
        select(getTestSlotAttributes),
        select(getTestStartDateTime),
      ),
      testOutcome$: currentTest$.pipe(
        select(getTestOutcome),
      ),
      testOutcomeText$: currentTest$.pipe(
        select(getTestOutcomeText),
      ),
      isPassed$: currentTest$.pipe(
        select(isPassed),
      ),
      isTestOutcomeSet$: currentTest$.pipe(
        select(isTestOutcomeSet),
      ),
      candidateName$: currentTest$.pipe(
        select(getJournalData),
        select(getCandidate),
        select(getCandidateName),
      ),
      candidateDriverNumber$: currentTest$.pipe(
        select(getJournalData),
        select(getCandidate),
        select(getCandidateDriverNumber),
        map(formatDriverNumber),
      ),
      displayCandidateDescription$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(getCandidateDescription))),
        map(([outcome, candidate]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'candidateDescription', candidate)),
      ),
      candidateDescription$: currentTest$.pipe(
        select(getTestSummary),
        select(getCandidateDescription),
      ),
      displayIdentification$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(getIdentification))),
        map(([outcome, identification]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'identification', identification)),
      ),
      identification$: currentTest$.pipe(
        select(getTestSummary),
        select(getIdentification),
      ),
      combination$: currentTest$.pipe(
        select(getTestData),
        select(getCombination),
      ),
      displayAdditionalInformation$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(getAdditionalInformation))),
        map(([outcome, additional]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'additionalInformation', additional)),
      ),
      additionalInformation$: currentTest$.pipe(
        select(getTestSummary),
        select(getAdditionalInformation),
      ),
      assessmentReport$: currentTest$.pipe(
        select(getTestSummary),
        select(getAssessmentReport),
      ),
      overallScore$: currentTest$.pipe(
        select(getTestData),
        select(getTotalPercent),
      ),
      question1$: currentTest$.pipe(
        select(getTestData),
        select(getQuestion1),
      ),
      question2$: currentTest$.pipe(
        select(getTestData),
        select(getQuestion2),
      ),
      question3$: currentTest$.pipe(
        select(getTestData),
        select(getQuestion3),
      ),
      question4$: currentTest$.pipe(
        select(getTestData),
        select(getQuestion4),
      ),
      question5$: currentTest$.pipe(
        select(getTestData),
        select(getQuestion5),
      ),
      testResult$: currentTest$.pipe(
        select(getTestOutcomeDebrief),
      ),
      isRekey$: currentTest$.pipe(
        select(getRekeyIndicator),
        select(isRekey),
      ),
      delegatedTest$: currentTest$.pipe(
        select(getDelegatedTestIndicator),
        select(isDelegatedTest),
      ),
      applicationNumber$: currentTest$.pipe(
        select(getJournalData),
        select(getApplicationReference),
        select(getApplicationNumber),
      ),
      debriefWitnessed$: currentTest$.pipe(
        select(getTestSummary),
        select(isDebriefWitnessed),
      ),
      passCertificateNumber$: currentTest$.pipe(
        select(getPassCompletion),
        select(getPassCertificateNumber),
      ),
      passCertificateNumberReceived$: currentTest$.pipe(
        select(getPostTestDeclarations),
        select(getReceiptDeclarationStatus),
      ),
    };

    const {
      testResult$,
      combination$,
      delegatedTest$,
      startDateTime$,
    } = this.pageState;

    this.subscription = merge(
      testResult$.pipe(map(result => this.outcome = result as TestOutcome)),
      combination$.pipe(map(result => this.combinationCode = result as CombinationCodes)),
      delegatedTest$.pipe(map(value => this.isDelegated = value)),
      startDateTime$.pipe(map(value => this.startDateTime = value)),
    ).subscribe();

  }

  popToRoot() {
    const journalPage = this.navController.getViews().find(view => view.id === JOURNAL_PAGE);
    this.navController.popTo(journalPage);
  }

  defer() {
    this.popToRoot();
    this.store$.dispatch(new SavingWriteUpForLater());
    this.store$.dispatch(new PersistTests());
  }

  getCombinationAdditionalText(code: CombinationCodes): string {
    const question: Combination = questionCombinations.find((question) => {
      return question.code === code;
    });

    return question ? question.additionalText || null : null;
  }

  isFail(): boolean {
    return this.outcome === TestOutcome.FAIL;
  }

  isPass(): boolean {
    return this.outcome === TestOutcome.PASS;
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.showFinishTestModal();
    }
  }

  setIsValidStartDateTime(isValid: boolean) {
    this.isValidStartDateTime = isValid;
  }

  dateOfTestChanged(inputDate: string) {
    const customStartDate = getNewTestStartTime(inputDate, this.startDateTime);
    this.store$.dispatch(new TestStartDateChanged(this.startDateTime, customStartDate));
    this.store$.dispatch(new SetStartDate(customStartDate));
  }

  candidateDescriptionChanged(candidateDescription: string) {
    this.store$.dispatch(new CandidateDescriptionChanged(candidateDescription));
  }

  identificationChanged(identification: Identification): void {
    this.store$.dispatch(new IdentificationUsedChanged(identification));
  }

  additionalInformationChanged(additionalInformation: string): void {
    this.store$.dispatch(new AdditionalInformationChanged(additionalInformation));
  }

  activityCodeChanged(activityCodeModel: ActivityCodeModel) {
    const showMeQuestion = get(this.form.controls, 'showMeQuestion.value.code', null);
    if (showMeQuestion === 'N/A') {
      this.form.controls['showMeQuestion'].setValue({});
    }
    this.store$.dispatch(new SetActivityCode(activityCodeModel.activityCode));
  }

  assessmentReportChanged(assessmentReport: string): void {
    this.store$.dispatch(new AssessmentReportChanged(assessmentReport));
  }

  private createToast = (errorMessage: string) => {
    this.toast = this.toastController.create({
      message: errorMessage,
      position: 'top',
      dismissOnPageChange: true,
      cssClass: 'mes-toast-message-error',
      duration: 5000,
      showCloseButton: true,
      closeButtonText: 'X',
    });
  }

  showFinishTestModal() {
    const alert = this.alertController.create({
      title: 'Are you sure you wish to mark the write up for this test as complete?',
      cssClass: 'finish-test-modal',
      buttons: [
        {
          text: 'Back',
          handler: () => { },
        },
        {
          text: 'Continue',
          handler: () => this.completeTest(),
        },
      ],
    });
    alert.present();
  }

  goToReasonForRekey() {
    if (this.isFormValid()) {
      this.navController.push(CAT_CPC.REKEY_REASON_PAGE);
    }
  }

  passCertificateNumberChanged(passCertificateNumber: string): void {
    this.store$.dispatch(new PassCertificateNumberChanged(passCertificateNumber));
    if (!this.isDelegated) {
      this.store$.dispatch(
        new postTestDeclarationsActions.PassCertificateNumberRecieved(
          this.form.get('passCertificateNumberCtrl').valid,
        ),
      );
    }
  }

  isFormValid() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      return true;
    }
    Object.keys(this.form.controls).forEach((controlName) => {
      if (this.form.controls[controlName].invalid) {
        this.store$.dispatch(new OfficeValidationError(`${controlName} is blank`));
      }
    });
    this.createToast('Fill all mandatory fields');
    this.toast.present();
    return false;
  }

  completeTest() {
    if (!this.isDelegated) {
      this.store$.dispatch(new CompleteTest());
      this.popToRoot();
    } else {
      this.store$.dispatch(new SetRekeyDate());
      this.store$.dispatch(new SendCurrentTest());
      this.navController.push(DELEGATED_REKEY_UPLOAD_OUTCOME_PAGE);
    }
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();

    }
  }

  isWelshChanged(isWelsh: boolean) {
    this.store$.dispatch(
      isWelsh
        ? new CandidateChoseToProceedWithTestInWelsh('Cymraeg')
        : new CandidateChoseToProceedWithTestInEnglish('English'),
    );
  }

  isWelsh(): boolean {
    return this.conductedLanguage === Language.CYMRAEG;
  }

  passCertificateDeclarationChanged(passCertificateSigned: boolean): void {
    this.store$.dispatch(new postTestDeclarationsActions.PassCertificateNumberRecieved(passCertificateSigned));
  }

  debriefWitnessedChanged(debriefWitnessed: boolean) {
    this.store$.dispatch(
      debriefWitnessed ? new DebriefWitnessed() : new DebriefUnwitnessed(),
    );
  }

}
