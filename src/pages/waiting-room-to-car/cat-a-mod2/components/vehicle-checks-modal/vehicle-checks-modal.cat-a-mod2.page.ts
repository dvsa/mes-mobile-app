import { IonicPage, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData } from '../../../../../modules/tests/tests.selector';
import { getCandidate } from '../../../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getUntitledCandidateName }
  from '../../../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';
import { QuestionProvider } from '../../../../../providers/question/question';
import { VehicleChecksQuestion } from '../../../../../providers/question/vehicle-checks-question.model';
import { QuestionResult, QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import * as safetyAndBalance from
'../../../../../modules/tests/test-data/cat-a-mod2/vehicle-checks/vehicle-checks.cat-a-mod2.selector';
import {
  NUMBER_OF_BALANCE_QUESTIONS,
} from '../../../../../shared/constants/balance-questions.cat-a-mod2.constants';
import {
  NUMBER_OF_SAFETY_QUESTIONS,
} from '../../../../../shared/constants/safety-questions.cat-a-mod2.constants';
import { VehicleChecksScore } from '../../../../../shared/models/vehicle-checks-score.model';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { Subscription } from 'rxjs/Subscription';
import * as vehicleChecksModalActions from './vehicle-checks-modal.cat-a-mod2.actions';
import { getTestData } from '../../../../../modules/tests/test-data/cat-a-mod2/test-data.cat-a-mod2.reducer';
import {
  SafetyQuestionOutcomeChanged,
  SafetyQuestionSelected,
  BalanceQuestionSelected,
  BalanceQuestionOutcomeChanged,
} from
'../../../../../modules/tests/test-data/cat-a-mod2/vehicle-checks/vehicle-checks.cat-a-mod2.actions';

interface SafetyAndBalanceModalState {
  candidateName$: Observable<string>;
  safetyQuestions$: Observable<QuestionResult[]>;
  balanceQuestions$: Observable<QuestionResult[]>;
  safetyAndBalanceQuestionsScore$: Observable<VehicleChecksScore>;
}

@IonicPage()
@Component({
  selector: 'vehicle-checks-modal-cat-a-mod2',
  templateUrl: 'vehicle-checks-modal.cat-a-mod2.page.html',
})
export class VehicleChecksCatAMod2Modal {

  pageState: SafetyAndBalanceModalState;
  formGroup: FormGroup;

  safetyQuestions: VehicleChecksQuestion[];
  balanceQuestions: VehicleChecksQuestion[];

  readonly safetyQuestionsNumberArray: number[] = Array(NUMBER_OF_SAFETY_QUESTIONS);
  readonly balanceQuestionsNumberArray: number[] = Array(NUMBER_OF_BALANCE_QUESTIONS);

  safetyAndBalanceQuestionsScore: VehicleChecksScore;

  subscription: Subscription;

  constructor(
    public store$: Store<StoreModel>,
    private navController: NavController,
    private faultCountProvider: FaultCountProvider,
    questionProvider: QuestionProvider,
  ) {
    this.formGroup = new FormGroup({});

    this.safetyQuestions = questionProvider.getSafetyQuestions(TestCategory.EUAM2);
    this.balanceQuestions = questionProvider.getBalanceQuestions(TestCategory.EUAM2);
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
      safetyQuestions$: currentTest$.pipe(
        select(getTestData),
        select(safetyAndBalance.getSafetyAndBalanceQuestions),
        select(safetyAndBalance.getSelectedSafetyQuestions),
      ),
      balanceQuestions$: currentTest$.pipe(
        select(getTestData),
        select(safetyAndBalance.getSafetyAndBalanceQuestions),
        select(safetyAndBalance.getSelectedBalanceQuestions),
      ),
      safetyAndBalanceQuestionsScore$: currentTest$.pipe(
        select(getTestData),
        select(safetyAndBalance.getSafetyAndBalanceQuestions),
        map((safetyAndBalanceQuestions) => {
          return this.faultCountProvider.getVehicleChecksFaultCount(TestCategory.EUAM2, safetyAndBalanceQuestions);
        }),
      ),
    };

    const { safetyAndBalanceQuestionsScore$ } = this.pageState;

    const merged$ = merge(
      safetyAndBalanceQuestionsScore$.pipe(
        map(score => this.safetyAndBalanceQuestionsScore = score),
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

  safetyQuestionChanged(result: QuestionResult, index: number): void {
    this.store$.dispatch(new SafetyQuestionSelected(result, index));
  }

  safetyQuestionOutcomeChanged(result: QuestionOutcome, index: number): void {
    this.store$.dispatch(new SafetyQuestionOutcomeChanged(result, index));
  }

  balanceQuestionChanged(result: QuestionResult, index: number): void {
    this.store$.dispatch(new BalanceQuestionSelected(result, index));
  }

  balanceQuestionOutcomeChanged(result: QuestionOutcome, index: number): void {
    this.store$.dispatch(new BalanceQuestionOutcomeChanged(result, index));
  }

  shouldDisplayBanner = (): boolean => {
    return this.safetyAndBalanceQuestionsScore.drivingFaults === 4 &&
    this.safetyAndBalanceQuestionsScore.seriousFaults === 1;
  }
}
