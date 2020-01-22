import { Component, OnInit } from '@angular/core';
import { StoreModel } from '../../../../../shared/models/store.model';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CategoryCode, QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-be/test-data.cat-be.reducer';
import { getVehicleChecks } from '../../../../../modules/tests/test-data/cat-be/test-data.cat-be.selector';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { map } from 'rxjs/operators';
import { getTestCategory } from '../../../../../modules/tests/category/category.reducer';

@Component({
  selector: 'vehicle-checks-card-cat-be',
  templateUrl: 'vehicle-checks-card.cat-be.html',
})
export class VehicleChecksCardCatBEComponent implements OnInit {

  tellMeShowMeQuestions$: Observable<QuestionResult[]>;
  testCategory$: Observable<CategoryCode>;

  constructor(private store$: Store<StoreModel>) { }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.tellMeShowMeQuestions$ = currentTest$.pipe(
      select(getTestData),
      select(getVehicleChecks),
      map(checks => [...checks.tellMeQuestions, ...checks.showMeQuestions]),
      map(checks => checks.filter(c => c.code !== undefined)),
    );

    this.testCategory$ = currentTest$.pipe(
      select(getTestCategory),
    );
  }

  questionHasFault = (result: QuestionResult): boolean => result.outcome !== CompetencyOutcome.P;
}
