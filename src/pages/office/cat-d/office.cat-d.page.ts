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
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { Subscription } from 'rxjs/Subscription';
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
import { getCandidate } from '../../../modules/tests/journal-data/cat-d/candidate/candidate.cat-d.reducer';
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
  getEco,
  getEcoFaultText,
} from '../../../modules/tests/test-data/common/test-data.selector';
import { getTestData } from '../../../modules/tests/test-data/cat-d/test-data.cat-d.reducer';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { WeatherConditionSelection } from '../../../providers/weather-conditions/weather-conditions.model';
import { WeatherConditionProvider } from '../../../providers/weather-conditions/weather-condition';
import {
  WeatherConditions,
  Identification,
  IndependentDriving,
  QuestionResult,
  CategoryCode,
} from '@dvsa/mes-test-schema/categories/common';
import {
  AddDangerousFaultComment,
} from '../../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import { AddSeriousFaultComment } from '../../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import { AddDrivingFaultComment } from '../../../modules/tests/test-data/common/driving-faults/driving-faults.actions';
import {
  AddShowMeTellMeComment,
} from '../../../modules/tests/test-data/cat-d/vehicle-checks/vehicle-checks.cat-d.action';
import { AddManoeuvreComment } from '../../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import { EyesightTestAddComment } from '../../../modules/tests/test-data/common/eyesight-test/eyesight-test.actions';
import { CommentSource, FaultSummary } from '../../../shared/models/fault-marking.model';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../office-behaviour-map.cat-d';
import { ActivityCodeModel, activityCodeModelList } from '../components/activity-code/activity-code.constants';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { startsWith } from 'lodash';
import { getRekeyIndicator } from '../../../modules/tests/rekey/rekey.reducer';
import { isRekey } from '../../../modules/tests/rekey/rekey.selector';
import { CAT_D, JOURNAL_PAGE } from '../../page-names.constants';
import { SetActivityCode } from '../../../modules/tests/activity-code/activity-code.actions';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import {
  AddUncoupleRecoupleComment,
} from '../../../modules/tests/test-data/common/uncouple-recouple/uncouple-recouple.actions';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import {
  vehicleChecksExist,
} from '../../../modules/tests/test-data/cat-d/vehicle-checks/vehicle-checks.cat-d.selector';
import { getVehicleChecks } from '../../../modules/tests/test-data/cat-d/test-data.cat-d.selector';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import {
  AddSafetyQuestionComment,
} from '../../../modules/tests/test-data/cat-d/safety-questions/safety-questions.cat-d.action';

interface OfficePageState {
  activityCode$: Observable<ActivityCodeModel>;
  startTime$: Observable<string>;
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
  displayVehicleChecks$: Observable<boolean>;
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
  testCategory$: Observable<CategoryCode>;
}

@IonicPage()
@Component({
  selector: '.office-cat-d-page',
  templateUrl: 'office.cat-d.page.html',
})
export class OfficeCatDPage extends BasePageComponent {
  pageState: OfficePageState;
  subscription: Subscription;
  form: FormGroup;
  toast: Toast;
  drivingFaultCtrl: String = 'drivingFaultCtrl';
  seriousFaultCtrl: String = 'seriousFaultCtrl';
  dangerousFaultCtrl: String = 'dangerousFaultCtrl';
  static readonly maxFaultCount = 15;

