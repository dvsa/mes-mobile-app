import { Component, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, Toast } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { OfficeViewDidEnter, OfficeViewAddDangerousFaultComment } from './office.actions';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { getCurrentTest, getTestOutcome, getTestOutcomeClass, isPassed } from '../../modules/tests/tests.selector';
import { getTests } from '../../modules/tests/tests.reducer';
import {
  getRouteNumber,
  getCandidateDescription,
  isIdentificationLicense,
  isIdentificationPassport,
  isD255Yes,
  isD255No,
  getAdditionalInformation,
  getSatNavUsed,
  getTrafficSignsUsed,
  isDebriefWitnessed,
  isDebriefUnwitnessed,
} from '../../modules/tests/test-summary/test-summary.selector';
import { getTestSummary } from '../../modules/tests/test-summary/test-summary.reducer';
import { fromEvent } from 'rxjs/Observable/fromEvent';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  AdditionalInformationChanged,
  IndependentDrivingTypeChanged,
  IdentificationUsedChanged,
  DebriefWitnessed,
  DebriefUnwitnessed,
  D255Yes,
  D255No,
  CandidateDescriptionChanged,
  WeatherConditionsChanged,
  RouteNumberChanged,
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
import { getSeriousOrDangerousFaults } from '../debrief/debrief.selector';
import { WeatherConditionSelection } from '../../providers/weather-conditions/weather-conditions.model';
import { WeatherConditionProvider } from '../../providers/weather-conditions/weather-condition';
import { WeatherConditions } from '@dvsa/mes-test-schema/categories/B';

interface OfficePageState {
  startTime$: Observable<string>;
  testOutcome$: Observable<string>;
  testOutcomeClass$: Observable<string>;
  isPassed$: Observable<boolean>;
  candidateName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  routeNumber$: Observable<number>;
  debriefWitnessedYesRadioChecked$: Observable<boolean>;
  debriefWitnessedNoRadioChecked$: Observable<boolean>;
  identificationLicenseRadioChecked$: Observable<boolean>;
  identificationPassportRadioChecked$: Observable<boolean>;
  independentDrivingSatNavRadioChecked$: Observable<boolean>;
  independentDrivingTrafficSignsRadioChecked$: Observable<boolean>;
  d255YesRadioChecked$: Observable<boolean>;
  d255NoRadioChecked$: Observable<boolean>;
  candidateDescription$: Observable<string>;
  additionalInformation$: Observable<string>;
  showMeQuestion$: Observable<ShowMeQuestion>;
  tellMeQuestionText$: Observable<string>;
  etaFaults$: Observable<string>;
  ecoFaults$: Observable<string>;
  dangerousFaults$: Observable<string[]>;
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

  @ViewChild('candidateDescriptionInput')
  candidateDescriptionInput: ElementRef;

  @ViewChild('additionalInformationInput')
  additionalInformationInput: ElementRef;

  @ViewChildren('dangerousFaultComment')
  dangerousFaultComment: QueryList<ElementRef>;
  inputSubscriptions: Subscription[] = [];

  weatherConditions: WeatherConditionSelection[];
  showMeQuestions: ShowMeQuestion[];
  showMeQuestion: ShowMeQuestion;

  constructor(
    private store$: Store<StoreModel>,
    public toastController: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private weatherConditionProvider: WeatherConditionProvider,
    public questionProvider: QuestionProvider,
  ) {
    super(platform, navCtrl, authenticationProvider);
    this.form = new FormGroup(this.getFormValidation());
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
      independentDrivingSatNavRadioChecked$: currentTest$.pipe(
        select(getTestSummary),
        select(getSatNavUsed),
      ),
      independentDrivingTrafficSignsRadioChecked$: currentTest$.pipe(
        select(getTestSummary),
        select(getTrafficSignsUsed),
      ),
      debriefWitnessedYesRadioChecked$: currentTest$.pipe(
        select(getTestSummary),
        select(isDebriefWitnessed),
      ),
      debriefWitnessedNoRadioChecked$: currentTest$.pipe(
        select(getTestSummary),
        select(isDebriefUnwitnessed),
      ),
      identificationLicenseRadioChecked$: currentTest$.pipe(
        select(getTestSummary),
        select(isIdentificationLicense),
      ),
      identificationPassportRadioChecked$: currentTest$.pipe(
        select(getTestSummary),
        select(isIdentificationPassport),
      ),
      d255YesRadioChecked$: currentTest$.pipe(
        select(getTestSummary),
        select(isD255Yes),
      ),
      d255NoRadioChecked$: currentTest$.pipe(
        select(getTestSummary),
        select(isD255No),
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
      etaFaults$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(getETA),
        select(getETAFaultText),
      ),
      ecoFaults$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(getEco),
        select(getEcoFaultText),
      ),
      dangerousFaults$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        map(data => getSeriousOrDangerousFaults(data.dangerousFaults)),
      ),
    };

    this.pageState.routeNumber$.subscribe();

    this.inputSubscriptions = [
      this.pageState.showMeQuestion$.subscribe(showMeQuestion => this.showMeQuestion = showMeQuestion),
      this.inputChangeSubscriptionDispatchingAction(
        this.additionalInformationInput,
        AdditionalInformationChanged,
      ),
      this.inputChangeSubscriptionDispatchingAction(this.candidateDescriptionInput, CandidateDescriptionChanged),
    ];
  }

  ngAfterViewInit(): void {
    this.dangerousFaultComment.forEach((comment) => {
      this.inputSubscriptions
        .push(this.inputChangeSubscriptionDispatchingAction(comment, OfficeViewAddDangerousFaultComment));
    });
  }

  ngOnDestroy(): void {
    this.inputSubscriptions.forEach(sub => sub.unsubscribe());
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

  showMeQuestionChanged(newShowMeQuestion): void {
    this.store$.dispatch(new ShowMeQuestionSelected(newShowMeQuestion));
  }

  getFormValidation(): { [key: string]: FormControl } {
    return {
      candidateDescriptionCtrl: new FormControl('', [Validators.required]),
      debriefWitnessedCtrl: new FormControl('', [Validators.required]),
      identificationCtrl: new FormControl('', [Validators.required]),
      independentDrivingCtrl: new FormControl('', [Validators.required]),
      d255Ctrl: new FormControl('', [Validators.required]),
      weatherConditionsCtrl: new FormControl([], [Validators.required]),
      showMeQuestionCtrl: new FormControl([], [Validators.required]),
    };
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

  identificationLicence(): void {
    this.store$.dispatch(new IdentificationUsedChanged('Licence'));
  }
  identificationPassport(): void {
    this.store$.dispatch(new IdentificationUsedChanged('Passport'));
  }

  satNavUsed(): void {
    this.store$.dispatch(new IndependentDrivingTypeChanged('Sat nav'));
  }
  trafficSignsUsed(): void {
    this.store$.dispatch(new IndependentDrivingTypeChanged('Traffic signs'));
  }

  d255Yes(): void {
    this.store$.dispatch(new D255Yes());
  }
  d255No(): void {
    this.store$.dispatch(new D255No());
  }

  weatherConditionsChanged(weatherConditions: WeatherConditions[]): void {
    this.store$.dispatch(new WeatherConditionsChanged(weatherConditions));
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

  routeNumberChanged(newValue) {
    this.store$.dispatch(new RouteNumberChanged(newValue));
  }
}
