import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import * as waitingRoomToCarActions from '../waiting-room-to-car.actions';
import { Observable, merge, Subscription } from 'rxjs';
import { GearboxCategory } from '@dvsa/mes-test-schema/categories/common';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import {
  SchoolCarToggled,
  DualControlsToggled,
  GearboxCategoryChanged,
  VehicleRegistrationChanged,
} from '../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { map } from 'rxjs/operators';
import {
  InstructorAccompanimentToggled,
  OtherAccompanimentToggled,
  SupervisorAccompanimentToggled,
  InterpreterAccompanimentToggled,
} from '../../../modules/tests/accompaniment/accompaniment.actions';
import { getVehicleDetails } from '../../../modules/tests/vehicle-details/cat-be/vehicle-details.cat-be.reducer';
import { getAccompaniment } from '../../../modules/tests/accompaniment/accompaniment.reducer';
import {
  getRegistrationNumber,
  getGearboxCategory,
  isAutomatic,
  isManual,
} from '../../../modules/tests/vehicle-details/common/vehicle-details.selector';
import {
  getSchoolCar,
  getDualControls,
} from '../../../modules/tests/vehicle-details/cat-be/vehicle-details.cat-be.selector';
import {
  getInstructorAccompaniment,
  getSupervisorAccompaniment,
  getOtherAccompaniment,
  getInterpreterAccompaniment,
} from '../../../modules/tests/accompaniment/accompaniment.selector';
import { getCandidate } from '../../../modules/tests/journal-data/cat-be/candidate/candidate.cat-be.reducer';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { FormGroup } from '@angular/forms';
import { QuestionProvider } from '../../../providers/question/question';
import {
  EyesightTestReset,
  EyesightTestPassed,
  EyesightTestFailed,
} from '../../../modules/tests/test-data/common/eyesight-test/eyesight-test.actions';
import {
  TellMeQuestionSelected,
  TellMeQuestionCorrect,
  TellMeQuestionDrivingFault,
  QuestionOutcomes,
} from '../../../modules/tests/test-data/cat-b/vehicle-checks/vehicle-checks.actions';
import {
  hasEyesightTestGotSeriousFault, hasEyesightTestBeenCompleted,
} from '../../../modules/tests/test-data/cat-be/test-data.cat-be.selector';
import { getTestData } from '../../../modules/tests/test-data/cat-be/test-data.cat-be.reducer';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { CAT_BE } from '../../page-names.constants';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { VehicleChecksQuestion } from '../../../providers/question/vehicle-checks-question.model';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { VehicleChecksScore } from '../../../shared/models/vehicle-checks-score.model';
import {
  getVehicleChecksCatBE,
} from '../../../modules/tests/test-data/cat-be/vehicle-checks/vehicle-checks.cat-be.selector';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { VehicleChecksCatBEComponent } from './components/vehicle-checks/vehicle-checks';
import {
  getVehicleChecksCompleted,
} from '../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.selector';
import {
  getPreTestDeclarations,
} from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.reducer';
import {
  getCandidateDeclarationSignedStatus,
  getInsuranceDeclarationStatus,
  getResidencyDeclarationStatus,
} from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.selector';
import { getDelegatedTestIndicator } from '../../../modules/tests/delegated-test/delegated-test.reducer';
import { isDelegatedTest } from '../../../modules/tests/delegated-test/delegated-test.selector';
import {
  CandidateDeclarationSigned,
  SetDeclarationStatus,
} from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.actions';
import {
  VehicleChecksCompletedToggled, VehicleChecksDrivingFaultsNumberChanged, VehicleChecksSeriousFaultsNumberChanged,
} from '../../../modules/tests/test-data/cat-be/vehicle-checks/vehicle-checks.cat-be.action';
import { getNextPageDebriefOffice } from '../../../shared/constants/getNextPageDebriefOffice.constants';

interface WaitingRoomToCarPageState {
  candidateName$: Observable<string>;
  registrationNumber$: Observable<string>;
  transmission$: Observable<GearboxCategory>;
  schoolCar$: Observable<boolean>;
  dualControls$: Observable<boolean>;
  instructorAccompaniment$: Observable<boolean>;
  supervisorAccompaniment$: Observable<boolean>;
  otherAccompaniment$: Observable<boolean>;
  interpreterAccompaniment$: Observable<boolean>;
  eyesightTestComplete$: Observable<boolean>;
  eyesightTestFailed$: Observable<boolean>;
  gearboxAutomaticRadioChecked$: Observable<boolean>;
  gearboxManualRadioChecked$: Observable<boolean>;
  vehicleChecksScore$: Observable<VehicleChecksScore>;
  vehicleChecks$: Observable<CatBEUniqueTypes.VehicleChecks>;
  delegatedTest$: Observable<boolean>;
  vehicleChecksCompleted$: Observable<boolean>;
  insuranceDeclarationAccepted$: Observable<boolean>;
  residencyDeclarationAccepted$: Observable<boolean>;
  candidateDeclarationSigned$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: '.waiting-room-to-car-cat-be-page',
  templateUrl: 'waiting-room-to-car.cat-be.page.html',
})
export class WaitingRoomToCarCatBEPage extends BasePageComponent {
  pageState: WaitingRoomToCarPageState;
  form: FormGroup;

