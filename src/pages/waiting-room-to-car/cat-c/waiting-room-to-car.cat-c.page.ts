import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import * as waitingRoomToCarActions from '../waiting-room-to-car.actions';
import { Observable } from 'rxjs/Observable';
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
import { QuestionProvider } from '../../../providers/question/question';
import {
  TellMeQuestionSelected,
  TellMeQuestionCorrect,
  TellMeQuestionDrivingFault,
  QuestionOutcomes,
} from '../../../modules/tests/test-data/cat-b/vehicle-checks/vehicle-checks.actions';

import { getTestData } from '../../../modules/tests/test-data/cat-c/test-data.cat-c.reducer';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { CAT_C } from '../../page-names.constants';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { VehicleChecksQuestion } from '../../../providers/question/vehicle-checks-question.model';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { VehicleChecksScore } from '../../../shared/models/vehicle-checks-score.model';

// TODO: MES-4254 Import cat c selector
import {
  getVehicleChecksCatC,
} from '../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.selector';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';

import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { VehicleChecksCatCComponent } from './components/vehicle-checks/vehicle-checks.cat-c';

interface WaitingRoomToCarPageState {
  candidateName$: Observable<string>;
  registrationNumber$: Observable<string>;
  instructorAccompaniment$: Observable<boolean>;
  supervisorAccompaniment$: Observable<boolean>;
  otherAccompaniment$: Observable<boolean>;
  interpreterAccompaniment$: Observable<boolean>;
  vehicleChecksScore$: Observable<VehicleChecksScore>;
  vehicleChecks$: Observable<CatCUniqueTypes.VehicleChecks>;
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

  showEyesightFailureConfirmation: boolean = false;

  tellMeQuestions: VehicleChecksQuestion[];

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

    this.tellMeQuestions = questionProvider.getTellMeQuestions(TestCategory.C);
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
      vehicleChecksScore$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatC),
        map(vehicleChecks => this.faultCountProvider.getVehicleChecksFaultCountCatC(vehicleChecks)),
      ),
      vehicleChecks$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatC),
      ),
    };
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

  closeVehicleChecksModal = () => {
    this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
  }

  onSubmit() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      this.navController.push(CAT_C.TEST_REPORT_PAGE).then(() => {
        // remove Waiting Room To Car Page
        const view = this.navController.getViews().find(view => view.id === CAT_C.WAITING_ROOM_TO_CAR_PAGE);
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

  getDebriefPage() {
    return CAT_C.DEBRIEF_PAGE;
  }

}
