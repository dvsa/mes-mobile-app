import { Component, OnInit } from '@angular/core';
import { StoreModel } from '../../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/Common';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-be/test-data.cat-be.reducer';
import { getVehicleChecks } from '../../../../../modules/tests/test-data/cat-be/test-data.cat-be.selector';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { map } from 'rxjs/operators';

@Component({
  selector: 'vehicle-checks-card-cat-be',
  templateUrl: 'vehicle-checks-card.cat-be.html',
})
export class VehicleChecksCardCatBEComponent implements OnInit {

  tellMeShowMeQuestions$: Observable<QuestionResult[]>;

  constructor(private store$: Store<StoreModel>) { }

  ngOnInit(): void {
    this.tellMeShowMeQuestions$  = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getVehicleChecks),
      map(checks => [...checks.tellMeQuestions, ...checks.showMeQuestions]),
    );
  }

  questionHasFault = (result: QuestionResult): boolean => result.outcome !== CompetencyOutcome.P;
}