  @ViewChild(VehicleChecksCatBEComponent)
  vehicleChecks: VehicleChecksCatBEComponent;

  showEyesightFailureConfirmation: boolean = false;

  tellMeQuestions: VehicleChecksQuestion[];
  isDelegated: boolean;
  subscription: Subscription;

  constructor(
    public store$: Store<StoreModel>,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public faultCountProvider: FaultCountProvider,
    public questionProvider: QuestionProvider,
  ) {
    super(platform, navController, authenticationProvider);
    this.tellMeQuestions = questionProvider.getTellMeQuestions(TestCategory.BE);
    this.form = new FormGroup({});
  }

  ngOnInit(): void {

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
      interpreterAccompaniment$: currentTest$.pipe(
        select(getAccompaniment),
        select(getInterpreterAccompaniment),
      ),
      eyesightTestComplete$: currentTest$.pipe(
        select(getTestData),
        select(hasEyesightTestBeenCompleted),
      ),
      eyesightTestFailed$: currentTest$.pipe(
        select(getTestData),
        select(hasEyesightTestGotSeriousFault),
      ),
      gearboxAutomaticRadioChecked$: currentTest$.pipe(
        select(getVehicleDetails),
        map(isAutomatic),
      ),
      gearboxManualRadioChecked$: currentTest$.pipe(
        select(getVehicleDetails),
        map(isManual),
      ),
      vehicleChecksScore$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatBE),
        map((vehicleChecks) => {
          return this.faultCountProvider.getVehicleChecksFaultCount(TestCategory.BE, vehicleChecks);
        }),
      ),
      vehicleChecks$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatBE),
      ),
      delegatedTest$: currentTest$.pipe(
        select(getDelegatedTestIndicator),
        select(isDelegatedTest),
        // select(() => true),
      ),
      vehicleChecksCompleted$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatBE),
        select(getVehicleChecksCompleted),
      ),
      insuranceDeclarationAccepted$: currentTest$.pipe(
        select(getPreTestDeclarations),
        select(getInsuranceDeclarationStatus),
      ),
      residencyDeclarationAccepted$: currentTest$.pipe(
        select(getPreTestDeclarations),
        select(getResidencyDeclarationStatus),
      ),
      candidateDeclarationSigned$: currentTest$.pipe(
        select(getPreTestDeclarations),
        select(getCandidateDeclarationSignedStatus),
      ),
    };
    this.setupSubscription();
  }

  setupSubscription(): void {
    const { delegatedTest$ } = this.pageState;
    this.subscription = merge(
      delegatedTest$.pipe(map(value => this.isDelegated = value)),
    ).subscribe();
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
  }

  ionViewWillLeave(): void {
    this.store$.dispatch(new PersistTests());
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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

  interpreterAccompanimentToggled(): void {
    this.store$.dispatch(new InterpreterAccompanimentToggled());
  }

  otherAccompanimentToggled(): void {
    this.store$.dispatch(new OtherAccompanimentToggled());
  }

  vehicleRegistrationChanged(vehicleRegistration: string) {
    this.store$.dispatch(new VehicleRegistrationChanged(vehicleRegistration));
  }

  closeVehicleChecksModal = () => {
    this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
  }

  vehicleChecksCompletedOutcomeChanged(toggled: boolean) {
    this.store$.dispatch(new VehicleChecksCompletedToggled(toggled));
  }

  vehicleChecksDrivingFaultsNumberChanged() {
    this.store$.dispatch(new VehicleChecksDrivingFaultsNumberChanged());
  }

  vehicleChecksSeriousFaultsNumberChanged() {
    this.store$.dispatch(new VehicleChecksSeriousFaultsNumberChanged());
  }

  candidateDeclarationOutcomeChanged(declaration: boolean) {
    this.store$.dispatch(new SetDeclarationStatus(declaration));
    this.store$.dispatch(new CandidateDeclarationSigned());
  }

  onSubmit() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      this.navController.push(CAT_BE.TEST_REPORT_PAGE).then(() => {
        // remove Waiting Room To Car Page
        const view = this.navController.getViews().find(view => view.id === CAT_BE.WAITING_ROOM_TO_CAR_PAGE);
        if (view && !this.isDelegated) {
          this.navController.removeView(view);
        }
      });
    } else {
      Object.keys(this.form.controls).forEach((controlName) => {
        if (this.form.controls[controlName].invalid) {
          this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarValidationError(
            `${controlName} is blank`,
          ));
        }
      });
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
    this.form.get('eyesightCtrl') && this.form.get('eyesightCtrl').reset();
    this.store$.dispatch(new EyesightTestReset());
  }

  tellMeQuestionChanged(newTellMeQuestion: VehicleChecksQuestion): void {
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

  eyesightTestResultChanged(passed: boolean): void {
    const action = passed ? new EyesightTestPassed() : new EyesightTestFailed();
    this.store$.dispatch(action);
  }

  nextPage() {
    return getNextPageDebriefOffice(CAT_BE, this.isDelegated);
  }

}
