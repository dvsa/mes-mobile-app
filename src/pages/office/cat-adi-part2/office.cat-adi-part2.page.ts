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
  getRouteNumber,
  getCandidateDescription,
  getAdditionalInformation,
  getWeatherConditions,
  getIdentification,
  getIndependentDriving,
} from '../../../modules/tests/test-summary/common/test-summary.selector';
import { getTestSummary } from '../../../modules/tests/test-summary/common/test-summary.reducer';
import { map, withLatestFrom } from 'rxjs/operators';
import {
  RouteNumberChanged,
  IndependentDrivingTypeChanged,
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
import { getTestDate, getTestStartDateTime, getTestTime }
  from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.selector';
import {
  getETA,
  getETAFaultText,
  getEco,
  getEcoFaultText,
} from '../../../modules/tests/test-data/common/test-data.selector';
import { getTestData } from '../../../modules/tests/test-data/cat-adi-part2/test-data.cat-adi-part2.reducer';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { WeatherConditionSelection } from '../../../providers/weather-conditions/weather-conditions.model';
import { WeatherConditionProvider } from '../../../providers/weather-conditions/weather-condition';
import {
  WeatherConditions,
  Identification,
  IndependentDriving,
  QuestionResult,
} from '@dvsa/mes-test-schema/categories/common';
import {
  AddDangerousFaultComment,
} from '../../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import { AddSeriousFaultComment } from '../../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import { AddDrivingFaultComment } from '../../../modules/tests/test-data/common/driving-faults/driving-faults.actions';
import {
  AddShowMeTellMeComment,
  ShowMeQuestionSelected,
} from '../../../modules/tests/test-data/cat-adi-part2/vehicle-checks/vehicle-checks.cat-adi-part2.action';
import { AddManoeuvreComment } from '../../../modules/tests/test-data/cat-adi-part2/manoeuvres/manoeuvres.actions';
import { EyesightTestAddComment } from '../../../modules/tests/test-data/common/eyesight-test/eyesight-test.actions';
import { CommentSource, FaultSummary } from '../../../shared/models/fault-marking.model';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../office-behaviour-map.cat-adi-part2';
import { ActivityCodeModel, activityCodeModelList } from '../components/activity-code/activity-code.constants';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { startsWith } from 'lodash';
import { getRekeyIndicator } from '../../../modules/tests/rekey/rekey.reducer';
import { isRekey } from '../../../modules/tests/rekey/rekey.selector';
import { CAT_ADI_PART2, JOURNAL_PAGE } from '../../page-names.constants';
import { SetActivityCode } from '../../../modules/tests/activity-code/activity-code.actions';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import {
  AddUncoupleRecoupleComment,
} from '../../../modules/tests/test-data/common/uncouple-recouple/uncouple-recouple.actions';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import {
  vehicleChecksExist,
  getVehicleChecksCatADI2,
  getSelectedShowMeQuestions,
  getVehicleChecksSerious,
  getVehicleChecksDangerous,
} from '../../../modules/tests/test-data/cat-adi-part2/vehicle-checks/vehicle-checks.cat-adi-part2.selector';
import { VehicleChecksQuestion } from '../../../providers/question/vehicle-checks-question.model';
import { TestOutcome } from '../../../modules/tests/tests.constants';
import {
  AddControlledStopComment,
} from '../../../modules/tests/test-data/common/controlled-stop/controlled-stop.actions';
import { getNewTestStartTime } from '../../../shared/helpers/test-start-time';
import { SetStartDate }
  from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.actions';

interface OfficePageState {
  activityCode$: Observable<ActivityCodeModel>;
  startTime$: Observable<string>;
  startDate$: Observable<string>;
  startDateTime$: Observable<string>;
  testOutcome$: Observable<string>;
  testOutcomeText$: Observable<string>;
  isPassed$: Observable<boolean>;
  isTestOutcomeSet$: Observable<boolean>;
  candidateName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  routeNumber$: Observable<number>;
  displayRouteNumber$: Observable<boolean>;
  displayIndependentDriving$: Observable<boolean>;
  displayCandidateDescription$: Observable<boolean>;
  displayIdentification$: Observable<boolean>;
  displayWeatherConditions$: Observable<boolean>;
  displayAdditionalInformation$: Observable<boolean>;
  displayEco$: Observable<boolean>;
  displayEta$: Observable<boolean>;
  displayDrivingFault$: Observable<boolean>;
  displaySeriousFault$: Observable<boolean>;
  displayDangerousFault$: Observable<boolean>;
  displayTellMeQuestions$: Observable<boolean>;
  displayShowMeQuestions$: Observable<boolean>;
  identification$: Observable<Identification>;
  independentDriving$: Observable<IndependentDriving>;
  candidateDescription$: Observable<string>;
  additionalInformation$: Observable<string>;
  etaFaults$: Observable<string>;
  ecoFaults$: Observable<string>;
  drivingFaults$: Observable<FaultSummary[]>;
  drivingFaultCount$: Observable<number>;
  displayDrivingFaultComments$: Observable<boolean>;
  weatherConditions$: Observable<WeatherConditions[]>;
  dangerousFaults$: Observable<FaultSummary[]>;
  seriousFaults$: Observable<FaultSummary[]>;
  isRekey$: Observable<boolean>;
  vehicleChecks$: Observable<QuestionResult[]>;
  showMeQuestions$: Observable<QuestionResult[]>;
  vehicleChecksSerious$: Observable<boolean>;
  vehicleChecksDangerous$: Observable<boolean>;
  showMeQuestionsFaults$: Observable<number>;
}

@IonicPage()
@Component({
  selector: '.office-cat-adi-part2-page',
  templateUrl: 'office.cat-adi-part2.page.html',
})
export class OfficeCatADIPart2Page extends BasePageComponent {
  pageState: OfficePageState;
  form: FormGroup;
  toast: Toast;
  drivingFaultCtrl: String = 'drivingFaultCtrl';
  seriousFaultCtrl: String = 'seriousFaultCtrl';
  dangerousFaultCtrl: String = 'dangerousFaultCtrl';
  static readonly maxFaultCount = 6;
  subscription: Subscription;

  weatherConditions: WeatherConditionSelection[];
  activityCodeOptions: ActivityCodeModel[];
  showMeQuestions: VehicleChecksQuestion[];
  startDateTime: string;
  isValidStartDateTime: boolean = true;

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
    this.showMeQuestions = questionProvider.getShowMeQuestions(TestCategory.ADI2);
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
      routeNumber$: currentTest$.pipe(
        select(getTestSummary),
        select(getRouteNumber),
      ),
      displayRouteNumber$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(getRouteNumber))),
        map(([outcome, route]) => this.outcomeBehaviourProvider.isVisible(outcome, 'routeNumber', route)),
      ),
      displayIndependentDriving$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(getIndependentDriving))),
        map(([outcome, independent]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'independentDriving', independent)),
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
      displayEco$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestData),
          select(getEco))),
        map(([outcome, eco]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'eco', eco)),
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
        withLatestFrom(currentTest$.pipe(
          select(getTestData),
        )),
        map(([outcome, data]) =>
          this.outcomeBehaviourProvider.isVisible(
            outcome,
            'faultComment',
            this.faultSummaryProvider.getDrivingFaultsList(data, TestCategory.ADI2),
          )),
      ),
      displaySeriousFault$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestData),
        )),
        map(([outcome, data]) =>
          this.outcomeBehaviourProvider.isVisible(
            outcome,
            'faultComment',
            this.faultSummaryProvider.getSeriousFaultsList(data, TestCategory.ADI2),
          )),
      ),
      displayDangerousFault$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestData),
        )),
        map(([outcome, data]) =>
          this.outcomeBehaviourProvider.isVisible(
            outcome,
            'faultComment',
            this.faultSummaryProvider.getDrivingFaultsList(data, TestCategory.ADI2),
          )),
      ),
      displayTellMeQuestions$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestData))),
        map(([outcome, data]) =>
          this.outcomeBehaviourProvider.isVisible(outcome,
            'tellMeQuestion',
            vehicleChecksExist(data.vehicleChecks))),
      ),
      displayShowMeQuestions$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestData))),
        map(([outcome, data]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'showMeQuestion', data),
        ),
      ),
      candidateDescription$: currentTest$.pipe(
        select(getTestSummary),
        select(getCandidateDescription),
      ),
      independentDriving$: currentTest$.pipe(
        select(getTestSummary),
        select(getIndependentDriving),
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
      ecoFaults$: currentTest$.pipe(
        select(getTestData),
        select(getEco),
        select(getEcoFaultText),
      ),
      dangerousFaults$: currentTest$.pipe(
        select(getTestData),
        map(data => this.faultSummaryProvider.getDangerousFaultsList(data, TestCategory.ADI2)),
      ),
      seriousFaults$: currentTest$.pipe(
        select(getTestData),
        map(data => this.faultSummaryProvider.getSeriousFaultsList(data, TestCategory.ADI2)),
      ),
      drivingFaults$: currentTest$.pipe(
        select(getTestData),
        map(data => this.faultSummaryProvider.getDrivingFaultsList(data, TestCategory.ADI2)),
      ),
      drivingFaultCount$: currentTest$.pipe(
        select(getTestData),
        map(data => this.faultCountProvider.getDrivingFaultSumCount(TestCategory.ADI2, data)),
      ),
      displayDrivingFaultComments$: currentTest$.pipe(
        select(getTestData),
        withLatestFrom(currentTest$.pipe(
          select(getTestOutcomeText))),
        map(([testData, testOutcomeText]) => this.shouldDisplayDrivingFaultComments(testData, testOutcomeText)),
      ),
      weatherConditions$: currentTest$.pipe(
        select(getTestSummary),
        select(getWeatherConditions),
      ),
      vehicleChecks$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatADI2),
        map(checks => [...checks.tellMeQuestions]),
      ),
      showMeQuestions$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatADI2),
        select(getSelectedShowMeQuestions),
      ),
      vehicleChecksSerious$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatADI2),
        select(getVehicleChecksSerious),
      ),
      vehicleChecksDangerous$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatADI2),
        select(getVehicleChecksDangerous),
      ),
      showMeQuestionsFaults$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatADI2),
        map(data => this.faultCountProvider.getShowMeFaultCount(TestCategory.ADI2, data).drivingFaults),
      ),
    };

    this.setupSubscriptions();
  }

  setupSubscriptions() {
    const {
      startDateTime$,
    } = this.pageState;
    this.subscription = merge(
      startDateTime$.pipe(map(value => this.startDateTime = value)),
    ).subscribe();
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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

  setIsValidStartDateTime(isValid: boolean) {
    this.isValidStartDateTime = isValid;
  }

  dateOfTestChanged(inputDate: string) {
    const customStartDate = getNewTestStartTime(inputDate, this.startDateTime);
    this.store$.dispatch(new TestStartDateChanged(this.startDateTime, customStartDate));
    this.store$.dispatch(new SetStartDate(customStartDate));
  }

  identificationChanged(identification: Identification): void {
    this.store$.dispatch(new IdentificationUsedChanged(identification));
  }

  independentDrivingChanged(independentDriving: IndependentDriving): void {
    this.store$.dispatch(new IndependentDrivingTypeChanged(independentDriving));
  }

  weatherConditionsChanged(weatherConditions: WeatherConditions[]): void {
    this.store$.dispatch(new WeatherConditionsChanged(weatherConditions));
  }

  showMeQuestionsChanged(result: QuestionResult, index: number): void {
    this.store$.dispatch(new ShowMeQuestionSelected(result, index));
  }

  routeNumberChanged(routeNumber: number) {
    this.store$.dispatch(new RouteNumberChanged(routeNumber));
  }

  candidateDescriptionChanged(candidateDescription: string) {
    this.store$.dispatch(new CandidateDescriptionChanged(candidateDescription));
  }

  additionalInformationChanged(additionalInformation: string): void {
    this.store$.dispatch(new AdditionalInformationChanged(additionalInformation));
  }

  dangerousFaultCommentChanged(dangerousFaultComment: FaultSummary) {
    if (dangerousFaultComment.source === CommentSource.SIMPLE) {
      this.store$.dispatch(
        new AddDangerousFaultComment(dangerousFaultComment.competencyIdentifier, dangerousFaultComment.comment),
      );
    } else if (startsWith(dangerousFaultComment.source, CommentSource.MANOEUVRES)) {
      const segments = dangerousFaultComment.source.split('-');
      const index = parseInt(segments[1], 10);
      const fieldName = segments[2];
      const controlOrObservation = segments[3];
      this.store$.dispatch(
        new AddManoeuvreComment(
          fieldName,
          CompetencyOutcome.D,
          controlOrObservation,
          dangerousFaultComment.comment,
          index,
        ),
      );

    } else if (dangerousFaultComment.source === CommentSource.UNCOUPLE_RECOUPLE) {
      this.store$.dispatch(new AddUncoupleRecoupleComment(dangerousFaultComment.comment));
    } else if (dangerousFaultComment.source === CommentSource.VEHICLE_CHECKS) {
      this.store$.dispatch(new AddShowMeTellMeComment(dangerousFaultComment.comment));
    } else if (dangerousFaultComment.source === CommentSource.CONTROLLED_STOP) {
      this.store$.dispatch(new AddControlledStopComment(dangerousFaultComment.comment));
    }
  }

  seriousFaultCommentChanged(seriousFaultComment: FaultSummary) {
    if (seriousFaultComment.source === CommentSource.SIMPLE) {
      this.store$.dispatch(
        new AddSeriousFaultComment(seriousFaultComment.competencyIdentifier, seriousFaultComment.comment),
      );
    } else if (startsWith(seriousFaultComment.source, CommentSource.MANOEUVRES)) {
      const segments = seriousFaultComment.source.split('-');
      const index = parseInt(segments[1], 10);
      const fieldName = segments[2];
      const controlOrObservation = segments[3];
      this.store$.dispatch(
        new AddManoeuvreComment(
          fieldName,
          CompetencyOutcome.S,
          controlOrObservation,
          seriousFaultComment.comment,
          index,
        ),
      );
    } else if (seriousFaultComment.source === CommentSource.UNCOUPLE_RECOUPLE) {
      this.store$.dispatch(new AddUncoupleRecoupleComment(seriousFaultComment.comment));
    } else if (seriousFaultComment.source === CommentSource.VEHICLE_CHECKS) {
      this.store$.dispatch(new AddShowMeTellMeComment(seriousFaultComment.comment));
    } else if (seriousFaultComment.source === CommentSource.EYESIGHT_TEST) {
      this.store$.dispatch(new EyesightTestAddComment(seriousFaultComment.comment));
    } else if (seriousFaultComment.source === CommentSource.CONTROLLED_STOP) {
      this.store$.dispatch(new AddControlledStopComment(seriousFaultComment.comment));
    }
  }

  drivingFaultCommentChanged(drivingFaultComment: FaultSummary) {
    if (drivingFaultComment.source === CommentSource.SIMPLE) {
      this.store$.dispatch(
        new AddDrivingFaultComment(drivingFaultComment.competencyIdentifier, drivingFaultComment.comment),
      );
    } else if (startsWith(drivingFaultComment.source, CommentSource.MANOEUVRES)) {
      const segments = drivingFaultComment.source.split('-');
      const index = parseInt(segments[1], 10);
      const fieldName = segments[2];
      const controlOrObservation = segments[3];
      this.store$.dispatch(
        new AddManoeuvreComment(
          fieldName,
          CompetencyOutcome.DF,
          controlOrObservation,
          drivingFaultComment.comment,
          index,
        ),
      );
    } else if (drivingFaultComment.source === CommentSource.UNCOUPLE_RECOUPLE) {
      this.store$.dispatch(new AddUncoupleRecoupleComment(drivingFaultComment.comment));
    } else if (drivingFaultComment.source === CommentSource.VEHICLE_CHECKS) {
      this.store$.dispatch(new AddShowMeTellMeComment(drivingFaultComment.comment));
    } else if (drivingFaultComment.source === CommentSource.CONTROLLED_STOP) {
      this.store$.dispatch(new AddControlledStopComment(drivingFaultComment.comment));
    }
  }

  activityCodeChanged(activityCodeModel: ActivityCodeModel) {
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
      this.navController.push(CAT_ADI_PART2.REKEY_REASON_PAGE);
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
    this.store$.dispatch(new CompleteTest());
    this.popToRoot();
  }

  shouldDisplayDrivingFaultComments = (
    testData: CatADI2UniqueTypes.TestData, testOutcomeText: TestOutcome): boolean => {
    const drivingFaultCount: number = this.faultCountProvider.getDrivingFaultSumCount(TestCategory.ADI2, testData);

    return (
      drivingFaultCount > 0 && testOutcomeText === TestOutcome.Failed
    );
  }

}
