import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  ToastController,
  Toast, Keyboard, AlertController,
} from 'ionic-angular';
import { Component } from '@angular/core';
import { PracticeableBasePageComponent } from '../../shared/classes/practiceable-base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import {
  OfficeViewDidEnter,
  CompleteTest,
} from './office.actions';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';
import {
  getCurrentTest,
  getTestOutcome,
  isTestOutcomeSet,
  getTestOutcomeClass,
  isPassed,
  getTestOutcomeText,
  getTerminationCode,
  getJournalData,
} from '../../modules/tests/tests.selector';
import { getTests } from '../../modules/tests/tests.reducer';
import {
  getRouteNumber,
  getCandidateDescription,
  getD255,
  getAdditionalInformation,
  isDebriefWitnessed,
  getWeatherConditions,
  getIdentification,
  getIndependentDriving,
} from '../../modules/tests/test-summary/test-summary.selector';
import { getTestSummary } from '../../modules/tests/test-summary/test-summary.reducer';
import { map, withLatestFrom } from 'rxjs/operators';
import {
  RouteNumberChanged,
  IndependentDrivingTypeChanged,
  IdentificationUsedChanged,
  DebriefWitnessed,
  DebriefUnwitnessed,
  D255Yes,
  D255No,
  CandidateDescriptionChanged,
  WeatherConditionsChanged,
  AdditionalInformationChanged,
} from '../../modules/tests/test-summary/test-summary.actions';
import { getCandidate } from '../../modules/tests/candidate/candidate.reducer';
import {
  getCandidateName,
  getCandidateDriverNumber,
  formatDriverNumber,
} from '../../modules/tests/candidate/candidate.selector';
import { ShowMeQuestion } from '../../providers/question/show-me-question.model';
import { QuestionProvider } from '../../providers/question/question';
import { getTestSlotAttributes } from '../../modules/tests/test-slot-attributes/test-slot-attributes.reducer';
import { getTestTime, isWelshTest } from '../../modules/tests/test-slot-attributes/test-slot-attributes.selector';
import {
  getETA,
  getETAFaultText,
  getEco,
  getEcoFaultText,
  getSelectedTellMeQuestionText,
  getShowMeQuestion,
  getVehicleChecks,
  getShowMeQuestionOptions,
  getTellMeQuestion,
} from '../../modules/tests/test-data/test-data.selector';
import { getTestData } from '../../modules/tests/test-data/test-data.reducer';
import { PersistTests, SetActivityCode } from '../../modules/tests/tests.actions';
import {
  getDrivingFaults,
  displayDrivingFaultComments,
  getDangerousFaults,
  getSeriousFaults,
} from '../debrief/debrief.selector';
import { WeatherConditionSelection } from '../../providers/weather-conditions/weather-conditions.model';
import { WeatherConditionProvider } from '../../providers/weather-conditions/weather-condition';
import {
  WeatherConditions,
  Identification,
  IndependentDriving,
} from '@dvsa/mes-test-schema/categories/B';
import {
  AddDangerousFaultComment,
  AddSeriousFaultComment,
  AddDrivingFaultComment,
  ShowMeQuestionSelected,
} from '../../modules/tests/test-data/test-data.actions';
import { MultiFaultAssignableCompetency, CommentedCompetency } from '../../shared/models/fault-marking.model';
import { OutcomeBehaviourMapProvider } from '../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from './office-behaviour-map';
import { TerminationCode, terminationCodeList } from './components/termination-code/termination-code.constants';
import { WelshTestChanged } from '../../modules/tests/test-slot-attributes/test-slot-attributes.actions';

