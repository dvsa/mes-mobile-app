import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { PracticeableBasePageComponent } from '../../shared/classes/practiceable-base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { WaitingRoomToCarViewDidEnter } from './waiting-room-to-car.actions';
import { Observable } from 'rxjs/Observable';
import { GearboxCategory } from '@dvsa/mes-test-schema/categories/B';
import { getCurrentTest, getJournalData } from '../../modules/tests/tests.selector';
import {
  SchoolCarToggled,
  DualControlsToggled,
  GearboxCategoryChanged,
  VehicleRegistrationChanged,
} from '../../modules/tests/vehicle-details/vehicle-details.actions';
import { map } from 'rxjs/operators';
import {
  InstructorAccompanimentToggled,
  OtherAccompanimentToggled,
  SupervisorAccompanimentToggled,
} from '../../modules/tests/accompaniment/accompaniment.actions';
import { getVehicleDetails } from '../../modules/tests/vehicle-details/vehicle-details.reducer';
import { getAccompaniment } from '../../modules/tests/accompaniment/accompaniment.reducer';
import { InstructorRegistrationNumberChanged } from '../../modules/tests/instructor-details/instructor-details.actions';
import {
  getRegistrationNumber,
  getGearboxCategory,
  getSchoolCar,
  getDualControls,
  isAutomatic,
  isManual,
} from '../../modules/tests/vehicle-details/vehicle-details.selector';
import {
  getInstructorAccompaniment,
  getSupervisorAccompaniment,
  getOtherAccompaniment,
} from '../../modules/tests/accompaniment/accompaniment.selector';
import { getCandidate } from '../../modules/tests/candidate/candidate.reducer';
import { getUntitledCandidateName } from '../../modules/tests/candidate/candidate.selector';
import { getTests } from '../../modules/tests/tests.reducer';
import { FormGroup } from '@angular/forms';
import {
  EyesightResultPasssed,
  EyesightResultFailed,
  EyesightResultReset,
  EyesightTestResult,
} from '../../modules/tests/eyesight-test-result/eyesight-test-result.actions';
import { getEyesightTestResult } from '../../modules/tests/eyesight-test-result/eyesight-test-result.reducer';
import {
  isFailed,
  isPassed,
} from '../../modules/tests/eyesight-test-result/eyesight-test-result.selector';
import { TellMeQuestion } from '../../providers/question/tell-me-question.model';
import { QuestionProvider } from '../../providers/question/question';
import { getInstructorDetails } from '../../modules/tests/instructor-details/instructor-details.reducer';
import { getInstructorRegistrationNumber } from '../../modules/tests/instructor-details/instructor-details.selector';
import {
  TellMeQuestionSelected,
  TellMeQuestionCorrect,
  TellMeQuestionDrivingFault,
  QuestionOutcomes,
} from '../../modules/tests/test-data/test-data.actions';
import {
  isTellMeQuestionSelected,
  isTellMeQuestionDrivingFault,
  isTellMeQuestionCorrect,
  tellMeQuestionOutcome,
  getVehicleChecks,
  getTellMeQuestion,
} from '../../modules/tests/test-data/test-data.selector';
import { getTestData } from '../../modules/tests/test-data/test-data.reducer';
import { PersistTests } from '../../modules/tests/tests.actions';

interface WaitingRoomToCarPageState {
  candidateName$: Observable<string>;
  registrationNumber$: Observable<string>;
  instructorRegistrationNumber$: Observable<number>;
  transmission$: Observable<GearboxCategory>;
  schoolCar$: Observable<boolean>;
  dualControls$: Observable<boolean>;
  instructorAccompaniment$: Observable<boolean>;
  supervisorAccompaniment$: Observable<boolean>;
  otherAccompaniment$: Observable<boolean>;
  eyesightPassRadioChecked$: Observable<boolean>;
  eyesightFailRadioChecked$: Observable<boolean>;
  eyesightTestResult$: Observable<string>;
  gearboxAutomaticRadioChecked$: Observable<boolean>;
  gearboxManualRadioChecked$: Observable<boolean>;
  tellMeQuestionSelected$: Observable<boolean>;
  tellMeQuestionCorrect$: Observable<boolean>;
  tellMeQuestionDrivingFault$: Observable<boolean>;
  tellMeQuestionOutcome$: Observable<string>;
  tellMeQuestion$: Observable<TellMeQuestion>;
}

@IonicPage()
@Component({
  selector: 'page-waiting-room-to-car',
  templateUrl: 'waiting-room-to-car.html',
})
export class WaitingRoomToCarPage extends PracticeableBasePageComponent {
  pageState: WaitingRoomToCarPageState;
  form: FormGroup;

  @ViewChild('registrationInput')
  regisrationInput: ElementRef;

  @ViewChild('instructorRegistrationInput')
  instructorRegistrationInput: ElementRef;

  showEyesightFailureConfirmation: boolean = false;

  tellMeQuestions: TellMeQuestion[];

