import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import * as waitingRoomToCarActions from '../waiting-room-to-car.actions';
import { Observable } from 'rxjs/Observable';
import { CategoryCode, GearboxCategory } from '@dvsa/mes-test-schema/categories/common';
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
import { getAccompaniment } from '../../../modules/tests/accompaniment/accompaniment.reducer';
import {
  getRegistrationNumber,
  getGearboxCategory,
} from '../../../modules/tests/vehicle-details/common/vehicle-details.selector';
import {
  getInstructorAccompaniment,
  getSupervisorAccompaniment,
  getOtherAccompaniment,
  getInterpreterAccompaniment,
} from '../../../modules/tests/accompaniment/accompaniment.selector';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { FormGroup } from '@angular/forms';
import { QuestionProvider } from '../../../providers/question/question';
import {
  EyesightTestReset,
  EyesightTestPassed,
  EyesightTestFailed,
} from '../../../modules/tests/test-data/common/eyesight-test/eyesight-test.actions';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { CAT_HOME_TEST } from '../../page-names.constants';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { VehicleChecksQuestion } from '../../../providers/question/vehicle-checks-question.model';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { VehicleChecksScore } from '../../../shared/models/vehicle-checks-score.model';
import {
  getVehicleChecksCatHomeTest,
} from '../../../modules/tests/test-data/cat-home-test/vehicle-checks/vehicle-checks.cat-home-test.selector';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { VehicleChecksCatHomeTestComponent } from './components/vehicle-checks/vehicle-checks';
import { TestDataByCategoryProvider } from '../../../providers/test-data-by-category/test-data-by-category';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { getCandidate } from '../../../modules/tests/journal-data/cat-home/candidate/candidate.cat-home.reducer';
import {
  hasEyesightTestBeenCompleted,
  hasEyesightTestGotSeriousFault,
 } from '../../../modules/tests/test-data/common/eyesight-test/eyesight-test.selector';
import { getVehicleDetails } from '../../../modules/tests/vehicle-details/common/vehicle-details.reducer';
import {
  VehicleChecksUnion,
} from '../../../shared/unions/test-schema-unions';
import { Subscription } from 'rxjs';
import { getEyesightTest } from '../../../modules/tests/test-data/cat-a-mod2/test-data.cat-a-mod2.selector';

interface WaitingRoomToCarPageState {
  candidateName$: Observable<string>;
  registrationNumber$: Observable<string>;
  transmission$: Observable<GearboxCategory>;
  instructorAccompaniment$: Observable<boolean>;
  supervisorAccompaniment$: Observable<boolean>;
  otherAccompaniment$: Observable<boolean>;
  interpreterAccompaniment$: Observable<boolean>;
  eyesightTestComplete$: Observable<boolean>;
  eyesightTestFailed$: Observable<boolean>;
  vehicleChecksScore$: Observable<VehicleChecksScore>;
  vehicleChecks$: Observable<VehicleChecksUnion>;
}

@IonicPage()
@Component({
  selector: '.waiting-room-to-car-cat-home-test-page',
  templateUrl: 'waiting-room-to-car.cat-home-test.page.html',
})
export class WaitingRoomToCarCatHomeTestPage extends BasePageComponent {
  pageState: WaitingRoomToCarPageState;
  form: FormGroup;

  @ViewChild(VehicleChecksCatHomeTestComponent)
  vehicleChecks: VehicleChecksCatHomeTestComponent;

  showEyesightFailureConfirmation: boolean = false;

  tellMeQuestions: VehicleChecksQuestion[];

  testCategory: TestCategory;

  subscription: Subscription;

  constructor(
    public store$: Store<StoreModel>,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public faultCountProvider: FaultCountProvider,
    public questionProvider: QuestionProvider,
    private testDataByCategoryProvider: TestDataByCategoryProvider,
  ) {
    super(platform, navController, authenticationProvider);
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    const category$ = currentTest$.pipe(
      select(getTestCategory),
      map(category => category as TestCategory),
    );
    this.subscription = category$.subscribe((categoryCode) => {
      // This is so that the UnitTests can set the categoryCode before the OnInit without being overridden.
      if (!this.testCategory) {
        this.testCategory = categoryCode as TestCategory;
      }
    });
    this.tellMeQuestions = this.questionProvider.getTellMeQuestions(this.testCategory);

    const testData$ = currentTest$.pipe(
      map(data => this.testDataByCategoryProvider.getTestDataByCategoryCode(this.testCategory as CategoryCode)(data)),
    );

    const vehicleDetails$ = currentTest$.pipe(
      select(getVehicleDetails),
    );

    const accompaniment$ = currentTest$.pipe(
      select(getAccompaniment),
    );

    this.pageState = {
      candidateName$: currentTest$.pipe(
        select(getJournalData),
        select(getCandidate),
        select(getUntitledCandidateName),
      ),
      registrationNumber$: vehicleDetails$.pipe(
        select(getRegistrationNumber),
      ),
      transmission$: vehicleDetails$.pipe(
        select(getGearboxCategory),
      ),
      instructorAccompaniment$: accompaniment$.pipe(
        select(getInstructorAccompaniment),
      ),
      supervisorAccompaniment$: accompaniment$.pipe(
        select(getSupervisorAccompaniment),
      ),
      otherAccompaniment$: accompaniment$.pipe(
        select(getOtherAccompaniment),
      ),
      interpreterAccompaniment$: accompaniment$.pipe(
        select(getInterpreterAccompaniment),
      ),
      eyesightTestComplete$: testData$.pipe(
        select(getEyesightTest),
        select(hasEyesightTestBeenCompleted),
      ),
      eyesightTestFailed$: testData$.pipe(
        select(getEyesightTest),
        select(hasEyesightTestGotSeriousFault),
      ),
      vehicleChecksScore$: testData$.pipe(
        select(getVehicleChecksCatHomeTest),
        map((vehicleChecks) => {
          return this.faultCountProvider
            .getVehicleChecksFaultCount(this.testCategory, vehicleChecks);
        }),
      ),
      vehicleChecks$: testData$.pipe(
        select(getVehicleChecksCatHomeTest),
      ),
    };
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
  }

  ionViewWillLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
      this.navController.push(CAT_HOME_TEST.TEST_REPORT_PAGE).then(() => {
        // remove Waiting Room To Car Page
        const view = this.navController.getViews().find(view => view.id === CAT_HOME_TEST.WAITING_ROOM_TO_CAR_PAGE);
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
    return CAT_HOME_TEST.DEBRIEF_PAGE;
  }

  shouldDisplayEyesightBanner = (): boolean => {
    return this.testCategory === TestCategory.K;
  }
}
