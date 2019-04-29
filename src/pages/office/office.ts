import { IonicPage, NavController, NavParams, Platform, ToastController, Toast, Keyboard } from 'ionic-angular';
import { Component } from '@angular/core';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import {
  OfficeViewDidEnter,
} from './office.actions';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';
import { getCurrentTest, getTestOutcome, getTestOutcomeClass, isPassed } from '../../modules/tests/tests.selector';
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
import { map } from 'rxjs/operators';
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
import { getTestTime } from '../../modules/tests/test-slot-attributes/test-slot-attributes.selector';
import {
  getETA,
  getETAFaultText,
  getEco,
  getEcoFaultText,
  getSelectedTellMeQuestionText,
  getShowMeQuestion,
  getVehicleChecks,
} from '../../modules/tests/test_data/test-data.selector';
import { getTestData } from '../../modules/tests/test_data/test-data.reducer';
import { PersistTests } from '../../modules/tests/tests.actions';
import {
  getDrivingFaults,
  displayDrivingFaultComments,
  getDangerousFaults,
  getSeriousFaults,
} from '../debrief/debrief.selector';
import { WeatherConditionSelection } from '../../providers/weather-conditions/weather-conditions.model';
import { WeatherConditionProvider } from '../../providers/weather-conditions/weather-condition';
import { WeatherConditions, Identification, IndependentDriving } from '@dvsa/mes-test-schema/categories/B';
import {
  AddDangerousFaultComment,
  AddSeriousFaultComment,
  AddDrivingFaultComment,
  ShowMeQuestionSelected,
} from '../../modules/tests/test_data/test-data.actions';
import { MultiFaultAssignable, CommentedCompetency } from './components/fault-comment/fault-comment.model';

interface OfficePageState {
  startTime$: Observable<string>;
  testOutcome$: Observable<string>;
  testOutcomeClass$: Observable<string>;
  isPassed$: Observable<boolean>;
  candidateName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  routeNumber$: Observable<number>;
  debriefWitnessed$: Observable<boolean>;
  identification$: Observable<Identification>;
  independentDriving$: Observable<IndependentDriving>;
  d255$: Observable<boolean>;
  candidateDescription$: Observable<string>;
  additionalInformation$: Observable<string>;
  showMeQuestion$: Observable<ShowMeQuestion>;
  tellMeQuestionText$: Observable<string>;
  etaFaults$: Observable<string>;
  ecoFaults$: Observable<string>;
  drivingFaults$: Observable<(CommentedCompetency & MultiFaultAssignable)[]>;
  drivingFaultCount$: Observable<number>;
  displayDrivingFaultComments$: Observable<boolean>;
  weatherConditions$: Observable<WeatherConditions[]>;
  dangerousFaults$: Observable<CommentedCompetency[]>;
  seriousFaults$: Observable<CommentedCompetency[]>;
}

@IonicPage()
@Component({
  selector: 'page-office',
  templateUrl: 'office.html',
})
export class OfficePage extends BasePageComponent {
  pageState: OfficePageState;
  form: FormGroup;
  toast: Toast;
  drivingFaultCtrl: String = 'drivingFaultCtrl';
  seriousFaultCtrl: String = 'seriousFaultCtrl';
  dangerousFaultCtrl: String = 'dangerousFaultCtrl';

  weatherConditions: WeatherConditionSelection[];
  showMeQuestions: ShowMeQuestion[];

  constructor(
    private store$: Store<StoreModel>,
    public toastController: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private weatherConditionProvider: WeatherConditionProvider,
    public questionProvider: QuestionProvider,
    public keyboard: Keyboard,
  ) {
    super(platform, navCtrl, authenticationProvider);
    this.form = new FormGroup({});
    this.weatherConditions = this.weatherConditionProvider.getWeatherConditions();
    this.showMeQuestions = questionProvider.getShowMeQuestions();
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
      testOutcome$: currentTest$.pipe(
        select(getTestOutcome),
      ),
      testOutcomeClass$: currentTest$.pipe(
        select(getTestOutcomeClass),
      ),
      isPassed$: currentTest$.pipe(
        select(isPassed),
      ),
      startTime$: currentTest$.pipe(
        select(getTestSlotAttributes),
        select(getTestTime),
      ),
      candidateName$: currentTest$.pipe(
        select(getCandidate),
        select(getCandidateName),
      ),
      candidateDriverNumber$: currentTest$.pipe(
        select(getCandidate),
        select(getCandidateDriverNumber),
        map(formatDriverNumber),
      ),
      routeNumber$: currentTest$.pipe(
        select(getTestSummary),
        select(getRouteNumber),
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
    };
  }

  popToRoot() {
    this.navCtrl.popToRoot();
  }

  defer() {
    this.popToRoot();
    this.store$.dispatch(new PersistTests());
  }

  onSubmit() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      // TODO go to the correct page
      this.popToRoot();
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
    const a = new AddDangerousFaultComment(dangerousFaultComment.competencyIdentifier, dangerousFaultComment.comment);
    this.store$.dispatch(a);
  }

  seriousFaultCommentChanged(seriousFaultComment: CommentedCompetency) {
    const a = new AddSeriousFaultComment(seriousFaultComment.competencyIdentifier, seriousFaultComment.comment);
    this.store$.dispatch(a);
  }

  drivingFaultCommentChanged(drivingFaultComment: CommentedCompetency) {
    const a = new AddDrivingFaultComment(drivingFaultComment.competencyIdentifier, drivingFaultComment.comment);
    this.store$.dispatch(a);
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

}
