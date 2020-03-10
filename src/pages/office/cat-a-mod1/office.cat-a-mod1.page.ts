import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  ToastController,
  Toast, Keyboard, AlertController,
} from 'ionic-angular';
import { Component } from '@angular/core';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import {
  OfficeViewDidEnter,
  CompleteTest,
  SavingWriteUpForLater,
  OfficeValidationError,
} from '../office.actions';
import { Observable } from 'rxjs';
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
  getWeatherConditions,
  getIdentification,
} from '../../../modules/tests/test-summary/common/test-summary.selector';
import { getTestSummary } from '../../../modules/tests/test-summary/common/test-summary.reducer';
import { map, withLatestFrom } from 'rxjs/operators';
import {
  IdentificationUsedChanged,
  CandidateDescriptionChanged,
  WeatherConditionsChanged,
  AdditionalInformationChanged,
} from '../../../modules/tests/test-summary/common/test-summary.actions';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import {
  getCandidateName,
  getCandidateDriverNumber,
  formatDriverNumber,
} from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { QuestionProvider } from '../../../providers/question/question';
import {
  getTestSlotAttributes,
} from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.reducer';
import { getTestTime }
  from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.selector';
import {
  getETA,
  getETAFaultText,
} from '../../../modules/tests/test-data/common/test-data.selector';
import { getTestData } from '../../../modules/tests/test-data/cat-a-mod1/test-data.cat-a-mod1.reducer';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { WeatherConditionSelection } from '../../../providers/weather-conditions/weather-conditions.model';
import { WeatherConditionProvider } from '../../../providers/weather-conditions/weather-condition';
import {
  WeatherConditions,
  Identification,
} from '@dvsa/mes-test-schema/categories/common';
import {
  AddDangerousFaultComment,
} from '../../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import { AddSeriousFaultComment } from '../../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import { AddDrivingFaultComment } from '../../../modules/tests/test-data/common/driving-faults/driving-faults.actions';
import { CommentSource, FaultSummary } from '../../../shared/models/fault-marking.model';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../office-behaviour-map.cat-a-mod1';
import { ActivityCodeModel, activityCodeModelList } from '../components/activity-code/activity-code.constants';
import { getRekeyIndicator } from '../../../modules/tests/rekey/rekey.reducer';
import { isRekey } from '../../../modules/tests/rekey/rekey.selector';
import { CAT_A_MOD1, JOURNAL_PAGE } from '../../page-names.constants';
import { SetActivityCode } from '../../../modules/tests/activity-code/activity-code.actions';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { TestData, Circuit, EmergencyStop, Avoidance } from '@dvsa/mes-test-schema/categories/AM1';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { getCircuit } from '../../../modules/tests/test-summary/cat-a-mod1/test-summary.cat-a-mod1.selector';
import { CircuitTypeChanged } from '../../../modules/tests/test-summary/cat-a-mod1/test-summary.cat-a-mod1.actions';
import { getEmergencyStop } from '../../../modules/tests/test-data/cat-a-mod1/emergency-stop/emergency-stop.selector';
import {
  getAvoidance,
  getAvoidanceAttempted,
} from '../../../modules/tests/test-data/cat-a-mod1/avoidance/avoidance.selector';
import {
  CANDIDATE_DESCRIPTION_MAX_LENGTH,
  CANDIDATE_DESCRIPTION_CONTROL,
} from '../components/candidate-description/candidate-description.constants';
import {
  AddSingleFaultCompetencyComment,
} from '../../../modules/tests/test-data/common/single-fault-competencies/single-fault-competencies.actions';
import { SingleFaultCompetencyNames, Competencies } from '../../../modules/tests/test-data/test-data.constants';
import { AddAvoidanceComment } from '../../../modules/tests/test-data/cat-a-mod1/avoidance/avoidance.actions';
import { AddAnEmergencyStopComment }
from '../../../modules/tests/test-data/cat-a-mod1/emergency-stop/emergency-stop.actions';
import { startsWith } from 'lodash';

