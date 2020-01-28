import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import * as waitingRoomToCarActions from '../waiting-room-to-car.actions';
import { Observable } from 'rxjs/Observable';
import { GearboxCategory, CategoryCode } from '@dvsa/mes-test-schema/categories/AM2';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import {
  SchoolBikeToggled,
} from '../../../modules/tests/vehicle-details/cat-a-mod2/vehicle-details.cat-a-mod2.actions';
import { map } from 'rxjs/operators';
import {
  InstructorAccompanimentToggled,
  OtherAccompanimentToggled,
  SupervisorAccompanimentToggled,
  InterpreterAccompanimentToggled,
} from '../../../modules/tests/accompaniment/accompaniment.actions';
import { getVehicleDetails } from
'../../../modules/tests/vehicle-details/cat-a-mod2/vehicle-details.cat-a-mod2.reducer';
import { getAccompaniment } from '../../../modules/tests/accompaniment/accompaniment.reducer';
import {
  getRegistrationNumber,
  getGearboxCategory,
} from '../../../modules/tests/vehicle-details/common/vehicle-details.selector';
import {
  getSchoolBike,
} from '../../../modules/tests/vehicle-details/cat-a-mod2/vehicle-details.cat-a-mod2.selector';
import {
  getInstructorAccompaniment,
  getSupervisorAccompaniment,
  getOtherAccompaniment,
  getInterpreterAccompaniment,
} from '../../../modules/tests/accompaniment/accompaniment.selector';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { FormGroup } from '@angular/forms';
import {
  hasEyesightTestGotSeriousFault,
  hasEyesightTestBeenCompleted,
} from '../../../modules/tests/test-data/common/eyesight-test/eyesight-test.selector';
import {
  EyesightTestReset,
  EyesightTestPassed,
  EyesightTestFailed,
} from '../../../modules/tests/test-data/common/eyesight-test/eyesight-test.actions';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { CAT_A_MOD2 } from '../../page-names.constants';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { VehicleChecksScore } from '../../../shared/models/vehicle-checks-score.model';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { VehicleChecksCatAMod2Component } from './components/vehicle-checks/vehicle-checks';
import { VehicleRegistrationChanged, GearboxCategoryChanged } from
'../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { getEyesightTest }
from '../../../modules/tests/test-data/cat-a-mod2/test-data.cat-a-mod2.selector';
import { getSafetyAndBalanceQuestions } from
'../../../modules/tests/test-data/cat-a-mod2/vehicle-checks/vehicle-checks.cat-a-mod2.selector';
import { getTestData } from '../../../modules/tests/test-data/cat-a-mod2/test-data.cat-a-mod2.reducer';
import { PopulateTestCategory } from '../../../modules/tests/category/category.actions';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';

interface WaitingRoomToCarPageState {
  candidateName$: Observable<string>;
  registrationNumber$: Observable<string>;
  transmission$: Observable<GearboxCategory>;
  schoolBike$: Observable<boolean>;
  instructorAccompaniment$: Observable<boolean>;
  supervisorAccompaniment$: Observable<boolean>;
  otherAccompaniment$: Observable<boolean>;
  interpreterAccompaniment$: Observable<boolean>;
  eyesightTestComplete$: Observable<boolean>;
  eyesightTestFailed$: Observable<boolean>;
  safetyAndBalanceQuestionsScore$: Observable<VehicleChecksScore>;
  safetyAndBalanceQuestions$: Observable<any>;
  testCategory$: Observable<CategoryCode>;
}

@IonicPage()
@Component({
  selector: '.waiting-room-to-car-cat-a-mod2-page',
  templateUrl: 'waiting-room-to-car.cat-a-mod2.page.html',
})
export class WaitingRoomToCarCatAMod2Page extends BasePageComponent {
  pageState: WaitingRoomToCarPageState;
  form: FormGroup;

  @ViewChild(VehicleChecksCatAMod2Component)
  vehicleChecks: VehicleChecksCatAMod2Component;

  showEyesightFailureConfirmation: boolean = false;

  constructor(
    public store$: Store<StoreModel>,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public faultCountProvider: FaultCountProvider,
    ) {
    super(platform, navController, authenticationProvider);
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
      schoolBike$: currentTest$.pipe(
        select(getVehicleDetails),
        select(getSchoolBike),
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
        select(getEyesightTest),
        select(hasEyesightTestBeenCompleted),
      ),
      eyesightTestFailed$: currentTest$.pipe(
        select(getTestData),
        select(getEyesightTest),
        select(hasEyesightTestGotSeriousFault),
      ),
      safetyAndBalanceQuestionsScore$: currentTest$.pipe(
        select(getTestData),
        select(getSafetyAndBalanceQuestions),
        map((safetyAndBalanceQuestions) => {
          return this.faultCountProvider.getVehicleChecksFaultCount(TestCategory.EUAM2, safetyAndBalanceQuestions);
        }),
      ),
      safetyAndBalanceQuestions$: currentTest$.pipe(
        select(getTestData),
        select(getSafetyAndBalanceQuestions),
      ),
      testCategory$: currentTest$.pipe(
        select(getTestCategory),
      ),
    };
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
  }

  ionViewWillLeave(): void {
    this.store$.dispatch(new PersistTests());
  }

  schoolBikeToggled(): void {
    this.store$.dispatch(new SchoolBikeToggled());
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

  onSubmit() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      this.navController.push(CAT_A_MOD2.TEST_REPORT_PAGE).then(() => {
        // remove Waiting Room To Car Page
        const view = this.navController.getViews().find(view => view.id === CAT_A_MOD2.WAITING_ROOM_TO_CAR_PAGE);
        if (view) {
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

  eyesightTestResultChanged(passed: boolean): void {
    const action = passed ? new EyesightTestPassed() : new EyesightTestFailed();
    this.store$.dispatch(action);
  }

  getDebriefPage() {
    return CAT_A_MOD2.DEBRIEF_PAGE;
  }

  categoryCodeChanged(category: CategoryCode) {
    this.store$.dispatch(new PopulateTestCategory(category));
  }
}
