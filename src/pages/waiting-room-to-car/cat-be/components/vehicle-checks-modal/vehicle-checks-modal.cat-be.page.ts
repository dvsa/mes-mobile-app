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
    // TODO - This needs to be gotten from the store
    this.vehicleChecksQuestionResults =   {
      code: 'S02',
      description: 'Doors secure',
    },
    // TODO this needs to be calculated
    this.questionsToDisable = [
      {
        code: 'S04',
        description: 'Show me how you would check the parking brake for excessive wear.',
        shortName: 'Parking brake',
      },
    ];
    this.showMeQuestions = questionProvider.getShowMeQuestions(TestCategory.BE);
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
  }

  vehicleChecksQuestionChanged(result: QuestionResult): void {
    // TODO - Send the result to the store
    console.log('vehicleChecksQuestionChanged', JSON.stringify(result));
  }
}