interface OfficePageState {
  activityCode$: Observable<TerminationCode>;
  startTime$: Observable<string>;
  testOutcome$: Observable<string>;
  testOutcomeText$: Observable<string>;
  testOutcomeClass$: Observable<string>;
  isPassed$: Observable<boolean>;
  isTestOutcomeSet$: Observable<boolean>;
  candidateName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  routeNumber$: Observable<number>;
  displayRouteNumber$: Observable<boolean>;
  displayIndependentDriving$: Observable<boolean>;
  displayCandidateDescription$: Observable<boolean>;
  displayDebriefWitnessed$: Observable<boolean>;
  displayIdentification$: Observable<boolean>;
  displayShowMeQuestion$: Observable<boolean>;
  displayTellMeQuestion$: Observable<boolean>;
  displayWeatherConditions$: Observable<boolean>;
  displayD255$: Observable<boolean>;
  displayAdditionalInformation$: Observable<boolean>;
  displayEco$: Observable<boolean>;
  displayEta$: Observable<boolean>;
  displayDrivingFault$: Observable<boolean>;
  displaySeriousFault$: Observable<boolean>;
  displayDangerousFault$: Observable<boolean>;
  debriefWitnessed$: Observable<boolean>;
  identification$: Observable<Identification>;
  independentDriving$: Observable<IndependentDriving>;
  d255$: Observable<boolean>;
  candidateDescription$: Observable<string>;
  additionalInformation$: Observable<string>;
  showMeQuestion$: Observable<ShowMeQuestion>;
  showMeQuestionOptions$: Observable<ShowMeQuestion[]>;
  tellMeQuestionText$: Observable<string>;
  etaFaults$: Observable<string>;
  ecoFaults$: Observable<string>;
  drivingFaults$: Observable<(CommentedCompetency & MultiFaultAssignableCompetency)[]>;
  drivingFaultCount$: Observable<number>;
  displayDrivingFaultComments$: Observable<boolean>;
  weatherConditions$: Observable<WeatherConditions[]>;
  dangerousFaults$: Observable<CommentedCompetency[]>;
  seriousFaults$: Observable<CommentedCompetency[]>;
  isWelshTest$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: 'page-office',
  templateUrl: 'office.html',
})
export class OfficePage extends PracticeableBasePageComponent {
  pageState: OfficePageState;
  form: FormGroup;
  toast: Toast;
  drivingFaultCtrl: String = 'drivingFaultCtrl';
  seriousFaultCtrl: String = 'seriousFaultCtrl';
  dangerousFaultCtrl: String = 'dangerousFaultCtrl';

  weatherConditions: WeatherConditionSelection[];
  showMeQuestions: ShowMeQuestion[];
  activityCodeOptions: TerminationCode[];

