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

interface VehicleChecksModalCatBEState {
  candidateName$: Observable<string>;
}

@IonicPage()
@Component({
  selector: 'vehicle-checks-modal-cat-be',
  templateUrl: 'vehicle-checks-modal.cat-be.page.html',
})
export class VehicleChecksCatBEModal {

  pageState: VehicleChecksModalCatBEState;
  formGroup: FormGroup;
  vehicleChecksQuestionResults: QuestionResult;
  showMeQuestions: VehicleChecksQuestion[];
  questionsToDisable: VehicleChecksQuestion[];

  constructor(
    public store$: Store<StoreModel>,
    questionProvider: QuestionProvider,
  ) {
    this.formGroup = new FormGroup({});
    this.showMeQuestions = questionProvider.getShowMeQuestions(TestCategory.BE);
    this.caculateQuestionsToDisable();
    // TODO - Get tellMeQuestions
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
    };

    // TODO We need to get the data from the store for vehicle checks. It will return an array so we need to update
    // the components and send one question into each componenet;
    this.vehicleChecksQuestionResults = {
      code: 'S02',
      description: 'Doors secure',
      outcome: 'DF',
    } as QuestionResult;
  }

  vehicleChecksQuestionChanged(result: QuestionResult): void {
    // TODO - Send the result to the store - What happens if we change a question (how do we know the original question)
    console.log('vehicleChecksQuestionChanged', JSON.stringify(result));
  }

  vehicleChecksQuestionOutcomeChanged(result: QuestionResult): void {
    // TODO - Send the result to the store
    console.log('vehicleChecksQuestionOutcomeChanged', JSON.stringify(result));
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
