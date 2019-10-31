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
import { ShowMeQuestion } from '../../../../../providers/question/show-me-question.model';
import { QuestionProvider } from '../../../../../providers/question/question';

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
  vehicleChecksQuestion: ShowMeQuestion;
  vehicleChecksQuestions: ShowMeQuestion[];

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

  // tslint:disable-next-line: variable-name
  vehicleChecksQuestionChanged(_vehicleChecksQuestion: ShowMeQuestion): void {
    console.log('EMIT');
  }
}
