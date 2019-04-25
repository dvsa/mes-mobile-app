import { IonicPage, NavController, NavParams, Platform, ToastController, Toast, Keyboard } from 'ionic-angular';
import { Component, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import {
  OfficeViewDidEnter,
} from './office.actions';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
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
import { fromEvent } from 'rxjs/Observable/fromEvent';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
import { getVehicleChecks } from '../../modules/tests/vehicle-checks/vehicle-checks.reducer';
import {
  getSelectedTellMeQuestionText,
  getShowMeQuestion,
} from '../../modules/tests/vehicle-checks/vehicle-checks.selector';
import { ShowMeQuestionSelected } from '../../modules/tests/vehicle-checks/vehicle-checks.actions';
import { getETA, getETAFaultText, getEco, getEcoFaultText } from '../../modules/tests/test_data/test-data.selector';
import { getTestData } from '../../modules/tests/test_data/test-data.reducer';
import { PersistTests } from '../../modules/tests/tests.actions';
import {
  getDrivingFaults,
  displayDrivingFaultComments,
  getDangerousFaults,
  getSeriousFaults,
} from '../debrief/debrief.selector';
import { FaultCount, SeriousFaultsContainer } from '../../shared/constants/competencies/catb-competencies';
import { WeatherConditionSelection } from '../../providers/weather-conditions/weather-conditions.model';
import { WeatherConditionProvider } from '../../providers/weather-conditions/weather-condition';
import { WeatherConditions, Identification, IndependentDriving } from '@dvsa/mes-test-schema/categories/B';

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
  drivingFaults$: Observable<FaultCount[]>;
  drivingFaultCount$: Observable<number>;
  displayDrivingFaultComments$: Observable<boolean>;
  weatherConditions$: Observable<WeatherConditions[]>;
  dangerousFaults$: Observable<SeriousFaultsContainer[]>;
  seriousFaults$: Observable<SeriousFaultsContainer[]>;
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

  @ViewChildren('dangerousFaultComment')
  dangerousFaultComment: QueryList<ElementRef>;

  inputSubscriptions: Subscription[] = [];
  drivingFaultSubscription: Subscription;
  dangerousFaultSubscription: Subscription;
  seriousFaultSubscription: Subscription;

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
        select(getVehicleChecks),
        select(getShowMeQuestion),
      ),
      tellMeQuestionText$: currentTest$.pipe(
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
          return faults.reduce((sum, c) => sum + c.count, 0);
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

    this.drivingFaultSubscription = this.pageState.displayDrivingFaultComments$.subscribe((display) => {
      if (display) {
        this.getDrivingFaultCtrls();
      }
    });

    this.dangerousFaultSubscription = this.pageState.dangerousFaults$.subscribe((dangerousFault) => {
      if (dangerousFault) {
        this.getDangerousFaultCtrls();
      }
    });

    this.seriousFaultSubscription = this.pageState.seriousFaults$.subscribe((seriousFault) => {
      if (seriousFault) {
        this.getSeriousFaultCtrls();
      }
    });
  }

  ngOnDestroy(): void {
    this.inputSubscriptions.forEach(sub => sub.unsubscribe());
    this.drivingFaultSubscription.unsubscribe();
    this.dangerousFaultSubscription.unsubscribe();
    this.seriousFaultSubscription.unsubscribe();
  }

  popToRoot() {
    this.navCtrl.popToRoot();
  }

  defer() {
    this.popToRoot();
    this.store$.dispatch(new PersistTests());
  }

  /**
   * Returns a subscription to the debounced changes of a particular input fields.
   * Dispatches the provided action type to the store when a new value is yielded.
   * @param inputRef The input to listen for changes on.
   * @param actionType The the type of action to dispatch, should accept an argument for the input value.
   */
  inputChangeSubscriptionDispatchingAction(inputRef: ElementRef, actionType: any): Subscription {
    const changeStream$ = fromEvent(inputRef.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(1000),
      distinctUntilChanged(),
    );
    const subscription = changeStream$
      .subscribe((newVal: string) => this.store$.dispatch(new actionType(newVal)));
    return subscription;
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

  isCtrlDirtyAndInvalid(controlName: string): boolean {
    return this.form.controls[controlName].invalid && this.form.get(controlName).dirty;
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

  getDrivingFaultCtrls(): void {
    this.pageState.drivingFaults$.forEach((fault) => {
      fault.forEach((faultIndex) => {
        this.form.addControl(
          this.drivingFaultCtrl.concat(fault.indexOf(faultIndex).toString()),
          new FormControl('', Validators.required));
      });
    });
  }

  getDangerousFaultCtrls(): void {
    this.pageState.dangerousFaults$.forEach((fault) => {
      fault.forEach((faultIndex) => {
        this.form.addControl(
          this.dangerousFaultCtrl.concat(fault.indexOf(faultIndex).toString()),
          new FormControl('', Validators.required));
      });
    });
  }

  getSeriousFaultCtrls(): void {
    this.pageState.seriousFaults$.forEach((fault) => {
      fault.forEach((faultIndex) => {
        this.form.addControl(
          this.seriousFaultCtrl.concat(fault.indexOf(faultIndex).toString()),
          new FormControl('', Validators.required));
      });
    });
  }

}
