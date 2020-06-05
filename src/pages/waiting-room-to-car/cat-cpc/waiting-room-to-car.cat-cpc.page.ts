import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import { Configuration, Question, Question5 } from '@dvsa/mes-test-schema/categories/CPC';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { Observable } from 'rxjs';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { StoreModel } from '../../../shared/models/store.model';
import * as waitingRoomToCarActions from '../waiting-room-to-car.actions';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import {
  PopulateVehicleConfiguration,
  VehicleRegistrationChanged,
} from '../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import {
  InterpreterAccompanimentToggled,
  SupervisorAccompanimentToggled,
} from '../../../modules/tests/accompaniment/cat-cpc/accompaniment.cat-cpc.actions';
import { getVehicleDetails } from '../../../modules/tests/vehicle-details/cat-cpc/vehicle-details.cat-cpc.reducer';
import { getAccompaniment } from '../../../modules/tests/accompaniment/accompaniment.reducer';
import { getRegistrationNumber } from '../../../modules/tests/vehicle-details/common/vehicle-details.selector';
import {
  getInterpreterAccompaniment,
  getSupervisorAccompaniment,
} from '../../../modules/tests/accompaniment/accompaniment.selector';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { CAT_CPC } from '../../page-names.constants';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { getTestData } from '../../../modules/tests/test-data/cat-cpc/test-data.cat-cpc.reducer';
import { getCombination } from '../../../modules/tests/test-data/cat-cpc/test-data.cat-cpc.selector';
import { PopulateCombination } from '../../../modules/tests/test-data/cat-cpc/combination/combination.action';
import { CPCQuestionProvider } from '../../../providers/cpc-questions/cpc-questions';
import {
  getVehicleConfiguration,
} from '../../../modules/tests/vehicle-details/cat-cpc/vehicle-details.cat-cpc.selector';
import {
  PopulateQuestions,
} from '../../../modules/tests/test-data/cat-cpc/questions/questions.action';
import {
  Combination,
  CombinationCodes,
} from '../../../shared/constants/cpc-questions/cpc-question-combinations.constants';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';

interface WaitingRoomToCarPageState {
  candidateName$: Observable<string>;
  registrationNumber$: Observable<string>;
  supervisorAccompaniment$: Observable<boolean>;
  interpreterAccompaniment$: Observable<boolean>;
  combination$: Observable<CombinationCodes>;
  configuration$: Observable<Configuration>;
}

@IonicPage()
@Component({
  selector: '.waiting-room-to-car-cat-cpc-page',
  templateUrl: 'waiting-room-to-car.cat-cpc.page.html',
})
export class WaitingRoomToCarCatCPCPage extends BasePageComponent {

  pageState: WaitingRoomToCarPageState;
  form: FormGroup;
  testCategory: CategoryCode;
  combinations: Combination[];

  constructor(
    public store$: Store<StoreModel>,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public cpcQuestionProvider: CPCQuestionProvider,
  ) {
    super(platform, navController, authenticationProvider);
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    currentTest$.pipe(
      select(getTestCategory),
    ).subscribe((result: CategoryCode) => this.testCategory = result);

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
      supervisorAccompaniment$: currentTest$.pipe(
        select(getAccompaniment),
        select(getSupervisorAccompaniment),
      ),
      interpreterAccompaniment$: currentTest$.pipe(
        select(getAccompaniment),
        select(getInterpreterAccompaniment),
      ),
      combination$: currentTest$.pipe(
        select(getTestData),
        select(getCombination),
      ),
      configuration$: currentTest$.pipe(
        select(getVehicleDetails),
        select(getVehicleConfiguration),
      ),
    };

    this.combinations = this.cpcQuestionProvider.getCombinations(this.testCategory as TestCategory);
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
  }

  ionViewWillLeave(): void {
    this.store$.dispatch(new PersistTests());
  }

  combinationSelected(combination: string): void {
    const questions: Question[] = this.cpcQuestionProvider.getQuestionsBank(combination);
    const question5: Question5 = this.cpcQuestionProvider.getQuestion5ByVehicleType(combination);

    this.store$.dispatch(new PopulateCombination(combination));
    this.store$.dispatch(new PopulateQuestions([...questions, question5]));
  }

  supervisorAccompanimentToggled(): void {
    this.store$.dispatch(new SupervisorAccompanimentToggled());
  }

  interpreterAccompanimentToggled(): void {
    this.store$.dispatch(new InterpreterAccompanimentToggled());
  }

  vehicleRegistrationChanged(vehicleRegistration: string) {
    this.store$.dispatch(new VehicleRegistrationChanged(vehicleRegistration));
  }

  vehicleConfiguration(configuration: Configuration): void {
    this.store$.dispatch(new PopulateVehicleConfiguration(configuration));
  }

  onSubmit() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      this.navController.push(CAT_CPC.TEST_REPORT_PAGE).then(() => {
        // remove Waiting Room To Car Page
        const view =
          this.navController.getViews().find(view => view.id === CAT_CPC.WAITING_ROOM_TO_CAR_PAGE);

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

}
