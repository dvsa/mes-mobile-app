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
  // Type to the one from the schema
  vehicleChecksQuestion: any;
  vehicleChecksQuestions: VehicleChecksQuestion[];

  constructor(
    public store$: Store<StoreModel>,
    questionProvider: QuestionProvider,
  ) {
    this.formGroup = new FormGroup({});
    this.vehicleChecksQuestion = null;
    this.vehicleChecksQuestions = questionProvider.getShowMeQuestions();
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

  // TODO - Fix typing when we have thing from schema
  vehicleChecksQuestionChanged(vehicleChecksQuestion: any): void {
    // TODO - Send the result to the store
    console.log('vehicleChecksQuestionChanged', JSON.stringify(vehicleChecksQuestion));
  }
}
