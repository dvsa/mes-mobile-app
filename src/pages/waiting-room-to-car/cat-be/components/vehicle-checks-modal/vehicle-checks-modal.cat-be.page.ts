import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData } from '../../../../../modules/tests/tests.selector';
import { getCandidate } from '../../../../../modules/tests/journal-data/candidate/candidate.reducer';
import { getUntitledCandidateName } from '../../../../../modules/tests/journal-data/candidate/candidate.selector';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';
import { QuestionProvider } from '../../../../../providers/question/question';
import { VehicleChecksQuestion } from '../../../../../providers/question/vehicle-checks-question.model';
import { QuestionResult, QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';
import { TestCategory } from '../../../../../shared/models/test-category';
import {
  getVehicleChecksCatBe,
  getSelectedShowMeQuestions,
  getSelectedTellMeQuestions,
} from '../../../../../modules/tests/test-data/vehicle-checks/vehicle-checks.cat-be.selector';
import { getTestData } from '../../../../../modules/tests/test-data/test-data.cat-be.reducer';
import {
  ShowMeQuestionSelected,
  ShowMeQuestionOutcomeChanged,
  TellMeQuestionSelected,
  TellMeQuestionOutcomeChanged,
} from '../../../../../modules/tests/test-data/vehicle-checks/vehicle-checks.cat-be.action';
import {
 NUMBER_OF_TELL_ME_QUESTIONS,
} from '../../../../../shared/constants/tell-me-questions/tell-me-questions.cat-be.constants';
import {
  NUMBER_OF_SHOW_ME_QUESTIONS,
} from '../../../../../shared/constants/show-me-questions/show-me-questions.cat-be.constants';

interface VehicleChecksModalCatBEState {
  candidateName$: Observable<string>;
  showMeQuestions$: Observable<QuestionResult[]>;
  tellMeQuestions$: Observable<QuestionResult[]>;
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

  constructor(
    public store$: Store<StoreModel>,
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
        select(getVehicleChecksCatBe),
        select(getSelectedShowMeQuestions),
      ),
      tellMeQuestions$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatBe),
        select(getSelectedTellMeQuestions),
      ),
    };
  }

  showMeQuestionChanged(result: QuestionResult, index: number): void {
    this.store$.dispatch(new ShowMeQuestionSelected(result, index));
  }

  showMeQuestionOutcomeChanged(result: QuestionResult, index: number): void {
    this.store$.dispatch(new ShowMeQuestionOutcomeChanged(result, index));
  }

  tellMeQuestionChanged(result: QuestionResult, index: number): void {
    this.store$.dispatch(new TellMeQuestionSelected(result, index));
  }

  tellMeQuestionOutcomeChanged(result: QuestionOutcome, index: number): void {
    this.store$.dispatch(new TellMeQuestionOutcomeChanged(result, index));
  }
}