  weatherConditions: WeatherConditionSelection[];
  activityCodeOptions: ActivityCodeModel[];
  testCategory: CategoryCode;

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
    if (!this.subscription || this.subscription.closed) {
      this.setupSubscription();
    }
    this.store$.dispatch(new OfficeViewDidEnter());
  }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.pageState = {
      testCategory$: currentTest$.pipe(
        select(getTestCategory),
        map(result => this.testCategory = result),
      ),
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
            this.faultSummaryProvider.getDrivingFaultsList(data, this.testCategory as TestCategory),
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
            this.faultSummaryProvider.getSeriousFaultsList(data, this.testCategory as TestCategory),
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
            this.faultSummaryProvider.getDrivingFaultsList(data, this.testCategory as TestCategory),
          )),
      ),
      displayVehicleChecks$: currentTest$.pipe(
          select(getTestOutcome),
          withLatestFrom(currentTest$.pipe(
            select(getTestData))),
            map(([outcome, data]) =>
            this.outcomeBehaviourProvider.isVisible(outcome,
              'vehicleChecks',
              vehicleChecksExist(data.vehicleChecks))),
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
        map(data => this.faultSummaryProvider.getDangerousFaultsList(data, this.testCategory as TestCategory)),
      ),
      seriousFaults$: currentTest$.pipe(
        select(getTestData),
        map(data => this.faultSummaryProvider.getSeriousFaultsList(data, this.testCategory as TestCategory)),
      ),
      drivingFaults$: currentTest$.pipe(
        select(getTestData),
        map(data => this.faultSummaryProvider.getDrivingFaultsList(data, this.testCategory as TestCategory)),
      ),
      drivingFaultCount$: currentTest$.pipe(
        select(getTestData),
        map(data => this.faultCountProvider.getDrivingFaultSumCount(this.testCategory as TestCategory, data)),
      ),
      displayDrivingFaultComments$: currentTest$.pipe(
        select(getTestData),
        map(data => this.shouldDisplayDrivingFaultComments(data)),
      ),
      weatherConditions$: currentTest$.pipe(
        select(getTestSummary),
        select(getWeatherConditions),
      ),
      vehicleChecks$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecks),
        map(checks => [...checks.tellMeQuestions, ...checks.showMeQuestions]),
      ),
    };
    this.setupSubscription();
  }

  setupSubscription() {
    const { testCategory$ } = this.pageState;

    this.subscription = merge(
      testCategory$.pipe(map(result => this.testCategory = result)),
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

  identificationChanged(identification: Identification): void {
    this.store$.dispatch(new IdentificationUsedChanged(identification));
  }

  independentDrivingChanged(independentDriving: IndependentDriving): void {
    this.store$.dispatch(new IndependentDrivingTypeChanged(independentDriving));
  }

  weatherConditionsChanged(weatherConditions: WeatherConditions[]): void {
    this.store$.dispatch(new WeatherConditionsChanged(weatherConditions));
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
      const fieldName = segments[1];
      const controlOrObservation = segments[2];
      this.store$.dispatch(
        new AddManoeuvreComment(
          fieldName,
          CompetencyOutcome.D,
          controlOrObservation,
          dangerousFaultComment.comment),
      );

    } else if (dangerousFaultComment.source === CommentSource.UNCOUPLE_RECOUPLE) {
      this.store$.dispatch(new AddUncoupleRecoupleComment(dangerousFaultComment.comment));

    } else if (dangerousFaultComment.source === CommentSource.VEHICLE_CHECKS) {
      this.store$.dispatch(new AddShowMeTellMeComment(dangerousFaultComment.comment));
    } else if (dangerousFaultComment.source === CommentSource.PCV_DOOR_EXERCISE) {
      // this.store$.dispatch(new AddPcvDoorExercise(dangerousFaultComment.comment));
    }
  }

  seriousFaultCommentChanged(seriousFaultComment: FaultSummary) {
    if (seriousFaultComment.source === CommentSource.SIMPLE) {
      this.store$.dispatch(
        new AddSeriousFaultComment(seriousFaultComment.competencyIdentifier, seriousFaultComment.comment),
      );
    } else if (startsWith(seriousFaultComment.source, CommentSource.MANOEUVRES)) {
      const segments = seriousFaultComment.source.split('-');
      const fieldName = segments[1];
      const controlOrObservation = segments[2];
      this.store$.dispatch(
        new AddManoeuvreComment(
          fieldName,
          CompetencyOutcome.S,
          controlOrObservation,
          seriousFaultComment.comment),
      );

    } else if (seriousFaultComment.source === CommentSource.UNCOUPLE_RECOUPLE) {
      this.store$.dispatch(new AddUncoupleRecoupleComment(seriousFaultComment.comment));
    } else if (seriousFaultComment.source === CommentSource.VEHICLE_CHECKS) {
      this.store$.dispatch(new AddShowMeTellMeComment(seriousFaultComment.comment));
    } else if (seriousFaultComment.source === CommentSource.EYESIGHT_TEST) {
      this.store$.dispatch(new EyesightTestAddComment(seriousFaultComment.comment));
    } else if (seriousFaultComment.source === CommentSource.PCV_DOOR_EXERCISE) {
      // this.store$.dispatch(new AddPcvDoorExercise(seriousFaultComment.comment));
    }
  }

  drivingFaultCommentChanged(drivingFaultComment: FaultSummary) {
    if (drivingFaultComment.source === CommentSource.SIMPLE) {
      this.store$.dispatch(
        new AddDrivingFaultComment(drivingFaultComment.competencyIdentifier, drivingFaultComment.comment),
      );
    } else if (startsWith(drivingFaultComment.source, CommentSource.MANOEUVRES)) {
      const segments = drivingFaultComment.source.split('-');
      const fieldName = segments[1];
      const controlOrObservation = segments[2];
      this.store$.dispatch(
        new AddManoeuvreComment(
          fieldName,
          CompetencyOutcome.DF,
          controlOrObservation,
          drivingFaultComment.comment),
      );

    } else if (drivingFaultComment.source === CommentSource.UNCOUPLE_RECOUPLE) {
      this.store$.dispatch(new AddUncoupleRecoupleComment(drivingFaultComment.comment));
    } else if (drivingFaultComment.source === CommentSource.VEHICLE_CHECKS) {
      this.store$.dispatch(new AddShowMeTellMeComment(drivingFaultComment.comment));
    } else if (drivingFaultComment.source === CommentSource.SAFETY_QUESTIONS) {
      this.store$.dispatch(new AddSafetyQuestionComment(drivingFaultComment.comment));
    } else if (drivingFaultComment.source === CommentSource.PCV_DOOR_EXERCISE) {
      // this.store$.dispatch(new AddPcvDoorExercise(drivingFaultComment.comment));
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
      this.navController.push(CAT_D.REKEY_REASON_PAGE);
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

  shouldDisplayDrivingFaultComments = (data: CatDUniqueTypes.TestData): boolean => {
    const drivingFaultCount: number =
      this.faultCountProvider.getDrivingFaultSumCount(this.testCategory as TestCategory, data);
    const seriousFaultCount: number =
      this.faultCountProvider.getSeriousFaultSumCount(this.testCategory as TestCategory, data);
    const dangerousFaultCount: number =
      this.faultCountProvider.getDangerousFaultSumCount(this.testCategory as TestCategory, data);

    return dangerousFaultCount === 0 && seriousFaultCount === 0 && drivingFaultCount > 15;
  }
}