  constructor(
    store$: Store<StoreModel>,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public questionProvider: QuestionProvider,
  ) {
    super(platform, navController, authenticationProvider, store$);
    this.tellMeQuestions = questionProvider.getTellMeQuestions();
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    super.ngOnInit();

    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.pageState = {
      candidateName$: currentTest$.pipe(
        select(getJournalData),
        select(getCandidate),
        select(getUntitledCandidateName),
      ),
      registrationNumber$: currentTest$.pipe(
        select(getVehicleDetails),
        select(getRegistrationNumber),
      ),
      instructorRegistrationNumber$: currentTest$.pipe(
        select(getInstructorDetails),
        map(getInstructorRegistrationNumber),
      ),
      transmission$: currentTest$.pipe(
        select(getVehicleDetails),
        select(getGearboxCategory),
      ),
      schoolCar$: currentTest$.pipe(
        select(getVehicleDetails),
        select(getSchoolCar),
      ),
      dualControls$: currentTest$.pipe(
        select(getVehicleDetails),
        select(getDualControls),
      ),
      instructorAccompaniment$: currentTest$.pipe(
        select(getAccompaniment),
        select(getInstructorAccompaniment),
      ),
      supervisorAccompaniment$: currentTest$.pipe(
        select(getAccompaniment),
        select(getSupervisorAccompaniment),
      ),
      otherAccompaniment$: currentTest$.pipe(
        select(getAccompaniment),
        select(getOtherAccompaniment),
      ),
      eyesightPassRadioChecked$: currentTest$.pipe(
        select(getEyesightTestResult),
        map(isPassed),
      ),
      eyesightFailRadioChecked$: currentTest$.pipe(
        select(getEyesightTestResult),
        map(isFailed),
      ),
      eyesightTestResult$: currentTest$.pipe(
        select(getEyesightTestResult),
      ),
      gearboxAutomaticRadioChecked$: currentTest$.pipe(
        select(getVehicleDetails),
        map(isAutomatic),
      ),
      gearboxManualRadioChecked$: currentTest$.pipe(
        select(getVehicleDetails),
        map(isManual),
      ),
      tellMeQuestionSelected$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecks),
        map(isTellMeQuestionSelected),
      ),
      tellMeQuestionOutcome$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecks),
        map(tellMeQuestionOutcome),
      ),
      tellMeQuestionCorrect$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecks),
        map(isTellMeQuestionCorrect),
      ),
      tellMeQuestionDrivingFault$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecks),
        map(isTellMeQuestionDrivingFault),
      ),
      tellMeQuestion$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecks),
        map(getTellMeQuestion),
      ),
    };
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new WaitingRoomToCarViewDidEnter());
  }

  ionViewWillLeave(): void {
    this.store$.dispatch(new PersistTests());
  }

  schoolCarToggled(): void {
    this.store$.dispatch(new SchoolCarToggled());
  }

  dualControlsToggled(): void {
    this.store$.dispatch(new DualControlsToggled());
  }

  transmissionChanged(transmission: GearboxCategory): void {
    this.store$.dispatch(new GearboxCategoryChanged(transmission));
  }

  instructorAccompanimentToggled(): void {
    this.store$.dispatch(new InstructorAccompanimentToggled());
  }

  supervisorAccompanimentToggled(): void {
    this.store$.dispatch(new SupervisorAccompanimentToggled());
  }

  otherAccompanimentToggled(): void {
    this.store$.dispatch(new OtherAccompanimentToggled());
  }

  vehicleRegistrationChanged(vehicleRegistration: string) {
    this.store$.dispatch(new VehicleRegistrationChanged(vehicleRegistration));
  }

  instructorRegistrationChanged(instructorRegistration: number) {
    this.store$.dispatch(new InstructorRegistrationNumberChanged(instructorRegistration));
  }

  onSubmit() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      this.navController.push('TestReportPage');
    }
  }
  updateForm(ctrl: string, value: any) {
    this.form.patchValue({
      [ctrl]: value,
    });
  }

  isCtrlDirtyAndInvalid(controlName: string): boolean {
    return !this.form.value[controlName] && this.form.get(controlName).dirty;
  }

  setEyesightFailureVisibility(show: boolean) {
    this.showEyesightFailureConfirmation = show;
  }

  eyesightFailCancelled = () => {
    this.updateForm('eyesightCtrl', null);
    this.store$.dispatch(new EyesightResultReset());
  }

  tellMeQuestionChanged(newTellMeQuestion: TellMeQuestion): void {
    this.store$.dispatch(new TellMeQuestionSelected(newTellMeQuestion));
    if (this.form.controls['tellMeQuestionOutcome']) {
      this.form.controls['tellMeQuestionOutcome'].setValue('');
    }
  }

  tellMeQuestionOutcomeChanged(outcome: string): void {
    if (outcome === QuestionOutcomes.Pass) {
      this.store$.dispatch(new TellMeQuestionCorrect());
      return;
    }
    this.store$.dispatch(new TellMeQuestionDrivingFault());
  }

  eyesightTestResultChanged(result: string): void {
    if (result === EyesightTestResult.Pass) {
      this.store$.dispatch(new EyesightResultPasssed());
      return;
    }
    this.store$.dispatch(new EyesightResultFailed());
  }

}
