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
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { TestCategory } from '../../../../../shared/models/test-category';
import { getVehicleChecksCatBe, getSelectedShowMeQuestions } from '../../../../../modules/tests/test-data/vehicle-checks/vehicle-checks.cat-be.selector';
import { getTestData } from '../../../../../modules/tests/test-data/test-data.cat-be.reducer';
import { ShowMeQuestionSelected, ShowMeQuestionOutcomeChanged } from '../../../../../modules/tests/test-data/vehicle-checks/vehicle-checks.cat-be.action';

interface VehicleChecksModalCatBEState {
  candidateName$: Observable<string>;
  showMeQuestions$: Observable<QuestionResult[]>;
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
  questionsToDisable: VehicleChecksQuestion[];

  constructor(
    public store$: Store<StoreModel>,
    questionProvider: QuestionProvider,
  ) {
    this.formGroup = new FormGroup({});
    this.showMeQuestions = questionProvider.getShowMeQuestions(TestCategory.BE);
    this.tellMeQuestions = questionProvider.getTellMeQuestions(TestCategory.BE);
    this.caculateQuestionsToDisable();
  }

  ngOnInit(): void {
    this.pageState = {
      candidateName$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getJournalData),
        select(getCandidate),
        select(getUntitledCandidateName),
      ),
      showMeQuestions$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(getVehicleChecksCatBe),
        select(getSelectedShowMeQuestions)
      )
    };
  }

  showMeQuestionChanged(result: QuestionResult): void {
    this.store$.dispatch(new ShowMeQuestionSelected(result));
  }

  showMeQuestionOutcomeChanged(result: QuestionResult): void {
    this.store$.dispatch(new ShowMeQuestionOutcomeChanged(result.outcome));
  }

  caculateQuestionsToDisable() {
    // TODO - we need to calculate what to disable, and it needs to update based on changes to the selected questions
    // this could be in the questionProvider potentially?
    this.questionsToDisable = [
      {
        code: 'S04',
        description: 'Show me how you would check the parking brake for excessive wear.',
        shortName: 'Parking brake',
      },
    ];
  }
}