interface OfficePageState {
  activityCode$: Observable<ActivityCodeModel>;
  startTime$: Observable<string>;
  testOutcome$: Observable<string>;
  testOutcomeText$: Observable<string>;
  isPassed$: Observable<boolean>;
  isTestOutcomeSet$: Observable<boolean>;
  candidateName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  displayCandidateDescription$: Observable<boolean>;
  displayIdentification$: Observable<boolean>;
  displayWeatherConditions$: Observable<boolean>;
  displayAdditionalInformation$: Observable<boolean>;
  displayEta$: Observable<boolean>;
  displayDrivingFault$: Observable<boolean>;
  displaySeriousFault$: Observable<boolean>;
  displayDangerousFault$: Observable<boolean>;
  identification$: Observable<Identification>;
  candidateDescription$: Observable<string>;
  additionalInformation$: Observable<string>;
  etaFaults$: Observable<string>;
  drivingFaults$: Observable<FaultSummary[]>;
  drivingFaultCount$: Observable<number>;
  displayDrivingFaultComments$: Observable<boolean>;
  weatherConditions$: Observable<WeatherConditions[]>;
  dangerousFaults$: Observable<FaultSummary[]>;
  seriousFaults$: Observable<FaultSummary[]>;
  isRekey$: Observable<boolean>;
  displayCircuit$: Observable<boolean>;
  circuit$: Observable<Circuit>;
  emergencyStop$: Observable<EmergencyStop>;
  avoidance$: Observable<Avoidance>;
  avoidanceAttempted$: Observable<boolean>;
  displaySpeedRequirements$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: '.office-cat-a-mod1-page',
  templateUrl: 'office.cat-a-mod1.page.html',
})
export class OfficeCatAMod1Page extends BasePageComponent {
  pageState: OfficePageState;
  form: FormGroup;
  toast: Toast;
  drivingFaultCtrl: string = 'drivingFaultCtrl';
  seriousFaultCtrl: string = 'seriousFaultCtrl';
  dangerousFaultCtrl: string = 'dangerousFaultCtrl';
  static readonly maxFaultCount = 5;

  weatherConditions: WeatherConditionSelection[];
  activityCodeOptions: ActivityCodeModel[];

