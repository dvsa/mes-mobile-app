import { IonicPage, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData } from '../../../../../modules/tests/tests.selector';
import { getCandidate } from '../../../../../modules/tests/journal-data/cat-b/candidate/candidate.reducer';
import { getUntitledCandidateName }
  from '../../../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';
import { QuestionProvider } from '../../../../../providers/question/question';
import { VehicleChecksQuestion } from '../../../../../providers/question/vehicle-checks-question.model';
import { QuestionResult, QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import {
  getVehicleChecksCatBE,
  getSelectedShowMeQuestions,
  getSelectedTellMeQuestions,
} from '../../../../../modules/tests/test-data/cat-be/vehicle-checks/vehicle-checks.cat-be.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-be/test-data.cat-be.reducer';
import {
  ShowMeQuestionSelected,
  ShowMeQuestionOutcomeChanged,
  TellMeQuestionSelected,
  TellMeQuestionOutcomeChanged,
} from '../../../../../modules/tests/test-data/cat-be/vehicle-checks/vehicle-checks.cat-be.action';
import {
 NUMBER_OF_TELL_ME_QUESTIONS,
} from '../../../../../shared/constants/tell-me-questions/tell-me-questions.cat-be.constants';
import {
  NUMBER_OF_SHOW_ME_QUESTIONS,
} from '../../../../../shared/constants/show-me-questions/show-me-questions.cat-be.constants';
import { VehicleChecksScore } from '../../../../../shared/models/vehicle-checks-score.model';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { Subscription } from 'rxjs/Subscription';
import * as vehicleChecksModalActions from './vehicle-checks-modal.cat-be.actions';

interface VehicleChecksModalCatBEState {
  candidateName$: Observable<string>;
  showMeQuestions$: Observable<QuestionResult[]>;
  tellMeQuestions$: Observable<QuestionResult[]>;
  vehicleChecksScore$: Observable<VehicleChecksScore>;
}

@IonicPage()
@Component({
  selector: 'vehicle-checks-modal-cat-be',
  templateUrl: 'vehicle-checks-modal.cat-be.page.html',
})
export class VehicleChecksCatBEModal {

  pageState: VehicleChecksModalCatBEState;
  formGroup: FormGroup;

  showMeQuestions: VehicleChecksQuestion[];
  tellMeQuestions: VehicleChecksQuestion[];
  readonly showMeQuestionsNumberArray: number[] = Array(NUMBER_OF_SHOW_ME_QUESTIONS);
  readonly tellMeQuestionsNumberArray: number[] = Array(NUMBER_OF_TELL_ME_QUESTIONS);

  vehicleChecksScore: VehicleChecksScore;

  subscription: Subscription;

  constructor(
    public store$: Store<StoreModel>,
    private navController: NavController,
    private faultCountProvider: FaultCountProvider,
    questionProvider: QuestionProvider,
  ) {
    this.formGroup = new FormGroup({});
    this.showMeQuestions = questionProvider.getShowMeQuestions(TestCategory.BE);
    this.tellMeQuestions = questionProvider.getTellMeQuestions(TestCategory.BE);
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
      showMeQuestions$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatBE),
        select(getSelectedShowMeQuestions),
      ),
      tellMeQuestions$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatBE),
        select(getSelectedTellMeQuestions),
      ),
      vehicleChecksScore$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatBE),
        map((vehicleChecks) => {
          return this.faultCountProvider.getVehicleChecksFaultCountCatBE(vehicleChecks);
        }),
      ),
    };

    const { vehicleChecksScore$ } = this.pageState;

    const merged$ = merge(
      vehicleChecksScore$.pipe(
        map(score => this.vehicleChecksScore = score),
      ),
    );

    this.subscription = merged$.subscribe();
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {
    this.navController.pop();
  }

  ionViewDidEnter() {
    this.store$.dispatch(new vehicleChecksModalActions.VehicleChecksViewDidEnter());
  }

  showMeQuestionChanged(result: QuestionResult, index: number): void {
    this.store$.dispatch(new ShowMeQuestionSelected(result, index));
  }

  showMeQuestionOutcomeChanged(result: QuestionOutcome, index: number): void {
    this.store$.dispatch(new ShowMeQuestionOutcomeChanged(result, index));
  }

  tellMeQuestionChanged(result: QuestionResult, index: number): void {
    this.store$.dispatch(new TellMeQuestionSelected(result, index));
  }

  tellMeQuestionOutcomeChanged(result: QuestionOutcome, index: number): void {
    this.store$.dispatch(new TellMeQuestionOutcomeChanged(result, index));
  }

  shouldDisplayBanner = (): boolean => {
    return this.vehicleChecksScore.drivingFaults === 4 && this.vehicleChecksScore.seriousFaults === 1;
  }
}
