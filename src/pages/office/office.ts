import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { OfficeViewDidEnter } from './office.actions';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { getCurrentTest } from '../../modules/tests/tests.selector';
import { getTests } from '../../modules/tests/tests.reducer';
import {
  getRouteNumber,
  getCandidateDescription,
  wasSatNavUsed,
  wereTrafficSignsUsed,
  debriefWasWitnessed,
  debriefWasUnwitnessed,
  wasIdentificationLicense,
  wasIdentificationPassport,
  wasD255Yes,
  wasD255No,
  getAdditionalInformation,
} from '../../modules/tests/test-summary/test-summary.selector';
import { getTestSummary } from '../../modules/tests/test-summary/test-summary.reducer';
import { fromEvent } from 'rxjs/Observable/fromEvent';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  AdditionalInformationChanged,
  RouteNumberChanged,
  IndependentDrivingTypeChanged,
  IdentificationUsedChanged,
  DebriefWitnessed,
  DebriefUnwitnessed,
  D255Yes,
  D255No,
  CandidateDescriptionChanged,
} from '../../modules/tests/test-summary/test-summary.actions';
import { getCandidate } from '../../modules/tests/candidate/candidate.reducer';
import {
  getCandidateName,
  getCandidateDriverNumber,
  formatDriverNumber,
} from '../../modules/tests/candidate/candidate.selector';
import { getTestTime } from '../../modules/tests/journal-data/journal-data.selector';
import { getJournalData } from '../../modules/tests/journal-data/journal-data.reducer';
// import { getJournalState } from '../journal/journal.reducer';
// import { getSlotById, getTime } from '../candidate-details/candidate-details.selector';
// import { getSlots } from '../journal/journal.selector';
// import { SlotItem } from '../../providers/slot-selector/slot-item';

interface OfficePageState {
  startTime$: Observable<string>;
  candidateName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  routeNumber$: Observable<number>;
  debriefWitnessedYesRadioChecked$ : Observable<boolean>;
  debriefWitnessedNoRadioChecked$ : Observable<boolean>;
  identificationLicenseRadioChecked$: Observable<boolean>;
  identificationPassportRadioChecked$: Observable<boolean>;
  independentDrivingSatNavRadioChecked$: Observable<boolean>;
  independentDrivingTrafficSignsRadioChecked$: Observable<boolean>;
  d255YesRadioChecked$: Observable<boolean>;
  d255NoRadioChecked$: Observable<boolean>;
  candidateDescription$: Observable<string>;
  additionalInformation$: Observable<string>;
}

@IonicPage()
@Component({
  selector: 'page-office',
  templateUrl: 'office.html',
})
export class OfficePage extends BasePageComponent {
  pageState: OfficePageState;
  form: FormGroup;

  @ViewChild('routeInput')
  routeInput: ElementRef;

  @ViewChild('candidateDescriptionInput')
  candidateDescriptionInput: ElementRef;

  @ViewChild('additionalInformationInput')
  additionalInformationInput: ElementRef;
  inputSubscriptions: Subscription[] = [];

  constructor(
    private store$: Store<StoreModel>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
  ) {
    super(platform, navCtrl, authenticationProvider);
    this.form = new FormGroup(this.getFormValidation());

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

      startTime$: currentTest$.pipe(
        select(getJournalData),
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
        select(wasSatNavUsed),
      ),
      independentDrivingTrafficSignsRadioChecked$: currentTest$.pipe(
        select(getTestSummary),
        select(wereTrafficSignsUsed),
      ),
      debriefWitnessedYesRadioChecked$ : currentTest$.pipe(
        select(getTestSummary),
        select(debriefWasWitnessed),
      ),
      debriefWitnessedNoRadioChecked$ : currentTest$.pipe(
        select(getTestSummary),
        select(debriefWasUnwitnessed),
     ),
      identificationLicenseRadioChecked$: currentTest$.pipe(
        select(getTestSummary),
        select(wasIdentificationLicense),
    ),
      identificationPassportRadioChecked$: currentTest$.pipe(
        select(getTestSummary),
        select(wasIdentificationPassport),
    ),
      d255YesRadioChecked$: currentTest$.pipe(
      select(getTestSummary),
      select(wasD255Yes),
      ),
      d255NoRadioChecked$: currentTest$.pipe(
        select(getTestSummary),
        select(wasD255No),
      ),
      additionalInformation$: currentTest$.pipe(
        select(getTestSummary),
        select(getAdditionalInformation),
      ),
    };
    this.inputSubscriptions = [
      this.inputChangeSubscriptionDispatchingAction(this.routeInput, RouteNumberChanged),
      this.inputChangeSubscriptionDispatchingAction(
        this.additionalInformationInput,
        AdditionalInformationChanged,
      ),
      this.inputChangeSubscriptionDispatchingAction(this.candidateDescriptionInput, CandidateDescriptionChanged),
    ];
  }

  ngOnDestroy(): void {
    this.inputSubscriptions.forEach(sub => sub.unsubscribe());
  }

  popToRoot() {
    this.navCtrl.popToRoot();
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
      this.navCtrl.push('JournalPage');
    }
  }

  getFormValidation(): { [key: string]: FormControl } {
    return {
      routeNumberCtrl: new FormControl('', [Validators.required]),
      candidateDescriptionCtrl: new FormControl('', [Validators.required]),
      debriefWitnessedCtrl: new FormControl('', [Validators.required]),
      identificationCtrl: new FormControl('', [Validators.required]),
      tellMeQuestionCtrl: new FormControl('', [Validators.required]),
      independentDrivingCtrl: new FormControl('', [Validators.required]),
      d255Ctrl: new FormControl('', [Validators.required]),

    };
  }
  isCtrlDirtyAndInvalid(controlName: string): boolean {
    return !this.form.value[controlName] && this.form.get(controlName).dirty;
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

}
