import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import * as waitingRoomToCarActions from '../waiting-room-to-car.actions';
import { Observable, merge, Subscription } from 'rxjs';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import {
  VehicleRegistrationChanged,
} from '../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { map } from 'rxjs/operators';
import {
  InstructorAccompanimentToggled,
  OtherAccompanimentToggled,
  SupervisorAccompanimentToggled,
  InterpreterAccompanimentToggled,
} from '../../../modules/tests/accompaniment/accompaniment.actions';
import { getVehicleDetails } from '../../../modules/tests/vehicle-details/cat-c/vehicle-details.cat-c.reducer';
import { getAccompaniment } from '../../../modules/tests/accompaniment/accompaniment.reducer';
import {
  getRegistrationNumber,
} from '../../../modules/tests/vehicle-details/common/vehicle-details.selector';
import {
  getInstructorAccompaniment,
  getSupervisorAccompaniment,
  getOtherAccompaniment,
  getInterpreterAccompaniment,
} from '../../../modules/tests/accompaniment/accompaniment.selector';
import { getCandidate } from '../../../modules/tests/journal-data/cat-c/candidate/candidate.cat-c.reducer';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { FormGroup } from '@angular/forms';
import { getTestData } from '../../../modules/tests/test-data/cat-c/test-data.cat-c.reducer';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { CAT_C } from '../../page-names.constants';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { VehicleChecksScore } from '../../../shared/models/vehicle-checks-score.model';
import {
  getVehicleChecksCatC, getVehicleChecksCompleted,
} from '../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.selector';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';

import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { VehicleChecksCatCComponent } from './components/vehicle-checks/vehicle-checks.cat-c';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';

import { CategoryCode, QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { getDelegatedTestIndicator } from '../../../modules/tests/delegated-test/delegated-test.reducer';
import { isDelegatedTest } from '../../../modules/tests/delegated-test/delegated-test.selector';
import {
  VehicleChecksCompletedToggled,
  VehicleChecksDrivingFaultsNumberChanged,
} from '../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.action';
import {
  getPreTestDeclarations,
} from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.reducer';
import {
  getCandidateDeclarationSignedStatus,
  getInsuranceDeclarationStatus,
  getResidencyDeclarationStatus,
} from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.selector';
import {
  CandidateDeclarationSigned,
  SetDeclarationStatus,
} from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.actions';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';

interface WaitingRoomToCarPageState {
  candidateName$: Observable<string>;
  registrationNumber$: Observable<string>;
  instructorAccompaniment$: Observable<boolean>;
  supervisorAccompaniment$: Observable<boolean>;
  otherAccompaniment$: Observable<boolean>;
  interpreterAccompaniment$: Observable<boolean>;
  vehicleChecksScore$: Observable<VehicleChecksScore>;
  vehicleChecks$: Observable<CatCUniqueTypes.VehicleChecks>;
  testCategory$: Observable<CategoryCode>;
  delegatedTest$: Observable<boolean>;
  vehicleChecksCompleted$: Observable<boolean>;
  insuranceDeclarationAccepted$: Observable<boolean>;
  residencyDeclarationAccepted$: Observable<boolean>;
  candidateDeclarationSigned$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: '.waiting-room-to-car-cat-c-page',
  templateUrl: 'waiting-room-to-car.cat-c.page.html',
})
export class WaitingRoomToCarCatCPage extends BasePageComponent {
  pageState: WaitingRoomToCarPageState;
  form: FormGroup;

  @ViewChild(VehicleChecksCatCComponent)
  vehicleChecks: VehicleChecksCatCComponent;
  subscription: Subscription;
  showEyesightFailureConfirmation: boolean = false;

  testCategory: CategoryCode;
  isDelegated: boolean;

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
      vehicleChecks$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatC),
      ),
      testCategory$: currentTest$.pipe(
        select(getTestCategory),
        map(result => this.testCategory = result),
      ),
      vehicleChecksScore$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatC),
        map(vehicleChecks =>
          this.faultCountProvider.getVehicleChecksFaultCount(this.testCategory as TestCategory, vehicleChecks),
        ),
      ),
      delegatedTest$: currentTest$.pipe(
        select(getDelegatedTestIndicator),
        select(isDelegatedTest),
      ),
      vehicleChecksCompleted$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatC),
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

  ionViewDidEnter(): void {
    this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
  }

  ionViewWillLeave(): void {
    this.store$.dispatch(new PersistTests());
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

  vehicleChecksCompletedOutcomeChanged(toggled: boolean) {
    this.store$.dispatch(new VehicleChecksCompletedToggled(toggled));
  }

  candidateDeclarationOutcomeChanged(declaration: boolean) {
    this.store$.dispatch(new SetDeclarationStatus(declaration));
    this.store$.dispatch(new CandidateDeclarationSigned());
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  closeVehicleChecksModal = () => {
    this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
  }

  generateDelegatedQuestionResults(number: number, outcome: CompetencyOutcome): QuestionResult[] {
    return Array(number).fill(null).map(() => {
      return this.createDelegatedQuestionResult(outcome);
    });
  }

  createDelegatedQuestionResult = (outcome: CompetencyOutcome) => ({ outcome, code: 'DELEGATED EXAMINER' });

  vehicleChecksDrivingFaultsNumberChanged(number: number) {
    this.store$.dispatch(new VehicleChecksDrivingFaultsNumberChanged(
      this.generateDelegatedQuestionResults(number, CompetencyOutcome.DF),
    ));
  }

  setupSubscription() {
    const {
      testCategory$,
      delegatedTest$,
    } = this.pageState;

    this.subscription = merge(
      testCategory$.pipe(map(result => this.testCategory = result)),
      delegatedTest$.pipe(map(result => this.isDelegated = result)),
    ).subscribe();
  }

  onSubmit() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      this.navController.push(CAT_C.TEST_REPORT_PAGE).then(() => {
        // remove Waiting Room To Car Page
        const view = this.navController.getViews().find(view => view.id === CAT_C.WAITING_ROOM_TO_CAR_PAGE);
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

  getDebriefPage() {
    return CAT_C.DEBRIEF_PAGE;
  }
  displayCabLockDown = (): boolean => this.testCategory === TestCategory.C || this.testCategory === TestCategory.CE;
  displayLoadSecured = (): boolean => this.testCategory === TestCategory.C ||
                                      this.testCategory === TestCategory.CE ||
                                      this.testCategory === TestCategory.C1E
}