  constructor(
    store$: Store<StoreModel>,
    public toastController: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private weatherConditionProvider: WeatherConditionProvider,
    public questionProvider: QuestionProvider,
    public keyboard: Keyboard,
    private outcomeBehaviourProvider: OutcomeBehaviourMapProvider,
    public alertController: AlertController,
  ) {
    super(platform, navCtrl, authenticationProvider, store$);
    this.form = new FormGroup({});
    this.weatherConditions = this.weatherConditionProvider.getWeatherConditions();
    this.showMeQuestions = questionProvider.getShowMeQuestions();
    this.outcomeBehaviourProvider.setBehaviourMap(behaviourMap);
    this.activityCodeOptions = terminationCodeList;
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new OfficeViewDidEnter());
  }

  ngOnInit(): void {
    super.ngOnInit();
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.pageState = {
      activityCode$: currentTest$.pipe(
        select(getTerminationCode),
      ),
      testOutcome$: currentTest$.pipe(
        select(getTestOutcome),
      ),
      testOutcomeText$: currentTest$.pipe(
        select(getTestOutcomeText),
      ),
      testOutcomeClass$: currentTest$.pipe(
        select(getTestOutcomeClass),
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
      displayDebriefWitnessed$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(isDebriefWitnessed))),
        map(([outcome, debrief]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'debriefWitnessed', debrief)),
      ),
      displayIdentification$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(getIdentification))),
        map(([outcome, identification]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'identification', identification)),
      ),
      displayShowMeQuestion$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestData),
          select(getVehicleChecks),
          select(getShowMeQuestion))),
        map(([outcome, question]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'showMeQuestion', question)),
      ),
      displayTellMeQuestion$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestData),
          select(getVehicleChecks),
          select(getTellMeQuestion))),
        map(([outcome, question]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'tellMeQuestion', question)),
      ),
      displayWeatherConditions$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(getWeatherConditions))),
        map(([outcome, weather]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'weatherConditions', weather)),
      ),
      displayD255$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(getD255))),
        map(([outcome, d255]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'weatherConditions', d255)),
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
          select(getTestSummary),
          select(getEco))),
        map(([outcome, eco]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'eco', eco)),
      ),
      displayEta$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(getETA))),
        map(([outcome, eta]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'eta', eta)),
      ),
      displayDrivingFault$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(getDrivingFaults))),
        map(([outcome, drivingFault]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'faultComment', drivingFault)),
      ),
      displaySeriousFault$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(getSeriousFaults))),
        map(([outcome, seriousFault]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'faultComment', seriousFault)),
      ),
      displayDangerousFault$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(getDangerousFaults))),
        map(([outcome, dangerousFault]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'faultComment', dangerousFault)),
      ),
      candidateDescription$: currentTest$.pipe(
        select(getTestSummary),
        select(getCandidateDescription),
      ),
      independentDriving$: currentTest$.pipe(
        select(getTestSummary),
        select(getIndependentDriving),
      ),
      debriefWitnessed$: currentTest$.pipe(
        select(getTestSummary),
        select(isDebriefWitnessed),
      ),
      identification$: currentTest$.pipe(
        select(getTestSummary),
        select(getIdentification),
      ),
      d255$: currentTest$.pipe(
        select(getTestSummary),
        select(getD255),
      ),
      additionalInformation$: currentTest$.pipe(
        select(getTestSummary),
        select(getAdditionalInformation),
      ),
      showMeQuestion$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecks),
        select(getShowMeQuestion),
      ),
      showMeQuestionOptions$: currentTest$.pipe(
        select(getTestOutcome),
        map(outcome => getShowMeQuestionOptions(this.showMeQuestions, outcome, this.outcomeBehaviourProvider)),
      ),
      tellMeQuestionText$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecks),
        select(getSelectedTellMeQuestionText),
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
        map(data => getDangerousFaults(data.dangerousFaults)),
      ),
      seriousFaults$: currentTest$.pipe(
        select(getTestData),
        map(data => getSeriousFaults(data.seriousFaults)),
      ),
      drivingFaults$: currentTest$.pipe(
        select(getTestData),
        map(data => getDrivingFaults(data.drivingFaults)),
      ),
      drivingFaultCount$: currentTest$.pipe(
        select(getTestData),
        map((data) => {
          const faults = getDrivingFaults(data.drivingFaults);
          return faults.reduce((sum, c) => sum + c.faultCount, 0);
        }),
      ),
      displayDrivingFaultComments$: currentTest$.pipe(
        select(getTestData),
        map(data => displayDrivingFaultComments(data)),
      ),
      weatherConditions$: currentTest$.pipe(
        select(getTestSummary),
        select(getWeatherConditions),
      ),
      isWelshTest$: currentTest$.pipe(
        select(getJournalData),
        select(getTestSlotAttributes),
        select(isWelshTest),
      ),
    };
  }

  popToRoot() {
    if (this.isPracticeMode) {
      // As per bug request for Ionic 3 we need to get and pass in the view controller
      // for the page we want to get back to - https://github.com/ionic-team/ionic/issues/13672
      this.navCtrl.popTo(this.navCtrl.getViews().find(view => view.name === 'FakeJournalPage'));
      return;
    }
    this.navCtrl.popToRoot();
  }

  defer() {
    this.popToRoot();
    this.store$.dispatch(new PersistTests());
  }

  onSubmit() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      this.showFinishTestModal();
    } else {
      this.createToast('Fill all mandatory fields');
      this.toast.present();
    }
  }

  showMeQuestionChanged(showMeQuestion: ShowMeQuestion): void {
    this.store$.dispatch(new ShowMeQuestionSelected(showMeQuestion));
  }

  debriefWitnessed(): void {
    this.store$.dispatch(new DebriefWitnessed());
  }

  debriefUnwitnessed(): void {
    this.store$.dispatch(new DebriefUnwitnessed());
  }

  identificationChanged(identification: Identification): void {
    this.store$.dispatch(new IdentificationUsedChanged(identification));
  }

  independentDrivingChanged(independentDriving: IndependentDriving): void {
    this.store$.dispatch(new IndependentDrivingTypeChanged(independentDriving));
  }

  d255Changed(d255: boolean): void {
    this.store$.dispatch(d255 ? new D255Yes() : new D255No());
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

  debriefWitnessedChanged(debriefWitnessed: boolean) {
    this.store$.dispatch(debriefWitnessed ? new DebriefWitnessed() : new DebriefUnwitnessed());
  }

  additionalInformationChanged(additionalInformation: string): void {
    this.store$.dispatch(new AdditionalInformationChanged(additionalInformation));
  }

  dangerousFaultCommentChanged(dangerousFaultComment: CommentedCompetency) {
    this.store$.dispatch(
      new AddDangerousFaultComment(dangerousFaultComment.competencyIdentifier, dangerousFaultComment.comment),
    );
  }

  isWelshChanged(isWelsh: boolean) {
    this.store$.dispatch(new WelshTestChanged(isWelsh));
  }

  seriousFaultCommentChanged(seriousFaultComment: CommentedCompetency) {
    this.store$.dispatch(
      new AddSeriousFaultComment(seriousFaultComment.competencyIdentifier, seriousFaultComment.comment),
    );
  }

  drivingFaultCommentChanged(drivingFaultComment: CommentedCompetency) {
    this.store$.dispatch(
      new AddDrivingFaultComment(drivingFaultComment.competencyIdentifier, drivingFaultComment.comment),
    );
  }

  activityCodeChanged(terminationCode: TerminationCode) {
    const showMeQuestion = this.form.controls['showMeQuestion'];
    if (showMeQuestion) {
      if (showMeQuestion.value && showMeQuestion.value.code === 'N/A') {
        this.form.controls['showMeQuestion'].setValue({});
      }
    }
    this.store$.dispatch(new SetActivityCode(terminationCode.activityCode));
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

  completeTest() {
    if (!this.isPracticeMode) {
      this.store$.dispatch(new CompleteTest());
    }
    this.popToRoot();
  }
}