  constructor(
    private store$: Store<StoreModel>,
    public toastController: ToastController,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private weatherConditionProvider: WeatherConditionProvider,
    public questionProvider: QuestionProvider,
    public keyboard: Keyboard,
    private outcomeBehaviourProvider: OutcomeBehaviourMapProvider,
    public alertController: AlertController,
    private faultCountProvider: FaultCountProvider,
    private faultSummaryProvider: FaultSummaryProvider,
  ) {
    super(platform, navController, authenticationProvider);
    this.form = new FormGroup({});
    this.weatherConditions = this.weatherConditionProvider.getWeatherConditions();
    this.outcomeBehaviourProvider.setBehaviourMap(behaviourMap);
    this.activityCodeOptions = activityCodeModelList;
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new OfficeViewDidEnter());
  }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );
    const testCategory$ = currentTest$.pipe(
      select(getTestCategory),
      // We need this as TestCategory but it comes as CategoryCode.
      map(testCategory => testCategory as TestCategory),
    );

    this.pageState = {
      activityCode$: currentTest$.pipe(
        select(getActivityCode),
      ),
      isRekey$: currentTest$.pipe(
        select(getRekeyIndicator),
        select(isRekey),
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
      startTime$: currentTest$.pipe(
        select(getJournalData),
        select(getTestSlotAttributes),
        select(getTestTime),
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
      displayIdentification$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(getIdentification))),
        map(([outcome, identification]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'identification', identification)),
      ),
      displayWeatherConditions$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(getWeatherConditions))),
        map(([outcome, weather]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'weatherConditions', weather)),
      ),
      displayAdditionalInformation$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(getAdditionalInformation))),
        map(([outcome, additional]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'additionalInformation', additional)),
      ),
      displayEta$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestData),
          select(getETA))),
        map(([outcome, eta]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'eta', eta)),
      ),
      displayDrivingFault$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(
          currentTest$.pipe(
            select(getTestData),
          ),
          testCategory$,
        ),
        map(([outcome, data, category]) =>
          this.outcomeBehaviourProvider.isVisible(
            outcome,
            'faultComment',
            this.faultSummaryProvider.getDrivingFaultsList(data, category),
          )),
      ),
      displaySeriousFault$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(
          currentTest$.pipe(
            select(getTestData),
          ),
          testCategory$,
        ),
        map(([outcome, data, category]) =>
          this.outcomeBehaviourProvider.isVisible(
            outcome,
            'faultComment',
            this.faultSummaryProvider.getSeriousFaultsList(data, category),
          )),
      ),
      displayDangerousFault$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(
          currentTest$.pipe(
            select(getTestData),
          ),
          testCategory$,
        ),
        map(([outcome, data, category]) =>
          this.outcomeBehaviourProvider.isVisible(
            outcome,
            'faultComment',
            this.faultSummaryProvider.getDrivingFaultsList(data, category),
          )),
      ),
      candidateDescription$: currentTest$.pipe(
        select(getTestSummary),
        select(getCandidateDescription),
      ),
      identification$: currentTest$.pipe(
        select(getTestSummary),
        select(getIdentification),
      ),
      additionalInformation$: currentTest$.pipe(
        select(getTestSummary),
        select(getAdditionalInformation),
      ),
      etaFaults$: currentTest$.pipe(
        select(getTestData),
        select(getETA),
        select(getETAFaultText),
      ),
      dangerousFaults$: currentTest$.pipe(
        select(getTestData),
        withLatestFrom(testCategory$),
        map(([data, category]) => this.faultSummaryProvider.getDangerousFaultsList(data, category)),
      ),
      seriousFaults$: currentTest$.pipe(
        select(getTestData),
        withLatestFrom(testCategory$),
        map(([data, category]) => this.faultSummaryProvider.getSeriousFaultsList(data, category)),
      ),
      drivingFaults$: currentTest$.pipe(
        select(getTestData),
        withLatestFrom(testCategory$),
        map(([data, category]) => this.faultSummaryProvider.getDrivingFaultsList(data, category)),
      ),
      drivingFaultCount$: currentTest$.pipe(
        select(getTestData),
        withLatestFrom(testCategory$),
        map(([data, category]) => this.faultCountProvider.getDrivingFaultSumCount(category, data)),
      ),
      displayDrivingFaultComments$: currentTest$.pipe(
        select(getTestData),
        withLatestFrom(testCategory$),
        map(([data, category]) => this.shouldDisplayDrivingFaultComments(data, category)),
      ),
      weatherConditions$: currentTest$.pipe(
        select(getTestSummary),
        select(getWeatherConditions),
      ),
      displayCircuit$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(getCircuit))),
        map(([outcome, circuit]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'circuit', circuit)),
      ),
      circuit$: currentTest$.pipe(
        select(getTestSummary),
        select(getCircuit),
      ),
      emergencyStop$: currentTest$.pipe(
        select(getTestData),
        select(getEmergencyStop),
      ),
      avoidance$: currentTest$.pipe(
        select(getTestData),
        select(getAvoidance),
      ),
      avoidanceAttempted$: currentTest$.pipe(
        select(getTestData),
        select(getAvoidance),
        select(getAvoidanceAttempted),
      ),
      displaySpeedRequirements$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(
          currentTest$.pipe(
            select(getTestData),
            select(getEmergencyStop),
          ),
        ),
        map(([outcome, emergencyStop]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'speedRequirement', emergencyStop.firstAttempt)),
      ),
    };
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

  onSubmit() {
    if (this.isFormValid()) {
      this.showFinishTestModal();
    }
  }

  identificationChanged(identification: Identification): void {
    this.store$.dispatch(new IdentificationUsedChanged(identification));
  }

  weatherConditionsChanged(weatherConditions: WeatherConditions[]): void {
    this.store$.dispatch(new WeatherConditionsChanged(weatherConditions));
  }

  candidateDescriptionChanged(candidateDescription: string) {
    this.store$.dispatch(new CandidateDescriptionChanged(candidateDescription));
  }

  additionalInformationChanged(additionalInformation: string): void {
    this.store$.dispatch(new AdditionalInformationChanged(additionalInformation));
  }

  circuitChanged(circuit: Circuit): void {
    this.store$.dispatch(new CircuitTypeChanged(circuit));
  }

  dangerousFaultCommentChanged(dangerousFaultComment: FaultSummary) {
    if (dangerousFaultComment.source === CommentSource.SIMPLE) {
      this.store$.dispatch(
        new AddDangerousFaultComment(dangerousFaultComment.competencyIdentifier, dangerousFaultComment.comment),
      );
    } else if (dangerousFaultComment.source === CommentSource.SINGLE_FAULT_COMPETENCY) {
      this.store$.dispatch(new AddSingleFaultCompetencyComment(
        dangerousFaultComment.competencyIdentifier as SingleFaultCompetencyNames,
        dangerousFaultComment.comment,
      ));
    }
  }

  seriousFaultCommentChanged(seriousFaultComment: FaultSummary) {
    if (seriousFaultComment.source === CommentSource.SIMPLE) {
      this.store$.dispatch(
        new AddSeriousFaultComment(seriousFaultComment.competencyIdentifier, seriousFaultComment.comment),
      );
    } else if (seriousFaultComment.source === CommentSource.SINGLE_FAULT_COMPETENCY) {
      this.store$.dispatch(new AddSingleFaultCompetencyComment(
        seriousFaultComment.competencyIdentifier as SingleFaultCompetencyNames,
        seriousFaultComment.comment,
      ));
    } else if (startsWith(seriousFaultComment.source, CommentSource.SPEED_REQUIREMENTS)) {
      const segments = seriousFaultComment.source.split('-');
      const fieldName = segments[1];
      switch (fieldName) {
        case Competencies.speedCheckAvoidance:
          this.store$.dispatch(new AddAvoidanceComment(seriousFaultComment.comment));
          break;
        case Competencies.speedCheckEmergency:
          this.store$.dispatch(new AddAnEmergencyStopComment(seriousFaultComment.comment));
          break;
      }
    }
  }

  drivingFaultCommentChanged(drivingFaultComment: FaultSummary) {
    if (drivingFaultComment.source === CommentSource.SIMPLE) {
      this.store$.dispatch(
        new AddDrivingFaultComment(drivingFaultComment.competencyIdentifier, drivingFaultComment.comment),
      );
    } else if (drivingFaultComment.source === CommentSource.SINGLE_FAULT_COMPETENCY) {
      this.store$.dispatch(new AddSingleFaultCompetencyComment(
        drivingFaultComment.competencyIdentifier as SingleFaultCompetencyNames,
        drivingFaultComment.comment),
      );
    }
  }

  activityCodeChanged(activityCodeModel: ActivityCodeModel) {
    const showMeQuestion = this.form.controls['showMeQuestion'];
    if (showMeQuestion) {
      if (showMeQuestion.value && showMeQuestion.value.code === 'N/A') {
        this.form.controls['showMeQuestion'].setValue({});
      }
    }
    this.store$.dispatch(new SetActivityCode(activityCodeModel.activityCode));
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
      title: 'Are you sure you want to upload this test?',
      cssClass: 'finish-test-modal',
      buttons: [
        {
          text: 'Cancel',
          handler: () => { },
        },
        {
          text: 'Upload',
          handler: () => this.completeTest(),
        },
      ],
    });
    alert.present();
  }

  goToReasonForRekey() {
    if (this.isFormValid()) {
      this.navController.push(CAT_A_MOD1.REKEY_REASON_PAGE);
    }
  }

  isFormValid() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      return true;
    }
    Object.keys(this.form.controls).forEach((controlName) => {
      if (
        controlName === CANDIDATE_DESCRIPTION_CONTROL
        && this.form.controls[controlName].value !== null
        && this.form.controls[controlName].value.length > CANDIDATE_DESCRIPTION_MAX_LENGTH
      ) {
        this.store$.dispatch(
          new OfficeValidationError(`${controlName} exceeds max length of ${CANDIDATE_DESCRIPTION_MAX_LENGTH}`),
        );
      } else if (this.form.controls[controlName].invalid) {
        this.store$.dispatch(new OfficeValidationError(`${controlName} is blank`));
      }
    });
    this.createToast('Fill all mandatory fields');
    this.toast.present();
    return false;
  }

  completeTest() {
    this.store$.dispatch(new CompleteTest());
    this.popToRoot();
  }

  shouldDisplayDrivingFaultComments = (data: TestData, category: TestCategory): boolean => {

    const drivingFaultCount: number = this.faultCountProvider.getDrivingFaultSumCount(category, data);
    const seriousFaultCount: number = this.faultCountProvider.getSeriousFaultSumCount(category, data);
    const dangerousFaultCount: number = this.faultCountProvider.getDangerousFaultSumCount(category, data);

    return dangerousFaultCount === 0 && seriousFaultCount === 0 && drivingFaultCount > OfficeCatAMod1Page.maxFaultCount;
  }
}
